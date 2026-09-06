# Nosotros 8.0 — Pet Life 3D + juegos solo + turnos claros

Esta entrega mantiene la mascota compartida 3D, sexo/nombre editable, 25 juegos de pareja y 8 juegos individuales de V7. Añade gestión de partidas y avisos de turno.

## Novedades V8
- Partidas abiertas con estado **Tu turno / Esperando**.
- Botón **Eliminar** para cerrar una partida pendiente sin puntos.
- Botón **Nueva partida** desde el listado y dentro de una sala.
- **Revancha** al terminar una partida.
- Indicador visible de modalidad: **Jugar solo / Por turnos / En vivo / Ambos**.
- Aviso flotante cuando responde la pareja mientras la app está conectada.
- Sonido y vibración opcionales; permiso de notificaciones del navegador.
- Base PWA (`manifest` + service worker) preparada para una futura capa Web Push.
- Corrección de la función de recompensa de juegos individuales (`v_coins` / `v_xp`).

## Si solo tienes el esquema ORIGINAL
No ejecutes V3, V5, V6 ni V7 por separado. Ejecuta una sola vez:

`supabase/ACTUALIZAR_DESDE_VERSION_ORIGINAL.sql`

Después sube **todo este proyecto** a GitHub y deja que Vercel despliegue.

## Si YA ejecutaste production_v7.sql
Ejecuta únicamente:

`supabase/migration_v8_game_ux_fix.sql`

## Notificaciones con navegador cerrado
Esta V8 avisa en tiempo real mientras la app mantiene conexión (abierta o, según navegador/SO, en segundo plano). Para recibir una notificación cuando la web esté completamente cerrada se necesita **Web Push real**: suscripción Push + Service Worker + un emisor servidor con VAPID. En iPhone/iPad Web Push está soportado para apps web añadidas a la pantalla de inicio y con permiso del usuario. La V8 deja la base PWA preparada, pero no guarda ni envía suscripciones push todavía.
