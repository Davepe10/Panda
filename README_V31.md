# Pandalandia V31 — Adaptive Realism + Premium App Shell

- Whole application restyled as an app-first product, not only the pet screen.
- Mobile uses edge-to-edge screens, safe areas, compact chrome and a persistent native-style bottom dock.
- Desktop uses a centered desktop-app shell instead of a stretched marketing website.
- Responsive layouts cover small phones, large phones, landscape, tablet and desktop.
- Cocker now bundles full 300k-triangle HD standing/sitting sculpts in addition to the optimized 52k/55k variants.
- HD sculpt is selected automatically on devices with >4 logical cores and width >=360px; optimized sculpt remains the fallback for low-end hardware.
- Cocker PBR shader adds subtle procedural fur color variation without external 4K textures.
- Existing room PBR, wardrobe/costumes, coins, XP, levels, games, sounds and progression are preserved.
- No new SQL migration is required from V30.

Important: the supplied STL source meshes are static sculpts and still contain no skeleton/animation clips. V31 improves visual fidelity and adaptive detail but articulated professional dog motion still requires a rigged model.
