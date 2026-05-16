import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';
import { signJWT } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, contrasena } = await req.json();

    if (!email || !contrasena) {
      return NextResponse.json({ message: 'Email y contraseña son obligatorios' }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      // Find user
      const result = await client.query('SELECT id, contrasena FROM usuarios WHERE email = $1 AND activo = true', [email]);
      if (result.rows.length === 0) {
        return NextResponse.json({ message: 'Credenciales inválidas o usuario inactivo' }, { status: 401 });
      }

      const user = result.rows[0];

      // Compare passwords
      const isMatch = await bcrypt.compare(contrasena, user.contrasena);
      if (!isMatch) {
        return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
      }

      // Generate JWT
      const token = await signJWT({ id: user.id });

      return NextResponse.json({ token, message: 'Inicio de sesión exitoso' }, { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
