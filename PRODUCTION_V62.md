# Pandalandia V62 — producción

Esta versión consolida la rama móvil/PWA y elimina código y recursos 3D históricos que ya no participan en el flujo de la aplicación.

## Cambios de cierre

- Mascota Cocker principal: `/public/models/pets/cocker.glb` (aprox. 434 KB).
- Eliminados el STL de 15 MB y los cuatro GLB de pose históricos (~12 MB en total).
- Eliminados componentes 3D antiguos que no tenían imports activos.
- Eliminado el renderizador `RealSculptCocker` sin referencias.
- Eliminadas reglas CSS muertas asociadas a los renderizadores antiguos.
- PWA: cache versionado a `pandalandia-v62-shell`; sólo precachea iconos y el GLB principal.
- Viewport conserva `viewport-fit=cover` y permite zoom accesible hasta 5x.
- El chequeo previo de deploy sigue verificando los archivos Supabase necesarios.
- Versión de aplicación: 62.0.0.

## Validaciones ejecutadas

- `node scripts/verify-deploy-files.mjs` → OK.
- `node scripts/validate-project.mjs` → OK: 25 juegos de pareja + 8 individuales y Pet Life 3D intacto.
- JSON de `package.json` → válido.
- Balance de llaves de `app/globals.css` y `app/final.css` → válido.
- Búsqueda de referencias de producción a STL/GLB históricos → sin coincidencias.

## Antes de desplegar en Vercel

Configurar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. El build de Vercel ejecutará automáticamente `prebuild` antes de `next build`.

> Nota: en este entorno no fue posible instalar dependencias desde npm para ejecutar un `next build` completo. El repositorio sí conserva las versiones declaradas en `package.json`; Vercel instalará esas dependencias durante el despliegue.


## Hotfix V62.1
- Corregido `app/manifest.ts`: el valor `purpose: "any maskable"` no es válido para `MetadataRoute.Manifest` de Next.js/TypeScript.
- Se usa `purpose: "maskable"`, que cumple el tipo esperado y mantiene el icono instalable PWA.
