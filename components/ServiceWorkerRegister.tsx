'use client'
import {useEffect} from 'react'
export default function ServiceWorkerRegister(){
 useEffect(()=>{
  if(!('serviceWorker'in navigator)||process.env.NODE_ENV!=='production')return
  let cancelled=false
  const register=async()=>{try{const reg=await navigator.serviceWorker.register('/sw.js',{scope:'/'});if(cancelled)return;await reg.update()}catch(error){console.warn('[Pandalandia] Service worker no disponible',error)}}
  if(document.readyState==='complete')void register();else window.addEventListener('load',register,{once:true})
  return()=>{cancelled=true;window.removeEventListener('load',register)}
 },[])
 return null
}
