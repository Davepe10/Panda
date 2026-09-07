'use client'

import {Canvas, useFrame} from '@react-three/fiber'
import {ContactShadows, OrbitControls, RoundedBox, Sparkles} from '@react-three/drei'
import {useMemo, useRef} from 'react'
import * as THREE from 'three'

type PetType='cocker'|'panda'|'shiba'|'capybara'
type Mood='happy'|'calm'|'sleepy'|'sick'|'dirty'|'bored'|'lonely'|string
type GrowthStage='baby'|'young'|'adult'
type PetModelProps={type:PetType;mood?:Mood;interactive?:boolean}

type P3=[number,number,number]

const fur=(color:string,roughness=.86)=>({color,roughness,metalness:0})

function Eye({position, sleepy=false, scale=1}:{position:P3;sleepy?:boolean;scale?:number}){
 if(sleepy)return <group position={position} scale={scale}><mesh rotation={[0,0,.08]} scale={[1,.12,.35]}><sphereGeometry args={[.092,24,16]}/><meshStandardMaterial color="#221d20" roughness={.58}/></mesh></group>
 return <group position={position} scale={scale}>
  <mesh><sphereGeometry args={[.086,32,22]}/><meshPhysicalMaterial color="#171419" roughness={.1} clearcoat={1} clearcoatRoughness={.06}/></mesh>
  <mesh position={[-.025,.032,.073]}><sphereGeometry args={[.021,16,10]}/><meshBasicMaterial color="#fffdfb"/></mesh>
  <mesh position={[.021,-.018,.076]}><sphereGeometry args={[.010,12,8]}/><meshBasicMaterial color="#b9d9e7"/></mesh>
 </group>
}

function Nose({position=[0,.41,.57],scale=1}:{position?:P3;scale?:number}){
 return <group position={position} scale={scale}>
  <mesh scale={[1.18,.72,.82]} castShadow><sphereGeometry args={[.115,32,20]}/><meshPhysicalMaterial color="#262126" roughness={.24} clearcoat={.72} clearcoatRoughness={.12}/></mesh>
  <mesh position={[-.03,.035,.09]} scale={[.22,.12,.12]}><sphereGeometry args={[.10,12,8]}/><meshBasicMaterial color="#8e7f87" transparent opacity={.38}/></mesh>
 </group>
}

function Mouth({mood='happy',z=.62}:{mood?:Mood;z?:number}){
 const sad=['sick','bored','lonely','dirty'].includes(String(mood))
 const curve=useMemo(()=>new THREE.CatmullRomCurve3(
  sad?[new THREE.Vector3(-.12,.24,z),new THREE.Vector3(0,.31,z+.025),new THREE.Vector3(.12,.24,z)]:
  mood==='calm'?[new THREE.Vector3(-.11,.27,z),new THREE.Vector3(0,.265,z+.025),new THREE.Vector3(.11,.27,z)]:
  [new THREE.Vector3(-.13,.29,z),new THREE.Vector3(0,.20,z+.03),new THREE.Vector3(.13,.29,z)]
 ),[mood,sad,z])
 const geo=useMemo(()=>new THREE.TubeGeometry(curve,18,.011,7,false),[curve])
 return <mesh geometry={geo}><meshStandardMaterial color="#6b3f46" roughness={.52}/></mesh>
}

function Blush({x,z=.57}:{x:number;z?:number}){return <mesh position={[x,.31,z]} scale={[1.45,.48,.24]}><sphereGeometry args={[.09,20,14]}/><meshStandardMaterial color="#ec9ca5" transparent opacity={.23} roughness={.8}/></mesh>}

function Paw({position,color,cream=false}:{position:P3;color:string;cream?:boolean}){
 return <group position={position}>
  <mesh scale={[.88,.48,1.12]} castShadow><sphereGeometry args={[.25,30,20]}/><meshStandardMaterial {...fur(cream?'#ead9c2':color,.88)}/></mesh>
  {[-.09,0,.09].map((x,i)=><mesh key={i} position={[x,-.035,.245]} scale={[.42,.20,.20]}><sphereGeometry args={[.07,14,10]}/><meshStandardMaterial color="#4a3c3e" roughness={.7}/></mesh>)}
 </group>
}

function FurShell({position=[0,0,0],scale=[1,1,1],color,opacity=.09}:{position?:P3;scale?:P3;color:string;opacity?:number}){
 return <mesh position={position} scale={scale}>
  <sphereGeometry args={[.73,30,22]}/><meshStandardMaterial color={color} roughness={1} transparent opacity={opacity} depthWrite={false} side={THREE.FrontSide}/>
 </mesh>
}

function Collar({color='#8d68c9'}:{color?:string}){
 return <group position={[0,.02,.02]}><mesh rotation={[Math.PI/2,0,0]} scale={[1,.8,1]}><torusGeometry args={[.39,.035,10,40]}/><meshPhysicalMaterial color={color} roughness={.34} clearcoat={.45}/></mesh><mesh position={[0,-.18,.39]}><sphereGeometry args={[.075,20,14]}/><meshStandardMaterial color="#d8b758" metalness={.7} roughness={.25}/></mesh></group>
}

function Cocker({mood='happy'}:{mood?:Mood}){
 const sleepy=mood==='sleepy'||mood==='sick'
 return <group>
  <mesh position={[0,-.19,0]} scale={[.78,.75,.75]} castShadow><sphereGeometry args={[.75,48,32]}/><meshStandardMaterial {...fur('#b96d47')}/></mesh>
  <FurShell position={[0,-.19,0]} scale={[.79,.76,.76]} color="#d18b66" opacity={.11}/>
  <mesh position={[0,.48,.04]} scale={[.86,1,.82]} castShadow><sphereGeometry args={[.65,48,34]}/><meshStandardMaterial {...fur('#c98358',.9)}/></mesh>
  <FurShell position={[0,.48,.04]} scale={[.77,.88,.73]} color="#e5ad88" opacity={.10}/>
  <mesh position={[-.59,.39,-.02]} rotation={[0,.12,.18]} scale={[.54,1.42,.30]} castShadow><sphereGeometry args={[.43,40,28]}/><meshStandardMaterial {...fur('#70402f',.96)}/></mesh>
  <mesh position={[.59,.39,-.02]} rotation={[0,-.12,-.18]} scale={[.54,1.42,.30]} castShadow><sphereGeometry args={[.43,40,28]}/><meshStandardMaterial {...fur('#70402f',.96)}/></mesh>
  <mesh position={[0,.31,.40]} scale={[1.08,.72,.72]} castShadow><sphereGeometry args={[.37,38,26]}/><meshStandardMaterial {...fur('#edcfb2',.86)}/></mesh>
  <Eye position={[-.23,.59,.54]} sleepy={sleepy}/><Eye position={[.23,.59,.54]} sleepy={sleepy}/><Nose position={[0,.42,.64]} scale={.96}/><Mouth mood={mood} z={.67}/><Blush x={-.37} z={.59}/><Blush x={.37} z={.59}/>
  {!sleepy&&mood!=='calm'&&<mesh position={[0,.16,.705]} rotation={[.16,0,0]} scale={[.9,1.1,.55]}><sphereGeometry args={[.09,20,14]}/><meshPhysicalMaterial color="#df7f8e" roughness={.5} clearcoat={.2}/></mesh>}
  <Paw position={[-.29,-.79,.22]} color="#bd744e"/><Paw position={[.29,-.79,.22]} color="#bd744e"/>
  <mesh position={[.62,-.32,-.24]} rotation={[0,0,-.63]} scale={[.29,.98,.29]} castShadow><capsuleGeometry args={[.16,.76,10,18]}/><meshStandardMaterial {...fur('#925239')}/></mesh>
  <Collar color="#a16ed5"/>
 </group>
}

function Panda({mood='happy'}:{mood?:Mood}){
 const sleepy=mood==='sleepy'||mood==='sick'
 return <group>
  <mesh position={[0,-.22,0]} scale={[.84,.78,.77]} castShadow><sphereGeometry args={[.73,48,34]}/><meshStandardMaterial {...fur('#26252b',.92)}/></mesh>
  <mesh position={[0,-.17,.38]} scale={[.68,.75,.49]} castShadow><sphereGeometry args={[.67,44,30]}/><meshStandardMaterial {...fur('#f1efea',.94)}/></mesh>
  <FurShell position={[0,-.17,.38]} scale={[.62,.68,.45]} color="#ffffff" opacity={.09}/>
  <mesh position={[0,.49,.04]} scale={[.92,1,.86]} castShadow><sphereGeometry args={[.64,50,36]}/><meshStandardMaterial {...fur('#f5f2ec',.95)}/></mesh>
  <FurShell position={[0,.49,.04]} scale={[.83,.90,.77]} color="#ffffff" opacity={.08}/>
  <mesh position={[-.43,.94,-.02]} castShadow><sphereGeometry args={[.255,32,22]}/><meshStandardMaterial {...fur('#242329')}/></mesh><mesh position={[.43,.94,-.02]} castShadow><sphereGeometry args={[.255,32,22]}/><meshStandardMaterial {...fur('#242329')}/></mesh>
  <mesh position={[-.25,.59,.49]} rotation={[0,0,-.29]} scale={[1,.80,.44]}><sphereGeometry args={[.225,28,20]}/><meshStandardMaterial {...fur('#242329')}/></mesh><mesh position={[.25,.59,.49]} rotation={[0,0,.29]} scale={[1,.80,.44]}><sphereGeometry args={[.225,28,20]}/><meshStandardMaterial {...fur('#242329')}/></mesh>
  <Eye position={[-.25,.615,.665]} sleepy={sleepy} scale={.96}/><Eye position={[.25,.615,.665]} sleepy={sleepy} scale={.96}/><Nose position={[0,.39,.65]} scale={.88}/><Mouth mood={mood} z={.68}/><Blush x={-.39} z={.61}/><Blush x={.39} z={.61}/>
  <Paw position={[-.31,-.78,.17]} color="#25242a"/><Paw position={[.31,-.78,.17]} color="#25242a"/>
  <Collar color="#d56d91"/>
 </group>
}

function Shiba({mood='happy'}:{mood?:Mood}){
 const sleepy=mood==='sleepy'||mood==='sick'
 return <group>
  <mesh position={[0,-.20,0]} scale={[.79,.77,.73]} castShadow><sphereGeometry args={[.73,48,32]}/><meshStandardMaterial {...fur('#d77f45',.90)}/></mesh>
  <FurShell position={[0,-.20,0]} scale={[.73,.71,.67]} color="#efad73" opacity={.08}/>
  <mesh position={[0,.49,.02]} scale={[.88,1,.82]} castShadow><sphereGeometry args={[.64,48,34]}/><meshStandardMaterial {...fur('#e39555',.90)}/></mesh>
  <mesh position={[-.35,1.02,-.02]} rotation={[0,0,-.12]} castShadow><coneGeometry args={[.25,.64,5]}/><meshStandardMaterial {...fur('#d57942')}/></mesh><mesh position={[.35,1.02,-.02]} rotation={[0,0,.12]} castShadow><coneGeometry args={[.25,.64,5]}/><meshStandardMaterial {...fur('#d57942')}/></mesh>
  <mesh position={[0,.27,.43]} scale={[1.22,.76,.72]} castShadow><sphereGeometry args={[.35,36,24]}/><meshStandardMaterial {...fur('#f4dfbd',.93)}/></mesh>
  <Eye position={[-.23,.60,.53]} sleepy={sleepy}/><Eye position={[.23,.60,.53]} sleepy={sleepy}/><Nose position={[0,.42,.62]} scale={.84}/><Mouth mood={mood} z={.65}/><Blush x={-.37} z={.58}/><Blush x={.37} z={.58}/>
  <Paw position={[-.28,-.78,.19]} color="#d77f45" cream/><Paw position={[.28,-.78,.19]} color="#d77f45" cream/>
  <mesh position={[.67,-.26,-.16]} rotation={[0,0,-.80]} castShadow><torusGeometry args={[.29,.10,14,32,4.8]}/><meshStandardMaterial {...fur('#c66f3f')}/></mesh>
  <Collar color="#69a7b8"/>
 </group>
}

function Capybara({mood='happy'}:{mood?:Mood}){
 const sleepy=mood==='sleepy'||mood==='sick'
 return <group>
  <mesh position={[0,-.17,0]} scale={[1.04,.73,.80]} castShadow><sphereGeometry args={[.72,48,32]}/><meshStandardMaterial {...fur('#97684f',.96)}/></mesh>
  <FurShell position={[0,-.17,0]} scale={[.96,.68,.74]} color="#c39a7b" opacity={.08}/>
  <mesh position={[0,.43,.13]} scale={[.98,1,.90]} castShadow><sphereGeometry args={[.63,46,32]}/><meshStandardMaterial {...fur('#a67759',.95)}/></mesh>
  <mesh position={[-.35,.93,.02]} castShadow><sphereGeometry args={[.165,26,18]}/><meshStandardMaterial {...fur('#75503f')}/></mesh><mesh position={[.35,.93,.02]} castShadow><sphereGeometry args={[.165,26,18]}/><meshStandardMaterial {...fur('#75503f')}/></mesh>
  <mesh position={[0,.32,.50]} scale={[1.36,.78,.66]} castShadow><sphereGeometry args={[.35,38,26]}/><meshStandardMaterial {...fur('#bd8b6b',.93)}/></mesh>
  <Eye position={[-.27,.60,.57]} sleepy={sleepy} scale={.9}/><Eye position={[.27,.60,.57]} sleepy={sleepy} scale={.9}/><Nose position={[0,.41,.70]} scale={.96}/><Mouth mood={mood} z={.73}/><Blush x={-.41} z={.63}/><Blush x={.41} z={.63}/>
  <Paw position={[-.32,-.78,.15]} color="#805943"/><Paw position={[.32,-.78,.15]} color="#805943"/>
  <Collar color="#5b9f83"/>
 </group>
}

function PetStatusEffects({mood}:{mood:Mood}){
 if(mood==='dirty')return <group>{[[-.48,.25,.56],[.43,-.06,.59],[-.20,-.42,.64]].map((v,i)=><mesh key={i} position={v as P3} scale={[1.4,.7,.22]}><sphereGeometry args={[.075,14,10]}/><meshStandardMaterial color="#684d40" transparent opacity={.48}/></mesh>)}</group>
 if(mood==='sick')return <group><mesh position={[.60,1.12,.08]} rotation={[0,0,-.30]}><planeGeometry args={[.42,.18]}/><meshBasicMaterial color="#d7e9f4" transparent opacity={.72}/></mesh><mesh position={[.78,1.35,.06]}><planeGeometry args={[.28,.13]}/><meshBasicMaterial color="#d7e9f4" transparent opacity={.50}/></mesh></group>
 if(mood==='sleepy')return <group><mesh position={[.63,1.16,.03]}><planeGeometry args={[.24,.16]}/><meshBasicMaterial color="#756585" transparent opacity={.68}/></mesh><mesh position={[.84,1.40,.03]} scale={.75}><planeGeometry args={[.24,.16]}/><meshBasicMaterial color="#756585" transparent opacity={.46}/></mesh></group>
 return null
}

export function PetModel({type,mood='happy',interactive=true,growthStage='young'}:PetModelProps&{growthStage?:GrowthStage}){
 const root=useRef<THREE.Group>(null)
 const pulse=useRef(0)
 const stageScale=growthStage==='baby'?.82:growthStage==='adult'?1.08:1
 useFrame(({clock,pointer},delta)=>{
  if(!root.current)return
  const t=clock.elapsedTime,sick=mood==='sick',sleepy=mood==='sleepy'
  const breathe=(sleepy||sick?Math.sin(t*2.05)*.014:Math.sin(t*3.0)*.009)
  pulse.current=Math.max(0,pulse.current-delta*2.8)
  const bounce=Math.sin(pulse.current*Math.PI)*.12
  root.current.position.y=(growthStage==='baby'?-.31:-.18)+Math.sin(t*(sick?1.15:1.9))*(sick?.012:.026)+bounce
  const look=interactive?THREE.MathUtils.clamp(pointer.x,-.7,.7)*.15:0
  root.current.rotation.y=THREE.MathUtils.damp(root.current.rotation.y,look+Math.sin(t*.45)*(sick?.025:.065),3.8,delta)
  root.current.rotation.x=THREE.MathUtils.damp(root.current.rotation.x,interactive?-pointer.y*.025:0,4,delta)
  root.current.scale.setScalar(stageScale*(1+breathe+pulse.current*.025))
 })
 return <group ref={root} onPointerDown={interactive?(e=>{e.stopPropagation();pulse.current=1}):undefined}>
  {type==='panda'?<Panda mood={mood}/>:type==='shiba'?<Shiba mood={mood}/>:type==='capybara'?<Capybara mood={mood}/>:<Cocker mood={mood}/>}<PetStatusEffects mood={mood}/>
 </group>
}

function PreviewScene({type}:{type:PetType}){return <><ambientLight intensity={.95}/><hemisphereLight args={['#fff7f2','#87756b',1.4]}/><directionalLight position={[3,5,4]} intensity={2.5}/><directionalLight position={[-3,2,2]} intensity={.7} color="#d9e8ff"/><PetModel type={type} interactive={false}/><ContactShadows position={[0,-1.06,0]} opacity={.32} scale={3.5} blur={2.6} far={2.5}/></>}

export function PetPreview3D({type}:{type:PetType}){
 return <div className="pet-canvas-preview premium-pet-preview"><Canvas camera={{position:[0,.24,3.65],fov:33}} dpr={[1,1.45]} gl={{antialias:true,alpha:true,powerPreference:'high-performance',toneMapping:THREE.ACESFilmicToneMapping}} onCreated={({gl})=>{gl.toneMappingExposure=1.08}}><PreviewScene type={type}/></Canvas></div>
}

function Furniture({items}:{items:string[]}){
 return <>
  {items.includes('bed')&&<group position={[-1.65,-.72,-.52]}><RoundedBox args={[1.28,.26,.92]} radius={.13}><meshStandardMaterial color="#cfaebd" roughness={.82}/></RoundedBox><RoundedBox position={[0,.20,-.18]} args={[1.08,.18,.37]} radius={.10}><meshStandardMaterial color="#f4e8ed"/></RoundedBox></group>}
  {items.includes('sofa')&&<group position={[1.65,-.48,-1.0]} rotation={[0,-.18,0]}><RoundedBox args={[1.55,.58,.68]} radius={.14}><meshStandardMaterial color="#bda993" roughness={.84}/></RoundedBox><RoundedBox position={[0,.43,-.18]} args={[1.55,.55,.24]} radius={.11}><meshStandardMaterial color="#aa9784"/></RoundedBox></group>}
  {items.includes('plant')&&<group position={[2.05,-.55,.15]}><mesh><cylinderGeometry args={[.23,.28,.42,20]}/><meshStandardMaterial color="#aa6d57" roughness={.82}/></mesh>{[-.18,0,.18].map((x,i)=><mesh key={i} position={[x,.52+(i%2)*.08,0]} rotation={[0,0,x*1.6]} scale={[.62,1,.32]}><sphereGeometry args={[.22,20,14]}/><meshStandardMaterial color={i===1?'#5f8b66':'#739a72'} roughness={.9}/></mesh>)}</group>}
  {items.includes('lamp')&&<group position={[-2.15,-.35,-1.3]}><mesh position={[0,.45,0]}><cylinderGeometry args={[.045,.045,1.2,12]}/><meshStandardMaterial color="#655955" metalness={.25}/></mesh><mesh position={[0,1.05,0]}><coneGeometry args={[.38,.48,24,1,true]}/><meshStandardMaterial color="#efd09f" side={THREE.DoubleSide}/></mesh><pointLight position={[0,1.03,.1]} intensity={1.4} distance={4} color="#ffcf94"/></group>}
  {items.includes('rug')&&<mesh position={[0,-.985,.15]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.65,56]}/><meshStandardMaterial color="#d9c6bc" roughness={1}/></mesh>}
  {items.includes('ball')&&<mesh position={[-.95,-.78,.75]} castShadow><sphereGeometry args={[.18,24,16]}/><meshPhysicalMaterial color="#d9b445" roughness={.45} clearcoat={.25}/></mesh>}
  {items.includes('telescope')&&<group position={[-1.85,-.45,.25]} rotation={[0,.4,0]}><mesh rotation={[0,0,.18]}><cylinderGeometry args={[.11,.16,.85,18]}/><meshStandardMaterial color="#4d5564" metalness={.55} roughness={.4}/></mesh><mesh position={[0,-.55,0]}><cylinderGeometry args={[.04,.04,.85,10]}/><meshStandardMaterial color="#4d423d"/></mesh></group>}
  {items.includes('fountain')&&<group position={[1.8,-.8,.62]}><mesh><cylinderGeometry args={[.55,.62,.16,32]}/><meshStandardMaterial color="#adb7b7" roughness={.7}/></mesh><mesh position={[0,.24,0]}><cylinderGeometry args={[.12,.18,.55,20]}/><meshStandardMaterial color="#a5afaf"/></mesh><mesh position={[0,.54,0]}><sphereGeometry args={[.18,24,16]}/><meshPhysicalMaterial color="#b9e8f2" transparent opacity={.72} roughness={.08} transmission={.15}/></mesh></group>}
  {items.includes('weekly_trophy')&&<group position={[1.1,-.58,-1.45]} scale={.7}><mesh><cylinderGeometry args={[.22,.30,.16,24]}/><meshStandardMaterial color="#6b4c38"/></mesh><mesh position={[0,.45,0]}><cylinderGeometry args={[.26,.18,.62,24]}/><meshStandardMaterial color="#d6ad43" metalness={.68} roughness={.24}/></mesh></group>}
 </>
}

function RoomArchitecture({night}:{night:boolean}){
 const wall=night?'#302d3d':'#eee2da',floor=night?'#4a3b38':'#cfae8f',sky=night?'#24304b':'#a8dced'
 return <>
  <mesh position={[0,-1.04,0]} receiveShadow><cylinderGeometry args={[4.3,4.3,.12,64]}/><meshStandardMaterial color={floor} roughness={.78}/></mesh>
  <mesh position={[0,1,-2.25]} receiveShadow><planeGeometry args={[8,5]}/><meshStandardMaterial color={wall} roughness={.93}/></mesh>
  <mesh position={[-3.1,1.0,0]} rotation={[0,Math.PI/2,0]} receiveShadow><planeGeometry args={[5,5]}/><meshStandardMaterial color={night?'#292735':'#e7d9d1'} roughness={.94}/></mesh>
  <group position={[0,.95,-2.20]}>
   <RoundedBox args={[2.72,1.68,.08]} radius={.05}><meshStandardMaterial color={night?'#736a76':'#faf6ef'} roughness={.55}/></RoundedBox>
   <mesh position={[0,0,.055]}><planeGeometry args={[2.48,1.43]}/><meshPhysicalMaterial color={sky} emissive={sky} emissiveIntensity={night?.12:.07} roughness={.25}/></mesh>
   <mesh position={[0,0,.09]}><boxGeometry args={[.055,1.43,.04]}/><meshStandardMaterial color="#f5eee8"/></mesh><mesh position={[0,0,.09]}><boxGeometry args={[2.48,.055,.04]}/><meshStandardMaterial color="#f5eee8"/></mesh>
   {night&&<><mesh position={[.72,.30,.13]}><sphereGeometry args={[.16,24,16]}/><meshBasicMaterial color="#fff2b2"/></mesh><Sparkles count={22} scale={[2.2,1.1,.1]} size={1.3} speed={.12} opacity={.85} color="#fff7cf"/></>}
  </group>
  <RoundedBox position={[-1.85,.98,-2.05]} args={[.56,1.82,.16]} radius={.12}><meshStandardMaterial color={night?'#6f596d':'#cda9b7'} roughness={.92}/></RoundedBox>
  <RoundedBox position={[1.85,.98,-2.05]} args={[.56,1.82,.16]} radius={.12}><meshStandardMaterial color={night?'#6f596d':'#cda9b7'} roughness={.92}/></RoundedBox>
 </>
}

function RoomScene({type,mood,items,growthStage}:{type:PetType;mood:Mood;items:string[];growthStage:GrowthStage}){
 const hour=new Date().getHours(),night=hour<7||hour>=19
 return <>
  <color attach="background" args={[night?'#252437':'#eaf1f3']}/><fog attach="fog" args={[night?'#252437':'#eaf1f3',6.5,12]}/>
  <ambientLight intensity={night?.42:.72}/><hemisphereLight args={[night?'#7785aa':'#f8fbff',night?'#332c36':'#9f826f',night?.82:1.25]}/>
  <directionalLight castShadow position={night?[2.8,5,3.5]:[3.8,6,4.5]} intensity={night?1.2:2.35} color={night?'#aebbe8':'#fff3df'} shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-far={12}/>
  <pointLight position={[-2.5,1.8,1]} intensity={night?1.7:.55} color="#ffbd82" distance={6}/>
  <RoomArchitecture night={night}/><Furniture items={items}/>
  <PetModel type={type} mood={mood} growthStage={growthStage}/>
  <ContactShadows position={[0,-1.0,0]} opacity={night?.44:.36} scale={4.2} blur={2.5} far={3.2}/>
  <OrbitControls makeDefault enablePan={false} minDistance={3.05} maxDistance={5.0} minPolarAngle={Math.PI/3.45} maxPolarAngle={Math.PI/2.12} minAzimuthAngle={-.68} maxAzimuthAngle={.68} target={[0,.08,0]} enableDamping dampingFactor={.08}/>
 </>
}

export function PetRoom3D({type,mood='happy',items=[],growthStage='young'}:{type:PetType;mood?:Mood;items?:string[];growthStage?:GrowthStage}){
 return <div className="pet-canvas-room premium-pet-room"><Canvas shadows camera={{position:[0,.50,4.15],fov:36}} dpr={[1,1.55]} gl={{antialias:true,alpha:false,powerPreference:'high-performance',toneMapping:THREE.ACESFilmicToneMapping}} onCreated={({gl})=>{gl.toneMappingExposure=1.05;gl.shadowMap.type=THREE.PCFSoftShadowMap}}><RoomScene type={type} mood={mood} items={items} growthStage={growthStage}/></Canvas><div className="world-3d-hint premium-3d-hint">Toca a tu mascota · arrastra para mirar · pellizca para acercar</div></div>
}
