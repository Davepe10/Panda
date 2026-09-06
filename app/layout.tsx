import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'
import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata={title:'Nosotros — solo para dos',description:'Un espacio privado para dos: jugar, descubrirse y construir algo juntos.',robots:{index:false,follow:false},viewport:{width:'device-width',initialScale:1,viewportFit:'cover'},themeColor:'#f8f5f1'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body><ServiceWorkerRegister/>{children}</body></html>}
