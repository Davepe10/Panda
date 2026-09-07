# Auditoría de implementación — Nosotros V9

## Resultado

**APLICADO en código y migración:**

1. Una sola partida activa por juego y pareja.
2. Limpieza de duplicados V8 conservando la más reciente.
3. `start_game_session` reutiliza la sesión existente y además está protegido por índice único parcial contra doble clic, dos pestañas o dos celulares.
4. No existe botón Nueva dentro de una partida activa.
5. Revancha aparece después de finalizar.
6. ¿Cuánto me conoces? = 5 rondas persistentes dentro de la misma sesión.
7. Mentes conectadas = 5, ¿Qué elegirías? = 5, ¿Quién es más probable? = 5, Esto o aquello = 8, Trivia = 7, Cadena = 10 turnos.
8. Progreso visible `Pregunta X de Y`.
9. Cuando ambos responden una ronda, el frontend calcula la siguiente ronda automáticamente usando los turnos guardados; no crea una sesión nueva.
10. Preguntas/índices se guardan en `game_sessions.state`; recargar no cambia la partida.
11. Nueva sesión intenta excluir índices usados en las últimas partidas finalizadas.
12. Banco de ¿Cuánto me conoces? ampliado a 40 preguntas genéricas, sin recuerdos inventados.
13. 1 vs 1 identificado explícitamente (Trivia Versus, Reaction Duel, Pong Duo, Air Hockey, Turbo Race y ¿Cuánto me conoces?).
14. Cooperativos identificados explícitamente.
15. 8 juegos individuales permanecen disponibles y recompensan moneda/XP con límites anti-farmeo.
16. Hub visual rediseñado como zona de juegos: hero, recursos, categorías, continuar partida, tarjetas grandes y centro de turnos.
17. Avisos de turno visuales + sonido/vibración opcionales con la app conectada.
18. Pet Life 3D, sexo de mascota, cuidados y economía permanecen intactos.

## Validaciones ejecutadas

- `npm run validate:static`: **OK**.
- Comprobación TypeScript de sintaxis sobre `GamesHub.tsx` con `tsc --noResolve`: sin errores de parseo detectados (los módulos React/Next no están instalados en este entorno).
- `node --check scripts/validate-project.mjs`: **OK**.
- Validaciones específicas de SQL/RPC y marcadores V9 incluidas en `scripts/validate-project.mjs`.

## Validación pendiente del entorno real

El entorno de generación no contiene `node_modules`, por lo que no se marca como probado un `next build` real. La validación final de dependencias/Next.js debe ser el build verde de Vercel después del push.
