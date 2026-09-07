import type {MetadataRoute} from 'next'
export default function manifest():MetadataRoute.Manifest{return{
 id:'/app',name:'Pandalandia',short_name:'Pandalandia',description:'Tu espacio privado para jugar, cuidar a tu mascota y compartir en pareja.',
 start_url:'/app',scope:'/',lang:'es-PE',display:'standalone',display_override:['window-controls-overlay','standalone','fullscreen'],orientation:'any',
 background_color:'#f6f2f6',theme_color:'#17243a',categories:['games','lifestyle'],
 icons:[{src:'/icons/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:'/icons/icon-512.png',sizes:'512x512',type:'image/png',purpose:'maskable'}],
 shortcuts:[{name:'Mi mascota',short_name:'Mascota',description:'Abrir directamente tu mascota virtual',url:'/app?tab=world',icons:[{src:'/icons/icon-192.png',sizes:'192x192'}]},{name:'Jugar',short_name:'Jugar',description:'Abrir los juegos',url:'/app?tab=games',icons:[{src:'/icons/icon-192.png',sizes:'192x192'}]}]
}}
