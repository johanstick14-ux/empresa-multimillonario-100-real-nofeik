'use client';

import { useState } from 'react';
import { Heart, ArrowLeft, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sintomas() {
  const router = useRouter();
  const [sintomas, setSintomas] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sintomas.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/analizar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sintomas }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('analisisResultado', JSON.stringify(data));
        router.push('/resultados');
      } else {
        alert('Error al analizar síntomas: ' + data.error);
      }
    } catch (error) {
      alert('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
              <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                <Heart className="w-8 h-8 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Ingreso de Síntomas</h1>
                <p className="text-gray-600">Describe tus síntomas detalladamente</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Instrucciones:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Describe tus síntomas de manera clara y detallada</li>
              <li>• Incluye cuándo comenzaron los síntomas</li>
              <li>• Menciona la intensidad (leve, moderada, severa)</li>
              <li>• Indica si hay otros síntomas relacionados</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">
                Describe tus síntomas:
              </label>
              <textarea
                value={sintomas}
                onChange={(e) => setSintomas(e.target.value)}
                className="w-full h-64 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                placeholder="Ejemplo: Tengo dolor de cabeza desde hace 2 días, es un dolor moderado en la parte frontal. También tengo un poco de fiebre (38°C) y me siento cansado..."
                required
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  {sintomas.length} caracteres
                </span>
                <span className="text-sm text-gray-500">
                  Mínimo 20 caracteres
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/dashboard" className="flex-1">
                <button
                  type="button"
                  className="w-full px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </Link>
              <button
                type="submit"
                disabled={loading || sintomas.length < 20}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analizando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Analizar con IA
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Nota importante:</strong> Esta herramienta es solo para fines informativos y educativos. 
              No reemplaza el diagnóstico médico profesional. Si tus síntomas son graves o persistentes, 
              consulta a un médico inmediatamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
