# Validación V25

- `public/models/pets/cocker.glb`: incluido localmente.
- GLB reemplazado por nueva geometría Cocker con partes nombradas compatibles con el motor V24.
- PBR/runtime, sonidos y UX móvil preservados.
- Sin migración SQL nueva.
- ZIP validado con `unzip -t`.
- Build completo de Next.js: debe validarse en Vercel porque este entorno no incluye `node_modules` del proyecto.
