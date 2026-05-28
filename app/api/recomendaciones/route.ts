import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const { enfermedades, sintomas } = await request.json();

    if (!enfermedades || !sintomas) {
      return NextResponse.json(
        { error: 'Datos incompletos para generar recomendaciones' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API Key de Gemini no configurada' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    const prompt = `Basándote en el siguiente análisis médico, proporciona 5-7 recomendaciones preventivas y de cuidado personal.

Posibles condiciones: ${enfermedades.join(', ')}
Síntomas: ${sintomas}

Las recomendaciones deben ser:
- Prácticas y fáciles de seguir
- Preventivas y de autocuidado
- Específicas para los síntomas mencionados
- Incluir consejos sobre hidratación, descanso, alimentación, etc.

Responde ÚNICAMENTE con un array JSON de strings (sin texto adicional antes o después):
["recomendación 1", "recomendación 2", "recomendación 3", ...]

No incluyas numeración en las recomendaciones, solo el texto.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    
    if (!content) {
      return NextResponse.json(
        { error: 'No se pudieron generar recomendaciones' },
        { status: 500 }
      );
    }

    let recomendaciones;
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        recomendaciones = JSON.parse(jsonMatch[0]);
      } else {
        recomendaciones = JSON.parse(content);
      }
    } catch (parseError) {
      recomendaciones = content.split('\n').filter(line => line.trim().length > 0);
    }

    return NextResponse.json({
      recomendaciones: Array.isArray(recomendaciones) ? recomendaciones : [content],
    });
  } catch (error: any) {
    console.error('Error en recomendaciones:', error);
    
    return NextResponse.json(
      { error: 'Error al generar recomendaciones. Por favor intenta de nuevo.' },
      { status: 500 }
    );
  }
}
