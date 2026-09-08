'use client'

import {Canvas, useFrame, useThree} from '@react-three/fiber'
import {ContactShadows, OrbitControls, RoundedBox, Sparkles, useAnimations, useGLTF} from '@react-three/drei'
import {Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode} from 'react'
import * as THREE from 'three'
import {clone as skeletonClone} from 'three/examples/jsm/utils/SkeletonUtils.js'
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js'

type PetType='cocker'|'panda'|'shiba'|'capybara'
type Mood='happy'|'calm'|'sleepy'|'sick'|'dirty'|'bored'|'lonely'|string
type GrowthStage='baby'|'young'|'adult'
type PetBehavior='idle'|'walk'|'run'|'sit'|'sleep'|'eat'|'drink'|'play'|'pet'|'clean'|'care'|'bark'|'pant'|'lick'|'sniff'|'scratch'|'stretch'|'wag'|string
type PetModelProps={type:PetType;mood?:Mood;interactive?:boolean;items?:string[];behavior?:PetBehavior;behaviorNonce?:number}

type P3=[number,number,number]

const fur=(color:string,roughness=.86)=>({color,roughness,metalness:0,sheen:1,sheenRoughness:.82,sheenColor:new THREE.Color(color).lerp(new THREE.Color('#ffffff'),.16)})


function FurTufts({center=[0,0,0],radii=[.7,.7,.7],color,count=54,length=.055}:{center?:P3;radii?:P3;color:string;count?:number;length?:number}){
 const tufts=useMemo(()=>Array.from({length:count},(_,i)=>{
  const y=1-(i/(count-1))*2
  const rr=Math.sqrt(Math.max(0,1-y*y))
  const a=i*2.399963229728653
  const n=new THREE.Vector3(Math.cos(a)*rr,y,Math.sin(a)*rr).normalize()
  const pos=new THREE.Vector3(center[0]+n.x*radii[0],center[1]+n.y*radii[1],center[2]+n.z*radii[2])
  const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),n)
  return {p:[pos.x,pos.y,pos.z] as P3,q,s:.72+((i*37)%17)/40}
 }),[center[0],center[1],center[2],radii[0],radii[1],radii[2],count])
 return <group>{tufts.map((t,i)=><mesh key={i} position={t.p} quaternion={t.q} scale={t.s} castShadow={false}><coneGeometry args={[.018,length,5]}/><meshPhysicalMaterial color={color} roughness={1} sheen={1} sheenRoughness={.95}/></mesh>)}</group>
}

function Whiskers({color='#4a3e42',y=.34,z=.67}:{color?:string;y?:number;z?:number}){
 return <group>{[-1,1].flatMap(side=>[0,1,2].map((k)=>{const yy=y+(k-1)*.045;return <mesh key={`${side}-${k}`} position={[side*.23,yy,z]} rotation={[0,0,side*(.13+(k-1)*.08)]}><cylinderGeometry args={[.004,.002,.38,6]}/><meshBasicMaterial color={color}/></mesh>}))}</group>
}

function Eye({position, sleepy=false, scale=1}:{position:P3;sleepy?:boolean;scale?:number}){
 if(sleepy)return <group position={position} scale={scale}><mesh rotation={[0,0,.08]} scale={[1,.12,.35]}><sphereGeometry args={[.092,24,16]}/><meshStandardMaterial color="#221d20" roughness={.58}/></mesh></group>
 return <group position={position} scale={scale}>
  <mesh><sphereGeometry args={[.086,32,22]}/><meshPhysicalMaterial color="#171419" roughness={.08} clearcoat={1} clearcoatRoughness={.03}/></mesh>
  <mesh position={[0,0,.074]}><sphereGeometry args={[.050,24,18]}/><meshPhysicalMaterial color="#4b3026" roughness={.18} clearcoat={1} clearcoatRoughness={.04}/></mesh>
  <mesh position={[0,0,.093]}><sphereGeometry args={[.024,20,14]}/><meshBasicMaterial color="#08070a"/></mesh>
  <mesh position={[-.025,.032,.098]}><sphereGeometry args={[.021,16,10]}/><meshBasicMaterial color="#fffdfb"/></mesh>
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
  <mesh scale={[.88,.48,1.12]} castShadow><sphereGeometry args={[.25,30,20]}/><meshPhysicalMaterial {...fur(cream?'#ead9c2':color,.88)}/></mesh>
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
  <mesh position={[0,-.19,0]} scale={[.78,.75,.75]} castShadow><sphereGeometry args={[.75,48,32]}/><meshPhysicalMaterial {...fur('#b96d47')}/></mesh>
  <FurShell position={[0,-.19,0]} scale={[.79,.76,.76]} color="#d18b66" opacity={.11}/>
  <mesh position={[0,.48,.04]} scale={[.86,1,.82]} castShadow><sphereGeometry args={[.65,48,34]}/><meshPhysicalMaterial {...fur('#c98358',.9)}/></mesh>
  <FurShell position={[0,.48,.04]} scale={[.77,.88,.73]} color="#e5ad88" opacity={.10}/>
  <mesh position={[-.59,.39,-.02]} rotation={[0,.12,.18]} scale={[.54,1.42,.30]} castShadow><sphereGeometry args={[.43,40,28]}/><meshPhysicalMaterial {...fur('#70402f',.96)}/></mesh>
  <mesh position={[.59,.39,-.02]} rotation={[0,-.12,-.18]} scale={[.54,1.42,.30]} castShadow><sphereGeometry args={[.43,40,28]}/><meshPhysicalMaterial {...fur('#70402f',.96)}/></mesh>
  <mesh position={[0,.31,.40]} scale={[1.08,.72,.72]} castShadow><sphereGeometry args={[.37,38,26]}/><meshPhysicalMaterial {...fur('#edcfb2',.86)}/></mesh>
  <Eye position={[-.23,.59,.54]} sleepy={sleepy}/><Eye position={[.23,.59,.54]} sleepy={sleepy}/><Nose position={[0,.42,.64]} scale={.96}/><Mouth mood={mood} z={.67}/><Blush x={-.37} z={.59}/><Blush x={.37} z={.59}/>
  {!sleepy&&mood!=='calm'&&<mesh position={[0,.16,.705]} rotation={[.16,0,0]} scale={[.9,1.1,.55]}><sphereGeometry args={[.09,20,14]}/><meshPhysicalMaterial color="#df7f8e" roughness={.5} clearcoat={.2}/></mesh>}
  <Paw position={[-.29,-.79,.22]} color="#bd744e"/><Paw position={[.29,-.79,.22]} color="#bd744e"/>
  <mesh position={[.62,-.32,-.24]} rotation={[0,0,-.63]} scale={[.29,.98,.29]} castShadow><capsuleGeometry args={[.16,.76,10,18]}/><meshPhysicalMaterial {...fur('#925239')}/></mesh>
  <FurTufts center={[0,.43,.02]} radii={[.57,.67,.58]} color="#d79a71" count={72} length={.065}/><Whiskers y={.34} z={.70}/><Collar color="#a16ed5"/>
 </group>
}

function Panda({mood='happy'}:{mood?:Mood}){
 const sleepy=mood==='sleepy'||mood==='sick'
 return <group>
  <mesh position={[0,-.22,0]} scale={[.84,.78,.77]} castShadow><sphereGeometry args={[.73,48,34]}/><meshPhysicalMaterial {...fur('#26252b',.92)}/></mesh>
  <mesh position={[0,-.17,.38]} scale={[.68,.75,.49]} castShadow><sphereGeometry args={[.67,44,30]}/><meshPhysicalMaterial {...fur('#f1efea',.94)}/></mesh>
  <FurShell position={[0,-.17,.38]} scale={[.62,.68,.45]} color="#ffffff" opacity={.09}/>
  <mesh position={[0,.49,.04]} scale={[.92,1,.86]} castShadow><sphereGeometry args={[.64,50,36]}/><meshPhysicalMaterial {...fur('#f5f2ec',.95)}/></mesh>
  <FurShell position={[0,.49,.04]} scale={[.83,.90,.77]} color="#ffffff" opacity={.08}/>
  <mesh position={[-.43,.94,-.02]} castShadow><sphereGeometry args={[.255,32,22]}/><meshPhysicalMaterial {...fur('#242329')}/></mesh><mesh position={[.43,.94,-.02]} castShadow><sphereGeometry args={[.255,32,22]}/><meshPhysicalMaterial {...fur('#242329')}/></mesh>
  <mesh position={[-.25,.59,.49]} rotation={[0,0,-.29]} scale={[1,.80,.44]}><sphereGeometry args={[.225,28,20]}/><meshPhysicalMaterial {...fur('#242329')}/></mesh><mesh position={[.25,.59,.49]} rotation={[0,0,.29]} scale={[1,.80,.44]}><sphereGeometry args={[.225,28,20]}/><meshPhysicalMaterial {...fur('#242329')}/></mesh>
  <Eye position={[-.25,.615,.665]} sleepy={sleepy} scale={.96}/><Eye position={[.25,.615,.665]} sleepy={sleepy} scale={.96}/><Nose position={[0,.39,.65]} scale={.88}/><Mouth mood={mood} z={.68}/><Blush x={-.39} z={.61}/><Blush x={.39} z={.61}/>
  <Paw position={[-.31,-.78,.17]} color="#25242a"/><Paw position={[.31,-.78,.17]} color="#25242a"/>
  <FurTufts center={[0,.47,.02]} radii={[.60,.67,.58]} color="#f4f0e9" count={58} length={.045}/><Whiskers y={.34} z={.69}/><Collar color="#d56d91"/>
 </group>
}

function Shiba({mood='happy'}:{mood?:Mood}){
 const sleepy=mood==='sleepy'||mood==='sick'
 return <group>
  <mesh position={[0,-.20,0]} scale={[.79,.77,.73]} castShadow><sphereGeometry args={[.73,48,32]}/><meshPhysicalMaterial {...fur('#d77f45',.90)}/></mesh>
  <FurShell position={[0,-.20,0]} scale={[.73,.71,.67]} color="#efad73" opacity={.08}/>
  <mesh position={[0,.49,.02]} scale={[.88,1,.82]} castShadow><sphereGeometry args={[.64,48,34]}/><meshPhysicalMaterial {...fur('#e39555',.90)}/></mesh>
  <mesh position={[-.35,1.02,-.02]} rotation={[0,0,-.12]} castShadow><coneGeometry args={[.25,.64,5]}/><meshPhysicalMaterial {...fur('#d57942')}/></mesh><mesh position={[.35,1.02,-.02]} rotation={[0,0,.12]} castShadow><coneGeometry args={[.25,.64,5]}/><meshPhysicalMaterial {...fur('#d57942')}/></mesh>
  <mesh position={[0,.27,.43]} scale={[1.22,.76,.72]} castShadow><sphereGeometry args={[.35,36,24]}/><meshPhysicalMaterial {...fur('#f4dfbd',.93)}/></mesh>
  <Eye position={[-.23,.60,.53]} sleepy={sleepy}/><Eye position={[.23,.60,.53]} sleepy={sleepy}/><Nose position={[0,.42,.62]} scale={.84}/><Mouth mood={mood} z={.65}/><Blush x={-.37} z={.58}/><Blush x={.37} z={.58}/>
  <Paw position={[-.28,-.78,.19]} color="#d77f45" cream/><Paw position={[.28,-.78,.19]} color="#d77f45" cream/>
  <mesh position={[.67,-.26,-.16]} rotation={[0,0,-.80]} castShadow><torusGeometry args={[.29,.10,14,32,4.8]}/><meshPhysicalMaterial {...fur('#c66f3f')}/></mesh>
  <FurTufts center={[0,.47,.02]} radii={[.58,.68,.58]} color="#e9a46a" count={62} length={.050}/><Whiskers y={.35} z={.67}/><Collar color="#69a7b8"/>
 </group>
}

function Capybara({mood='happy'}:{mood?:Mood}){
 const sleepy=mood==='sleepy'||mood==='sick'
 return <group>
  <mesh position={[0,-.17,0]} scale={[1.04,.73,.80]} castShadow><sphereGeometry args={[.72,48,32]}/><meshPhysicalMaterial {...fur('#97684f',.96)}/></mesh>
  <FurShell position={[0,-.17,0]} scale={[.96,.68,.74]} color="#c39a7b" opacity={.08}/>
  <mesh position={[0,.43,.13]} scale={[.98,1,.90]} castShadow><sphereGeometry args={[.63,46,32]}/><meshPhysicalMaterial {...fur('#a67759',.95)}/></mesh>
  <mesh position={[-.35,.93,.02]} castShadow><sphereGeometry args={[.165,26,18]}/><meshPhysicalMaterial {...fur('#75503f')}/></mesh><mesh position={[.35,.93,.02]} castShadow><sphereGeometry args={[.165,26,18]}/><meshPhysicalMaterial {...fur('#75503f')}/></mesh>
  <mesh position={[0,.32,.50]} scale={[1.36,.78,.66]} castShadow><sphereGeometry args={[.35,38,26]}/><meshPhysicalMaterial {...fur('#bd8b6b',.93)}/></mesh>
  <Eye position={[-.27,.60,.57]} sleepy={sleepy} scale={.9}/><Eye position={[.27,.60,.57]} sleepy={sleepy} scale={.9}/><Nose position={[0,.41,.70]} scale={.96}/><Mouth mood={mood} z={.73}/><Blush x={-.41} z={.63}/><Blush x={.41} z={.63}/>
  <Paw position={[-.32,-.78,.15]} color="#805943"/><Paw position={[.32,-.78,.15]} color="#805943"/>
  <FurTufts center={[0,.42,.10]} radii={[.62,.64,.60]} color="#b18467" count={48} length={.040}/><Whiskers y={.34} z={.75}/><Collar color="#5b9f83"/>
 </group>
}


function Wearables({items=[]}:{items?:string[]}){
 const has=(k:string)=>items.includes(k)
 const textile=(color:string)=><meshPhysicalMaterial color={color} roughness={.84} metalness={0} sheen={.42} sheenRoughness={.78}/>
 const glossy=(color:string)=><meshPhysicalMaterial color={color} roughness={.16} metalness={.08} clearcoat={.92} clearcoatRoughness={.08}/>
 const metal=(color:string)=><meshPhysicalMaterial color={color} roughness={.22} metalness={.82} clearcoat={.28} clearcoatRoughness={.14}/>
 return <group>
  {has('bow_red')&&<group position={[0,1.18,.08]} rotation={[0,0,-.08]}><mesh position={[-.16,0,0]} rotation={[0,0,.55]}><sphereGeometry args={[.13,20,12]}/>{textile('#ef6f91')}</mesh><mesh position={[.16,0,0]} rotation={[0,0,-.55]}><sphereGeometry args={[.13,20,12]}/>{textile('#ef6f91')}</mesh><mesh><sphereGeometry args={[.07,16,10]}/>{glossy('#d94e76')}</mesh></group>}
  {has('cap')&&<group position={[0,1.16,.02]} rotation={[0.08,0,0]}><mesh><sphereGeometry args={[.42,28,18,0,Math.PI*2,0,Math.PI/2]}/>{textile('#6f86d6')}</mesh><mesh position={[0,-.02,.34]} scale={[1.2,.18,.55]}><sphereGeometry args={[.22,20,12]}/>{textile('#5b70bd')}</mesh></group>}
  {has('flower_crown')&&<group position={[0,1.18,.05]}>{[-.28,-.14,0,.14,.28].map((x,i)=><mesh key={i} position={[x,Math.abs(x)*-.08,.26-Math.abs(x)*.18]}><sphereGeometry args={[.085,16,10]}/><meshPhysicalMaterial color={i%2?'#ffd0df':'#fff0a8'} roughness={.72} sheen={.32} sheenRoughness={.82}/></mesh>)}</group>}
  {has('gold_crown')&&<group position={[0,1.28,.04]}><mesh><cylinderGeometry args={[.30,.36,.20,5,1,true]}/>{metal('#e2b84b')}</mesh><mesh position={[0,.12,0]}><torusGeometry args={[.31,.035,10,28]}/>{metal('#f0cc62')}</mesh></group>}
  {has('diamond_crown')&&<group position={[0,1.30,.04]}><mesh><cylinderGeometry args={[.32,.38,.22,7,1,true]}/><meshPhysicalMaterial color="#d6eef7" metalness={.62} roughness={.10} clearcoat={1} clearcoatRoughness={.04}/></mesh><mesh position={[0,.05,.31]}><octahedronGeometry args={[.08,0]}/><meshPhysicalMaterial color="#8ee7ff" emissive="#4dc7f0" emissiveIntensity={.28} transmission={.18} roughness={.08} clearcoat={1}/></mesh></group>}
  {has('round_glasses')&&<group position={[0,.62,.65]}><mesh position={[-.25,0,0]}><torusGeometry args={[.13,.018,10,28]}/>{metal('#2d2730')}</mesh><mesh position={[.25,0,0]}><torusGeometry args={[.13,.018,10,28]}/>{metal('#2d2730')}</mesh><mesh scale={[.12,.015,.015]}><boxGeometry args={[1,1,1]}/>{metal('#2d2730')}</mesh></group>}
  {has('heart_glasses')&&<group position={[0,.62,.67]}>{[-.25,.25].map((x,i)=><group key={i} position={[x,0,0]}><mesh rotation={[0,0,Math.PI/4]} scale={[1,.9,.15]}><boxGeometry args={[.18,.18,.04]}/><meshPhysicalMaterial color="#f06f9c" transparent opacity={.68} roughness={.10} clearcoat={1} transmission={.08}/></mesh></group>)}<mesh scale={[.12,.015,.015]}><boxGeometry args={[1,1,1]}/>{metal('#b8416a')}</mesh></group>}
  {has('bandana')&&<group position={[0,.12,.34]}><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.48,.045,12,36]}/>{textile('#df5e66')}</mesh><mesh position={[0,-.08,.40]} rotation={[0,0,Math.PI/4]}><planeGeometry args={[.26,.26]}/><meshPhysicalMaterial color="#df5e66" side={THREE.DoubleSide} roughness={.9} sheen={.38}/></mesh></group>}
  {has('hoodie')&&<mesh position={[0,-.20,.04]} scale={[1.03,.82,.88]}><sphereGeometry args={[.69,32,22,0,Math.PI*2,.48,2.15]}/><meshPhysicalMaterial color="#b5a5e8" roughness={.94} sheen={.48} sheenRoughness={.82} transparent opacity={.90}/></mesh>}
  {has('royal_cape')&&<mesh position={[0,-.15,-.40]} rotation={[-.14,0,0]}><planeGeometry args={[1.18,1.35,1,1]}/><meshPhysicalMaterial color="#7f2945" side={THREE.DoubleSide} roughness={.78} sheen={.62} sheenRoughness={.66}/></mesh>}
  {has('astronaut')&&<group><mesh position={[0,-.22,.02]} scale={[1.10,.86,.94]}><sphereGeometry args={[.70,32,22,0,Math.PI*2,.45,2.18]}/><meshPhysicalMaterial color="#edf2f6" roughness={.34} metalness={.10} clearcoat={.34} clearcoatRoughness={.22}/></mesh><mesh position={[0,.50,.64]}><torusGeometry args={[.48,.035,12,36]}/>{metal('#6d7b8f')}</mesh></group>}
  {has('angel_wings')&&<group position={[0,.05,-.52]}>{[-1,1].map((d)=><mesh key={d} position={[d*.48,.15,0]} rotation={[0,d*.35,d*.20]} scale={[.75,1.35,.20]}><sphereGeometry args={[.34,24,16]}/><meshPhysicalMaterial color="#fffaf1" emissive="#fff4d8" emissiveIntensity={.08} roughness={.86} sheen={.58} sheenRoughness={.82}/></mesh>)}</group>}
  {has('costume_blue_alien')&&<group><mesh position={[0,-.18,.02]} scale={[1.06,.84,.90]}><sphereGeometry args={[.70,30,20,0,Math.PI*2,.48,2.12]}/>{textile('#48a8c9')}</mesh><mesh position={[0,1.28,.03]}><coneGeometry args={[.12,.32,18]}/>{glossy('#3d91b4')}</mesh><mesh position={[0,1.45,.03]}><sphereGeometry args={[.07,16,10]}/>{glossy('#77d5e9')}</mesh></group>}
  {has('costume_toy_sheriff')&&<group><mesh position={[0,-.20,.02]} scale={[1.04,.82,.89]}><sphereGeometry args={[.69,30,20,0,Math.PI*2,.50,2.10]}/>{textile('#d8b35e')}</mesh><mesh position={[0,1.18,.02]} scale={[1,.28,1]}><cylinderGeometry args={[.43,.43,.16,28]}/>{textile('#8a5a35')}</mesh><mesh position={[.32,.08,.55]}><octahedronGeometry args={[.10,0]}/>{metal('#e0b94f')}</mesh></group>}
  {has('costume_space_ranger')&&<group><mesh position={[0,-.20,.02]} scale={[1.08,.84,.92]}><sphereGeometry args={[.70,30,20,0,Math.PI*2,.48,2.12]}/><meshPhysicalMaterial color="#f2f5f1" roughness={.30} clearcoat={.45}/></mesh><mesh position={[0,.18,.62]}><boxGeometry args={[.42,.22,.05]}/>{glossy('#6f64c9')}</mesh><mesh position={[-.48,.05,0]}><sphereGeometry args={[.16,18,12]}/>{glossy('#65b982')}</mesh><mesh position={[.48,.05,0]}><sphereGeometry args={[.16,18,12]}/>{glossy('#65b982')}</mesh></group>}
  {has('costume_dino')&&<group><mesh position={[0,-.18,.0]} scale={[1.07,.84,.91]}><sphereGeometry args={[.70,30,20,0,Math.PI*2,.48,2.12]}/>{textile('#69a96f')}</mesh>{[.25,.55,.85,1.12].map((y,i)=><mesh key={i} position={[0,y,-.48+i*.02]} rotation={[Math.PI/2,0,0]}><coneGeometry args={[.10,.22,12]}/>{glossy('#e5b956')}</mesh>)}</group>}
  {has('costume_dragon')&&<group><mesh position={[0,-.18,0]} scale={[1.07,.84,.91]}><sphereGeometry args={[.70,30,20,0,Math.PI*2,.48,2.12]}/>{textile('#7558a8')}</mesh>{[-1,1].map(d=><mesh key={d} position={[d*.48,.15,-.48]} rotation={[0,d*.35,d*.35]} scale={[.55,.95,.12]}><sphereGeometry args={[.32,20,14]}/><meshPhysicalMaterial color="#9a7bd0" roughness={.7} sheen={.35}/></mesh>)}</group>}
  {has('costume_ninja')&&<group><mesh position={[0,-.18,.02]} scale={[1.05,.83,.90]}><sphereGeometry args={[.70,30,20,0,Math.PI*2,.48,2.12]}/>{textile('#292b36')}</mesh><mesh position={[0,.68,.50]} scale={[1.0,.20,.72]}><sphereGeometry args={[.48,24,16]}/>{textile('#20222b')}</mesh></group>}
  {has('costume_knight')&&<group><mesh position={[0,-.18,.02]} scale={[1.05,.83,.90]}><sphereGeometry args={[.70,30,20,0,Math.PI*2,.48,2.12]}/>{metal('#aab3bc')}</mesh><mesh position={[.50,.10,.12]} rotation={[0,0,.2]}><cylinderGeometry args={[.24,.24,.08,24]}/>{metal('#78838d')}</mesh></group>}
  {has('costume_wizard')&&<group><mesh position={[0,-.18,-.30]} rotation={[-.12,0,0]}><planeGeometry args={[1.15,1.30]}/>{textile('#55408f')}</mesh><mesh position={[0,1.35,.02]}><coneGeometry args={[.36,.72,24]}/>{textile('#433374')}</mesh><mesh position={[.10,1.45,.30]}><sphereGeometry args={[.045,12,8]}/><meshBasicMaterial color="#ffe27a" toneMapped={false}/></mesh></group>}
  {has('costume_chef')&&<group><mesh position={[0,-.18,.02]} scale={[1.05,.83,.90]}><sphereGeometry args={[.70,30,20,0,Math.PI*2,.48,2.12]}/>{textile('#f1eee7')}</mesh><group position={[0,1.28,.02]}>{[-.18,0,.18].map((x,i)=><mesh key={i} position={[x,0,0]}><sphereGeometry args={[.20,18,12]}/>{textile('#faf8f2')}</mesh>)}</group></group>}
  {has('costume_firefighter')&&<group><mesh position={[0,-.18,.02]} scale={[1.05,.83,.90]}><sphereGeometry args={[.70,30,20,0,Math.PI*2,.48,2.12]}/>{textile('#b9413d')}</mesh><mesh position={[0,1.20,.02]} scale={[1,.30,1]}><sphereGeometry args={[.43,24,16]}/>{glossy('#d8b33f')}</mesh></group>}
  {has('costume_football')&&<group><mesh position={[0,-.18,.02]} scale={[1.05,.83,.90]}><sphereGeometry args={[.70,30,20,0,Math.PI*2,.48,2.12]}/>{textile('#4d8fc5')}</mesh><mesh position={[0,.05,.63]}><circleGeometry args={[.13,24]}/><meshBasicMaterial color="#f4f0df"/></mesh></group>}
  {has('costume_superhero')&&<group><mesh position={[0,-.18,.02]} scale={[1.05,.83,.90]}><sphereGeometry args={[.70,30,20,0,Math.PI*2,.48,2.12]}/>{textile('#4268a8')}</mesh><mesh position={[0,-.12,-.43]} rotation={[-.12,0,0]}><planeGeometry args={[1.05,1.25]}/>{textile('#b84652')}</mesh><mesh position={[0,.12,.63]}><octahedronGeometry args={[.12,0]}/>{metal('#e7c557')}</mesh></group>}
  {has('costume_monster')&&<group><mesh position={[0,-.18,.02]} scale={[1.08,.86,.93]}><sphereGeometry args={[.71,30,20,0,Math.PI*2,.48,2.12]}/><meshPhysicalMaterial color="#7e68a8" roughness={.95} sheen={.65} sheenRoughness={.9}/></mesh>{[-.22,.22].map(x=><mesh key={x} position={[x,1.25,.02]}><coneGeometry args={[.09,.25,14]}/>{glossy('#80c5bb')}</mesh>)}</group>}
  {has('costume_halloween')&&<group><mesh position={[0,-.18,-.30]}><planeGeometry args={[1.15,1.28]}/>{textile('#2f2938')}</mesh><mesh position={[0,1.32,.02]}><coneGeometry args={[.38,.72,24]}/>{textile('#342b45')}</mesh><mesh position={[0,.10,.62]}><sphereGeometry args={[.10,18,12]}/><meshBasicMaterial color="#f39b42" toneMapped={false}/></mesh></group>}
  {has('costume_winter')&&<group><mesh position={[0,-.18,.02]} scale={[1.07,.85,.91]}><sphereGeometry args={[.70,30,20,0,Math.PI*2,.48,2.12]}/>{textile('#b94f5e')}</mesh><mesh position={[0,.42,.40]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.48,.08,12,32]}/>{textile('#f4eee3')}</mesh><mesh position={[0,1.28,.02]}><coneGeometry args={[.32,.55,24]}/>{textile('#b94f5e')}</mesh></group>}
  {has('costume_royal')&&<group><mesh position={[0,-.18,-.32]}><planeGeometry args={[1.20,1.36]}/><meshPhysicalMaterial color="#432e79" roughness={.58} sheen={.7} sheenRoughness={.55}/></mesh><mesh position={[0,1.30,.02]}><cylinderGeometry args={[.31,.37,.22,7,1,true]}/>{metal('#e2bd55')}</mesh><mesh position={[0,.10,.62]}><octahedronGeometry args={[.11,0]}/><meshPhysicalMaterial color="#a8e8ff" emissive="#55c7ed" emissiveIntensity={.25} roughness={.08} clearcoat={1}/></mesh></group>}
 </group>
}


function PBREnvironment({intensity=1}:{intensity?:number}){
 const {gl,scene}=useThree()
 useEffect(()=>{
  const pmrem=new THREE.PMREMGenerator(gl)
  pmrem.compileEquirectangularShader()
  const room=new RoomEnvironment()
  const env=pmrem.fromScene(room,.04).texture
  const prev=scene.environment
  const prevIntensity=(scene as any).environmentIntensity
  scene.environment=env
  ;(scene as any).environmentIntensity=intensity
  return()=>{
   scene.environment=prev
   ;(scene as any).environmentIntensity=prevIntensity
   env.dispose();pmrem.dispose()
  }
 },[gl,scene,intensity])
 return null
}

function useCockerPBRMaterials(){
 return useMemo(()=>{
  const size=128,data=new Uint8Array(size*size*4)
  let seed=26731
  for(let i=0;i<size*size;i++){
   seed=(seed*1664525+1013904223)>>>0
   const grain=148+Math.floor(((seed>>>8)&255)*.34)
   const strand=(i%size)%7===0?18:0
   const v=Math.min(235,grain+strand)
   data[i*4]=v;data[i*4+1]=v;data[i*4+2]=v;data[i*4+3]=255
  }
  const furMap=new THREE.DataTexture(data,size,size,THREE.RGBAFormat)
  furMap.wrapS=furMap.wrapT=THREE.RepeatWrapping;furMap.repeat.set(5,7);furMap.colorSpace=THREE.SRGBColorSpace;furMap.needsUpdate=true
  const make=(opts:THREE.MeshPhysicalMaterialParameters)=>new THREE.MeshPhysicalMaterial({vertexColors:true,metalness:0,...opts})
  return {
   fur:make({color:'#b86a36',map:furMap,roughness:.88,sheen:.56,sheenRoughness:.78,sheenColor:new THREE.Color('#f5b77f'),clearcoat:.025,clearcoatRoughness:.86}),
   lightFur:make({color:'#dba775',map:furMap,roughness:.92,sheen:.58,sheenRoughness:.80,sheenColor:new THREE.Color('#ffe2bd'),clearcoat:.018}),
   darkFur:make({color:'#6f351f',map:furMap,roughness:.91,sheen:.46,sheenRoughness:.84,sheenColor:new THREE.Color('#bd714c'),clearcoat:.015}),
   eye:make({roughness:.055,clearcoat:1,clearcoatRoughness:.025,ior:1.45,specularIntensity:1}),
   iris:make({roughness:.12,clearcoat:.82,clearcoatRoughness:.035,ior:1.4,specularIntensity:1}),
   nose:make({roughness:.20,clearcoat:.72,clearcoatRoughness:.10,ior:1.4,specularIntensity:.9}),
   mouth:make({roughness:.42,clearcoat:.14,clearcoatRoughness:.34,sheen:.12,sheenRoughness:.6}),
   tongue:make({roughness:.43,clearcoat:.12,clearcoatRoughness:.28,sheen:.18,sheenRoughness:.58}),
   collar:make({roughness:.26,clearcoat:.48,clearcoatRoughness:.16}),
   tag:make({roughness:.20,metalness:.72,clearcoat:.28,clearcoatRoughness:.18}),
   highlight:new THREE.MeshBasicMaterial({vertexColors:true,toneMapped:false})
  }
 },[])
}

const RIGGED_PET_ASSETS:Partial<Record<PetType,{url:string;label:string}>>={
 // V20 ships the Cocker asset locally, so Vercel serves it with the app and no external download is required.
 cocker:{url:'/models/pets/cocker.glb',label:'Cocker Spaniel local GLB'},
 shiba:{url:'https://raw.githubusercontent.com/agentkaerf/FreeModels/main/Ultimate%20Animated%20Animals%20-%20July%202021/glTF/ShibaInu.gltf',label:'Shiba Inu rig'},
 capybara:{url:'https://gobkit.com/freebies/animalB/Marmot.glb',label:'rodent rig'}
}

if(typeof window!=='undefined'){useGLTF.preload('/models/pets/cocker.glb')}

class PetAssetBoundary extends Component<{fallback:ReactNode;children:ReactNode},{failed:boolean}>{
 state={failed:false}
 static getDerivedStateFromError(){return {failed:true}}
 componentDidCatch(error:unknown){console.warn('[Pandalandia] Pet GLTF fallback:',error)}
 render(){return this.state.failed?this.props.fallback:this.props.children}
}

function clipForBehavior(names:string[],behavior:PetBehavior,mood:Mood){
 const map:Record<string,string[]>={
  idle:['idle','stand','survey','breath'],walk:['walk','walking','trot'],run:['run','running','sprint'],sit:['sit','sitting'],sleep:['sleep','lie','lay','down'],
  eat:['eat','eating','bite','chew'],drink:['drink','drinking','lap'],play:['play','jump','run','attack'],pet:['happy','idle','wag'],clean:['shake','scratch','idle'],care:['sit','idle'],
  bark:['bark','attack','howl'],pant:['pant','idle'],lick:['lick','idle'],sniff:['sniff','survey','idle'],scratch:['scratch','idle'],stretch:['stretch','idle'],wag:['wag','happy','idle']
 }
 const desired=[...(map[behavior]||[]),...(mood==='bored'?['walk','run']:mood==='sleepy'||mood==='sick'?['sit','sleep']:['idle','stand','walk'])]
 for(const d of desired){const exact=names.find(n=>n.toLowerCase()===d);if(exact)return exact;const fuzzy=names.find(n=>n.toLowerCase().includes(d));if(fuzzy)return fuzzy}
 return names[0]
}

function SyntheticDogDetails({behavior}:{behavior:PetBehavior}){
 // Used only as a safety detail for third-party dog rigs without a tongue mesh.
 const tongue=['pant','lick','eat','drink'].includes(String(behavior))
 return <group>{tongue&&<mesh position={[0,.05,.63]} rotation={[.25,0,0]} scale={[1,.8,.35]}><capsuleGeometry args={[.055,.18,8,14]}/><meshPhysicalMaterial color="#e98698" roughness={.48} clearcoat={.18}/></mesh>}</group>
}

function RiggedPetAsset({type,mood='happy',behavior='idle'}:{type:PetType;mood?:Mood;behavior?:PetBehavior}){
 const asset=RIGGED_PET_ASSETS[type]!
 const gltf=useGLTF(asset.url)
 const model=useMemo(()=>skeletonClone(gltf.scene),[gltf.scene])
 const root=useRef<THREE.Group>(null)
 const visual=useRef<THREE.Group>(null)
 const pbr=useCockerPBRMaterials()
 const {actions,names,mixer}=useAnimations(gltf.animations,root)
 const normalization=useMemo(()=>{
  model.updateMatrixWorld(true)
  const box=new THREE.Box3().setFromObject(model),size=new THREE.Vector3(),center=new THREE.Vector3()
  box.getSize(size);box.getCenter(center)
  const scale=size.y>0?1.72/size.y:1
  return {scale,offset:new THREE.Vector3(-center.x*scale,-box.min.y*scale-.94,-center.z*scale)}
 },[model])
 useEffect(()=>{
  const lightFur=/Chest|Muzzle|Paw|NeckFluff/i,darkFur=/Ear|Tail|Brow|HeadTuft/i
  model.traverse((o:any)=>{
   if(!o?.isMesh)return
   o.castShadow=true;o.receiveShadow=true
   if(o.geometry&&!o.geometry.getAttribute('normal'))o.geometry.computeVertexNormals()
   if(type==='cocker'){
    const n=String(o.name||'')
    // V26: de-cartoon the local mesh without increasing polygon count.  The source
    // GLB is intentionally mobile-sized, so we refine proportions in place.
    if(o.geometry&&!o.userData.v29Refined){
     const refine=(sx:number,sy:number,sz:number)=>{o.geometry=o.geometry.clone();o.geometry.computeBoundingBox();const b=o.geometry.boundingBox;if(!b)return;const c=new THREE.Vector3();b.getCenter(c);const pos=o.geometry.getAttribute('position') as THREE.BufferAttribute;for(let i=0;i<pos.count;i++){pos.setXYZ(i,c.x+(pos.getX(i)-c.x)*sx,c.y+(pos.getY(i)-c.y)*sy,c.z+(pos.getZ(i)-c.z)*sz)}pos.needsUpdate=true;o.geometry.computeVertexNormals();o.geometry.computeBoundingSphere()}
     if(/^Eye_/i.test(n))refine(1.12,1.08,1.06)
     else if(/^Iris_/i.test(n))refine(1.16,1.14,1.08)
     else if(/EyeHighlight/i.test(n))refine(1.18,1.18,1.10)
     else if(/Brow_/i.test(n))refine(.92,.78,.90)
     else if(/^Nose$/i.test(n))refine(.76,.72,.78)
     else if(/^MuzzleTop$/i.test(n))refine(.88,.82,1.04)
     else if(/^Muzzle$/i.test(n))refine(.90,.86,1.08)
     else if(/^Head$/i.test(n))refine(.88,.94,.92)
     else if(/^Crown$/i.test(n))refine(.90,.92,.92)
     else if(/^Ear_/i.test(n))refine(.92,1.22,.76)
     else if(/EarFeather/i.test(n))refine(.94,1.10,.84)
     else if(/^Chest$/i.test(n))refine(1.02,1.06,.92)
     o.userData.v29Refined=true
    }
    if(/EyeHighlight/i.test(n))o.material=pbr.highlight
    else if(/^Eye_/i.test(n)){o.material=pbr.eye;o.renderOrder=3}
    else if(/^Iris_/i.test(n)){o.material=pbr.iris;o.renderOrder=4}
    else if(/Nose/i.test(n))o.material=pbr.nose
    else if(/Tongue/i.test(n))o.material=pbr.tongue
    else if(/LowerLip/i.test(n))o.material=pbr.mouth
    else if(/Collar/i.test(n))o.material=pbr.collar
    else if(/^Tag$/i.test(n))o.material=pbr.tag
    else if(lightFur.test(n))o.material=pbr.lightFur
    else if(darkFur.test(n))o.material=pbr.darkFur
    else o.material=pbr.fur
   }else if(o.material){
    o.material.roughness=Math.min(.92,Math.max(.35,o.material.roughness??.7));o.material.needsUpdate=true
   }
  })
  return()=>{
   if(type==='cocker')Object.values(pbr).forEach((m:any)=>m?.dispose?.())
  }
 },[model,type,pbr])
 useEffect(()=>{
  const name=clipForBehavior(names,behavior,mood);if(!name)return
  const next=actions[name];if(!next)return
  Object.values(actions).forEach(a=>a&&a!==next&&a.fadeOut(.22))
  next.reset().setLoop(THREE.LoopRepeat,Infinity).fadeIn(.28).play()
  next.timeScale=(mood==='sick'||mood==='sleepy')?.58:behavior==='run'?1.18:1
  return()=>{next.fadeOut(.2)}
 },[actions,names,mood,behavior])
 const cockerParts=useMemo(()=>{
  if(type!=='cocker')return null
  const names=['Body','Ribcage','Chest','Neck','Head','Ear_L','Ear_R','Tail','Tongue','Leg_FL','LowerLeg_FL','Paw_FL','Leg_FR','LowerLeg_FR','Paw_FR','Leg_BL','LowerLeg_BL','Paw_BL','Leg_BR','LowerLeg_BR','Paw_BR','Muzzle','LowerLip'] as const
  const parts:Record<string,THREE.Object3D|undefined>={}
  for(const n of names){const o=model.getObjectByName(n);if(o){parts[n]=o;o.userData.v20BaseRotation=o.rotation.clone();o.userData.v20BasePosition=o.position.clone()}}
  return parts
 },[model,type])
 useFrame((state,delta)=>{
  mixer.update(0) // useAnimations already advances its mixer; keep explicit hook harmless across versions.
  const g=visual.current;if(!g)return
  const t=state.clock.elapsedTime
  const wag=['wag','play','pet','bark'].includes(String(behavior))
  const sniff=behavior==='sniff',scratch=behavior==='scratch',stretch=behavior==='stretch'
  const locomotion=behavior==='walk'||behavior==='run'
  const speed=behavior==='run'?9:5.2
  const eating=behavior==='eat'||behavior==='drink',sleeping=behavior==='sleep',sitting=behavior==='sit'||behavior==='care'
  const playing=behavior==='play',cleaning=behavior==='clean',barking=behavior==='bark'
  const bowlTarget=behavior==='eat'?.48:behavior==='drink'?.78:0
  const naturalBreath=!locomotion&&!sleeping?Math.sin(t*2.1)*.008:0
  const pathFreq=behavior==='run'?.78:.42
  const pathX=locomotion?Math.sin(t*pathFreq)*1.02:0
  const pathZ=locomotion?Math.cos(t*pathFreq*.72)*.18:0
  const travelDir=Math.cos(t*pathFreq)>=0?-.72:.72
  const targetYaw=locomotion?travelDir:eating?-.20:Math.sin(t*.35)*.012
  g.rotation.y=THREE.MathUtils.lerp(g.rotation.y,targetYaw,.08)
  g.position.x=THREE.MathUtils.lerp(g.position.x,pathX+bowlTarget,.075)
  g.position.z=THREE.MathUtils.lerp(g.position.z,pathZ,.075)
  const actionY=sleeping?-.26:sitting?-.10:eating?-.075+Math.sin(t*4.8)*.012:playing?Math.max(0,Math.sin(t*3.1))*.085:scratch?Math.abs(Math.sin(t*8))*.018:stretch?-.035:0
  g.position.y=THREE.MathUtils.lerp(g.position.y,actionY+naturalBreath,.18)
  g.rotation.x=THREE.MathUtils.lerp(g.rotation.x,sleeping?.30:eating?.075:stretch?.10:0,.15)
  g.rotation.z=cleaning?Math.sin(t*12.5)*.055:scratch?Math.sin(t*7)*.025:wag?Math.sin(t*6)*.012:sleeping?.08:0
  if(barking)g.position.y+=Math.abs(Math.sin(t*8))*.014
  if(cockerParts){
   const part=(n:string)=>cockerParts[n]
   const reset=(o?:THREE.Object3D)=>{if(!o)return;const r=o.userData.v20BaseRotation as THREE.Euler|undefined;if(r)o.rotation.copy(r);const q=o.userData.v20BasePosition as THREE.Vector3|undefined;if(q)o.position.copy(q)}
   ;['Body','Ribcage','Chest','Neck','Head','Ear_L','Ear_R','Tail','Leg_FL','LowerLeg_FL','Paw_FL','Leg_FR','LowerLeg_FR','Paw_FR','Leg_BL','LowerLeg_BL','Paw_BL','Leg_BR','LowerLeg_BR','Paw_BR'].forEach(n=>reset(part(n)))
   const tongue=part('Tongue');if(tongue){tongue.visible=['pant','lick','eat','drink'].includes(String(behavior))&&(behavior==='pant'||behavior==='lick'||Math.sin(t*5)>-.25);const base=tongue.userData.v20BasePosition as THREE.Vector3|undefined;if(base){tongue.position.copy(base);if(behavior==='pant')tongue.position.y+=Math.sin(t*7)*.025;if(behavior==='lick')tongue.position.y+=Math.abs(Math.sin(t*8))*.07;if(behavior==='eat'||behavior==='drink')tongue.position.z+=Math.abs(Math.sin(t*5))*.035}}
   const tail=part('Tail');if(tail&&(wag||mood==='happy'))tail.rotation.y+=Math.sin(t*(wag?11:6))*(wag?.55:.24)
   const earL=part('Ear_L'),earR=part('Ear_R');if(earL)earL.rotation.z+=Math.sin(t*3.2)*.055;if(earR)earR.rotation.z-=Math.sin(t*3.2)*.055
   const head=part('Head');if(head){if(sniff){head.rotation.x+=.30+Math.sin(t*4)*.08;head.rotation.y+=Math.sin(t*2.6)*.16}else if(behavior==='bark'){head.rotation.x+=Math.sin(t*9)*.13}else if(behavior==='pant'){head.rotation.x+=.08+Math.sin(t*2)*.025}else if(behavior==='stretch'){head.rotation.x+=.22}else if(behavior==='eat'||behavior==='drink'){head.rotation.x+=.38+Math.sin(t*5)*.035}else if(behavior==='lick'){head.rotation.x+=.10;head.rotation.y+=Math.sin(t*5)*.10}}
   const lip=model.getObjectByName('LowerLip');if(lip){const base=lip.userData.v20BaseRotation as THREE.Euler|undefined;if(!base)lip.userData.v20BaseRotation=lip.rotation.clone();else lip.rotation.copy(base);if(behavior==='bark'||behavior==='pant')lip.rotation.x+=.18+Math.abs(Math.sin(t*8))*.10;else if(behavior==='eat')lip.rotation.x+=.08+Math.abs(Math.sin(t*5.5))*.12;else if(behavior==='drink')lip.rotation.x+=.05+Math.abs(Math.sin(t*6.5))*.06}
   if(locomotion){
    const amp=behavior==='run'?.58:.36
    const swing=Math.sin(t*speed)*amp
    const lift=Math.max(0,Math.sin(t*speed))*amp
    const fl=part('Leg_FL'),fr=part('Leg_FR'),bl=part('Leg_BL'),br=part('Leg_BR')
    const lfl=part('LowerLeg_FL'),lfr=part('LowerLeg_FR'),lbl=part('LowerLeg_BL'),lbr=part('LowerLeg_BR')
    const pfl=part('Paw_FL'),pfr=part('Paw_FR'),pbl=part('Paw_BL'),pbr=part('Paw_BR')
    if(fl)fl.rotation.x+=swing;if(fr)fr.rotation.x-=swing;if(bl)bl.rotation.x-=swing;if(br)br.rotation.x+=swing
    if(lfl)lfl.rotation.x-=lift*.72;if(lfr)lfr.rotation.x-=Math.max(0,-Math.sin(t*speed))*amp*.72
    if(lbl)lbl.rotation.x-=Math.max(0,-Math.sin(t*speed))*amp*.62;if(lbr)lbr.rotation.x-=lift*.62
    if(pfl)pfl.rotation.x+=lift*.34;if(pfr)pfr.rotation.x+=Math.max(0,-Math.sin(t*speed))*amp*.34
    if(pbl)pbl.rotation.x+=Math.max(0,-Math.sin(t*speed))*amp*.28;if(pbr)pbr.rotation.x+=lift*.28
   }else if(sitting||sleeping){
    const bl=part('Leg_BL'),br=part('Leg_BR'),fl=part('Leg_FL'),fr=part('Leg_FR')
    if(bl)bl.rotation.x-=sitting?.55:.72;if(br)br.rotation.x-=sitting?.55:.72
    if(sleeping&&fl)fl.rotation.x+=.22;if(sleeping&&fr)fr.rotation.x+=.22
   }else if(scratch){const fr=part('Leg_FR'),lfr=part('LowerLeg_FR');if(fr)fr.rotation.x+=.35+Math.sin(t*10)*.45;if(lfr)lfr.rotation.x-=.28+Math.sin(t*10)*.28}
   const chest=part('Chest'),rib=part('Ribcage'),neck=part('Neck')
   const breathe=(sleeping?.018:.010)*Math.sin(t*(sleeping?1.25:2.15))
   if(chest)chest.scale.y=1+breathe;if(rib)rib.scale.y=1+breathe*.75
   if(neck&&!locomotion)neck.rotation.z+=Math.sin(t*.72)*.012
  }
  void delta
 })
 return <group ref={root} position={normalization.offset} scale={normalization.scale}><group ref={visual}><primitive object={model}/>{type==='cocker'&&gltf.animations.length===0?null:type==='cocker'&&<SyntheticDogDetails behavior={behavior}/>}</group></group>
}


function ProceduralPet({type,mood}:{type:PetType;mood:Mood}){
 return type==='panda'?<Panda mood={mood}/>:type==='shiba'?<Shiba mood={mood}/>:type==='capybara'?<Capybara mood={mood}/>:<Cocker mood={mood}/>
}

function HighFidelityPet({type,mood,behavior='idle'}:{type:PetType;mood:Mood;behavior?:PetBehavior}){
 if(type==='cocker')return <PetAssetBoundary fallback={<ProceduralPet type={type} mood={mood}/>}><Suspense fallback={<ProceduralPet type={type} mood={mood}/>}><RiggedPetAsset type={type} mood={mood} behavior={behavior}/></Suspense></PetAssetBoundary>
 const asset=RIGGED_PET_ASSETS[type]
 const fallback=<ProceduralPet type={type} mood={mood}/>
 if(!asset)return fallback
 return <PetAssetBoundary fallback={fallback}><Suspense fallback={fallback}><RiggedPetAsset type={type} mood={mood} behavior={behavior}/></Suspense></PetAssetBoundary>
}

function PetStatusEffects({mood}:{mood:Mood}){
 if(mood==='dirty')return <group>{[[-.48,.25,.56],[.43,-.06,.59],[-.20,-.42,.64]].map((v,i)=><mesh key={i} position={v as P3} scale={[1.4,.7,.22]}><sphereGeometry args={[.075,14,10]}/><meshStandardMaterial color="#684d40" transparent opacity={.48}/></mesh>)}</group>
 if(mood==='sick')return <group><mesh position={[.60,1.12,.08]} rotation={[0,0,-.30]}><planeGeometry args={[.42,.18]}/><meshBasicMaterial color="#d7e9f4" transparent opacity={.72}/></mesh><mesh position={[.78,1.35,.06]}><planeGeometry args={[.28,.13]}/><meshBasicMaterial color="#d7e9f4" transparent opacity={.50}/></mesh></group>
 if(mood==='sleepy')return <group><mesh position={[.63,1.16,.03]}><planeGeometry args={[.24,.16]}/><meshBasicMaterial color="#756585" transparent opacity={.68}/></mesh><mesh position={[.84,1.40,.03]} scale={.75}><planeGeometry args={[.24,.16]}/><meshBasicMaterial color="#756585" transparent opacity={.46}/></mesh></group>
 return null
}

export function PetModel({type,mood='happy',interactive=true,growthStage='young',items=[],behavior='idle',behaviorNonce=0}:PetModelProps&{growthStage?:GrowthStage}){
 const root=useRef<THREE.Group>(null)
 const stageScale=growthStage==='baby'?.82:growthStage==='adult'?1.08:1
 useFrame(({clock},delta)=>{
  if(!root.current)return
  const t=clock.elapsedTime,sick=mood==='sick',sleepy=mood==='sleepy'
  const breathe=(sleepy||sick?Math.sin(t*2.05)*.012:Math.sin(t*3.0)*.008)
  const targetY=growthStage==='baby'?-.31:-.18
  root.current.position.y=THREE.MathUtils.damp(root.current.position.y,targetY+Math.sin(t*(sick?1.15:1.9))*(sick?.009:.018),4,delta)
  root.current.rotation.y=THREE.MathUtils.damp(root.current.rotation.y,Math.sin(t*.38)*(sick?.018:.045),3.8,delta)
  root.current.rotation.x=THREE.MathUtils.damp(root.current.rotation.x,0,4,delta)
  root.current.scale.setScalar(stageScale*(1+breathe))
 })
 void interactive;void behaviorNonce
 return <group ref={root}><HighFidelityPet type={type} mood={mood} behavior={behavior}/><Wearables items={items}/><PetStatusEffects mood={mood}/></group>
}

function PreviewScene({type}:{type:PetType}){return <><PBREnvironment intensity={.72}/><ambientLight intensity={.95}/><hemisphereLight args={['#fff7f2','#87756b',1.4]}/><directionalLight position={[3,5,4]} intensity={2.5}/><directionalLight position={[-3,2,2]} intensity={.7} color="#d9e8ff"/><PetModel type={type} interactive={false}/><ContactShadows position={[0,-1.06,0]} opacity={.32} scale={3.5} blur={2.6} far={2.5}/></>}

export function PetPreview3D({type}:{type:PetType}){
 return <div className="pet-canvas-preview premium-pet-preview"><Canvas camera={{position:[0,.24,3.65],fov:33}} dpr={[1,1.45]} gl={{antialias:true,alpha:true,powerPreference:'high-performance',toneMapping:THREE.ACESFilmicToneMapping}} onCreated={({gl})=>{gl.toneMappingExposure=1.08}}><PreviewScene type={type}/></Canvas></div>
}

function Furniture({items}:{items:string[]}){
 const fabric=(color:string,rough=.92)=><meshPhysicalMaterial color={color} roughness={rough} metalness={0} sheen={.42} sheenRoughness={.84}/>
 const wood=(color:string,rough=.66)=><meshPhysicalMaterial color={color} roughness={rough} metalness={0} clearcoat={.08} clearcoatRoughness={.72}/>
 const metal=(color:string,rough=.30)=><meshPhysicalMaterial color={color} roughness={rough} metalness={.76} clearcoat={.18} clearcoatRoughness={.22}/>
 const plastic=(color:string)=><meshPhysicalMaterial color={color} roughness={.34} metalness={.02} clearcoat={.72} clearcoatRoughness={.16}/>
 const stone=(color:string)=><meshPhysicalMaterial color={color} roughness={.82} metalness={0}/>
 const glass=(color:string,opacity=.32)=><meshPhysicalMaterial color={color} transparent opacity={opacity} roughness={.06} transmission={.36} thickness={.08} ior={1.45} clearcoat={1} clearcoatRoughness={.04}/>
 return <>
  {/* Permanent pet station: lightweight PBR bowls, visible regardless of shop state. */}
  <group position={[1.02,-.89,.88]}>
   <mesh castShadow><cylinderGeometry args={[.27,.22,.11,28]}/>{metal('#d6c7b7',.20)}</mesh>
   <mesh position={[0,.065,0]}><cylinderGeometry args={[.205,.205,.025,28]}/><meshPhysicalMaterial color="#8b5d3c" roughness={.78}/></mesh>
   <mesh position={[.62,0,0]} castShadow><cylinderGeometry args={[.27,.22,.11,28]}/>{metal('#c7dbe6',.18)}</mesh>
   <mesh position={[.62,.07,0]}><cylinderGeometry args={[.205,.205,.018,28]}/><meshPhysicalMaterial color="#82cce5" roughness={.06} transmission={.18} clearcoat={1}/></mesh>
  </group>
  {items.includes('bed')&&<group position={[-1.65,-.72,-.52]}><RoundedBox args={[1.28,.26,.92]} radius={.13}>{fabric('#cfaebd')}</RoundedBox><RoundedBox position={[0,.20,-.18]} args={[1.08,.18,.37]} radius={.10}>{fabric('#f4e8ed',.96)}</RoundedBox><RoundedBox position={[0,-.19,0]} args={[1.34,.12,.98]} radius={.08}>{wood('#8f684f')}</RoundedBox></group>}
  {items.includes('sofa')&&<group position={[1.65,-.48,-1.0]} rotation={[0,-.18,0]}><RoundedBox args={[1.55,.58,.68]} radius={.14}>{fabric('#bda993')}</RoundedBox><RoundedBox position={[0,.43,-.18]} args={[1.55,.55,.24]} radius={.11}>{fabric('#aa9784')}</RoundedBox><mesh position={[-.58,-.36,0]}><cylinderGeometry args={[.05,.05,.34,10]}/>{wood('#5e473a')}</mesh><mesh position={[.58,-.36,0]}><cylinderGeometry args={[.05,.05,.34,10]}/>{wood('#5e473a')}</mesh></group>}
  {items.includes('plant')&&<group position={[2.05,-.55,.15]}><mesh><cylinderGeometry args={[.23,.28,.42,20]}/><meshPhysicalMaterial color="#aa6d57" roughness={.74} clearcoat={.05}/></mesh>{[-.18,0,.18].map((x,i)=><mesh key={i} position={[x,.52+(i%2)*.08,0]} rotation={[0,0,x*1.6]} scale={[.62,1,.32]}><sphereGeometry args={[.22,20,14]}/><meshPhysicalMaterial color={i===1?'#5f8b66':'#739a72'} roughness={.72} sheen={.28} sheenRoughness={.78}/></mesh>)}</group>}
  {items.includes('frame')&&<group position={[-1.10,.90,-2.12]} rotation={[0,0,-.03]}><RoundedBox args={[.66,.82,.07]} radius={.035}>{wood('#8d674f',.52)}</RoundedBox><mesh position={[0,0,.045]}><planeGeometry args={[.51,.66]}/><meshPhysicalMaterial color="#e8c7bc" roughness={.42} clearcoat={.15}/></mesh><mesh position={[0,.05,.052]}><circleGeometry args={[.16,32]}/><meshPhysicalMaterial color="#f6e9d9" roughness={.64}/></mesh><mesh position={[0,-.19,.055]}><boxGeometry args={[.30,.035,.012]}/><meshPhysicalMaterial color="#c49082" roughness={.55}/></mesh></group>}
  {items.includes('lamp')&&<group position={[-2.15,-.35,-1.3]}><mesh position={[0,.45,0]}><cylinderGeometry args={[.045,.045,1.2,12]}/>{metal('#655955')}</mesh><mesh position={[0,1.05,0]}><coneGeometry args={[.38,.48,24,1,true]}/><meshPhysicalMaterial color="#efd09f" side={THREE.DoubleSide} roughness={.62} transmission={.04} sheen={.22}/></mesh><pointLight position={[0,1.03,.1]} intensity={1.35} distance={4} color="#ffcf94"/></group>}
  {items.includes('rug')&&<mesh position={[0,-.985,.15]} rotation={[-Math.PI/2,0,0]} receiveShadow><circleGeometry args={[1.65,56]}/><meshPhysicalMaterial color="#d9c6bc" roughness={1} sheen={.22} sheenRoughness={.95}/></mesh>}
  {items.includes('ball')&&<mesh position={[-.95,-.78,.75]} castShadow><sphereGeometry args={[.18,24,16]}/>{plastic('#d9b445')}</mesh>}
  {items.includes('telescope')&&<group position={[-1.85,-.45,.25]} rotation={[0,.4,0]}><mesh rotation={[0,0,.18]}><cylinderGeometry args={[.11,.16,.85,18]}/>{metal('#4d5564',.26)}</mesh><mesh position={[0,-.55,0]}><cylinderGeometry args={[.04,.04,.85,10]}/>{metal('#4d423d',.36)}</mesh><mesh position={[0,.37,.06]}><cylinderGeometry args={[.13,.13,.08,18]}/>{glass('#9ec6db',.38)}</mesh></group>}
  {items.includes('fountain')&&<group position={[1.8,-.8,.62]}><mesh><cylinderGeometry args={[.55,.62,.16,32]}/>{stone('#adb7b7')}</mesh><mesh position={[0,.24,0]}><cylinderGeometry args={[.12,.18,.55,20]}/>{stone('#a5afaf')}</mesh><mesh position={[0,.54,0]}><sphereGeometry args={[.18,24,16]}/><meshPhysicalMaterial color="#b9e8f2" transparent opacity={.62} roughness={.04} transmission={.28} clearcoat={1}/></mesh></group>}
  {items.includes('weekly_trophy')&&<group position={[1.1,-.58,-1.45]} scale={.7}><mesh><cylinderGeometry args={[.22,.30,.16,24]}/>{wood('#6b4c38')}</mesh><mesh position={[0,.45,0]}><cylinderGeometry args={[.26,.18,.62,24]}/>{metal('#d6ad43',.20)}</mesh></group>}
  {items.includes('beanbag')&&<mesh position={[1.45,-.72,.9]} scale={[1,.72,1]} castShadow><sphereGeometry args={[.52,28,18]}/>{fabric('#cbb8df',.98)}</mesh>}
  {items.includes('bookshelf')&&<group position={[2.15,-.15,-1.55]}><RoundedBox args={[.78,1.55,.28]} radius={.05}>{wood('#8d674f')}</RoundedBox>{[-.42,0,.42].map((y,i)=><mesh key={i} position={[0,y,.17]}><boxGeometry args={[.66,.04,.24]}/>{wood('#684a39',.72)}</mesh>)}{[-.26,-.08,.10,.28].map((x,i)=><mesh key={`book-${i}`} position={[x,-.28,.19]}><boxGeometry args={[.11,.34,.12]}/><meshPhysicalMaterial color={['#a35f5a','#5d7599','#9c854f','#6a8b70'][i]} roughness={.78}/></mesh>)}</group>}
  {items.includes('aquarium')&&<group position={[1.75,-.30,-1.45]}><RoundedBox args={[1.02,.72,.38]} radius={.06}>{glass('#8dd6e8',.34)}</RoundedBox><mesh position={[0,-.38,0]}><boxGeometry args={[1.06,.10,.42]}/>{metal('#3e4b55',.34)}</mesh><mesh position={[0,-.28,.02]}><boxGeometry args={[.86,.06,.28]}/><meshPhysicalMaterial color="#d9c49f" roughness={.9}/></mesh></group>}
  {items.includes('gaming_setup')&&<group position={[-1.85,-.25,-1.48]}><mesh position={[0,.45,0]}><boxGeometry args={[.92,.54,.08]}/><meshPhysicalMaterial color="#242434" emissive="#7857d8" emissiveIntensity={.22} roughness={.16} metalness={.12} clearcoat={.5}/></mesh><mesh position={[0,0,0]}><boxGeometry args={[1.25,.08,.55]}/>{wood('#6a5042',.58)}</mesh><mesh position={[0,-.18,.05]}><cylinderGeometry args={[.05,.05,.38,10]}/>{metal('#34313a',.32)}</mesh></group>}
  {items.includes('fireplace')&&<group position={[0,-.25,-2.05]}><RoundedBox args={[1.28,1.18,.25]} radius={.08}><meshPhysicalMaterial color="#b7856e" roughness={.86}/></RoundedBox><mesh position={[0,-.12,.16]}><planeGeometry args={[.66,.58]}/><meshPhysicalMaterial color="#382824" roughness={.92}/></mesh><mesh position={[0,-.25,.23]}><coneGeometry args={[.22,.52,14]}/><meshPhysicalMaterial color="#ffb35f" emissive="#ff6a2a" emissiveIntensity={1.2} roughness={.4}/></mesh><pointLight position={[0,-.10,.48]} intensity={1.45} distance={3} color="#ff9c55"/></group>}
  {items.includes('piano')&&<group position={[1.85,-.48,-1.45]}><RoundedBox args={[1.34,.58,.54]} radius={.08}><meshPhysicalMaterial color="#353038" roughness={.24} clearcoat={.68} clearcoatRoughness={.12}/></RoundedBox><mesh position={[0,-.07,.31]} rotation={[-.20,0,0]}><boxGeometry args={[1.1,.10,.34]}/><meshPhysicalMaterial color="#f3efe9" roughness={.20} clearcoat={.5}/></mesh>{[-.42,-.28,-.14,0,.14,.28,.42].map((x,i)=><mesh key={i} position={[x,-.015,.49]} rotation={[-.20,0,0]}><boxGeometry args={[.055,.028,.18]}/><meshPhysicalMaterial color={i%2?'#faf8f2':'#ece9e2'} roughness={.18}/></mesh>)}</group>}
  {items.includes('neon_sign')&&<group position={[0,1.70,-2.12]}><mesh><torusGeometry args={[.34,.035,12,40]}/><meshPhysicalMaterial color="#ff7fb5" emissive="#ff4d98" emissiveIntensity={1.35} roughness={.12} clearcoat={.8}/></mesh><pointLight intensity={.85} distance={2.8} color="#ff75b2"/></group>}
 </>
}


function RoomArchitecture({night}:{night:boolean}){
 const wall=night?'#302d3d':'#eee2da',floor=night?'#4a3b38':'#cfae8f',sky=night?'#24304b':'#a8dced'
 return <>
  <mesh position={[0,-1.04,0]} receiveShadow><cylinderGeometry args={[4.3,4.3,.12,64]}/><meshPhysicalMaterial color={floor} roughness={.62} clearcoat={.08} clearcoatRoughness={.68}/></mesh>
  {/* subtle floor inlay gives the PBR light something to read without using heavy textures */}
  {[...Array(9)].map((_,i)=><mesh key={`floor-line-${i}`} position={[-3.2+i*.8,-.974,.15]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[.012,4.5]}/><meshPhysicalMaterial color={night?'#3c302f':'#b98f72'} roughness={.75}/></mesh>)}
  <mesh position={[0,1,-2.25]} receiveShadow><planeGeometry args={[8,5]}/><meshPhysicalMaterial color={wall} roughness={.92} sheen={.05}/></mesh>
  <mesh position={[-3.1,1.0,0]} rotation={[0,Math.PI/2,0]} receiveShadow><planeGeometry args={[5,5]}/><meshPhysicalMaterial color={night?'#292735':'#e7d9d1'} roughness={.94}/></mesh>
  <group position={[0,.95,-2.20]}>
   <RoundedBox args={[2.72,1.68,.08]} radius={.05}><meshPhysicalMaterial color={night?'#736a76':'#faf6ef'} roughness={.42} clearcoat={.18}/></RoundedBox>
   <mesh position={[0,0,.055]}><planeGeometry args={[2.48,1.43]}/><meshPhysicalMaterial color={sky} emissive={sky} emissiveIntensity={night?.12:.06} roughness={.08} clearcoat={.52} clearcoatRoughness={.08}/></mesh>
   <mesh position={[0,0,.075]}><planeGeometry args={[2.45,1.40]}/><meshPhysicalMaterial color="#dbe8ee" transparent opacity={.12} transmission={.22} roughness={.03} clearcoat={1}/></mesh>
   <mesh position={[0,0,.09]}><boxGeometry args={[.055,1.43,.04]}/><meshPhysicalMaterial color="#f5eee8" roughness={.38}/></mesh><mesh position={[0,0,.09]}><boxGeometry args={[2.48,.055,.04]}/><meshPhysicalMaterial color="#f5eee8" roughness={.38}/></mesh>
   {night&&<><mesh position={[.72,.30,.13]}><sphereGeometry args={[.16,24,16]}/><meshPhysicalMaterial color="#fff2b2" emissive="#ffeaa0" emissiveIntensity={.22} roughness={.22}/></mesh><Sparkles count={18} scale={[2.2,1.1,.1]} size={1.2} speed={.10} opacity={.78} color="#fff7cf"/></>}
  </group>
  <RoundedBox position={[-1.85,.98,-2.05]} args={[.56,1.82,.16]} radius={.12}><meshPhysicalMaterial color={night?'#6f596d':'#cda9b7'} roughness={.88} sheen={.42} sheenRoughness={.84}/></RoundedBox>
  <RoundedBox position={[1.85,.98,-2.05]} args={[.56,1.82,.16]} radius={.12}><meshPhysicalMaterial color={night?'#6f596d':'#cda9b7'} roughness={.88} sheen={.42} sheenRoughness={.84}/></RoundedBox>
  <mesh position={[0,2.46,-2.18]}><boxGeometry args={[6.1,.08,.10]}/><meshPhysicalMaterial color={night?'#625667':'#d5c0b4'} roughness={.48} clearcoat={.10}/></mesh>
 </>
}


function RoomScene({type,mood,items,growthStage,behavior,behaviorNonce}:{type:PetType;mood:Mood;items:string[];growthStage:GrowthStage;behavior:PetBehavior;behaviorNonce:number}){
 const hour=new Date().getHours(),night=hour<7||hour>=19
 return <>
  <PBREnvironment intensity={night?.58:.76}/>
  <color attach="background" args={[night?'#252437':'#eaf1f3']}/><fog attach="fog" args={[night?'#252437':'#eaf1f3',6.5,12]}/>
  <ambientLight intensity={night?.30:.48}/><hemisphereLight args={[night?'#7785aa':'#f8fbff',night?'#332c36':'#9f826f',night?.82:1.25]}/>
  <directionalLight castShadow position={night?[2.8,5,3.5]:[3.8,6,4.5]} intensity={night?1.45:2.85} color={night?'#aebbe8':'#fff3df'} shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-far={12}/>
  <pointLight position={[-2.5,1.8,1]} intensity={night?1.7:.55} color="#ffbd82" distance={6}/>
  <RoomArchitecture night={night}/><Furniture items={items}/>
  <PetModel type={type} mood={mood} growthStage={growthStage} items={items} behavior={behavior} behaviorNonce={behaviorNonce}/>
  <ContactShadows position={[0,-1.0,0]} opacity={night?.44:.36} scale={4.2} blur={2.5} far={3.2}/>
 </>
}


function useAdaptive3DQuality(){
 const [state,setState]=useState({dpr:1.18,shadows:true,antialias:true,visible:true})
 useEffect(()=>{
  const update=()=>{
   const nav=navigator as Navigator & {deviceMemory?:number}
   const cores=nav.hardwareConcurrency||4, memory=nav.deviceMemory||4
   const shortSide=Math.min(window.innerWidth,window.innerHeight)
   const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false
   const saveData=(nav as any).connection?.saveData===true
   const low=saveData||memory<=3||cores<=4||shortSide<360
   const high=!low&&memory>=6&&cores>=8&&shortSide>=430
   setState({dpr:reduced?1:low?1:high?1.45:1.22,shadows:!low,antialias:!low,visible:document.visibilityState!=='hidden'})
  }
  const visibility=()=>update()
  update();window.addEventListener('resize',update,{passive:true});document.addEventListener('visibilitychange',visibility)
  return()=>{window.removeEventListener('resize',update);document.removeEventListener('visibilitychange',visibility)}
 },[])
 return state
}

function ResponsiveRoomCamera(){
 const {camera,size}=useThree()
 useEffect(()=>{
  const c=camera as THREE.PerspectiveCamera
  const w=Math.max(1,size.width),h=Math.max(1,size.height),aspect=w/h
  // V29: always use a 3/4 camera. A front-on camera hid the long Cocker body behind
  // its head on phones, which looked like the pet was cut off. Distance/FOV are
  // derived only from the canvas aspect ratio so every viewport keeps the full pet.
  if(aspect<.55){c.position.set(2.55,.40,8.75);c.fov=47}
  else if(aspect<.72){c.position.set(2.45,.46,8.05);c.fov=45}
  else if(aspect<.92){c.position.set(2.30,.52,7.25);c.fov=42}
  else if(aspect<1.20){c.position.set(2.10,.60,6.45);c.fov=39}
  else if(aspect<1.65){c.position.set(1.90,.68,5.75);c.fov=37}
  else{c.position.set(1.70,.72,5.30);c.fov=35}
  c.aspect=aspect
  c.lookAt(0,-.20,.02)
  c.updateProjectionMatrix()
 },[camera,size.width,size.height])
 return null
}

export function PetRoom3D({type,mood='happy',items=[],growthStage='young',behavior='idle',behaviorNonce=0}:{type:PetType;mood?:Mood;items?:string[];growthStage?:GrowthStage;behavior?:PetBehavior;behaviorNonce?:number}){
 const quality=useAdaptive3DQuality()
 return <div className="pet-canvas-room premium-pet-room"><Canvas shadows={quality.shadows} frameloop={quality.visible?'always':'never'} camera={{position:[2.15,.60,6.2],fov:39}} dpr={quality.dpr} style={{touchAction:'none'}} gl={{antialias:quality.antialias,alpha:false,powerPreference:'high-performance',toneMapping:THREE.ACESFilmicToneMapping}} onCreated={({gl})=>{gl.toneMappingExposure=1.10;gl.shadowMap.enabled=quality.shadows;gl.shadowMap.type=THREE.PCFSoftShadowMap}}><ResponsiveRoomCamera/><RoomScene type={type} mood={mood} items={items} growthStage={growthStage} behavior={behavior} behaviorNonce={behaviorNonce}/><OrbitControls makeDefault enablePan={false} enableDamping dampingFactor={.08} rotateSpeed={.42} zoomSpeed={.72} minDistance={4.4} maxDistance={8.8} minPolarAngle={Math.PI*.30} maxPolarAngle={Math.PI*.54} minAzimuthAngle={-Math.PI*.40} maxAzimuthAngle={Math.PI*.40} target={[0,-.18,0]} touches={{ONE:THREE.TOUCH.ROTATE,TWO:THREE.TOUCH.DOLLY_ROTATE}}/></Canvas></div>
}
