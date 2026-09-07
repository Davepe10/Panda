'use client'
import {useState} from 'react'
import {createClient} from '@/lib/supabase/client'
import {useRouter} from 'next/navigation'
export default function UpdatePassword(){const [p,setP]=useState('');const [msg,setMsg]=useState('');const router=useRouter();async function save(){if(p.length<8)return setMsg('Usa al menos 8 caracteres.');const {error}=await createClient().auth.updateUser({password:p});if(error)setMsg('No pudimos cambiar la contraseña.');else{setMsg('Contraseña actualizada.');setTimeout(()=>router.replace('/app'),700)}}return <main className="auth"><div className="eyebrow">Seguridad</div><h2>Nueva contraseña</h2><label className="field">Contraseña<input type="password" minLength={8} value={p} onChange={e=>setP(e.target.value)}/></label><button className="btn" onClick={save}>Guardar contraseña</button>{msg&&<p className="tiny">{msg}</p>}</main>}
