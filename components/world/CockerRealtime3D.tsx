'use client'

import {Canvas,useFrame} from '@react-three/fiber'
import {ContactShadows} from '@react-three/drei'
import {useMemo,useRef} from 'react'
import * as THREE from 'three'

type Props={behavior:string;items:string[];name:string}

type RigRefs={
 root:THREE.Group|null; body:THREE.Group|null; head:THREE.Group|null;
 fl:THREE.Group|null; fr:THREE.Group|null; bl:THREE.Group|null; br:THREE.Group|null;
 tail:THREE.Group|null; earL:THREE.Group|null; earR:THREE.Group|null
}

const BROWN='#9a5b3d', DARK='#4b2c24', CREAM='#f6dfc7', CHEST='#fff0df', PINK='#d9959b'

function FurTuft({position,rotation=[0,0,0],scale=[1,1,1],color=CREAM}:{position:[number,number,number],rotation?:[number,number,number],scale?:[number,number,number],color?:string}){
 return <mesh position={position} rotation={rotation} scale={scale} castShadow><coneGeometry args={[0.07,0.23,6]}/><meshStandardMaterial color={color} roughness={.96}/></mesh>
}

function Leg({side='left',back=false,refCb}:{side?:'left'|'right',back?:boolean,refCb:(g:THREE.Group|null)=>void}){
 const z=side==='left'?.25:-.25; const x=back?.36:-.36
 return <group ref={refCb} position={[x,.38,z]}>
  <mesh position={[0,-.23,0]} scale={[.14,.22,.14]} castShadow><sphereGeometry args={[1,16,12]}/><meshStandardMaterial color={BROWN} roughness={.92}/></mesh>
  <mesh position={[0,-.35,.015]} scale={[.12,.16,.115]} castShadow><sphereGeometry args={[1,16,12]}/><meshStandardMaterial color={CREAM} roughness={.96}/></mesh>
  <mesh position={[-.03,-.49,.055]} scale={[.18,.09,.22]} castShadow><sphereGeometry args={[1,16,12]}/><meshStandardMaterial color={CREAM} roughness={.98}/></mesh>
  {[-.11,-.04,.04,.11].map((dx,i)=><FurTuft key={i} position={[dx,-.47,.08]} rotation={[0,0,Math.PI]} scale={[.55,.8,.55]}/>) }
 </group>
}

function Ear({side,refCb}:{side:'left'|'right',refCb:(g:THREE.Group|null)=>void}){
 const z=side==='left'?.34:-.34
 return <group ref={refCb} position={[-.57,1.02,z]} rotation={[side==='left'?-.08:.08,0,side==='left'?.16:-.16]}>
  <mesh scale={[.22,.55,.23]} castShadow><sphereGeometry args={[1,22,18]}/><meshStandardMaterial color={DARK} roughness={1}/></mesh>
  {Array.from({length:9},(_,i)=><FurTuft key={i} color={DARK} position={[-.03,-.28+i*.07,side==='left'?.10:-.10]} rotation={[side==='left'?.18:-.18,0,Math.PI]} scale={[.55,.8,.55]}/>) }
 </group>
}

function Accessory({items}:{items:string[]}){
 if(items.includes('bow_red')) return <group position={[-.86,1.49,0]} rotation={[0,0,.08]}>
  <mesh position={[0,.02,.12]} scale={[.22,.13,.08]}><sphereGeometry args={[1,16,10]}/><meshStandardMaterial color="#e8455f"/></mesh>
  <mesh position={[0,.02,-.12]} scale={[.22,.13,.08]}><sphereGeometry args={[1,16,10]}/><meshStandardMaterial color="#e8455f"/></mesh>
  <mesh scale={[.08,.08,.08]}><sphereGeometry args={[1,16,10]}/><meshStandardMaterial color="#b8243d"/></mesh>
 </group>
 if(items.includes('gold_crown')||items.includes('diamond_crown')) return <group position={[-.78,1.53,0]}>
  <mesh rotation={[0,0,Math.PI]}><coneGeometry args={[.22,.23,5]}/><meshStandardMaterial color={items.includes('diamond_crown')?'#d8f4ff':'#e8b84f'} metalness={.35} roughness={.28}/></mesh>
 </group>
 if(items.includes('bandana')) return <mesh position={[-.42,.92,0]} rotation={[0,0,.12]}><torusGeometry args={[.28,.05,10,28]}/><meshStandardMaterial color="#e05268"/></mesh>
 return null
}

function DogRig({behavior,items}:{behavior:string;items:string[]}){
 const refs=useRef<RigRefs>({root:null,body:null,head:null,fl:null,fr:null,bl:null,br:null,tail:null,earL:null,earR:null})
 const phase=useRef(0)
 const energetic=useMemo(()=>new Set(['walk','run','play','wag']),[])
 useFrame((state,dt)=>{
  phase.current+=dt*(behavior==='run'?7:behavior==='walk'?4.2:behavior==='play'?5:2.1)
  const p=phase.current, r=refs.current, root=r.root
  if(!root)return
  const walking=behavior==='walk'||behavior==='run'
  const speed=behavior==='run'?1.65:.9
  if(walking){root.position.x=Math.sin(p*.38)*.75;root.rotation.y=Math.sin(p*.38)>0?0:Math.PI;root.position.y=.01+Math.abs(Math.sin(p*2))*.035}
  else {root.position.x=THREE.MathUtils.lerp(root.position.x,0,.05);root.rotation.y=THREE.MathUtils.lerp(root.rotation.y,0,.07);root.position.y=Math.sin(p)*.012}
  const swing=walking?Math.sin(p)*(.38*speed):0
  if(r.fl)r.fl.rotation.z=swing;if(r.br)r.br.rotation.z=swing;if(r.fr)r.fr.rotation.z=-swing;if(r.bl)r.bl.rotation.z=-swing
  if(r.body)r.body.rotation.z=walking?Math.sin(p*2)*.025:Math.sin(p)*.008
  if(r.head){r.head.rotation.z=behavior==='sniff'?Math.sin(p*2)*.08:Math.sin(p*.7)*.025;r.head.rotation.y=behavior==='sniff'?Math.sin(p)*.22:0;r.head.rotation.x=(behavior==='eat'||behavior==='drink') ? .36 : behavior==='sleep' ? .18 : 0}
  if(r.tail)r.tail.rotation.z=Math.sin(p*(energetic.has(behavior)?4.8:2.2))*(energetic.has(behavior)?.42:.17)
  if(r.earL)r.earL.rotation.x=Math.sin(p*1.5)*.035;if(r.earR)r.earR.rotation.x=-Math.sin(p*1.5)*.035
  if(behavior==='sit'){root.rotation.z=THREE.MathUtils.lerp(root.rotation.z,-.10,.04);root.position.y=-.08}else if(behavior==='sleep'||behavior==='rest'){root.rotation.z=THREE.MathUtils.lerp(root.rotation.z,-.38,.04);root.position.y=-.25}else root.rotation.z=THREE.MathUtils.lerp(root.rotation.z,0,.04)
 })
 return <group ref={g=>refs.current.root=g} position={[0,0,0]}>
  <group ref={g=>refs.current.body=g}>
   <mesh position={[.05,.78,0]} scale={[.58,.39,.37]} castShadow><sphereGeometry args={[1,32,24]}/><meshStandardMaterial color={BROWN} roughness={.92}/></mesh>
   <mesh position={[-.30,.90,0]} scale={[.40,.43,.37]} castShadow><sphereGeometry args={[1,28,20]}/><meshStandardMaterial color={CHEST} roughness={.96}/></mesh>
   {Array.from({length:20},(_,i)=>{const a=(i/20)*Math.PI*2;return <FurTuft key={i} position={[.18+Math.cos(a)*.54,.68+Math.sin(a)*.17,Math.sin(a)*.30]} rotation={[0,0,Math.PI]} scale={[.45,.75,.45]} color={i%3?BROWN:CREAM}/>})}
  </group>
  <group ref={g=>refs.current.head=g} position={[-.53,1.08,0]}>
   <mesh scale={[.56,.54,.49]} castShadow><sphereGeometry args={[1,28,24]}/><meshStandardMaterial color={BROWN} roughness={.94}/></mesh>
   <mesh position={[-.32,-.10,0]} scale={[.30,.19,.23]} castShadow><sphereGeometry args={[1,24,18]}/><meshStandardMaterial color={CREAM} roughness={.96}/></mesh>
   <mesh position={[-.53,-.06,0]} scale={[.13,.09,.115]} castShadow><sphereGeometry args={[1,22,16]}/><meshStandardMaterial color="#1e1715" roughness={.35}/></mesh>
   <mesh position={[-.31,.15,.30]} scale={[.078,.088,.052]}><sphereGeometry args={[1,18,14]}/><meshPhysicalMaterial color="#241b17" roughness={.12} clearcoat={1}/></mesh>
   <mesh position={[-.31,.15,-.30]} scale={[.078,.088,.052]}><sphereGeometry args={[1,18,14]}/><meshPhysicalMaterial color="#241b17" roughness={.12} clearcoat={1}/></mesh>
   <mesh position={[-.40,-.19,0]} rotation={[0,0,.08]} scale={[.12,.035,.12]}><sphereGeometry args={[1,16,12]}/><meshStandardMaterial color={PINK} roughness={.72}/></mesh>
  </group>
  <Ear side="left" refCb={g=>refs.current.earL=g}/><Ear side="right" refCb={g=>refs.current.earR=g}/>
  <Leg side="left" refCb={g=>refs.current.fl=g}/><Leg side="right" refCb={g=>refs.current.fr=g}/><Leg side="left" back refCb={g=>refs.current.bl=g}/><Leg side="right" back refCb={g=>refs.current.br=g}/>
  <group ref={g=>refs.current.tail=g} position={[.64,.96,0]} rotation={[0,0,-.42]}>
   <mesh position={[.22,.06,0]} rotation={[0,0,-.12]} scale={[.31,.12,.12]} castShadow><sphereGeometry args={[1,18,14]}/><meshStandardMaterial color={BROWN} roughness={.95}/></mesh>
   {Array.from({length:6},(_,i)=><FurTuft key={i} position={[.18+i*.07,.02,0]} rotation={[0,0,-Math.PI/2]} scale={[.5,.7,.5]} color={i%2?BROWN:CREAM}/>) }
  </group>
  <Accessory items={items}/>
 </group>
}

function Room(){return <group>
<mesh receiveShadow position={[0,-.33,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[7,5.2]}/><meshStandardMaterial color="#d9c8b4" roughness={.9}/></mesh>
<mesh position={[0,1.35,-1.45]}><planeGeometry args={[7,3.5]}/><meshStandardMaterial color="#f0e8dc" roughness={1}/></mesh>
<mesh position={[0,.12,-1.40]}><boxGeometry args={[7,.12,.10]}/><meshStandardMaterial color="#d2bfa9"/></mesh>
<group position={[1.35,1.48,-1.39]}><mesh><planeGeometry args={[1.35,1.55]}/><meshStandardMaterial color="#a9d5dc" emissive="#7fb8c2" emissiveIntensity={.20}/></mesh><mesh position={[0,0,.02]}><torusGeometry args={[.67,.055,12,48,Math.PI]}/><meshStandardMaterial color="#fffaf2"/></mesh><mesh position={[0,-.38,.03]}><boxGeometry args={[1.42,.07,.07]}/><meshStandardMaterial color="#fffaf2"/></mesh><mesh position={[0,0,.03]}><boxGeometry args={[.055,1.48,.06]}/><meshStandardMaterial color="#fffaf2"/></mesh></group>
<mesh receiveShadow position={[-.10,-.305,.02]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.55,64]}/><meshStandardMaterial color="#e9b7a7" roughness={1}/></mesh>
<group position={[1.55,-.10,-.62]}><mesh castShadow scale={[.75,.17,.55]}><sphereGeometry args={[1,28,18]}/><meshStandardMaterial color="#7f8fb0" roughness={.95}/></mesh><mesh position={[0,.10,0]} scale={[.57,.13,.40]}><sphereGeometry args={[1,24,16]}/><meshStandardMaterial color="#dfe7f0"/></mesh></group>
<mesh castShadow position={[-1.55,-.08,-.35]} rotation={[0,0,.45]}><torusGeometry args={[.16,.055,10,24]}/><meshStandardMaterial color="#f28c79"/></mesh>
<group position={[-2.05,-.12,-1.02]}><mesh position={[0,.18,0]}><cylinderGeometry args={[.23,.28,.38,20]}/><meshStandardMaterial color="#d59b73"/></mesh><mesh position={[0,.66,0]} scale={[.20,.55,.10]}><sphereGeometry args={[1,18,12]}/><meshStandardMaterial color="#6f917c"/></mesh></group>
</group>}
export default function CockerRealtime3D({behavior,items,name}:Props){
 return <div className="cocker-rt3d" aria-label={`${name}, Cocker Spaniel 3D articulado`}>
  <Canvas shadows dpr={[1,1.65]} camera={{position:[0.15,1.08,3.55],fov:30}} gl={{antialias:true,alpha:false,powerPreference:'high-performance'}}>
   <color attach="background" args={['#efe8de']}/>
   <fog attach="fog" args={['#efe8de',5.5,10]}/>
   <ambientLight intensity={1.15}/><directionalLight castShadow position={[-2,4,3]} intensity={2.7} color="#fff2df" shadow-mapSize-width={1024} shadow-mapSize-height={1024}/><pointLight position={[2,2,2]} intensity={1.5} color="#c9ddd5"/>
   <Room/><DogRig behavior={behavior||'idle'} items={items}/><ContactShadows position={[0,-.31,0]} opacity={.42} blur={2.2} scale={3.8}/>
  </Canvas>
 </div>
}
