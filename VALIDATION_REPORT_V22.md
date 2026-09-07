# V22 validation report

- Full-room PBR pass implemented without adding remote texture dependencies.
- Cocker local GLB path preserved.
- Game, progression, wardrobe, garden and Supabase logic untouched.
- No SQL migration added.
- Mobile render budget preserved: room DPR cap 1.55, existing shadow map 1024, no 4K textures.
- Static project validator should be run before packaging; Vercel remains the final production Next.js build validation in this environment.
