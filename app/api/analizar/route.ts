import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { sintomas } = await request.json();

    if (!sintomas || sintomas.trim().length < 20) {
      return NextResponse.json(
        { error: 'Por favor proporciona una descripción detallada de tus síntomas (mínimo 20 caracteres)' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'API Key de OpenAI no configurada. Por favor configura OPENAI_API_KEY en el archivo .env' },
        { status: 500 }
      );
    }

    const prompt = `Eres un asistente médico de IA especializado en análisis de síntomas. Analiza los siguientes síntomas y proporciona:

1. Una lista de posibles condiciones médicas (máximo 3-4)
2. El nivel de probabilidad (bajo, medio, alto)
3. Un análisis detallado de los síntomas

Síntomas del paciente: ${sintomas}

Responde en formato JSON con esta estructura:
{
  "enfermedades": ["condición 1", "condición 2", "condición 3"],
  "probabilidad": "descripción del nivel de confianza",
  "analisis_completo": "análisis detallado de los síntomas y posibles causas"
}

IMPORTANTE: Siempre recuerda al usuario que esto es solo informativo y debe consultar a un médico profesional.`;

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Eres un asistente médico de IA que ayuda a analizar síntomas. Siempre recuerdas que tus análisis son informativos y no reemplazan el diagnóstico médico profesional.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    
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

    return NextResponse.json({
      ...analisisData,
      sintomas_analizados: sintomas,
    });
  } catch (error: any) {
    console.error('Error en análisis:', error);
    
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'API Key de OpenAI inválida. Verifica tu configuración.' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error al procesar el análisis. Por favor intenta de nuevo.' },
      { status: 500 }
    );
  }
}
