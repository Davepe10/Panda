# Pandalandia V33 — Native App + Cocker Realism

V33 replaces the distorted Cocker STL as the default Cocker presentation with a bundled photoreal scene and keeps the existing 3D engine for the other pets. The Cocker layer is local/offline and therefore costs S/0 at runtime.

## What changed
- Photoreal Cocker scene for home/play/feed states (local WebP assets).
- Existing pet behavior/state, economy, Supabase persistence and actions are preserved.
- Equipped wearables are now represented as anchored visual layers over the realistic Cocker.
- Mobile shell redesigned as an installed-app surface: no website header, edge-to-edge pet scene, glass HUD, bottom native-style tab bar, safe-area support.
- Desktop shell uses a compact app rail instead of a traditional website header.
- PWA remains standalone-capable; when added to Home Screen, iOS/Android browser chrome is removed by the OS.

## Cost
No paid runtime service or paid asset was added. Supabase/Vercel remain as configured by the project.

## Important
A normal Safari/Chrome tab always belongs to the browser and may show browser UI. To get the true app-like full-screen experience, add Pandalandia to the Home Screen and launch it from the icon.

## Visual source note
The bundled photoreal Cocker scene is derived from a locally owned/generated Pandalandia concept render already present in the project workspace. No paid marketplace model is bundled. The older STL/GLB assets remain in the package as fallback/history but are no longer the default Cocker view.
