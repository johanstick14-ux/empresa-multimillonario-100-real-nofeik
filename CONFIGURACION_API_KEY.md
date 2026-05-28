# 🔑 Configuración de API Key de OpenAI

## Pasos para configurar tu API Key:

### 1. Obtener tu API Key de OpenAI

1. Ve a https://platform.openai.com/api-keys
2. Inicia sesión con tu cuenta de OpenAI (o crea una si no tienes)
3. Haz clic en "Create new secret key"
4. Dale un nombre a tu key (ejemplo: "Salud-IA-App")
5. Copia la API Key generada (solo se muestra una vez)

### 2. Configurar el archivo .env

1. En la raíz del proyecto, edita el archivo `.env`
2. Agrega la siguiente línea:

```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. Reemplaza `sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` con tu API Key real
4. Guarda el archivo

### 3. Verificar la configuración

El archivo `.env` debe verse así:

```env
OPENAI_API_KEY=tu_api_key_real_aqui
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

### Error: "API Key de OpenAI no configurada"
- Verifica que el archivo `.env` existe en la raíz del proyecto
- Asegúrate de que la variable se llama exactamente `OPENAI_API_KEY`
- Reinicia el servidor de desarrollo

### Error: "API Key de OpenAI inválida"
- Verifica que copiaste la API Key completa
- Asegúrate de que no hay espacios antes o después de la key
- Verifica que tu cuenta de OpenAI tenga créditos disponibles

### Error: "Insufficient quota"
- Tu cuenta de OpenAI no tiene créditos suficientes
- Ve a https://platform.openai.com/account/billing
- Agrega un método de pago o compra créditos

## 💰 Costos

El modelo usado es `gpt-4o-mini`, que es muy económico:
- Aproximadamente $0.00015 por análisis
- Con $5 USD puedes hacer ~33,000 análisis

## 🔒 Seguridad

- El archivo `.env` está en `.gitignore` automáticamente
- La API Key solo se usa en el servidor (API Routes)
- Nunca se expone al cliente/navegador
- Mantén tu API Key privada siempre
