'use client';

import { useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Sintomas() {
  const router = useRouter();
  const [sintomas, setSintomas] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sintomas.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/analizar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Análisis de Síntomas</h1>
              <p className="text-sm text-muted-foreground">Describe tus síntomas para obtener un análisis preliminar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent">
              <CardTitle className="text-xl">Describe tus síntomas</CardTitle>
              <CardDescription>
                Proporciona información detallada sobre lo que estás experimentando
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <Textarea
                value={sintomas}
                onChange={(e) => setSintomas(e.target.value)}
                placeholder="Ejemplo: Tengo dolor de cabeza desde hace 2 días, es moderado y se localiza en la parte frontal. También presento fiebre de 38°C y fatiga..."
                className="min-h-[200px] resize-none border-2 focus:border-primary transition-colors"
                required
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span className="font-medium">{sintomas.length} caracteres</span>
                <span>Mínimo 20 caracteres</span>
              </div>
            </CardContent>
          </Card>

          <Alert className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
            <AlertDescription className="text-sm">
              <strong className="text-primary">Recomendaciones:</strong> Incluye cuándo comenzaron los síntomas, su intensidad (leve, moderada, severa) y cualquier factor que los mejore o empeore.
            </AlertDescription>
          </Alert>

          <div className="flex gap-3">
            <Link href="/dashboard" className="flex-1">
              <Button type="button" variant="outline" className="w-full hover:bg-secondary">
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={loading || sintomas.length < 20}
              className="flex-1 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analizando...
                </>
              ) : (
                'Analizar'
              )}
            </Button>
          </div>

          <Alert className="border-amber-200 bg-gradient-to-br from-amber-50 to-card">
            <AlertDescription className="text-xs text-amber-900">
              Esta herramienta proporciona información orientativa. No reemplaza el diagnóstico médico profesional. En caso de emergencia, contacta servicios médicos inmediatamente.
            </AlertDescription>
          </Alert>
        </form>
      </div>
    </div>
    </ProtectedRoute>
  );
}
