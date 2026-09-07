# Pandalandia V26 — Cocker Realism + Responsive Rebuild

V26 rebuilds the pet home around a mobile-first responsive scene. The 3D canvas no longer owns scrolling or interaction gestures. Vitals and actions live outside the canvas and reflow automatically for narrow phones, larger phones, tablets and desktop.

The local Cocker GLB remains bundled at `public/models/pets/cocker.glb`. V26 applies a non-destructive runtime proportion pass that reduces the toy-like eye/nose scale, extends the characteristic ear silhouette and adds a lightweight procedural PBR fur microtexture. It keeps the same mesh budget and lowers mobile DPR slightly for steadier performance.

Existing V24/V25 behavior sounds, care actions, autonomous behaviors, costumes, wardrobe, shop, levels, coins, XP, garden and expeditions are preserved. No new SQL migration is required from V23+ / V25.

Important: V26 is designed as a game-realistic mobile Cocker using the bundled asset. It is not cinematic strand-based fur. True strand fur would materially increase GPU cost on phones.
