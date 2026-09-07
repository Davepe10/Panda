# Pandalandia V27 — Cocker NextGen + Fluid Responsive

V27 replaces the V26 Cocker asset with a new local mobile-game model built specifically for Pandalandia.

## Cocker
- New local `public/models/pets/cocker.glb` (no remote runtime dependency).
- 48,512 triangles / 98 named parts.
- Longer spaniel body, deeper chest, lower-set long ears, narrower muzzle and smaller eyes.
- Spaniel feathering on ears, chest, legs and tail.
- Brown/caramel coat with cream markings and PBR materials applied by the existing renderer.
- Existing behavior engine continues to drive head, ears, tail, tongue and legs.
- Eat/drink choreography now moves toward the permanent bowls and uses chewing/lapping mouth/tongue motion.

## Responsive UX
- Container-query based layout rather than a few fixed phone widths.
- Adapts to narrow phones, large phones, landscape, tablets, laptops and ultrawide desktop.
- The WebGL canvas never owns vertical scrolling.
- Pet scene uses a stable aspect ratio and camera calculated from actual canvas aspect ratio.
- Stats/actions live outside the 3D canvas on compact screens.
- Horizontal rails are intentional and isolated to tabs/secondary actions.
- Safe-area padding protects iPhone notches/home indicator.
- Invisible pet touch target allows a tap reaction without re-enabling 3D drag/scroll conflicts.

## Performance
- Cocker geometry remains under 50k triangles.
- Room DPR max is 1.36.
- No 4K textures or remote HDR downloads were added.
- Existing PBR room/material pipeline, sounds, wardrobe, costumes, progression and games are preserved.

No new SQL is required when upgrading from V26/V23+ database state.
