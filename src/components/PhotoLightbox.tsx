'use client';
import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { memories } from './content/memories';
import Modal from './Modal';
import MemoryArtwork from './MemoryArtwork';
export default function PhotoLightbox({index,setIndex,onClose}:{index:number;setIndex:(index:number)=>void;onClose:()=>void}){const start=useRef<{x:number;y:number}|null>(null);const memory=memories[index];
 useEffect(()=>{function key(e:KeyboardEvent){if(e.key==='ArrowRight')setIndex((index+1)%memories.length);if(e.key==='ArrowLeft')setIndex((index-1+memories.length)%memories.length);}window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[index,setIndex]);
 return <Modal onClose={onClose} label="Our photo memories" className="photo-modal"><div className="lightbox-image" onTouchStart={e=>{start.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}} onTouchEnd={e=>{if(!start.current)return;const dx=e.changedTouches[0].clientX-start.current.x;const dy=e.changedTouches[0].clientY-start.current.y;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))setIndex((index+(dx<0?1:-1)+memories.length)%memories.length);start.current=null;}}><MemoryArtwork key={memory.id} memory={memory} large/></div><div className="lightbox-caption" aria-live="polite"><p>{memory.caption}</p><span>{memory.note}</span></div><div className="lightbox-nav"><button className="icon-button" aria-label="Previous memory" onClick={()=>setIndex((index-1+memories.length)%memories.length)}><ArrowLeft size={20}/></button><span>{index+1} / {memories.length}</span><button className="icon-button" aria-label="Next memory" onClick={()=>setIndex((index+1)%memories.length)}><ArrowRight size={20}/></button></div></Modal>;
}
