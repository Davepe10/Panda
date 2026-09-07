# Pandalandia V15 · Pet World Premium

Versión basada en V14 con mejora completa del render 3D de mascotas y habitación. No requiere SQL adicional si la base ya está migrada desde V8 a V9.

# Pandalandia V14 — Wallet Fix

V14 conserva todo lo de V13 y corrige la visualización de monedas/XP para que un fallo de lectura no se muestre falsamente como 0. Agrega estado de carga/error, reintento y actualización Realtime del wallet. No reinicia ni modifica saldos en Supabase. No requiere SQL adicional sobre V9.

# Pandalandia 10.0

Aplicación privada para dos con juegos asincrónicos, 1 vs 1, cooperativos, juegos individuales y mundo/mascota compartida.

## Cambios V10
- Branding visible: **Pandalandia**.
- Los estados de turno muestran el nombre real del otro miembro (`memberships.display_name`).
- Nuevos usuarios deben escribir su nombre en onboarding.
- Se mantiene el PlayHub visual de V9 y se pule la identidad panda.
- Bancos de contenido ampliados a **3,200 entradas por banco** en todos los juegos que dependen de preguntas/cartas/palabras.
- No se inventan recuerdos personales de la pareja.

## Si ya estás en V9
No necesitas ejecutar SQL nuevo. Reemplaza el proyecto por esta V10 y haz push a GitHub. Vercel desplegará automáticamente.

## Si vienes de V8
Primero ejecuta la migración V8→V9 incluida en `supabase/MIGRAR_DESDE_V8_A_V9.sql`; después sube V10. V10 no agrega cambios de base de datos.

## Validación
Ver `IMPLEMENTATION_AUDIT_V10.md` y `VALIDATION_REPORT_V10.md`.
