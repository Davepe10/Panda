'use client'
import {useEffect,useMemo,useState} from 'react'
import {createClient} from '@/lib/supabase/client'
const META:Record<string,{emoji:string;name:string;desc:string}>={
 first_game:{emoji:'🎮',name:'Primera partida',desc:'Completaste tu primera partida.'},
 ten_games:{emoji:'🏅',name:'Ya es tradición',desc:'Completaste 10 partidas.'},
 artist:{emoji:'🎨',name:'Artista',desc:'Terminaste Dibuja y adivina.'},
 detective:{emoji:'🗝️',name:'Detective',desc:'Resolviste un Escape Room.'},
 explorer:{emoji:'🗺️',name:'Explorador',desc:'Llegaste al final de una aventura.'},
 team_goal:{emoji:'🏆',name:'Misión cumplida',desc:'Completaron juntos un reto semanal cooperativo.'}
}
type A={id:string;user_id:string|null;achievement_key:string;unlocked_at:string}
export default function Achievements({coupleId,userId}:{coupleId:string;userId:string}){const s=useMemo(()=>createClient(),[]),[rows,setRows]=useState<A[]>([]);useEffect(()=>{load()},[coupleId]);async function load(){const {data}=await s.from('achievements').select('*').eq('couple_id',coupleId).order('unlocked_at',{ascending:false});setRows((data||[]) as A[])}return <section className="achievements-section"><div className="section-title"><div><div className="eyebrow">Progreso</div><h2>Logros desbloqueados</h2></div><span>{rows.length} conseguidos</span></div><div className="achievement-grid">{Object.entries(META).map(([key,m])=>{const hit=rows.find(r=>r.achievement_key===key&&(r.user_id===userId||r.user_id===null));return <div key={key} className={hit?'achievement unlocked':'achievement'}><span>{m.emoji}</span><div><b>{m.name}</b><p>{m.desc}</p>{hit&&<small>{new Date(hit.unlocked_at).toLocaleDateString('es-PE')}</small>}</div></div>})}</div></section>}
