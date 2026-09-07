# Pandalandia V32 — Native App + Cocker Real-Coat

V32 is a visual-production pass over V31.

- The whole authenticated product uses one app-first design system on mobile: Inicio, Mi espacio, Jugar, Juntos, Mundo and Ajustes.
- Mobile navigation is a floating safe-area tab bar; screens are edge-to-edge and no longer desktop cards compressed into a phone.
- Mundo is presented as a game scene with floating glass HUD and compact care controls.
- The Cocker keeps the user's full HD sculpt when the device can handle it. Because the STL has no UVs, V32 uses object-space layered coat shading rather than stretching a fake bitmap over the mesh.
- Accessories retain differentiated textile/metal/glossy physical materials.
- No database migration is required from V31.

## Important asset limitation
The supplied Cocker STL meshes are static sculpts: no UV map, skeleton, skin weights or animation clips. V32 materially improves rendering, but true articulated photoreal animation still requires a professionally rigged/textured Cocker asset.
