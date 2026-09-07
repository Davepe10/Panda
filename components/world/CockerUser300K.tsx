'use client'

import {Canvas,useFrame,useLoader} from '@react-three/fiber'
import {ContactShadows} from '@react-three/drei'
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader.js'
import {useMemo,useRef} from 'react'
import * as THREE from 'three'

type Props={behavior:string;items:string[];name:string}

function Room(){
 return <group>
  <mesh receiveShadow position={[0,-.38,0]} rotation={[-Math.PI/2,0,0]}>
   <planeGeometry args={[7.2,5.5]}/><meshStandardMaterial color="#d8c6b2" roughness={.94}/>
  </mesh>
  <mesh position={[0,1.45,-1.72]}><planeGeometry args={[7.2,3.8]}/><meshStandardMaterial color="#f3ede5" roughness={1}/></mesh>
  <mesh position={[0,.10,-1.67]}><boxGeometry args={[7.2,.12,.10]}/><meshStandardMaterial color="#cdb8a1"/></mesh>

  <group position={[1.45,1.52,-1.66]}>
   <mesh><planeGeometry args={[1.55,1.62]}/><meshStandardMaterial color="#a8d7df" emissive="#83bcc6" emissiveIntensity={.16}/></mesh>
   <mesh position={[0,0,.02]}><torusGeometry args={[.765,.06,14,56,Math.PI]}/><meshStandardMaterial color="#fffaf2"/></mesh>
   <mesh position={[0,-.40,.03]}><boxGeometry args={[1.62,.075,.07]}/><meshStandardMaterial color="#fffaf2"/></mesh>
   <mesh position={[0,0,.03]}><boxGeometry args={[.06,1.52,.06]}/><meshStandardMaterial color="#fffaf2"/></mesh>
  </group>

  <mesh receiveShadow position={[-.10,-.355,.10]} rotation={[-Math.PI/2,0,0]}>
   <circleGeometry args={[1.65,64]}/><meshStandardMaterial color="#efb7a8" roughness={1}/>
  </mesh>
  <mesh receiveShadow position={[-.10,-.350,.10]} rotation={[-Math.PI/2,0,0]}>
   <ringGeometry args={[1.25,1.31,64]}/><meshStandardMaterial color="#f8ded7" roughness={1}/>
  </mesh>

  <group position={[1.75,-.15,-.70]}>
   <mesh castShadow scale={[.82,.18,.59]}><sphereGeometry args={[1,32,22]}/><meshStandardMaterial color="#7788aa" roughness={.95}/></mesh>
   <mesh position={[0,.11,0]} scale={[.62,.14,.43]}><sphereGeometry args={[1,28,18]}/><meshStandardMaterial color="#e4ebf1" roughness={1}/></mesh>
  </group>

  <mesh castShadow position={[-1.65,-.11,-.30]} rotation={[0,0,.45]}>
   <torusGeometry args={[.18,.06,12,28]}/><meshStandardMaterial color="#f08b78" roughness={.75}/>
  </mesh>

  <group position={[-2.08,-.14,-1.16]}>
   <mesh position={[0,.20,0]}><cylinderGeometry args={[.23,.30,.40,22]}/><meshStandardMaterial color="#cf926c"/></mesh>
   <mesh position={[0,.72,0]} scale={[.21,.58,.11]}><sphereGeometry args={[1,20,14]}/><meshStandardMaterial color="#668871"/></mesh>
   <mesh position={[-.20,.69,.02]} rotation={[0,0,-.36]} scale={[.14,.42,.08]}><sphereGeometry args={[1,20,14]}/><meshStandardMaterial color="#537962"/></mesh>
   <mesh position={[.20,.80,.01]} rotation={[0,0,.34]} scale={[.14,.43,.08]}><sphereGeometry args={[1,20,14]}/><meshStandardMaterial color="#789a82"/></mesh>
  </group>
 </group>
}

function RealCocker({behavior,items}:{behavior:string;items:string[]}){
 const geometry=useLoader(STLLoader,'/models/pets/cocker-user-300k.stl')
 const root=useRef<THREE.Group|null>(null)

 const prepared=useMemo(()=>{
  const g=geometry.clone()
  g.computeVertexNormals()
  g.center()

  // The STL has geometry but no texture/UV material. Paint a realistic
  // Cocker-style coat directly onto its 300k vertices instead of falling
  // back to the old procedural dog.
  const pos=g.getAttribute('position')
  const box=new THREE.Box3().setFromBufferAttribute(pos as THREE.BufferAttribute)
  const size=new THREE.Vector3(); box.getSize(size)
  const colors=new Float32Array(pos.count*3)

  const base=new THREE.Color('#a96543')
  const warm=new THREE.Color('#c8845d')
  const dark=new THREE.Color('#4a2c27')
  const deep=new THREE.Color('#2c2020')
  const cream=new THREE.Color('#f0d5b9')
  const white=new THREE.Color('#f8eee2')
  const tmp=new THREE.Color()

  const smooth=(a:number,b:number,x:number)=>{
   const t=Math.max(0,Math.min(1,(x-a)/(b-a)))
   return t*t*(3-2*t)
  }

  for(let i=0;i<pos.count;i++){
   const x=pos.getX(i),y=pos.getY(i),z=pos.getZ(i)
   const nx=Math.abs(x)/(size.x*.5)
   const ny=(y-box.min.y)/Math.max(.0001,size.y)
   const nz=(z-box.min.z)/Math.max(.0001,size.z)

   tmp.copy(base)
   tmp.lerp(warm,.22*(.4+.6*nz))

   // Long ears / side of the head.
   const head=smooth(.61,.83,ny)
   const earSide=smooth(.35,.78,nx)
   const earHeight=1-Math.min(1,Math.abs(nz-.60)/.40)
   const earMask=head*earSide*earHeight
   tmp.lerp(dark,Math.min(.92,earMask*.96))

   // Cream muzzle, blaze and chest.
   const muzzle=smooth(.80,.98,ny)*(1-smooth(.50,.90,nx))*(1-Math.min(1,Math.abs(nz-.48)/.28))
   const blaze=smooth(.66,.94,ny)*(1-smooth(.16,.50,nx))*smooth(.56,.80,nz)
   const chest=(1-Math.min(1,Math.abs(ny-.63)/.18))*(1-smooth(.30,.80,nx))*(1-Math.min(1,Math.abs(nz-.28)/.30))
   const paws=smooth(0,.16,.18-nz)
   tmp.lerp(cream,Math.min(.92,muzzle*.72+chest*.42+paws*.40))
   tmp.lerp(white,Math.min(.86,blaze*.82))

   // Darker tail/undercoat accents add depth without inventing new geometry.
   const tail=(1-smooth(.08,.34,ny))*smooth(.40,.95,nz)
   tmp.lerp(deep,tail*.20)

   colors[i*3]=tmp.r;colors[i*3+1]=tmp.g;colors[i*3+2]=tmp.b
  }
  g.setAttribute('color',new THREE.BufferAttribute(colors,3))
  return g
 },[geometry])

 useFrame((_,dt)=>{
  const g=root.current
  if(!g)return
  const t=performance.now()/1000
  const walk=behavior==='walk'||behavior==='run'
  const run=behavior==='run'
  const bark=behavior==='bark'
  const sniff=behavior==='sniff'
  const pant=behavior==='pant'
  const lick=behavior==='lick'
  const wag=behavior==='wag'||behavior==='play'||behavior==='pet'
  const scratch=behavior==='scratch'
  const stretch=behavior==='stretch'
  const sit=behavior==='sit'
  const sleep=behavior==='sleep'||behavior==='rest'

  // Purposefully visible movement for an unrigged STL: translation, lean,
  // bounce and breathing. No fake limb rigging is claimed.
  const targetX=walk?Math.sin(t*(run?1.35:.72))*1.05:0
  g.position.x=THREE.MathUtils.lerp(g.position.x,targetX,Math.min(1,dt*4.6))
  const bob=walk?Math.abs(Math.sin(t*(run?12:7.5)))*(run?.105:.060):Math.sin(t*1.8)*.014
  g.position.y=THREE.MathUtils.lerp(g.position.y,-.30+bob,Math.min(1,dt*6))

  let rx=0,ry=0,rz=0,scale=1
  if(walk){rz=Math.sin(t*(run?12:7.5))*.055;ry=Math.sin(t*(run?1.35:.72))*.08}
  if(bark){rx=-.055+Math.sin(t*13)*.045;scale=1+Math.max(0,Math.sin(t*13))*.025}
  if(sniff){rx=.13+Math.sin(t*3.1)*.055;ry=Math.sin(t*2.3)*.09}
  if(pant){scale=1+Math.sin(t*4.6)*.018;rx=Math.sin(t*4.6)*.012}
  if(lick){rx=.10+Math.sin(t*5.6)*.055;ry=Math.sin(t*4.5)*.05}
  if(wag){ry=Math.sin(t*4.4)*.075;rz=Math.sin(t*4.4)*.02}
  if(scratch){ry=Math.sin(t*8.6)*.075;rz=Math.sin(t*8.6)*.07}
  if(stretch){rx=-.15;scale=.98}
  if(sit){g.position.y=THREE.MathUtils.lerp(g.position.y,-.42,Math.min(1,dt*4));rx=.08}
  if(sleep){g.position.y=THREE.MathUtils.lerp(g.position.y,-.47,Math.min(1,dt*4));rz=-.22;scale=.97}

  g.rotation.x=THREE.MathUtils.lerp(g.rotation.x,rx,Math.min(1,dt*5))
  g.rotation.y=THREE.MathUtils.lerp(g.rotation.y,ry,Math.min(1,dt*5))
  g.rotation.z=THREE.MathUtils.lerp(g.rotation.z,rz,Math.min(1,dt*5))
  g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x,scale,Math.min(1,dt*5)))
 })

 const bow=items.includes('bow_red')
 const crown=items.includes('gold_crown')||items.includes('diamond_crown')

 return <group ref={root} position={[0,-.30,0]} rotation={[0,0,0]}>
   {/* STL axes: X=width, Y=length, Z=height.
       First rotate Z-height to Three Y-up, then turn to a side-profile view. */}
   <group rotation={[0,-1.34,0]}>
    <group rotation={[-Math.PI/2,0,0]} scale={1.72}>
     <mesh geometry={prepared} castShadow receiveShadow>
      <meshPhysicalMaterial
        vertexColors
        roughness={.88}
        metalness={0}
        clearcoat={.02}
        clearcoatRoughness={.94}
        sheen={.52}
        sheenColor={new THREE.Color('#e7b08d')}
      />
     </mesh>
     <mesh geometry={prepared} scale={1.004} renderOrder={2}>
      <meshPhysicalMaterial
        vertexColors
        transparent
        opacity={.085}
        roughness={1}
        side={THREE.FrontSide}
        depthWrite={false}
        sheen={.85}
        sheenColor={new THREE.Color('#f2c6a6')}
      />
     </mesh>
    </group>
    {crown&&<mesh position={[-.02,1.42,-.68]} rotation={[0,0,Math.PI]}><coneGeometry args={[.16,.20,5]}/><meshStandardMaterial color={items.includes('diamond_crown')?'#d9f4ff':'#e8b84f'} metalness={.35} roughness={.25}/></mesh>}
   </group>
  </group>
}

export default function CockerUser300K({behavior,items,name}:Props){
 return <div className="cocker-rt3d cocker-user-300k" aria-label={`${name}, Cocker Spaniel construido desde el modelo 3D de 300 mil triángulos`}>
  <Canvas shadows dpr={[1,1.8]} camera={{position:[0.02,1.02,3.22],fov:31}} gl={{antialias:true,alpha:false,powerPreference:'high-performance'}}>
   <color attach="background" args={['#efe8de']}/>
   <fog attach="fog" args={['#efe8de',5.8,10.5]}/>
   <ambientLight intensity={.86}/>
   <hemisphereLight args={['#fff8ef','#745e53',1.28]}/>
   <directionalLight castShadow position={[-2.6,4.5,3.4]} intensity={2.25} color="#fff4e5" shadow-mapSize-width={1024} shadow-mapSize-height={1024}/>
   <pointLight position={[2.4,2.1,2.0]} intensity={1.1} color="#b8dfe0"/>
   <Room/>
   <RealCocker behavior={behavior||'idle'} items={items}/>
   <ContactShadows position={[0,-.365,0]} opacity={.38} blur={2.4} scale={4.1}/>
  </Canvas>
 </div>
}
