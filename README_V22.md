# Pandalandia V22 — Full PBR World

V22 extends the lightweight PBR pipeline from the Cocker to the full pet room while preserving the mobile-first performance budget.

## What changed
- PBR materials for floor, walls, window, curtains and structural trim.
- PBR materials for bed, sofa, plant pot/leaves, lamp, rug, ball, telescope, fountain, trophy, beanbag, bookshelf, aquarium, gaming setup, fireplace, piano and neon sign.
- PBR wardrobe/accessories: cloth sheen for garments, metal response for crowns/glasses, glossy/transmissive surfaces where appropriate.
- Permanent lightweight PBR food/water station added to the room.
- Shared PMREM room environment remains local; no HDR download is required.
- No 4K textures and no large new geometry were added. Materials use inexpensive physical parameters and existing meshes.
- Room DPR remains capped at 1.55 and shadows remain limited to the existing main directional light.

## Database
No new SQL migration is required after V16.

## Production
The Cocker remains bundled locally at `public/models/pets/cocker.glb`.
