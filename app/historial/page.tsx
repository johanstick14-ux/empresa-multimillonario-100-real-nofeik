'use client';

import { Heart, ArrowLeft, FileText, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Historial() {
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
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Historial de Consultas</h1>
                <p className="text-gray-600">Tus análisis anteriores</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg text-center">
            <Calendar className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Próximamente</h3>
            <p className="text-gray-600 mb-4">
              El historial de consultas estará disponible próximamente. Aquí podrás ver todos tus análisis anteriores y hacer seguimiento de tu salud.
            </p>
            <Link href="/sintomas">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all">
                Realizar Nuevo Análisis
              </button>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-2">Funcionalidades futuras:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Historial completo de análisis</li>
                <li>• Exportar reportes en PDF</li>
                <li>• Gráficos de evolución</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
              <h4 className="font-semibold text-gray-800 mb-2">Seguimiento:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Monitoreo de síntomas</li>
                <li>• Alertas personalizadas</li>
                <li>• Recordatorios de salud</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
              <h4 className="font-semibold text-gray-800 mb-2">Integración:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Compartir con médicos</li>
                <li>• Sincronización en la nube</li>
                <li>• Acceso multiplataforma</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
