# 🏥 Salud IA - Aplicación de Detección Temprana de Enfermedades

Aplicación móvil para detección temprana de enfermedades mediante Inteligencia Artificial.

## 🚀 Características

- ✅ Interfaz moderna y amigable
- ✅ Análisis de síntomas con IA (OpenAI GPT)
- ✅ Recomendaciones preventivas personalizadas
- ✅ Diseño responsive para móviles
- ✅ Sistema de autenticación
- 🔜 Historial de consultas (próximamente)

## 📋 Requisitos Previos

- Node.js 18+ instalado
- pnpm (gestor de paquetes)
- Cuenta de Google con API Key de Gemini (GRATIS)

## 🔧 Instalación

1. **Clonar el repositorio** (si aplica)

2. **Instalar dependencias:**
```bash
pnpm install
```

3. **Configurar variables de entorno:**

Edita el archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
GEMINI_API_KEY=AIzaSyB7a2EV7k9-Ghp7GaD145CUSHsipSsK3JY
```

**IMPORTANTE:** Reemplaza con tu API Key real de Gemini si es diferente.

Para obtener tu API Key GRATIS:
- Ve a https://aistudio.google.com/app/apikey
- Inicia sesión con tu cuenta de Google
- Haz clic en "Create API Key"
- Cópiala y pégala en el archivo `.env`

## 🎯 Uso

1. **Iniciar el servidor de desarrollo:**
```bash
pnpm dev
```

2. **Abrir en el navegador:**
```
http://localhost:3000
```

3. **Flujo de la aplicación:**
   - Inicia sesión o regístrate
   - Accede al Dashboard
   - Ingresa tus síntomas
   - Recibe análisis con IA
   - Consulta recomendaciones preventivas

## 📱 Páginas Principales

- `/dashboard` - Panel principal con acceso a todas las funciones
- `/sintomas` - Formulario para ingresar síntomas
- `/resultados` - Resultados del análisis con IA
- `/recomendaciones` - Recomendaciones preventivas personalizadas
- `/analisis` - Información sobre el proceso de análisis
- `/historial` - Historial de consultas (próximamente)

## 🛠️ Tecnologías Utilizadas

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + TailwindCSS 4
- **IA:** Google Gemini 1.5 Flash (GRATIS)
- **Iconos:** Lucide React
- **Autenticación:** JWT con Jose
- **Base de datos:** PostgreSQL (pg)
- **Lenguaje:** TypeScript

## 🔐 Seguridad

- Las API Keys nunca deben compartirse públicamente
- El archivo `.env` está en `.gitignore` para evitar exposición
- La autenticación usa tokens JWT seguros
- Los datos de síntomas no se almacenan permanentemente (por ahora)

## ⚠️ Disclaimer Médico

Esta aplicación es solo para fines informativos y educativos. No reemplaza el diagnóstico médico profesional. Si tienes síntomas graves o persistentes, consulta a un médico inmediatamente.

## 📝 Notas de Desarrollo

- El modelo de IA usado es `gemini-1.5-flash` (GRATIS y rápido)
- **15 solicitudes por minuto** y **1,500 por día** en el tier gratuito
- Los resultados se almacenan temporalmente en `localStorage`
- La aplicación está optimizada para dispositivos móviles
- El historial de consultas requiere implementación de base de datos

## 🚧 Próximas Funcionalidades

- [ ] Historial completo de consultas
- [ ] Exportación de reportes en PDF
- [ ] Gráficos de evolución de síntomas
- [ ] Notificaciones y recordatorios
- [ ] Integración con wearables
- [ ] Compartir resultados con médicos

## 📞 Soporte

Para problemas o preguntas:
1. Verifica que tu API Key de Gemini esté configurada correctamente en `.env`
2. Asegúrate de que la variable se llame `GEMINI_API_KEY`
3. Reinicia el servidor después de configurar la API Key
4. Revisa la consola del navegador para errores

## 💰 Ventajas de Gemini

- ✅ **100% GRATIS** para empezar (no requiere tarjeta de crédito)
- ✅ 15 solicitudes por minuto
- ✅ 1,500 solicitudes por día
- ✅ Modelo rápido y preciso (Gemini 1.5 Flash)
- ✅ Perfecto para desarrollo y uso personal

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
