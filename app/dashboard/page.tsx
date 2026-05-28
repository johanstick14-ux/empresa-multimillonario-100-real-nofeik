'use client';

import { Activity, FileText, ArrowRight, Sparkles, Shield, Clock, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('token');
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Salud IA
                </h1>
                <p className="text-sm text-muted-foreground">Análisis médico con inteligencia artificial</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">Bienvenido a tu asistente de salud</h2>
          <p className="text-muted-foreground">
            Describe tus síntomas para recibir un análisis preliminar y recomendaciones personalizadas de salud.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <Link href="/sintomas" className="group">
            <Card className="h-full transition-all hover:shadow-xl hover:-translate-y-1 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-primary/5 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:scale-110 transition-all">
                    <Activity className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-2 group-hover:text-primary transition-all" />
                </div>
                <CardTitle className="text-2xl">Nuevo Análisis</CardTitle>
                <CardDescription className="text-base">
                  Ingresa tus síntomas para obtener un análisis detallado con IA
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/historial" className="group">
            <Card className="h-full transition-all hover:shadow-xl hover:-translate-y-1 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-secondary/30 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/30 rounded-full -mr-16 -mt-16" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-secondary rounded-xl group-hover:bg-primary group-hover:scale-110 transition-all">
                    <FileText className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-2 group-hover:text-primary transition-all" />
                </div>
                <CardTitle className="text-2xl">Historial</CardTitle>
                <CardDescription className="text-base">
                  Consulta y revisa tus análisis anteriores
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Análisis con IA</h3>
                  <p className="text-sm text-muted-foreground">Tecnología avanzada de procesamiento de lenguaje natural</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Información Confiable</h3>
                  <p className="text-sm text-muted-foreground">Basado en conocimiento médico actualizado</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Respuesta Rápida</h3>
                  <p className="text-sm text-muted-foreground">Obtén resultados en segundos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-amber-600" />
              Información importante
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Esta herramienta proporciona información orientativa basada en IA</p>
            <p>• No reemplaza el diagnóstico médico profesional</p>
            <p>• En caso de emergencia, contacta servicios médicos inmediatamente</p>
          </CardContent>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  );
}
