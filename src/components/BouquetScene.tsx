'use client';
import { Component, Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlowerBouquet3D from './FlowerBouquet3D';
import { usePageVisible, useReducedMotion } from '@/hooks/useReducedMotion';
export function BouquetFallback({ loading = false }: { loading?: boolean }) {return <div className="bouquet-fallback"><span>✿</span><p>{loading ? 'Gathering a little love…' : 'A bouquet of love, just for you'}</p><small>{loading ? 'Every petal, a reason I choose you.' : 'Some things bloom beyond the screen. ♡'}</small></div>;}
class CanvasBoundary extends Component<{children: React.ReactNode}, {failed:boolean}>{state={failed:false}; static getDerivedStateFromError(){return {failed:true};} render(){return this.state.failed?<BouquetFallback/>:this.props.children;}}
function AnimatedBouquet({ progress, reduced, drag }: { progress: React.RefObject<number>; reduced: boolean; drag: React.RefObject<number> }) {
 const group=useRef<THREE.Group>(null);
 useFrame((state,delta)=>{if(!group.current)return; const p=progress.current; const t=state.clock.elapsedTime; const ease=Math.min(delta*3,1); group.current.rotation.y=THREE.MathUtils.lerp(group.current.rotation.y, .18 + drag.current + (reduced?0:Math.sin(t*.25)*.09+p*.75),ease); group.current.rotation.z=THREE.MathUtils.lerp(group.current.rotation.z,reduced?0:Math.sin(t*.35)*.025-p*.11,ease); group.current.position.y=THREE.MathUtils.lerp(group.current.position.y,reduced?0:Math.sin(t*.7)*.045+p*.2,ease); group.current.position.x=THREE.MathUtils.lerp(group.current.position.x,p*.38,ease); state.camera.position.z=THREE.MathUtils.lerp(state.camera.position.z,6.8-p*.6,ease);});
 return <group ref={group}><FlowerBouquet3D/>{!reduced&&Array.from({length:9},(_,i)=><Float key={i} speed={.7} floatIntensity={.5} rotationIntensity={.3}><mesh position={[Math.sin(i*4)*1.8,Math.cos(i*3)*1.8, -.7]} rotation={[i,.4,i]} scale={[.045,.09,.018]}><sphereGeometry args={[1,6,5]}/><meshStandardMaterial color={i%2?'#d7b7e0':'#c3a5d4'}/></mesh></Float>)}</group>;
}
export default function BouquetScene(){
 const reduced=useReducedMotion(); const visible=usePageVisible(); const progress=useRef(0); const drag=useRef(0); const start=useRef<number|null>(null); const [supported,setSupported]=useState<boolean|null>(null);const [dpr,setDpr]=useState(1.5); const [inView,setInView]=useState(true); const wrapper=useRef<HTMLDivElement>(null);
 useEffect(()=>{try{const canvas=document.createElement('canvas');setSupported(!!(canvas.getContext('webgl2')||canvas.getContext('webgl')));}catch{setSupported(false);} const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting),{rootMargin:'100px'});if(wrapper.current)observer.observe(wrapper.current);return()=>observer.disconnect();},[]);
 useEffect(()=>{if(reduced)return;gsap.registerPlugin(ScrollTrigger);const tween=gsap.to(progress,{current:1,ease:'none',scrollTrigger:{trigger:'#beginning',start:'top top',end:'bottom top',scrub:1}});return()=>{tween.scrollTrigger?.kill();tween.kill();};},[reduced]);
 return <div ref={wrapper} className="bouquet-canvas" role="img" aria-label="A three-dimensional bouquet of lavender roses, tulips and white flowers, wrapped in lilac paper" style={{cursor:start.current!==null?'grabbing':'grab'}} onPointerDown={e=>{(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);start.current=e.clientX;}} onPointerMove={e=>{if(start.current!==null){drag.current+=(e.clientX-start.current)*.018;start.current=e.clientX;}}} onPointerUp={e=>{(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);start.current=null;}} onPointerLeave={()=>start.current=null} onPointerCancel={()=>start.current=null}>
 {supported===null?<BouquetFallback loading/>:supported?<CanvasBoundary><Canvas camera={{position:[0,2.4,6.8],fov:39}} dpr={dpr} frameloop={visible&&inView?'always':'never'} gl={{antialias:true,alpha:true,powerPreference:'low-power'}}><ambientLight intensity={.65}/><directionalLight position={[3,5,5]} intensity={2} color="#fff2e5"/><directionalLight position={[-3,2,0]} intensity={.7} color="#d9c2ff"/><Suspense fallback={null}><AnimatedBouquet progress={progress} reduced={reduced} drag={drag}/></Suspense><PerformanceMonitor onDecline={()=>setDpr(1)}/></Canvas></CanvasBoundary>:<BouquetFallback/>}
 </div>;
}
