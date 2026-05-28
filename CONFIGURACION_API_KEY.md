# 🔑 Configuración de API Key de Google Gemini

## Pasos para configurar tu API Key:

### 1. Obtener tu API Key de Google Gemini

1. Ve a https://aistudio.google.com/app/apikey
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Create API Key"
4. Selecciona un proyecto de Google Cloud (o crea uno nuevo)
5. Copia la API Key generada

### 2. Configurar el archivo .env

1. En la raíz del proyecto, edita el archivo `.env`
2. Agrega la siguiente línea:

```
GEMINI_API_KEY=AIzaSyB7a2EV7k9-Ghp7GaD145CUSHsipSsK3JY
```

3. Reemplaza con tu API Key real si es diferente
4. Guarda el archivo

### 3. Verificar la configuración

El archivo `.env` debe verse así:

```env
GEMINI_API_KEY=AIzaSyB7a2EV7k9-Ghp7GaD145CUSHsipSsK3JY
```

**IMPORTANTE:** 
- Nunca compartas tu API Key públicamente
- No subas el archivo `.env` a GitHub (ya está en `.gitignore`)
- Mantén tu API Key segura y privada

### 4. Reiniciar el servidor

Si el servidor de desarrollo está corriendo, reinícialo:

```bash
# Detener el servidor (Ctrl + C)
# Iniciar nuevamente
pnpm dev
```

### 5. Probar la aplicación

1. Abre http://localhost:3000
2. Inicia sesión
3. Ve a "Ingresar Síntomas"
4. Escribe algunos síntomas de prueba
5. Haz clic en "Analizar con IA"

Si todo está configurado correctamente, deberías ver los resultados del análisis.

## ⚠️ Solución de Problemas

### Error: "API Key de Gemini no configurada"
- Verifica que el archivo `.env` existe en la raíz del proyecto
- Asegúrate de que la variable se llama exactamente `GEMINI_API_KEY`
- Reinicia el servidor de desarrollo

### Error: "API Key de Gemini inválida"
- Verifica que copiaste la API Key completa
- Asegúrate de que no hay espacios antes o después de la key
- Verifica que la API Key esté activa en Google AI Studio

### Error: "Quota exceeded"
- Has alcanzado el límite de solicitudes gratuitas
- Espera unos minutos o considera actualizar tu plan

## 💰 Costos

**¡GRATIS!** Google Gemini ofrece un tier gratuito muy generoso:
- **Gemini 1.5 Flash**: 15 solicitudes por minuto GRATIS
- 1,500 solicitudes por día GRATIS
- Perfecto para desarrollo y uso personal
- No requiere tarjeta de crédito para empezar

## 🔒 Seguridad

- El archivo `.env` está en `.gitignore` automáticamente
- La API Key solo se usa en el servidor (API Routes)
- Nunca se expone al cliente/navegador
- Mantén tu API Key privada siempre
