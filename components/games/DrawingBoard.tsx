'use client'
import {useEffect,useRef,useState} from 'react'
export type Stroke={x:number;y:number;px:number;py:number}
export default function DrawingBoard({value,onChange,readonly=false}:{value:Stroke[];onChange?:(s:Stroke[])=>void;readonly?:boolean}){
 const ref=useRef<HTMLCanvasElement>(null);const [down,setDown]=useState(false);const last=useRef<{x:number;y:number}|null>(null)
 function draw(strokes:Stroke[]){const c=ref.current;if(!c)return;const ctx=c.getContext('2d');if(!ctx)return;ctx.clearRect(0,0,c.width,c.height);ctx.lineWidth=5;ctx.lineCap='round';ctx.strokeStyle='#493e3a';for(const s of strokes){ctx.beginPath();ctx.moveTo(s.px,s.py);ctx.lineTo(s.x,s.y);ctx.stroke()}}
 useEffect(()=>draw(value),[value])
 function pos(e:React.PointerEvent){const c=ref.current!;const r=c.getBoundingClientRect();return{x:(e.clientX-r.left)*c.width/r.width,y:(e.clientY-r.top)*c.height/r.height}}
 function move(e:React.PointerEvent){if(readonly||!down)return;const p=pos(e);if(last.current){const n=[...value,{...p,px:last.current.x,py:last.current.y}];onChange?.(n);draw(n)}last.current=p}
 return <div><canvas ref={ref} width={640} height={420} className="draw-canvas" onPointerDown={e=>{if(readonly)return;setDown(true);last.current=pos(e);e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={move} onPointerUp={()=>{setDown(false);last.current=null}}/><div className="actions">{!readonly&&<button className="btn ghost" onClick={()=>onChange?.([])}>Limpiar</button>}</div></div>
}
