import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import pool from '@/lib/db';
import { verifyJWT } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { sintomas } = await request.json();
    
    // Obtener usuario del token
    const token = request.headers.get('authorization')?.replace('Bearer ', '') || '';
    let userId = null;
    
    if (token) {
      try {
        const payload = await verifyJWT(token);
        userId = payload?.id;
      } catch (e) {
        // Token inválido, continuar sin guardar en historial
      }
    }

    if (!sintomas || sintomas.trim().length < 20) {
      return NextResponse.json(
        { error: 'Por favor proporciona una descripción detallada de tus síntomas (mínimo 20 caracteres)' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API Key de Gemini no configurada. Por favor configura GEMINI_API_KEY en el archivo .env' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    const prompt = `Eres un asistente médico de IA especializado en análisis de síntomas. Analiza los siguientes síntomas y proporciona:

1. Una lista de posibles condiciones médicas (máximo 3-4)
2. El nivel de probabilidad (bajo, medio, alto)
3. Un análisis detallado de los síntomas

Síntomas del paciente: ${sintomas}

Responde ÚNICAMENTE en formato JSON válido con esta estructura exacta (sin texto adicional antes o después):
{
  "enfermedades": ["condición 1", "condición 2", "condición 3"],
  "probabilidad": "descripción del nivel de confianza",
  "analisis_completo": "análisis detallado de los síntomas y posibles causas"
}

IMPORTANTE: Siempre recuerda al usuario que esto es solo informativo y debe consultar a un médico profesional.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    
    if (!content) {
      return NextResponse.json(
        { error: 'No se pudo obtener una respuesta del modelo de IA' },
        { status: 500 }
      );
    }

    let analisisData;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analisisData = JSON.parse(jsonMatch[0]);
      } else {
        analisisData = JSON.parse(content);
      }
    } catch (parseError) {
      analisisData = {
        enfermedades: ['Análisis general de síntomas'],
        probabilidad: 'Requiere evaluación médica',
        analisis_completo: content,
      };
    }

    const resultado = {
      ...analisisData,
      sintomas_analizados: sintomas,
    };

    // Guardar en historial si hay usuario autenticado
    if (userId) {
      try {
        const client = await pool.connect();
        try {
          await client.query(
            'INSERT INTO historial (usuario_id, sintomas, enfermedades, probabilidad, analisis_completo) VALUES ($1, $2, $3, $4, $5)',
            [userId, sintomas, JSON.stringify(analisisData.enfermedades), analisisData.probabilidad, analisisData.analisis_completo]
          );
        } finally {
          client.release();
        }
      } catch (historialError) {
        console.error('Error al guardar en historial:', historialError);
        // No fallar si no se puede guardar en historial
      }
    }

    return NextResponse.json(resultado);
  } catch (error: any) {
    console.error('Error completo en análisis:', error);
    console.error('Mensaje de error:', error?.message);
    console.error('Stack:', error?.stack);
    
    if (error?.message?.includes('API key') || error?.message?.includes('API_KEY')) {
      return NextResponse.json(
        { error: 'API Key de Gemini inválida. Verifica tu configuración.', details: error.message },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error al procesar el análisis. Por favor intenta de nuevo.', details: error.message },
      { status: 500 }
    );
  }
}
