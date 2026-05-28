'use client';

import { Heart, ClipboardList, Activity, FileText, User } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl">
                <Heart className="w-12 h-12 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">Salud IA</h1>
                <p className="text-gray-600">Detección temprana de enfermedades</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              <User className="w-5 h-5" />
              <span>Perfil</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Bienvenido</h2>
              <p className="text-blue-100">
                Utiliza inteligencia artificial para analizar tus síntomas y recibir recomendaciones preventivas.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Prevención</h2>
              <p className="text-purple-100">
                La detección temprana es clave para mantener tu salud y bienestar.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/sintomas">
              <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                  <ClipboardList className="w-8 h-8 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ingresar Síntomas</h3>
                <p className="text-gray-600">
                  Describe tus síntomas y el sistema los analizará con IA
                </p>
              </div>
            </Link>

            <Link href="/analisis">
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
                <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-colors">
                  <Activity className="w-8 h-8 text-purple-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Análisis con IA</h3>
                <p className="text-gray-600">
                  Obtén un análisis detallado de posibles condiciones
                </p>
              </div>
            </Link>

            <Link href="/historial">
              <div className="bg-white border-2 border-green-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
                <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                  <FileText className="w-8 h-8 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Historial</h3>
                <p className="text-gray-600">
                  Consulta tus análisis y recomendaciones anteriores
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Características principales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Interfaz amigable</h4>
                <p className="text-sm text-gray-600">Fácil de usar en dispositivos móviles</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Heart className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Recomendaciones preventivas</h4>
                <p className="text-sm text-gray-600">Consejos personalizados de salud</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Historial de consultas</h4>
                <p className="text-sm text-gray-600">Seguimiento de tu salud</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
