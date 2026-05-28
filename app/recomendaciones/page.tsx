'use client';

import { useEffect, useState } from 'react';
import { Heart, ArrowLeft, Lightbulb, AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Recomendaciones() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [recomendaciones, setRecomendaciones] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecomendaciones = async () => {
      const data = localStorage.getItem('analisisResultado');
      if (!data) {
        router.push('/sintomas');
        return;
      }

      setLoading(true);
      try {
        const resultado = JSON.parse(data);
        const response = await fetch('/api/recomendaciones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            enfermedades: resultado.enfermedades,
            sintomas: resultado.sintomas_analizados,
          }),
        });

        const recomendacionesData = await response.json();
        if (response.ok) {
          setRecomendaciones(recomendacionesData.recomendaciones);
        }
      } catch (error) {
        console.error('Error al obtener recomendaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecomendaciones();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Generando recomendaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/resultados">
              <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl">
                <Heart className="w-8 h-8 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Recomendaciones</h1>
                <p className="text-gray-600">Consejos personalizados para tu salud</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-8 flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 mb-1">Recomendaciones Preventivas</h3>
              <p className="text-sm text-green-800">
                Sigue estas recomendaciones para mejorar tu bienestar y prevenir complicaciones.
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {recomendaciones.map((recomendacion, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-white to-green-50 rounded-2xl p-6 border-2 border-green-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-xl flex-shrink-0">
                    <span className="text-2xl font-bold text-green-600">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed">{recomendacion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-8 flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Cuándo buscar atención médica urgente</h3>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Si los síntomas empeoran rápidamente</li>
                <li>• Si experimentas dificultad para respirar</li>
                <li>• Si tienes fiebre muy alta (más de 39.5°C)</li>
                <li>• Si hay sangrado o dolor intenso</li>
                <li>• Si los síntomas no mejoran después de varios días</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Próximos pasos</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  1
                </div>
                <p className="text-gray-700">Sigue las recomendaciones proporcionadas</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  2
                </div>
                <p className="text-gray-700">Monitorea tus síntomas durante los próximos días</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  3
                </div>
                <p className="text-gray-700">Consulta a un médico si los síntomas persisten o empeoran</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/dashboard" className="flex-1">
              <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                Volver al Inicio
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
