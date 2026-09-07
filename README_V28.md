# Pandalandia V28 — Native App Experience

V28 reconstruye la experiencia móvil para que Pandalandia se comporte visualmente como una app y no como una página web.

## Cambios principales
- Shell móvil edge-to-edge; se oculta la cabecera web en pantallas móviles.
- Navegación inferior tipo app con safe-area de iPhone.
- Mundo remaquetado como pantalla nativa: escena full-bleed, HUD compacto y acciones rápidas.
- Cámara 3D recalculada por aspect ratio para mantener a la mascota completa dentro del encuadre.
- Layout específico para landscape, tablet y desktop.
- PWA/iOS standalone metadata reforzada.
- El canvas 3D no captura el gesto vertical de scroll.

## Archivo 3D aportado por el usuario
`3dpea.com_ai-generated-8657525_640.zip` fue inspeccionado: contiene una malla GLTF de ~484k triángulos y una textura, pero no tiene rig ni animaciones. Además es esencialmente un relieve derivado de una imagen (profundidad muy pequeña respecto a ancho/alto), por lo que no reemplaza al Cocker animado. Se usa únicamente como referencia visual.

## Base de datos
No requiere migración SQL nueva viniendo de V27.
