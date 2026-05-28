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
- Cuenta de OpenAI con API Key

## 🔧 Instalación

1. **Clonar el repositorio** (si aplica)

2. **Instalar dependencias:**
```bash
pnpm install
```

3. **Configurar variables de entorno:**

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
OPENAI_API_KEY=tu_api_key_aqui
```

**IMPORTANTE:** Reemplaza `tu_api_key_aqui` con tu API Key real de OpenAI.

Para obtener tu API Key:
- Ve a https://platform.openai.com/api-keys
- Inicia sesión o crea una cuenta
- Genera una nueva API Key
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
- **IA:** OpenAI API (GPT-4o-mini)
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

- El modelo de IA usado es `gpt-4o-mini` (más económico y rápido)
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
1. Verifica que tu API Key de OpenAI esté configurada correctamente
2. Asegúrate de tener créditos en tu cuenta de OpenAI
3. Revisa la consola del navegador para errores

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
