# Validation report V31

- Package version: 31.0.0
- Whole-app premium app-shell CSS added for mobile, landscape, tablet, desktop.
- Cocker HD standing GLB: 300,000 triangles source retained in local bundle.
- Cocker HD sitting GLB: 300,000 triangles source retained in local bundle.
- Optimized fallback GLBs retained for lower-end devices.
- Adaptive detail selection: HD on devices with >4 logical cores and viewport >=360px; optimized fallback otherwise.
- PBR fur shader adds procedural color variation without external textures.
- Existing wardrobe/costume, room PBR, pet actions, games and progression preserved.
- TypeScript syntax-class validation: no TS1xxx parser errors in edited files. Existing unrelated WeeklyChallenge.tsx TS18046 remains.
- Full Next.js build was not executed because project dependencies are not installed in this environment; Vercel remains final build validation.
- No SQL migration required from V30.
