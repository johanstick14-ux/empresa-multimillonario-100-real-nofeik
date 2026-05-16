import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';
import { signJWT } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { nombre, apellido, email, contrasena } = await req.json();

    if (!nombre || !apellido || !email || !contrasena) {
      return NextResponse.json({ message: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      // Check if user exists
      const existingUser = await client.query('SELECT id FROM usuarios WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        return NextResponse.json({ message: 'El correo ya está registrado' }, { status: 400 });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contrasena, salt);

      // Insert user
      const result = await client.query(
        'INSERT INTO usuarios (nombre, apellido, email, contrasena) VALUES ($1, $2, $3, $4) RETURNING id',
        [nombre, apellido, email, hashedPassword]
      );
      const userId = result.rows[0].id;

      // Generate JWT
      const token = await signJWT({ id: userId });

      return NextResponse.json({ token, message: 'Usuario registrado exitosamente' }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error in register:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
