# Pandalandia V13 — revisión de juegos

## Correcciones principales
- Trivia individual ya no usa 5 preguntas fijas: cada partida toma 5 preguntas aleatorias y únicas del banco completo.
- Feedback inmediato en trivia individual: correcto/incorrecto, opción correcta y revisión final de errores.
- Trivia cooperativa y versus muestran, cuando ambos respondieron, qué contestó cada uno y cuál era la respuesta correcta.
- Se ocultan los sufijos internos `#123` de las preguntas en pantalla.
- Palabras revueltas dejó de repetir siempre las mismas 5 palabras y ahora da feedback correcto/incorrecto.
- Dibuja y adivina, Código secreto y Cadena evitan reutilizar contenido de las últimas partidas terminadas cuando hay alternativas disponibles.

## Auditoría funcional
Se revisó el enrutamiento de los 25 juegos de pareja y 8 individuales. Los juegos de contenido usan bancos/persistencia; los arcade usan estado procedural o Realtime. No se cambió la estructura SQL de V9/V10/V11/V12.

## Base de datos
V13 no requiere SQL adicional si ya se ejecutó `MIGRAR_DESDE_V8_A_V9.sql`.
