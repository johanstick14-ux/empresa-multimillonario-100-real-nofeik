import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyJWT } from '@/lib/auth';

// Obtener historial del usuario
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const payload = await verifyJWT(token);
    
    if (!payload || !payload.id) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }
    
    const userId = payload.id;

    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM historial WHERE usuario_id = $1 ORDER BY fecha_creacion DESC',
        [userId]
      );

      return NextResponse.json({ historial: result.rows }, { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al obtener historial:', error);
    return NextResponse.json({ error: 'Error al obtener historial' }, { status: 500 });
  }
}

// Guardar análisis en el historial
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const payload = await verifyJWT(token);
    
    if (!payload || !payload.id) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }
    
    const userId = payload.id;

    const { sintomas, enfermedades, probabilidad, analisis_completo, recomendaciones } = await request.json();

    if (!sintomas || !enfermedades || !probabilidad || !analisis_completo) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO historial (usuario_id, sintomas, enfermedades, probabilidad, analisis_completo, recomendaciones) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [userId, sintomas, JSON.stringify(enfermedades), probabilidad, analisis_completo, recomendaciones ? JSON.stringify(recomendaciones) : null]
      );

      return NextResponse.json({ 
        message: 'Análisis guardado en historial',
        id: result.rows[0].id 
      }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al guardar en historial:', error);
    return NextResponse.json({ error: 'Error al guardar en historial' }, { status: 500 });
  }
}
