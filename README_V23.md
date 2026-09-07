# Pandalandia V23 — Costume Collections

V23 amplía la tienda y el armario con 16 disfraces originales de temática juguete, aventura, fantasía y temporada. No copia personajes comerciales.

## Género de la mascota
Todos los disfraces son unisex y funcionan tanto cuando `pet_sex` es `male` como `female` (y también para mascotas antiguas con `unspecified`). La ropa no cambia ni se bloquea por sexo.

## Progresión
Los disfraces cuestan monedas y se desbloquean entre los niveles 7 y 26. Se compran una vez y después se pueden poner/quitar desde Armario. Ocupan la ranura `body`, por lo que solo un disfraz/cuerpo completo puede estar equipado a la vez; se puede combinar con accesorios de cabeza, cara y cuello cuando no formen parte visualmente del propio conjunto.

## Colecciones
Alien azul, Sheriff de juguete, Explorador galáctico, Dinosaurio, Dragón, Ninja, Caballero, Mago estelar, Chef, Bombero, Futbolista, Héroe de Pandalandia, Monstruo peludo, Noche de sustos, Invierno mágico y Realeza estelar.

## Migración
Si la base ya está en V16/V22, ejecutar una sola vez `supabase/MIGRAR_DESDE_V22_A_V23.sql` antes o junto al despliegue. No borra monedas, XP, mascota, inventario ni partidas.
