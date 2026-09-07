# Pandalandia V21 — Cocker PBR Performance

V21 mejora el Cocker local de V20 con un pipeline PBR en tiempo real sin añadir modelos pesados ni texturas 4K.

## Qué cambia
- Materiales `MeshPhysicalMaterial` específicos para pelaje, pelo claro/oscuro, ojos, iris, nariz, boca, lengua, collar y placa.
- Pelaje con sheen físico, variación por zonas y roughness controlado.
- Ojos/nariz con clearcoat e IOR para reflejos más naturales.
- Placa metálica y collar con respuesta física diferenciada.
- Normales suaves calculadas una sola vez si el GLB no las trae.
- Iluminación ambiental PBR local generada con `RoomEnvironment + PMREM`, sin descargas externas.
- Se conserva el GLB local `public/models/pets/cocker.glb` y todo el motor de comportamientos V20.

## Rendimiento
- No se agregan texturas 2K/4K, nuevas mallas ni llamadas de red.
- Los materiales PBR son compartidos por clase de superficie para evitar materiales duplicados.
- PMREM se genera una vez por escena.
- DPR máximo de la habitación queda limitado a 1.55 para compensar el coste del sombreado físico en móviles.
- Geometría y cantidad de draw calls del Cocker permanecen esencialmente iguales a V20.

## Base de datos
No requiere SQL nuevo respecto de V20/V16.
