import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'
import type {Metadata,Viewport} from 'next'
import './globals.css'
import './final.css'
import './responsive-v69.css'
import './v70.css'

export const metadata:Metadata={
 title:'Pandalandia — solo para dos',
 description:'Un espacio privado para dos: jugar, descubrirse y construir algo juntos.',
 applicationName:'Pandalandia',
 robots:{index:false,follow:false},
 manifest:'/manifest.webmanifest',
 icons:{icon:[{url:'/icons/icon-192.png',sizes:'192x192',type:'image/png'},{url:'/icons/icon-512.png',sizes:'512x512',type:'image/png'}],apple:'/icons/icon-192.png'},
 appleWebApp:{capable:true,statusBarStyle:'black-translucent',title:'Pandalandia'},
 formatDetection:{telephone:false,email:false,address:false},
 other:{'mobile-web-app-capable':'yes'}
}
export const viewport:Viewport={width:'device-width',initialScale:1,maximumScale:5,userScalable:true,viewportFit:'cover',themeColor:'#17243a'}

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="es" suppressHydrationWarning><body><ServiceWorkerRegister/>{children}</body></html>
}
