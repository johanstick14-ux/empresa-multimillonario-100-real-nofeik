'use client';

import { ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Historial() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Historial</h1>
              <p className="text-sm text-muted-foreground">Tus análisis anteriores</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader className="text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <CardTitle>Próximamente</CardTitle>
            <CardDescription>
              El historial de consultas estará disponible próximamente
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/sintomas">
              <Button>Realizar Nuevo Análisis</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
