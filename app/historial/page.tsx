'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/ProtectedRoute';

interface HistorialItem {
  id: number;
  sintomas: string;
  enfermedades: string[];
  probabilidad: string;
  analisis_completo: string;
  fecha_creacion: string;
}

export default function Historial() {
  const [historial, setHistorial] = useState<HistorialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/historial', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setHistorial(data.historial.map((item: any) => ({
            ...item,
            enfermedades: typeof item.enfermedades === 'string' 
              ? JSON.parse(item.enfermedades) 
              : item.enfermedades
          })));
        }
      } catch (error) {
        console.error('Error al cargar historial:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, []);

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Historial</h1>
              <p className="text-sm text-muted-foreground">Tus análisis anteriores</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando historial...</p>
          </div>
        ) : historial.length === 0 ? (
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <CardTitle>No hay análisis guardados</CardTitle>
              <CardDescription>
                Realiza tu primer análisis para comenzar tu historial
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/sintomas">
                <Button className="bg-primary hover:bg-primary/90">Realizar Nuevo Análisis</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {historial.map((item) => (
              <Card key={item.id} className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">
                        Análisis del {new Date(item.fecha_creacion).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {item.sintomas}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Posibles condiciones:</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.enfermedades.map((enfermedad, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {enfermedad}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <strong>Probabilidad:</strong> {item.probabilidad}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
