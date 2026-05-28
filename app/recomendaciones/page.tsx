'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Lightbulb, AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Recomendaciones() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [recomendaciones, setRecomendaciones] = useState<string[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('analisisResultado');
    if (!data) {
      router.push('/sintomas');
      return;
    }

    try {
      const resultado = JSON.parse(data);
      if (resultado.recomendaciones && Array.isArray(resultado.recomendaciones)) {
        setRecomendaciones(resultado.recomendaciones);
      } else {
        // Si no hay recomendaciones en el resultado, mostrar mensaje
        setRecomendaciones([]);
      }
    } catch (error) {
      console.error('Error al cargar recomendaciones:', error);
      router.push('/sintomas');
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Generando recomendaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/resultados">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Recomendaciones</h1>
              <p className="text-sm text-muted-foreground">Consejos personalizados de salud</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              Recomendaciones Preventivas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recomendaciones.map((recomendacion, index) => (
              <div key={index} className="flex gap-4 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/20 hover:border-primary/40 transition-all hover:shadow-md">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{recomendacion}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Cuándo buscar atención médica urgente</AlertTitle>
          <AlertDescription className="text-xs space-y-1 mt-2">
            <p>• Si los síntomas empeoran rápidamente</p>
            <p>• Si experimentas dificultad para respirar</p>
            <p>• Si tienes fiebre muy alta (más de 39.5°C)</p>
            <p>• Si hay sangrado o dolor intenso</p>
          </AlertDescription>
        </Alert>

        <div className="flex gap-3">
          <Link href="/dashboard" className="flex-1">
            <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </Button>
          </Link>
          <Link href="/sintomas" className="flex-1">
            <Button variant="outline" className="w-full hover:bg-secondary">
              Nuevo Análisis
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
