# Validation report — V33

- Static project validator: PASS.
- 25 partner games + 8 solo games preserved by project validator.
- New Cocker scene component is wired only for `pet_type === 'cocker'`; Panda/Shiba/Capybara keep the existing 3D renderer.
- Existing Supabase actions, wallet, XP, care, inventory, wardrobe, garden and expeditions were not replaced.
- No SQL migration added in V33.
- PWA remains `display: standalone` with iOS standalone metadata.
- New mobile UI uses safe-area insets and removes the website top bar under 768px.
- Full Next.js build was not executed in this environment because dependency installation could not complete within the available tool window; Vercel remains the final build validation.
