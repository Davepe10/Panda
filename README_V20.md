# Pandalandia V20 — Cocker local incluido

V20 incluye físicamente `public/models/pets/cocker.glb` dentro del proyecto. Al desplegar en Vercel no hay que descargar ni copiar un modelo aparte.

## Cocker y comportamientos
- Cocker Spaniel local GLB con silueta de orejas largas, hocico, pecho, patas, cola, ojos, collar y lengua como nodos independientes.
- El motor V20 anima por código cabeza, orejas, cola, lengua y patas incluso si el GLB no incluye clips embebidos.
- Acciones: idle, caminar, correr, sentarse/dormir mediante comportamiento general, comer, beber, jugar, ladrar, jadear/sacar la lengua, lamer, olfatear, rascarse, estirarse y mover la cola.
- Caminar/correr mueve las cuatro patas y desplaza suavemente a la mascota.
- Jadear/lamer/comer/beber muestran y animan la lengua.
- Feliz/jugar/acariciar/ladrar mueven la cola.
- Olfatear y ladrar animan la cabeza; las orejas tienen movimiento secundario.

## Despliegue
Si V16 ya quedó migrada en Supabase, V20 no necesita SQL nuevo. Reemplaza el código por V20, haz push a `main` y deja que Vercel construya el proyecto.

## Nota visual
El GLB incluido es un asset propio del proyecto generado para Pandalandia y optimizado para web/móvil. No depende de un marketplace ni de una URL temporal. La arquitectura sigue aceptando un GLB PBR/rigged de mayor detalle en la misma ruta en el futuro sin cambiar la lógica del juego.
