'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, AlertCircle, Info } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando resultados...</p>
        </div>
      </div>
    );
  }

  return (
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
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Resultados del Análisis</h1>
              <p className="text-sm text-muted-foreground">Análisis completado</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Info className="h-5 w-5 text-primary" />
              </div>
              Síntomas Analizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{resultado.sintomas_analizados}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
              Posibles Condiciones
            </CardTitle>
            <CardDescription className="font-medium">Nivel de confianza: {resultado.probabilidad}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {resultado.enfermedades.map((enfermedad, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-sm font-medium">{enfermedad}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent">
            <CardTitle>Análisis Detallado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {resultado.analisis_completo}
            </p>
          </CardContent>
        </Card>

        <Alert>
          <AlertTitle>Importante</AlertTitle>
          <AlertDescription className="text-xs">
            Estos resultados son orientativos y generados por IA. No constituyen un diagnóstico médico. Si tus síntomas persisten o empeoran, consulta a un profesional de la salud.
          </AlertDescription>
        </Alert>

        <div className="flex gap-3">
          <Link href="/recomendaciones" className="flex-1">
            <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
              Ver Recomendaciones
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
  );
}
