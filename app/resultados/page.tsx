'use client';

import { useEffect, useState } from 'react';
import { Heart, ArrowLeft, AlertCircle, CheckCircle, Info, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AnalisisResultado {
  enfermedades: string[];
  probabilidad: string;
  sintomas_analizados: string;
  analisis_completo: string;
}

export default function Resultados() {
  const router = useRouter();
  const [resultado, setResultado] = useState<AnalisisResultado | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('analisisResultado');
    if (data) {
      setResultado(JSON.parse(data));
    } else {
      router.push('/sintomas');
    }
  }, [router]);

  if (!resultado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando resultados...</p>
        </div>
      </div>
    );
  }

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
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Resultados del Análisis</h1>
                <p className="text-gray-600">Análisis completado con IA</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-6 flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 mb-1">Análisis completado</h3>
              <p className="text-sm text-green-800">
                El sistema ha procesado tus síntomas y generado recomendaciones.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">Síntomas Analizados</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{resultado.sintomas_analizados}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-800">Posibles Condiciones</h2>
              </div>
              <div className="space-y-2">
                {resultado.enfermedades.map((enfermedad, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Heart className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-800 font-medium">{enfermedad}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  <strong>Nivel de confianza:</strong> {resultado.probabilidad}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-800">Análisis Detallado</h2>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {resultado.analisis_completo}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Importante:</strong> Estos resultados son orientativos y generados por IA. 
              No constituyen un diagnóstico médico. Si tus síntomas persisten o empeoran, 
              consulta a un profesional de la salud.
            </p>
          </div>

          <div className="flex gap-4 mt-8">
            <Link href="/recomendaciones" className="flex-1">
              <button className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">
                Ver Recomendaciones
              </button>
            </Link>
            <Link href="/sintomas" className="flex-1">
              <button className="w-full px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                Nuevo Análisis
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
