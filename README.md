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
