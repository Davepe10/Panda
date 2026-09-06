'use client'

import {Canvas, useFrame} from '@react-three/fiber'
import {ContactShadows, OrbitControls, RoundedBox} from '@react-three/drei'
import {useMemo, useRef} from 'react'
import * as THREE from 'three'

type PetType='cocker'|'panda'|'shiba'|'capybara'
type Mood='happy'|'calm'|'sleepy'|'sick'|'dirty'|'bored'|'lonely'|string
type GrowthStage='baby'|'young'|'adult'

type PetModelProps={type:PetType;mood?:Mood;interactive?:boolean}

function Eye({position, sleepy=false}:{position:[number,number,number];sleepy?:boolean}){
 if(sleepy)return <mesh position={position} rotation={[0,0,0.1]} scale={[1,.16,.35]}><sphereGeometry args={[.08,20,12]}/><meshStandardMaterial color="#2b2324" roughness={.55}/></mesh>
 return <group position={position}><mesh><sphereGeometry args={[.072,24,16]}/><meshStandardMaterial color="#292225" roughness={.35}/></mesh><mesh position={[-.022,.026,.06]}><sphereGeometry args={[.018,12,8]}/><meshBasicMaterial color="white"/></mesh></group>
}

function Nose({position=[0,.42,.49] as [number,number,number],scale=1}:{position?:[number,number,number];scale?:number}){
 return <mesh position={position} scale={[1.18,.7,.72].map(v=>v*scale) as [number,number,number]}><sphereGeometry args={[.11,24,16]}/><meshStandardMaterial color="#33272a" roughness={.42}/></mesh>
}

function Smile({mood='happy'}:{mood?:Mood}){
 const sad=['sick','bored','lonely','dirty'].includes(String(mood))
 const curve=useMemo(()=>new THREE.CatmullRomCurve3(sad?[new THREE.Vector3(-.13,.24,.55),new THREE.Vector3(0,.32,.60),new THREE.Vector3(.13,.24,.55)]:mood==='calm'?[new THREE.Vector3(-.12,.30,.55),new THREE.Vector3(0,.27,.59),new THREE.Vector3(.12,.30,.55)]:[new THREE.Vector3(-.13,.30,.55),new THREE.Vector3(0,.20,.60),new THREE.Vector3(.13,.30,.55)]),[mood,sad])
 const geo=useMemo(()=>new THREE.TubeGeometry(curve,16,.012,6,false),[curve])
 return <mesh geometry={geo}><meshStandardMaterial color="#6d4449" roughness={.5}/></mesh>
}

function Blush({x}:{x:number}){return <mesh position={[x,.31,.48]} scale={[1.5,.55,.35]}><sphereGeometry args={[.09,18,12]}/><meshStandardMaterial color="#e9989f" transparent opacity={.34}/></mesh>}

function Cocker({mood='happy'}:{mood?:Mood}){
 const sleepy=mood==='sleepy'||mood==='sick'
 return <group>
  <mesh position={[0,-.20,0]} scale={[.78,.72,.72]} castShadow><sphereGeometry args={[.73,40,28]}/><meshStandardMaterial color="#b96f49" roughness={.72}/></mesh>
  <mesh position={[0,.48,.03]} scale={[.88,1,.82]} castShadow><sphereGeometry args={[.64,44,30]}/><meshStandardMaterial color="#c98559" roughness={.68}/></mesh>
  <mesh position={[-.59,.42,-.02]} rotation={[0,0,.22]} scale={[.55,1.28,.28]} castShadow><sphereGeometry args={[.42,32,24]}/><meshStandardMaterial color="#75412f" roughness={.8}/></mesh>
  <mesh position={[.59,.42,-.02]} rotation={[0,0,-.22]} scale={[.55,1.28,.28]} castShadow><sphereGeometry args={[.42,32,24]}/><meshStandardMaterial color="#75412f" roughness={.8}/></mesh>
  <mesh position={[0,.32,.38]} scale={[1.1,.72,.68]} castShadow><sphereGeometry args={[.36,34,24]}/><meshStandardMaterial color="#e8c3a4" roughness={.7}/></mesh>
  <Eye position={[-.23,.58,.50]} sleepy={sleepy}/><Eye position={[.23,.58,.50]} sleepy={sleepy}/><Nose/><Smile mood={mood}/><Blush x={-.37}/><Blush x={.37}/>
  {!sleepy&&mood!=='calm'&&<mesh position={[0,.17,.61]} rotation={[.15,0,0]}><sphereGeometry args={[.09,20,12]}/><meshStandardMaterial color="#e98d98" roughness={.5}/></mesh>}
  <mesh position={[-.28,-.78,.20]} scale={[.8,.44,1.05]} castShadow><sphereGeometry args={[.25,24,16]}/><meshStandardMaterial color="#c98559"/></mesh>
  <mesh position={[.28,-.78,.20]} scale={[.8,.44,1.05]} castShadow><sphereGeometry args={[.25,24,16]}/><meshStandardMaterial color="#c98559"/></mesh>
  <mesh position={[.58,-.30,-.22]} rotation={[0,0,-.62]} scale={[.28,.95,.28]} castShadow><capsuleGeometry args={[.16,.75,8,16]}/><meshStandardMaterial color="#9e593d" roughness={.72}/></mesh>
 </group>
}

function Panda({mood='happy'}:{mood?:Mood}){
 const sleepy=mood==='sleepy'||mood==='sick'
 return <group>
  <mesh position={[0,-.22,0]} scale={[.82,.76,.76]} castShadow><sphereGeometry args={[.72,40,28]}/><meshStandardMaterial color="#25242a" roughness={.72}/></mesh>
  <mesh position={[0,-.18,.38]} scale={[.66,.72,.48]}><sphereGeometry args={[.66,36,24]}/><meshStandardMaterial color="#f2f0ed" roughness={.75}/></mesh>
  <mesh position={[0,.49,.04]} scale={[.92,1,.86]} castShadow><sphereGeometry args={[.63,42,30]}/><meshStandardMaterial color="#f5f3f0" roughness={.74}/></mesh>
  <mesh position={[-.43,.93,-.02]}><sphereGeometry args={[.25,30,20]}/><meshStandardMaterial color="#242329"/></mesh><mesh position={[.43,.93,-.02]}><sphereGeometry args={[.25,30,20]}/><meshStandardMaterial color="#242329"/></mesh>
  <mesh position={[-.25,.59,.48]} rotation={[0,0,-.3]} scale={[1,.8,.45]}><sphereGeometry args={[.22,24,16]}/><meshStandardMaterial color="#242329"/></mesh><mesh position={[.25,.59,.48]} rotation={[0,0,.3]} scale={[1,.8,.45]}><sphereGeometry args={[.22,24,16]}/><meshStandardMaterial color="#242329"/></mesh>
  <Eye position={[-.25,.61,.65]} sleepy={sleepy}/><Eye position={[.25,.61,.65]} sleepy={sleepy}/><Nose position={[0,.39,.61]} scale={.9}/><Smile mood={mood}/><Blush x={-.39}/><Blush x={.39}/>
  <mesh position={[-.31,-.77,.16]} scale={[.88,.48,1]}><sphereGeometry args={[.24,24,16]}/><meshStandardMaterial color="#25242a"/></mesh><mesh position={[.31,-.77,.16]} scale={[.88,.48,1]}><sphereGeometry args={[.24,24,16]}/><meshStandardMaterial color="#25242a"/></mesh>
 </group>
}

function Shiba({mood='happy'}:{mood?:Mood}){
 const sleepy=mood==='sleepy'||mood==='sick'
 return <group>
  <mesh position={[0,-.2,0]} scale={[.78,.75,.72]} castShadow><sphereGeometry args={[.72,40,28]}/><meshStandardMaterial color="#d98146" roughness={.74}/></mesh>
  <mesh position={[0,.49,.02]} scale={[.9,1,.82]} castShadow><sphereGeometry args={[.63,42,28]}/><meshStandardMaterial color="#e39857" roughness={.7}/></mesh>
  <mesh position={[-.34,1.02,-.02]} rotation={[0,0,-.16]} castShadow><coneGeometry args={[.25,.62,4]}/><meshStandardMaterial color="#d67c45"/></mesh><mesh position={[.34,1.02,-.02]} rotation={[0,0,.16]} castShadow><coneGeometry args={[.25,.62,4]}/><meshStandardMaterial color="#d67c45"/></mesh>
  <mesh position={[0,.28,.42]} scale={[1.2,.75,.7]}><sphereGeometry args={[.34,30,20]}/><meshStandardMaterial color="#f5dfbd" roughness={.74}/></mesh>
  <Eye position={[-.23,.60,.50]} sleepy={sleepy}/><Eye position={[.23,.60,.50]} sleepy={sleepy}/><Nose position={[0,.42,.58]} scale={.85}/><Smile mood={mood}/><Blush x={-.37}/><Blush x={.37}/>
  <mesh position={[-.28,-.77,.18]} scale={[.8,.43,1]}><sphereGeometry args={[.24,24,16]}/><meshStandardMaterial color="#f0d8b3"/></mesh><mesh position={[.28,-.77,.18]} scale={[.8,.43,1]}><sphereGeometry args={[.24,24,16]}/><meshStandardMaterial color="#f0d8b3"/></mesh>
  <mesh position={[.66,-.25,-.16]} rotation={[0,0,-.8]}><torusGeometry args={[.28,.095,12,26,4.7]}/><meshStandardMaterial color="#c56e3e" roughness={.7}/></mesh>
 </group>
}

function Capybara({mood='happy'}:{mood?:Mood}){
 const sleepy=mood==='sleepy'||mood==='sick'
 return <group>
  <mesh position={[0,-.17,0]} scale={[1.02,.72,.78]} castShadow><sphereGeometry args={[.72,40,28]}/><meshStandardMaterial color="#9b6b50" roughness={.82}/></mesh>
  <mesh position={[0,.43,.13]} scale={[.96,1,.88]} castShadow><sphereGeometry args={[.63,40,28]}/><meshStandardMaterial color="#a97859" roughness={.8}/></mesh>
  <mesh position={[-.35,.93,.02]}><sphereGeometry args={[.16,22,14]}/><meshStandardMaterial color="#76503f"/></mesh><mesh position={[.35,.93,.02]}><sphereGeometry args={[.16,22,14]}/><meshStandardMaterial color="#76503f"/></mesh>
  <mesh position={[0,.32,.49]} scale={[1.35,.77,.65]}><sphereGeometry args={[.35,30,20]}/><meshStandardMaterial color="#bf8d6c" roughness={.78}/></mesh>
  <Eye position={[-.26,.60,.55]} sleepy={sleepy}/><Eye position={[.26,.60,.55]} sleepy={sleepy}/><Nose position={[0,.41,.68]} scale={1.0}/><Smile mood={mood}/><Blush x={-.41}/><Blush x={.41}/>
  <mesh position={[-.32,-.78,.14]} scale={[1,.4,1.1]}><sphereGeometry args={[.23,22,14]}/><meshStandardMaterial color="#805943"/></mesh><mesh position={[.32,-.78,.14]} scale={[1,.4,1.1]}><sphereGeometry args={[.23,22,14]}/><meshStandardMaterial color="#805943"/></mesh>
 </group>
}

function PetStatusEffects({mood}:{mood:Mood}){
 if(mood==='dirty')return <group>{[[-.48,.25,.52],[.42,-.05,.56],[-.2,-.42,.62]].map((v,i)=><mesh key={i} position={v as [number,number,number]} scale={[1.4,.7,.25]}><sphereGeometry args={[.075,12,8]}/><meshStandardMaterial color="#6b5146" transparent opacity={.58}/></mesh>)}</group>
 if(mood==='sick')return <group><mesh position={[.58,1.12,.08]} rotation={[0,0,-.3]}><planeGeometry args={[.42,.18]}/><meshBasicMaterial color="#dceaf7" transparent opacity={.82}/></mesh><mesh position={[.75,1.34,.06]}><planeGeometry args={[.28,.13]}/><meshBasicMaterial color="#dceaf7" transparent opacity={.62}/></mesh></group>
 if(mood==='sleepy')return <group><mesh position={[.62,1.15,.02]}><planeGeometry args={[.24,.16]}/><meshBasicMaterial color="#7d6c8d" transparent opacity={.72}/></mesh><mesh position={[.82,1.38,.02]} scale={.75}><planeGeometry args={[.24,.16]}/><meshBasicMaterial color="#7d6c8d" transparent opacity={.52}/></mesh></group>
 return null
}

export function PetModel({type,mood='happy',interactive=true,growthStage='young'}:PetModelProps&{growthStage?:GrowthStage}){
 const root=useRef<THREE.Group>(null)
 const stageScale=growthStage==='baby' ? .82 : growthStage==='adult' ? 1.08 : 1
 useFrame(({clock},delta)=>{if(!root.current)return;const t=clock.elapsedTime;const sick=mood==='sick';root.current.position.y=Math.sin(t*(sick?1.15:2.0))*(sick ? .018 : .035);root.current.rotation.y=THREE.MathUtils.damp(root.current.rotation.y,interactive?Math.sin(t*(sick ? .32 : .55))*(sick ? .055 : .12):0,4,delta);const breathe=mood==='sleepy'||sick?1+Math.sin(t*2.1)*.012:1+Math.sin(t*3.2)*.008;root.current.scale.setScalar(stageScale*breathe)})
 return <group ref={root} position={[0,growthStage==='baby'?-0.31:-.18,0]}>{type==='panda'?<Panda mood={mood}/>:type==='shiba'?<Shiba mood={mood}/>:type==='capybara'?<Capybara mood={mood}/>:<Cocker mood={mood}/>}<PetStatusEffects mood={mood}/></group>
}

function PreviewScene({type}:{type:PetType}){return <><ambientLight intensity={1.3}/><directionalLight position={[3,5,4]} intensity={2.2}/><directionalLight position={[-3,2,2]} intensity={.8} color="#d9e8ff"/><PetModel type={type} interactive={false}/><ContactShadows position={[0,-1.06,0]} opacity={.28} scale={3.5} blur={2.7} far={2.5}/></>}

export function PetPreview3D({type}:{type:PetType}){
 return <div className="pet-canvas-preview"><Canvas camera={{position:[0,.25,3.7],fov:34}} dpr={[1,1.35]} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}}><PreviewScene type={type}/></Canvas></div>
}

function Furniture({items}:{items:string[]}){
 return <>
  {items.includes('bed')&&<group position={[-1.7,-.72,-.5]}><RoundedBox args={[1.25,.25,.9]} radius={.12}><meshStandardMaterial color="#d9c2ce" roughness={.82}/></RoundedBox><RoundedBox position={[0,.2,-.18]} args={[1.05,.18,.36]} radius={.09}><meshStandardMaterial color="#f2e4e9"/></RoundedBox></group>}
  {items.includes('sofa')&&<group position={[1.65,-.48,-1.0]} rotation={[0,-.18,0]}><RoundedBox args={[1.55,.58,.68]} radius={.14}><meshStandardMaterial color="#c9b9a9" roughness={.84}/></RoundedBox><RoundedBox position={[0,.43,-.18]} args={[1.55,.55,.24]} radius={.11}><meshStandardMaterial color="#b9aa9c"/></RoundedBox></group>}
  {items.includes('plant')&&<group position={[2.05,-.55,.15]}><mesh><cylinderGeometry args={[.23,.28,.42,20]}/><meshStandardMaterial color="#b97b62"/></mesh>{[-.18,0,.18].map((x,i)=><mesh key={i} position={[x,.52+(i%2)*.08,0]} rotation={[0,0,x*1.6]} scale={[.62,1,.32]}><sphereGeometry args={[.22,18,12]}/><meshStandardMaterial color={i===1?'#69946c':'#7ca17b'}/></mesh>)}</group>}
  {items.includes('lamp')&&<group position={[-2.15,-.35,-1.3]}><mesh position={[0,.45,0]}><cylinderGeometry args={[.045,.045,1.2,12]}/><meshStandardMaterial color="#6a5b55" metalness={.25}/></mesh><mesh position={[0,1.05,0]}><coneGeometry args={[.38,.48,24,1,true]}/><meshStandardMaterial color="#f0d6aa" side={THREE.DoubleSide}/></mesh><pointLight position={[0,1.05,.1]} intensity={1.1} distance={4} color="#ffd7a1"/></group>}
  {items.includes('rug')&&<mesh position={[0,-.985,.15]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.65,48]}/><meshStandardMaterial color="#d8c8be" roughness={1}/></mesh>}
  {items.includes('ball')&&<mesh position={[-.95,-.78,.75]} castShadow><sphereGeometry args={[.18,20,14]}/><meshStandardMaterial color="#d9b445" roughness={.7}/></mesh>}
  {items.includes('telescope')&&<group position={[-1.85,-.45,.25]} rotation={[0,.4,0]}><mesh rotation={[0,0,.18]}><cylinderGeometry args={[.11,.16,.85,18]}/><meshStandardMaterial color="#4d5564" metalness={.55} roughness={.4}/></mesh><mesh position={[0,-.55,0]}><cylinderGeometry args={[.04,.04,.85,10]}/><meshStandardMaterial color="#4d423d"/></mesh></group>}
  {items.includes('fountain')&&<group position={[1.8,-.8,.62]}><mesh><cylinderGeometry args={[.55,.62,.16,32]}/><meshStandardMaterial color="#b7c0bf" roughness={.7}/></mesh><mesh position={[0,.24,0]}><cylinderGeometry args={[.12,.18,.55,20]}/><meshStandardMaterial color="#aeb8b8"/></mesh><mesh position={[0,.54,0]}><sphereGeometry args={[.18,20,14]}/><meshPhysicalMaterial color="#bce7f2" transparent opacity={.72} roughness={.15}/></mesh></group>}
  {items.includes('weekly_trophy')&&<group position={[1.1,-.58,-1.45]} scale={.7}><mesh><cylinderGeometry args={[.22,.30,.16,24]}/><meshStandardMaterial color="#6b4c38"/></mesh><mesh position={[0,.45,0]}><cylinderGeometry args={[.26,.18,.62,24]}/><meshStandardMaterial color="#d6ad43" metalness={.65} roughness={.3}/></mesh></group>}
 </>
}

function RoomScene({type,mood,items,growthStage}:{type:PetType;mood:Mood;items:string[];growthStage:GrowthStage}){
 return <>
  <color attach="background" args={['#eaf4f7']}/><fog attach="fog" args={['#eaf4f7',6,12]}/>
  <ambientLight intensity={.85}/><hemisphereLight args={['#e8f6ff','#b69a86',1.2]}/>
  <directionalLight castShadow position={[3.8,6,4.5]} intensity={2.3} shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-far={12}/>
  <pointLight position={[-3,2,1]} intensity={.75} color="#ffd6ba"/>
  <mesh position={[0,-1.03,0]} receiveShadow><cylinderGeometry args={[4.3,4.3,.12,64]}/><meshStandardMaterial color="#d7b99e" roughness={.9}/></mesh>
  <mesh position={[0,1,-2.25]} receiveShadow><planeGeometry args={[8,5]}/><meshStandardMaterial color="#f3e9e1" roughness={.95}/></mesh>
  <mesh position={[-3.1,1.0,0]} rotation={[0,Math.PI/2,0]} receiveShadow><planeGeometry args={[5,5]}/><meshStandardMaterial color="#eaded7" roughness={.96}/></mesh>
  <mesh position={[0,.9,-2.22]}><planeGeometry args={[2.5,1.45]}/><meshStandardMaterial color="#bdddec" emissive="#7fc7e4" emissiveIntensity={.12}/></mesh>
  <mesh position={[0,.9,-2.18]}><torusGeometry args={[1.03,.035,10,48,Math.PI]}/><meshStandardMaterial color="#f8f1e8"/></mesh>
  <Furniture items={items}/>
  <PetModel type={type} mood={mood} growthStage={growthStage}/>
  <ContactShadows position={[0,-1.0,0]} opacity={.38} scale={4} blur={2.5} far={3}/>
  <OrbitControls makeDefault enablePan={false} minDistance={3.2} maxDistance={5.2} minPolarAngle={Math.PI/3.4} maxPolarAngle={Math.PI/2.15} minAzimuthAngle={-.62} maxAzimuthAngle={.62} target={[0,.05,0]}/>
 </>
}

export function PetRoom3D({type,mood='happy',items=[],growthStage='young'}:{type:PetType;mood?:Mood;items?:string[];growthStage?:GrowthStage}){
 return <div className="pet-canvas-room"><Canvas shadows camera={{position:[0,.55,4.25],fov:38}} dpr={[1,1.5]} gl={{antialias:true,alpha:false,powerPreference:'high-performance'}}><RoomScene type={type} mood={mood} items={items} growthStage={growthStage}/></Canvas><div className="world-3d-hint">Arrastra para mirar · pellizca para acercar</div></div>
}
