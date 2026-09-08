'use client'

import {useEffect,useMemo,useState} from 'react'
import {createClient} from '@/lib/supabase/client'
import {PetPreview3D,PetRoom3D} from './Pet3D'
import {ACTIONS,WORLD_SHOP,nextUnlock,slotForItem,type WorldShopItem} from '@/lib/worldCatalog'

type PetType='cocker'|'panda'|'shiba'|'capybara'
type Sick='healthy'|'cold'|'tummy'|'tired'
type Stage='baby'|'young'|'adult'
type PetSex='male'|'female'|'unspecified'
type Tab='home'|'shop'|'wardrobe'|'garden'|'explore'
type ShopFilter='all'|'furniture'|'wearable'|'activity'
type World={couple_id:string;pet_type:PetType|null;pet_name:string|null;pet_sex:PetSex;coins:number;xp:number;level:number;mood:string;energy:number;hunger:number;thirst:number;hygiene:number;fun:number;affection:number;health:number;sickness_status:Sick;growth_stage:Stage;adopted_at:string;room_theme:string;personality?:Record<string,number>;last_care_by:string|null;last_care_action:string|null;last_care_at:string|null;updated_at:string}
type Inventory={id:string;item_key:string;quantity:number;equipped:boolean}
type Plot={id:string;seed_key:string;stage:number;water_count:number;last_watered_by:string|null;last_watered_at:string|null}
type Expedition={id:string;zone:'forest'|'beach'|'mountain';status:string;returns_at:string;reward:any}
type CareLog={id:string;user_id:string;action:string;health_after:number;sickness_after:Sick;created_at:string}

const PETS:{id:PetType;name:string;desc:string;trait:string}[]=[
 {id:'cocker',name:'Cocker',desc:'Cariñoso, curioso y muy expresivo.',trait:'Le encanta jugar y estar cerca.'},
 {id:'panda',name:'Panda',desc:'Tranquilo, tierno y amante de las siestas.',trait:'Se relaja con facilidad.'},
 {id:'shiba',name:'Shiba',desc:'Independiente, juguetón y aventurero.',trait:'Siempre quiere explorar.'},
 {id:'capybara',name:'Capibara',desc:'Relajada, sociable y completamente chill.',trait:'Convierte cualquier lugar en hogar.'}
]

const actionLabels=(sex:PetSex):Record<string,string>=>sex==='female'?{feed:'la alimentó',water:'le dio agua',play:'jugó con ella',pet:'la acarició',rest:'la dejó descansar',clean:'la bañó',care:'la cuidó'}:{feed:'lo alimentó',water:'le dio agua',play:'jugó con él',pet:'lo acarició',rest:'lo dejó descansar',clean:'lo bañó',care:'lo cuidó'}
const sicknessLabel=(sex:PetSex):Record<Sick,string>=>({healthy:'Saludable',cold:sex==='female'?'Resfriadita':'Resfriadito',tummy:'Barriguita sensible',tired:sex==='female'?'Agotada':'Agotado'})
const stageLabel=(sex:PetSex):Record<Stage,string>=>({baby:sex==='female'?'Cachorra':'Cachorro',young:'Joven',adult:sex==='female'?'Adulta':'Adulto'})
const personalityLabel=(sex:PetSex):Record<string,string>=>({playful:sex==='female'?'Juguetona':'Juguetón',calm:sex==='female'?'Tranquila':'Tranquilo',curious:sex==='female'?'Curiosa':'Curioso',affectionate:sex==='female'?'Cariñosa':'Cariñoso'})

export default function WorldHub({coupleId,userId,partnerName='Tu compañero/a'}:{coupleId:string;userId:string;partnerName?:string}){
 const s=useMemo(()=>createClient(),[])
 const [world,setWorld]=useState<World|null>(null)
 const [inventory,setInventory]=useState<Inventory[]>([])
 const [garden,setGarden]=useState<Plot[]>([])
 const [activeExpedition,setActiveExpedition]=useState<Expedition|null>(null)
 const [careLog,setCareLog]=useState<CareLog[]>([])
 const [pick,setPick]=useState<PetType>('cocker')
 const [name,setName]=useState('')
 const [petSex,setPetSex]=useState<'male'|'female'>('female')
 const [tab,setTab]=useState<Tab>('home')
 const [shopFilter,setShopFilter]=useState<ShopFilter>('all')
 const [msg,setMsg]=useState('')
 const [busy,setBusy]=useState(false)
 const [editingProfile,setEditingProfile]=useState(false)
 const [profileName,setProfileName]=useState('')
 const [profileSex,setProfileSex]=useState<'male'|'female'>('female')
 const [specialFx,setSpecialFx]=useState('')
 const [petBehavior,setPetBehavior]=useState<string>('idle')
 const [petBehaviorNonce,setPetBehaviorNonce]=useState(0)
 type RealSound={src:string;start?:number;duration?:number;volume?:number}
 const soundMap:Record<string,RealSound[]>={
  bark:[{src:'https://upload.wikimedia.org/wikipedia/commons/f/fd/Ladrido_perro.ogg',volume:.92}],
  pant:[{src:'https://upload.wikimedia.org/wikipedia/commons/3/3b/Perro_feliz.ogg',start:0,duration:4.4,volume:.72}],
  sniff:[{src:'https://upload.wikimedia.org/wikipedia/commons/e/e8/Dog.ogg',start:0,duration:3.2,volume:.70}],
  lick:[{src:'https://upload.wikimedia.org/wikipedia/commons/e/e8/Dog.ogg',start:8,duration:4.5,volume:.72}],
  eat:[{src:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Canemangia.ogv',start:4,duration:5,volume:.80}],
  drink:[{src:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog_Drinking_in_Slow_Motion_%28Berger_Blanc_Suisse_called_Bonny%29.ogv',start:3,duration:5,volume:.80}],
  play:[{src:'https://upload.wikimedia.org/wikipedia/commons/3/3b/Perro_feliz.ogg',start:4,duration:5,volume:.76}],
  clean:[{src:'https://upload.wikimedia.org/wikipedia/commons/e/e8/Dog.ogg',start:2,duration:4,volume:.72}]
 }


 useEffect(()=>{
  if(!world?.pet_type||tab!=='home'||busy)return
  const dog=world.pet_type==='cocker'||world.pet_type==='shiba'
  const choose=()=>{
   if(world.energy<26)return Math.random()<.72?'sleep':'sit'
   if(world.hunger<32||world.thirst<32)return Math.random()<.64?'sniff':'walk'
   if(world.fun<34)return Math.random()<.58?'play':'walk'
   if(world.affection<34)return Math.random()<.62?'wag':'lick'
   const calm=dog?['idle','walk','sniff','sit','wag','pant','scratch','stretch','lick','bark']:['idle','walk','sit','sleep']
   return calm[Math.floor(Math.random()*calm.length)]
  }
  const delay=4300+Math.floor(Math.random()*5200)
  const timer=window.setTimeout(()=>{
   const next=choose();setPetBehavior(next);setPetBehaviorNonce(n=>n+1)
   const duration=next==='walk'?6500:next==='sleep'?7600:next==='play'?4700:next==='bark'?2200:3900
   window.setTimeout(()=>setPetBehavior('idle'),duration)
  },delay)
  return()=>window.clearTimeout(timer)
 },[world?.pet_type,world?.updated_at,world?.energy,world?.hunger,world?.thirst,world?.fun,world?.affection,tab,busy,petBehaviorNonce])

 useEffect(()=>{
  if(!world?.pet_type||tab!=='home')return
  setPetBehavior('run');setPetBehaviorNonce(n=>n+1)
  const a=window.setTimeout(()=>{setPetBehavior('play');setPetBehaviorNonce(n=>n+1)},2200)
  const b=window.setTimeout(()=>setPetBehavior('idle'),5200)
  return()=>{window.clearTimeout(a);window.clearTimeout(b)}
 },[world?.pet_type,tab])

 useEffect(()=>{
  if(!world?.pet_type||tab!=='home'||busy)return
  const attention=window.setTimeout(()=>{
   const next=Math.random()<.55?'bark':'wag'
   setPetBehavior(next);setPetBehaviorNonce(n=>n+1);if(next==='bark')playPetSound('bark')
   window.setTimeout(()=>setPetBehavior('walk'),2400)
  },18000+Math.floor(Math.random()*9000))
  return()=>window.clearTimeout(attention)
 },[world?.pet_type,tab,busy,petBehaviorNonce])

 function playPetSound(kind:string){
  if(typeof window==='undefined')return
  const choices=soundMap[kind];if(!choices?.length)return
  const pick=choices[Math.floor(Math.random()*choices.length)]
  const audio=new Audio(pick.src)
  audio.preload='auto';audio.crossOrigin='anonymous';audio.volume=pick.volume??.72;audio.playbackRate=1
  const start=pick.start??0
  const play=()=>{
   try{audio.currentTime=start}catch{}
   void audio.play().catch(()=>{})
   if(pick.duration)window.setTimeout(()=>{audio.pause()},Math.round(pick.duration*1000))
  }
  if(audio.readyState>=1)play();else audio.addEventListener('loadedmetadata',play,{once:true})
 }
 function animatePet(kind:string,duration=3200,withSound=true){setPetBehavior(kind);setPetBehaviorNonce(n=>n+1);if(withSound)playPetSound(kind);window.setTimeout(()=>setPetBehavior('idle'),duration)}
 function handlePetTouch(){const reactions=['wag','lick','pet','play'];const next=reactions[Math.floor(Math.random()*reactions.length)];animatePet(next,next==='play'?4200:3000,next==='lick');if(typeof navigator!=='undefined'&&'vibrate' in navigator)navigator.vibrate?.(18)}

 useEffect(()=>{
  load(true)
  const timer=setInterval(()=>load(true),5*60*1000)
  const ch=s.channel(`world-${coupleId}`)
   .on('postgres_changes',{event:'*',schema:'public',table:'pet_worlds',filter:`couple_id=eq.${coupleId}`},()=>load(false))
   .on('postgres_changes',{event:'*',schema:'public',table:'world_inventory',filter:`couple_id=eq.${coupleId}`},()=>load(false))
   .on('postgres_changes',{event:'*',schema:'public',table:'garden_plots',filter:`couple_id=eq.${coupleId}`},()=>load(false))
   .on('postgres_changes',{event:'*',schema:'public',table:'expeditions',filter:`couple_id=eq.${coupleId}`},()=>load(false))
   .on('postgres_changes',{event:'INSERT',schema:'public',table:'pet_care_log',filter:`couple_id=eq.${coupleId}`},()=>load(false)).subscribe()
  return()=>{clearInterval(timer);s.removeChannel(ch)}
 },[coupleId])

 async function load(refresh=false){
  if(refresh)await s.rpc('pet_refresh_state')
  const [{data:w},{data:i},{data:g},{data:e},{data:l}]=await Promise.all([
   s.from('pet_worlds').select('*').eq('couple_id',coupleId).maybeSingle(),
   s.from('world_inventory').select('*').eq('couple_id',coupleId),
   s.from('garden_plots').select('*').eq('couple_id',coupleId).order('planted_at'),
   s.from('expeditions').select('*').eq('couple_id',coupleId).eq('status','active').maybeSingle(),
   s.from('pet_care_log').select('*').eq('couple_id',coupleId).order('created_at',{ascending:false}).limit(6)
  ])
  setWorld(w as World|null);setInventory((i||[]) as Inventory[]);setGarden((g||[]) as Plot[]);setActiveExpedition(e as Expedition|null);setCareLog((l||[]) as CareLog[])
 }

 async function rpc<T>(fn:string,args:any={}){
  setBusy(true);setMsg('')
  const {data,error}=await s.rpc(fn,args)
  setBusy(false)
  if(error){
   const code=(error.message||'').toUpperCase()
   const friendly=code.includes('NOT_ENOUGH_COINS')?'Faltan monedas. Jueguen unas rondas y vuelvan.':code.includes('LEVEL_LOCKED')?'Ese objeto todavía está bloqueado por nivel.':code.includes('ACTION_LOCKED')?'Primero desbloquea esa acción en la tienda.':code.includes('ACTION_COOLDOWN')?'Esa acción especial está recargando. Vuelve en unos minutos.':code.includes('TOO_FAST')?'Dale un segundo 😄':code.includes('TOO_TIRED')?'Está demasiado cansado para jugar. Déjalo descansar.':code.includes('PET_NEEDS_RECOVERY')?'Primero necesita recuperarse antes de salir de expedición.':code.includes('NOT_SICK')?'Está saludable; no necesita cuidados especiales.':code.includes('NOT_READY')?'Todavía está explorando.':code.includes('GARDEN_FULL')?'El jardín está lleno.':code.includes('WAIT_BEFORE_WATERING')?'Esa planta acaba de recibir agua.':code.includes('INVALID_PET_SEX')?'Elige Macho o Hembra.':`No pudimos completar la acción: ${error.message}`
   setMsg(friendly);return null
  }
  await load(false);return data as T
 }

 async function adopt(){if(!name.trim())return setMsg('Pónganle un nombre primero.');await rpc('adopt_pet',{p_type:pick,p_name:name.trim(),p_sex:petSex})}
 async function saveProfile(){if(!profileName.trim())return setMsg('El nombre no puede quedar vacío.');const result=await rpc<World>('update_pet_profile',{p_name:profileName.trim(),p_sex:profileSex});if(result){setEditingProfile(false);setMsg('Perfil de la mascota actualizado ✨')}}
 async function act(kind:'feed'|'water'|'play'|'pet'|'rest'|'clean'|'care'){const anim:Record<string,string>={feed:'eat',water:'drink',play:'play',pet:'wag',rest:'sleep',clean:'clean',care:'sit'};animatePet(anim[kind]||'idle',kind==='rest'?6200:3800);await rpc('pet_interact',{p_action:kind})}
 async function buy(item:WorldShopItem){const result=await rpc('buy_world_item',{p_item_key:item.id});if(result)setMsg(`¡${item.name} desbloqueado! ✨`)}
 async function equip(item:WorldShopItem){const inv=inventory.find(x=>x.item_key===item.id);if(!inv)return;await rpc('equip_world_item',{p_item_key:item.id,p_equipped:!inv.equipped})}
 async function special(action:(typeof ACTIONS)[number]){const map:Record<string,string>={spin:'play',dance:'play',fetch:'run',photo:'sit',treasure:'sniff',stargaze:'sit',party:'play'};animatePet(map[action.id]||'play',4600);const result=await rpc<World>('pet_special_action',{p_action:action.id});if(result){setSpecialFx(action.id);setTimeout(()=>setSpecialFx(''),1800);setMsg(`${action.emoji} ${action.name}: ¡acción completada!`)}}
 async function plant(){await rpc('plant_garden',{p_seed:'sunflower'})}
 async function waterGarden(id:string){await rpc('water_garden',{p_plot_id:id})}
 async function expedition(zone:'forest'|'beach'|'mountain'){await rpc('start_expedition',{p_zone:zone})}
 async function claim(){if(!activeExpedition)return;const result=await rpc<World>('claim_expedition',{p_expedition_id:activeExpedition.id});if(result)setMsg(`¡${world?.pet_name||'La mascota'} volvió! Recompensa añadida al mundo ✨`)}

 if(!world?.pet_type)return <div className="world-shell world-adoption-v64" data-world-tab="adopt"><div className="world-intro"><div className="eyebrow">Nuestro mundo</div><h1>Elijan a quien vivirá con ustedes</h1><p>Una mascota 3D compartida con necesidades, ropa, accesorios, niveles y crecimiento persistentes.</p></div><div className="pet-picker">{PETS.map(p=><button key={p.id} className={pick===p.id?'selected':''} onClick={()=>setPick(p.id)}><div className="pet-preview-stage"><PetPreview3D type={p.id}/></div><h3>{p.name}</h3><p>{p.desc}</p><small>{p.trait}</small></button>)}</div><div className="adopt-box"><label>¿Cómo se llamará?<input value={name} maxLength={24} onChange={e=>setName(e.target.value)} placeholder="Nombre"/></label><div className="pet-sex-field"><span>¿Es macho o hembra?</span><div className="segmented pet-sex-selector"><button type="button" className={petSex==='male'?'active':''} onClick={()=>setPetSex('male')}>♂️ Macho</button><button type="button" className={petSex==='female'?'active':''} onClick={()=>setPetSex('female')}>♀️ Hembra</button></div></div><button className="btn" disabled={busy} onClick={adopt}>{busy?'Creando mundo…':'Adoptar y crear nuestro mundo'}</button>{msg&&<p className="tiny">{msg}</p>}</div></div>

 const owned=new Set(inventory.map(x=>x.item_key))
 const equipped=inventory.filter(x=>x.equipped).map(x=>x.item_key)
 const xpFloor=(world.level-1)*120
 const personality=world.personality||{}
 const trait=Object.entries(personality).sort((a,b)=>Number(b[1])-Number(a[1]))[0]?.[0]||'affectionate'
 const traitLabel=personalityLabel(world.pet_sex)
 const xpPct=Math.max(0,Math.min(100,((world.xp-xpFloor)/120)*100))
 const ready=activeExpedition&&new Date(activeExpedition.returns_at).getTime()<=Date.now()
 const visualMood=world.sickness_status!=='healthy'?'sick':world.energy<25?'sleepy':world.hygiene<28?'dirty':world.fun<28?'bored':world.affection<30?'lonely':world.mood
 const unlock=nextUnlock(world.level)
 const filteredShop=WORLD_SHOP.filter(x=>shopFilter==='all'||x.category===shopFilter)
 const wardrobe=WORLD_SHOP.filter(x=>x.category==='wearable'&&owned.has(x.id))
 const unlockedActions=ACTIONS.filter(x=>owned.has(x.requires))

 return <div className="world-shell world-shell-v28 world-shell-v29 world-shell-v30" data-world-tab={tab}>
  <div className="world-top world-top-v28 world-top-v29 world-top-v30"><div><div className="eyebrow">NUESTRO MUNDO · NIVEL {world.level}</div><h1>{world.pet_name}</h1><div className="pet-meta-line"><span>{stageLabel(world.pet_sex)[world.growth_stage]}</span><span>{world.pet_sex==='female'?'♀️ Hembra':world.pet_sex==='male'?'♂️ Macho':'⚪ Sin definir'}</span><span><b>{traitLabel[trait]||'Cariñoso'}</b></span><span className={world.sickness_status==='healthy'?'healthy':'unwell'}>{world.sickness_status==='healthy'?'❤️ Saludable':`🩹 ${sicknessLabel(world.pet_sex)[world.sickness_status]}`}</span><button className="pet-profile-edit" onClick={()=>{setProfileName(world.pet_name||'');setProfileSex(world.pet_sex==='male'?'male':'female');setEditingProfile(true)}}>✎</button></div>{editingProfile&&<div className="pet-profile-editor"><label>Nombre<input value={profileName} maxLength={24} onChange={e=>setProfileName(e.target.value)}/></label><div><span>Sexo</span><div className="segmented pet-sex-selector"><button type="button" className={profileSex==='male'?'active':''} onClick={()=>setProfileSex('male')}>♂️ Macho</button><button type="button" className={profileSex==='female'?'active':''} onClick={()=>setProfileSex('female')}>♀️ Hembra</button></div></div><div className="pet-profile-actions"><button className="round-back" onClick={()=>setEditingProfile(false)}>Cancelar</button><button className="btn" disabled={busy} onClick={saveProfile}>{busy?'Guardando…':'Guardar'}</button></div></div>}<div className="level-line"><i style={{width:`${xpPct}%`}}/></div>{unlock?<small className="next-unlock">🔒 Próximo desbloqueo: nivel {unlock.level} · {unlock.emoji} {unlock.name}</small>:<small className="next-unlock">🏆 Has desbloqueado todo el catálogo actual</small>}</div><div className="world-currency"><b>🪙 {world.coins}</b><span>✨ {world.xp} XP</span></div></div>

  <div className="world-tabs world-tabs-v28 world-tabs-v29 world-tabs-v30"><button className={tab==='home'?'active':''} onClick={()=>setTab('home')}>Hogar</button><button className={tab==='shop'?'active':''} onClick={()=>setTab('shop')}>Tienda</button><button className={tab==='wardrobe'?'active':''} onClick={()=>setTab('wardrobe')}>Armario</button><button className={tab==='garden'?'active':''} onClick={()=>setTab('garden')}>Jardín</button><button className={tab==='explore'?'active':''} onClick={()=>setTab('explore')}>Explorar</button></div>

  {tab==='home'&&<>
   <div className="pet-home-premium-v63">
    <section className={`pet-stage-premium-v63 theme-${world.room_theme||'warm'} ${specialFx?`pet-special-${specialFx}`:''}`}>
      <div className="pet-room-3d-layer"><PetRoom3D type={world.pet_type} mood={visualMood} items={equipped} growthStage={world.growth_stage} behavior={petBehavior} behaviorNonce={petBehaviorNonce} onPetInteract={handlePetTouch}/></div>
      <div className="pet-stage-topline">
        <span className="pet-live-chip"><i/> EN VIVO</span>
        <span className="pet-behavior-chip">{behaviorLabel(petBehavior,world.pet_sex)}</span>
      </div>
      <div className="pet-speech-v63"><span>🐾</span><p>{speech(world)}</p></div>
      <div className="pet-camera-hint">Arrastra para mirar alrededor · pellizca para acercar</div>
    </section>

    <section className="pet-needs-v63">
      <div className="pet-needs-title"><div><small>ESTADO DE {String(world.pet_name||'MIA').toUpperCase()}</small><b>{world.sickness_status==='healthy'?'Todo va bien':'Necesita atención'}</b></div><span>{world.health}% salud</span></div>
      <div className="pet-needs-grid">
        <Need icon="🥣" label="Comida" value={world.hunger}/><Need icon="💧" label="Agua" value={world.thirst}/><Need icon="⚡" label="Energía" value={world.energy}/><Need icon="🫧" label="Higiene" value={world.hygiene}/><Need icon="🎾" label="Diversión" value={world.fun}/><Need icon="🤍" label="Afecto" value={world.affection}/>
      </div>
      <div className="pet-care-dock-v63">
       <button disabled={busy} onClick={()=>act(world.hunger<45?'feed':'pet')}><span>{world.hunger<45?'🥣':'🤍'}</span><b>{world.hunger<45?'Dar comida':'Acariciar'}</b><small>{world.hunger<45?'Tiene hambre':'Un poco de cariño'}</small></button>
       <button disabled={busy} onClick={()=>act(world.thirst<45?'water':world.energy<35?'rest':'play')}><span>{world.thirst<45?'💧':world.energy<35?'🌙':'🎾'}</span><b>{world.thirst<45?'Dar agua':world.energy<35?'Descansar':'Jugar'}</b><small>Acción recomendada</small></button>
       <button disabled={busy} onClick={()=>act(world.hygiene<45?'clean':world.sickness_status!=='healthy'?'care':'play')}><span>{world.hygiene<45?'🫧':world.sickness_status!=='healthy'?'🧰':'✨'}</span><b>{world.hygiene<45?'Bañar':world.sickness_status!=='healthy'?'Cuidar':'Sorprender'}</b><small>{world.sickness_status!=='healthy'?'Necesita atención':'Interactuar'}</small></button>
      </div>
    </section>
   </div>

   <section className="pet-autonomy-v63"><div><span className="pet-autonomy-icon">✦</span><div><h2>Se comporta por sí sola</h2><p>No necesitas dirigir cada movimiento. Recorre la habitación, cambia de lugar, olfatea, juega, descansa y busca atención por sí sola. Tócala directamente para acariciarla y ver cómo reacciona.</p></div></div><span className="pet-autonomy-status"><i/> {behaviorLabel(petBehavior,world.pet_sex)}</span></section>

   {unlockedActions.length>0&&<section className="special-actions-card pet-special-v63"><div><h2>✨ Habilidades aprendidas</h2><p>Estas sí son acciones especiales que ustedes pueden pedirle.</p></div><div className="special-actions-row">{unlockedActions.map(a=><button key={a.id} disabled={busy} onClick={()=>special(a)}><span>{a.emoji}</span><b>{a.name}</b></button>)}</div></section>}

   <section className="pet-life-card pet-life-v63"><div><h2>Vida diaria</h2><p>Sus necesidades cambian aunque cierres la app. El progreso, ropa y objetos quedan guardados para ambos.</p></div><div className="pet-care-history"><b>Actividad reciente</b>{careLog.length?careLog.slice(0,3).map(x=><span key={x.id}>{x.user_id===userId?'Tú':partnerName} {actionLabels(world.pet_sex)[x.action]||'cuidó a la mascota'} · {relativeTime(x.created_at)}</span>):<span>Aún no hay cuidados registrados.</span>}</div></section>
  </>}

  {tab==='shop'&&<div><div className="section-title"><div><h2>Tienda por niveles</h2><p className="muted">Muebles, ropa, accesorios y nuevas acciones. No hay compras con dinero real.</p></div><span>{owned.size}/{WORLD_SHOP.length} desbloqueados</span></div><div className="shop-filter-row"><button className={shopFilter==='all'?'active':''} onClick={()=>setShopFilter('all')}>Todo</button><button className={shopFilter==='furniture'?'active':''} onClick={()=>setShopFilter('furniture')}>🏠 Hogar</button><button className={shopFilter==='wearable'?'active':''} onClick={()=>setShopFilter('wearable')}>👕 Ropa</button><button className={shopFilter==='activity'?'active':''} onClick={()=>setShopFilter('activity')}>✨ Acciones</button></div><div className="shop-grid shop-grid-v16">{filteredShop.map(it=>{const locked=world.level<it.level;const has=owned.has(it.id);return <button key={it.id} className={`${locked?'shop-locked':''} ${has?'shop-owned':''}`} disabled={busy||has||locked||world.coins<it.price} onClick={()=>buy(it)}><span>{locked?'🔒':it.emoji}</span><h3>{it.name}</h3><small>{it.description}</small><p>{has?'✓ Desbloqueado':locked?`Nivel ${it.level}`:world.coins<it.price?`Faltan ${it.price-world.coins} 🪙`:`🪙 ${it.price}`}</p>{it.level>1&&<em>Nv. {it.level}</em>}</button>})}</div></div>}

  {tab==='wardrobe'&&<div><div className="section-title"><div><h2>Armario de {world.pet_name}</h2><p className="muted">Combina cabeza, cara, cuello y cuerpo. Solo un accesorio por ranura.</p></div><span>{wardrobe.length} prendas</span></div>{wardrobe.length?<div className="wardrobe-grid">{wardrobe.map(it=>{const inv=inventory.find(x=>x.item_key===it.id);return <button key={it.id} className={inv?.equipped?'equipped':''} disabled={busy} onClick={()=>equip(it)}><span>{it.emoji}</span><h3>{it.name}</h3><small>{slotName(slotForItem(it.id))}</small><b>{inv?.equipped?'✓ Puesto':'Poner'}</b></button>})}</div>:<div className="wardrobe-empty"><span>🧸</span><h3>El armario está vacío</h3><p>Compra el primer accesorio en la tienda. El lazo coral está disponible desde nivel 1.</p><button className="btn" onClick={()=>{setShopFilter('wearable');setTab('shop')}}>Ver ropa y accesorios</button></div>}</div>}

  {tab==='garden'&&<div><section className="garden-card"><div><h2>🌱 Jardín compartido</h2><p>La misma planta puede crecer con acciones de ambos.</p></div><button className="btn secondary" disabled={busy||world.coins<20||garden.length>=12} onClick={plant}>Plantar · 20 🪙</button></section><div className="garden-grid">{garden.map(g=><button key={g.id} disabled={busy||g.stage>=3} onClick={()=>waterGarden(g.id)}><span>{['🌱','🌿','🌷','🌻'][g.stage]}</span><small>{g.stage<3?`Etapa ${g.stage+1}/4 · regar`:'Floreció ✨'}</small>{g.last_watered_by&&<em>{g.last_watered_by===userId?'Regaste tú':`Regó ${partnerName}`}</em>}</button>)}{garden.length===0&&<div className="empty-mini">Todavía no plantaron nada. La primera semilla cuesta 20 monedas.</div>}</div></div>}

  {tab==='explore'&&<div>{activeExpedition?<section className="expedition-active"><div className="expedition-scene"><span>🏡</span><i>· · · · ·</i><span>{activeExpedition.zone==='forest'?'🌲':activeExpedition.zone==='beach'?'🏖️':'🏔️'}</span></div><h2>{world.pet_name} está explorando</h2><p>{zoneName(activeExpedition.zone)} · regreso {new Date(activeExpedition.returns_at).toLocaleString('es-PE',{dateStyle:'short',timeStyle:'short'})}</p><button className="btn" disabled={busy||!ready} onClick={claim}>{ready?'Recibir a '+world.pet_name:'Todavía explorando…'}</button></section>:<><div className="section-title"><div><h2>Expediciones</h2><p className="muted">Las zonas también se desbloquean progresivamente.</p></div></div><div className="expedition-grid"><button disabled={busy||world.health<45||world.energy<25} onClick={()=>expedition('forest')}>🌲<h3>Bosque</h3><p>{world.health<45||world.energy<25?'Primero necesita recuperarse':'4 horas'}</p><small>55 🪙 · 20 XP</small></button><button disabled={busy||world.level<2||world.health<45||world.energy<25} onClick={()=>expedition('beach')}>🏖️<h3>Playa</h3><p>{world.level<2?'Se desbloquea en nivel 2':world.health<45||world.energy<25?'Primero necesita recuperarse':'6 horas'}</p><small>75 🪙 · 25 XP</small></button><button disabled={busy||world.level<3||world.health<45||world.energy<25} onClick={()=>expedition('mountain')}>🏔️<h3>Montaña</h3><p>{world.level<3?'Se desbloquea en nivel 3':world.health<45||world.energy<25?'Primero necesita recuperarse':'8 horas'}</p><small>105 🪙 · 35 XP</small></button></div></>}</div>}

  {msg&&<div className="notice">{msg}</div>}
 </div>
}

function Need({icon,label,value}:{icon:string;label:string;value:number}){const tone=value<35?'low':value<60?'mid':'good';return <div className={`pet-need ${tone}`}><span>{icon}</span><div><small>{label}</small><b>{value}%</b><i><em style={{width:`${value}%`}}/></i></div></div>}
function behaviorLabel(behavior:string,sex:PetSex){const f=sex==='female';const labels:Record<string,string>={idle:f?'Observando':'Observando',walk:f?'Paseando':'Paseando',run:f?'Corriendo':'Corriendo',sit:f?'Sentada':'Sentado',sleep:f?'Durmiendo':'Durmiendo',eat:'Comiendo',drink:'Tomando agua',play:'Jugando',pet:'Recibiendo cariño',clean:'Baño',care:'Recibiendo cuidados',bark:'Ladrando',pant:'Relajada',lick:f?'Aseándose':'Aseándose',sniff:'Olfateando',scratch:f?'Rascándose':'Rascándose',stretch:f?'Estirándose':'Estirándose',wag:'Moviendo la cola'};return labels[behavior]||'Curioseando'}
function Stat({label,value}:{label:string;value:number}){return <div><span>{label}<b>{value}%</b></span><div><i style={{width:`${value}%`}}/></div></div>}
function zoneName(z:string){return z==='forest'?'Bosque':z==='beach'?'Playa':'Montaña'}
function slotName(slot?:string){return slot==='head'?'Cabeza':slot==='face'?'Cara':slot==='neck'?'Cuello':slot==='body'?'Cuerpo':'Accesorio'}
function speech(w:World){const f=w.pet_sex==='female';if(w.sickness_status==='cold')return `No me siento al 100%… quiero descansar y estar ${f?'acompañada':'acompañado'} 🥺`;if(w.sickness_status==='tummy')return 'Mi barriguita está sensible. Un poco de cuidado me vendría bien.';if(w.sickness_status==='tired')return `Estoy ${f?'agotada':'agotado'}… necesito agua, descanso y cariño.`;if(w.energy<25)return 'Tengo mucho sueño… ¿descansamos?';if(w.thirst<30)return 'Tengo sed 💧';if(w.hunger<30)return '¿Comemos algo?';if(w.hygiene<28)return 'Creo que necesito un baño 🫧';if(w.fun<28)return `Estoy ${f?'aburrida':'aburrido'}… ¿jugamos?`;if(w.affection<30)return '¿Un poquito de cariño? 🤍';return w.mood==='calm'?'Qué tranquilo está todo ✨':'¿Qué hacemos hoy?'}
function relativeTime(date:string){const mins=Math.max(0,Math.floor((Date.now()-new Date(date).getTime())/60000));if(mins<1)return 'ahora';if(mins<60)return `hace ${mins} min`;const h=Math.floor(mins/60);if(h<24)return `hace ${h} h`;return `hace ${Math.floor(h/24)} d`}
