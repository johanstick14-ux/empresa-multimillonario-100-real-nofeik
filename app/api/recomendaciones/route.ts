import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { enfermedades, sintomas } = await request.json();

    if (!enfermedades || !sintomas) {
      return NextResponse.json(
        { error: 'Datos incompletos para generar recomendaciones' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'API Key de OpenAI no configurada' },
        { status: 500 }
      );
    }

    const prompt = `Basándote en el siguiente análisis médico, proporciona 5-7 recomendaciones preventivas y de cuidado personal.

Posibles condiciones: ${enfermedades.join(', ')}
Síntomas: ${sintomas}

Las recomendaciones deben ser:
- Prácticas y fáciles de seguir
- Preventivas y de autocuidado
- Específicas para los síntomas mencionados
- Incluir consejos sobre hidratación, descanso, alimentación, etc.

Responde SOLO con un array JSON de strings, cada uno siendo una recomendación:
["recomendación 1", "recomendación 2", "recomendación 3", ...]

No incluyas numeración en las recomendaciones, solo el texto.`;

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Eres un asistente médico de IA que proporciona recomendaciones preventivas de salud. Tus recomendaciones son prácticas y basadas en evidencia.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const content = response.choices[0]?.message?.content;
    
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
