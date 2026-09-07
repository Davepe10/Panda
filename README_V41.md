# Pandalandia V41

## Qué cambia
- Mia usa directamente el STL de 300.000 triángulos subido por el usuario:
  `public/models/pets/cocker-user-300k.stl`.
- El Cocker procedural deja de ser el renderer principal del tipo `cocker`.
- Nuevo renderer `CockerUser300K.tsx` con STLLoader, normales recalculadas, PBR, sombras y habitación 3D.
- El STL no tiene esqueleto/rig. Las acciones actuales animan el modelo completo de forma segura; no se afirma que tenga articulación esquelética.
- Paquete de audio rehecho para que ladrido, olfateo, jadeo, lamido, comer, beber, jugar y sacudirse sean claramente diferentes.
- Los nuevos WAV son SFX locales generados y diferenciados; no se etiquetan como grabaciones reales de perro.
- Refuerzo global de legibilidad/contraste y barra móvil algo más compacta.
- Sin migración SQL nueva.
