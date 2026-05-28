'use client';

import { Heart, ArrowLeft, Activity, Brain } from 'lucide-react';
import Link from 'next/link';

export default function Analisis() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
              <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Análisis con IA</h1>
                <p className="text-gray-600">Información sobre el proceso</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-8 border-2 border-purple-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-500 p-4 rounded-2xl">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Cómo funciona el análisis</h2>
                <p className="text-gray-600">Tecnología de inteligencia artificial avanzada</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Nuestro sistema utiliza modelos de IA de última generación para analizar tus síntomas 
              y proporcionar información sobre posibles condiciones de salud. El proceso es rápido, 
              seguro y completamente confidencial.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ingreso de Síntomas</h3>
                <p className="text-gray-600">
                  Describes tus síntomas de manera detallada, incluyendo duración, intensidad y 
                  cualquier otro detalle relevante.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Procesamiento con IA</h3>
                <p className="text-gray-600">
                  El sistema analiza tu información utilizando modelos de lenguaje avanzados 
                  entrenados en datos médicos para identificar patrones y posibles condiciones.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Resultados y Recomendaciones</h3>
                <p className="text-gray-600">
                  Recibes un análisis detallado con posibles condiciones, nivel de confianza y 
                  recomendaciones preventivas personalizadas.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-yellow-900 mb-2">Importante</h3>
            <ul className="text-sm text-yellow-800 space-y-2">
              <li>• Este sistema es una herramienta de apoyo, no un sustituto del diagnóstico médico</li>
              <li>• Los resultados son orientativos y deben ser validados por un profesional</li>
              <li>• En caso de emergencia médica, acude inmediatamente a un centro de salud</li>
              <li>• La información proporcionada es confidencial y no se comparte con terceros</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Link href="/sintomas" className="flex-1">
              <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
                Comenzar Análisis
              </button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <button className="w-full px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                Volver al Inicio
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
