# Nosotros 6.0 · Pet Life 3D

Proyecto completo de producción. Conserva todo lo implementado en V5: 25 juegos, modo asíncrono y Realtime, reto semanal, puntos protegidos por RPC, logros, mundo WebGL 3D, Cocker/Panda/Shiba/Capibara, casa, decoración, jardín, expediciones y el sistema Pet Life con salud y necesidades persistentes.

## Nuevo en V6: macho / hembra

Al adoptar, después de elegir la especie pueden escoger **♂️ Macho** o **♀️ Hembra** y poner el nombre. El dato queda guardado en `pet_worlds.pet_sex` y es compartido por las dos cuentas de la pareja.

La ficha muestra sexo, etapa, personalidad y salud. Los textos del historial de cuidados se adaptan (`la acarició`, `lo bañó`, etc.). El sexo **no altera estadísticas, salud, progreso ni ventajas**.

También se agregó **Editar perfil**: permite corregir el nombre o cambiar macho/hembra posteriormente. Esto sirve además para mascotas adoptadas antes de V6, que aparecen temporalmente como “Sin definir” hasta que ustedes lo elijan.

## SQL / actualización

- Si partes desde la app original y todavía NO ejecutaste V3/V5: ejecuta **`supabase/production_v6.sql`**.
- Si ya tienes V5 desplegada: ejecuta únicamente **`supabase/migration_pet_sex_v6.sql`**.

La migración es aditiva: no borra mascota, monedas, XP, nivel, inventario, jardín, expediciones, juegos ni historial.

## Despliegue

1. Haz una copia de seguridad/exportación de Supabase si quieres máxima seguridad.
2. Ejecuta el SQL correspondiente en **Supabase → SQL Editor**.
3. Sustituye el código del repositorio por esta V6 y haz push.
4. Vercel utiliza las mismas variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
5. Brevo/SMTP/Auth no cambian.
6. Espera build verde y prueba con las dos cuentas.

## Validación local

```bash
npm run validate:static
npm run typecheck
npm run build
```
