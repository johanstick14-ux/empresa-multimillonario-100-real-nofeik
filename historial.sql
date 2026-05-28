-- Tabla para guardar el historial de análisis por usuario
CREATE TABLE historial (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  sintomas TEXT NOT NULL,
  enfermedades JSONB NOT NULL,
  probabilidad TEXT NOT NULL,
  analisis_completo TEXT NOT NULL,
  recomendaciones JSONB,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas rápidas por usuario
CREATE INDEX idx_historial_usuario ON historial(usuario_id);
CREATE INDEX idx_historial_fecha ON historial(fecha_creacion DESC);
