# Pandalandia V15 · Pet World Premium

## Implementado
- Mascotas 3D reconstruidas con geometría de mayor definición, materiales físicos, brillo ocular/corneal, hocico y patas detalladas, collar y acabado de pelaje por capas.
- Panda, Cocker, Shiba y Capibara conservan sus especies y estados existentes.
- Animación idle mejorada: respiración, oscilación sutil, mirada que sigue el puntero/tacto y reacción al tocar la mascota.
- Estados sueño, enfermedad y suciedad siguen siendo visibles.
- Habitación premium con ventana, cortinas, iluminación suave, sombras y ciclo visual día/noche según hora local.
- Render ACES Filmic y sombras PCF suaves, con DPR limitado para mantener rendimiento móvil.
- Decoraciones y objetos existentes siguen funcionando.
- No se modificó Supabase, monedas, XP, lógica de juegos, trivia ni reglas del mundo.
- No requiere SQL adicional sobre V14/V9.

## Rendimiento
El render sigue siendo procedural: no se añadieron GLB, texturas externas ni descargas pesadas. Esto evita aumentar el tamaño del proyecto y mantiene el objetivo de S/0.
