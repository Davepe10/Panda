'use client'
import CockerRealtime3D from './CockerRealtime3D'
export default function CockerRealScene({behavior,items,name}:{behavior:string;items:string[];name:string}){
 return <CockerRealtime3D behavior={behavior} items={items} name={name}/>
}
