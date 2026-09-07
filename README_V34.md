# Pandalandia V34 — Native Motion Edition

V34 conserva toda la lógica de V33 y refuerza la experiencia de mascota y la sensación de app instalada.

## Cocker
- Capa fotorealista local (sin coste por API).
- Motor de estados para idle, walk, run, play, eat, drink, sit, sleep/rest, pet, bark, pant, sniff, scratch, stretch, lick, wag y clean.
- Caminar y correr desplazan a Mia por la escena; el cuerpo usa micro-movimientos, inclinación, rebote, sombra y cambio de dirección para dar lectura de locomoción.
- Comer/beber usa una escena fotorealista específica.
- Accesorios comprados siguen anclados a cabeza/cara/cuello/cuerpo.
- Respeta `prefers-reduced-motion`.

## Shell de app
- PWA `standalone` con `display_override: fullscreen`.
- `viewport-fit=cover`, safe-area, barra inferior fija en móvil y rail lateral en escritorio.
- Estilos específicos cuando se abre como app instalada.
- No necesita API 3D ni servicio de pago.

## Importante
La representación principal del Cocker sigue siendo híbrida fotorealista 2.5D. La locomoción está implementada en la interfaz y se ve como movimiento por la habitación, pero no es un esqueleto 3D de estudio con articulación ósea cuadro a cuadro. El proyecto queda preparado para sustituir esta capa por un GLB riggeado cuando exista un asset Cocker con licencia adecuada.
