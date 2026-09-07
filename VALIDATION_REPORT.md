# Validation report — V9

`npm run validate:static` → **OK V9**

Verificado automáticamente:
- 25 juegos de pareja + 8 individuales.
- Restricción de una sola partida activa por juego.
- Reutilización server-side de sesión existente.
- Migración de duplicados y estado legado V8.
- Rondas múltiples y condiciones de finalización.
- Banco ampliado y selección anti-repetición reciente.
- Clasificación 1 vs 1 / cooperativo / por turnos / en vivo / solo.
- Hub gaming V9.
- Pet Life 3D y sexo de mascota conservados.
- Economía individual con límites anti-farmeo.

No se afirma `next build` local porque este entorno no tiene `node_modules`; Vercel debe confirmar el build real.
