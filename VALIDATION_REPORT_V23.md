# Validation V23

- 16 disfraces originales presentes en catálogo, renderer 3D y migración SQL.
- Compatibilidad de género: los wearables no filtran por `pet_sex`; funcionan con male, female y unspecified.
- Cocker local confirmado en `public/models/pets/cocker.glb` con cabecera GLB válida.
- Migración V22→V23 no elimina progreso y amplía los RPC server-side de compra/equipamiento.
- No se ejecutó build completo de Next en este entorno porque no hay `node_modules`; Vercel realiza la validación final de producción.
