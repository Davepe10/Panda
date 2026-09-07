# Pandalandia V18 — Rigged Pet Engine

V18 introduce un pipeline real GLTF/GLB sobre React Three Fiber. Shiba usa un rig Shiba Inu GLTF CC0 de Quaternius; Cocker usa temporalmente un rig canino Husky CC0 como base anatómica animada; Capibara usa un rig de marmota CC0 como base roedora. Panda conserva el modelo procedural premium hasta disponer de un panda rigged redistribuible con calidad suficiente.

El cargador normaliza escala y posición, clona esqueletos de forma segura, reproduce clips reales, activa sombras, conserva ropa/accesorios y vuelve automáticamente al modelo procedural si falla un asset externo. No cambia Supabase ni requiere SQL adicional sobre V16.

## Licencias
- Quaternius Ultimate Animated Animals: CC0 1.0 Universal.
- Gobkit Free Animals: CC0 1.0 Universal.

Los assets se cargan desde las URLs públicas de sus proveedores para evitar inflar el bundle y mantener la actualización simple.
