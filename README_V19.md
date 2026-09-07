# Pandalandia V19 — Cocker Behavior Engine

## Qué agrega
- Motor de comportamiento para mascotas 3D riggeadas GLB/GLTF.
- Transiciones de clips por intención: idle, walk, run, sit, sleep, eat, drink, play, bark, pant, lick, sniff, scratch, stretch y wag.
- Comportamientos autónomos cada varios segundos cuando la mascota está en la pantalla principal.
- Acciones manuales sin costo para perros: Caminar, Ladrar, Lengua, Olfatear, Rascarse, Estirarse, Lamerse y Colita.
- Las acciones de cuidado existentes ahora disparan animaciones coherentes: Comer→eat, Agua→drink, Jugar→play, Acariciar→wag, Dormir→sleep.
- Lengua sintética de respaldo para pant/lick/eat/drink si el rig no tiene lengua/blendshape propio.
- El motor busca nombres equivalentes de clips y cae a la animación disponible más cercana cuando un GLB usa otros nombres.

## Cocker exacto
El código busca el modelo exacto en `public/models/pets/cocker.glb`.

No se incluye un modelo comercial/de marketplace sin una licencia explícita de redistribución. Si ese archivo no existe o falla, la app usa automáticamente el Cocker procedural anterior como fallback y no rompe la pantalla.

Para un Cocker realmente realista, coloca un `cocker.glb` riggeado y con licencia compatible en esa ruta. No requiere cambiar el código.

## Base de datos
No agrega SQL nuevo. Mantiene la migración V15→V16 existente.
