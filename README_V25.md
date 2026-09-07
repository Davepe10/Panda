# Pandalandia V25 — Cocker Anatomy Realism

- Sustituye por completo el GLB anterior por un nuevo Cocker local de mayor detalle y proporciones más cercanas a un English Cocker Spaniel.
- Silueta revisada: torso, pecho, hocico, ojos, patas, orejas largas y plumaje característico.
- Más detalle geométrico en orejas, pecho, vientre, cola y cabeza sin texturas 4K.
- Mantiene el motor PBR, acciones, sonidos, tienda, ropa/disfraces, monedas, XP y habitación de V24.
- El archivo sigue local en `public/models/pets/cocker.glb`; no depende de un CDN.
- No requiere SQL nuevo desde V23/V24.

## Rendimiento
El modelo está diseñado para tiempo real móvil: ~20–30 mil triángulos, materiales PBR compartidos por el runtime y el DPR móvil continúa limitado.

## Alcance visual
Es un modelo game-realistic optimizado para web móvil. No usa hair strands/fur cards densos ni texturas 4K, porque eso perjudicaría el rendimiento en iPhone. El pelaje largo se representa mediante geometría de feathering y materiales PBR.
