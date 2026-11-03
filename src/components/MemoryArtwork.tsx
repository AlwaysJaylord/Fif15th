'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { Memory } from '@/content/memories';
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export default function MemoryArtwork({memory,large=false}:{memory:Memory;large?:boolean}){const [failed,setFailed]=useState(false);
 return memory.src&&!failed?<Image src={`${BASE}${memory.src}`} alt={memory.alt} fill sizes={large?'(max-width: 700px) 92vw, 800px':'(max-width: 700px) 90vw, 33vw'} style={{objectFit:large?'contain':'cover'}} onError={()=>setFailed(true)}/>:<div className={`memory-art art-${Number(memory.id)%3}`} role="img" aria-label={`${memory.caption}. An illustrated keepsake waiting for your photo.`}><div className="art-sun"/><div className="art-hill hill-back"/><div className="art-hill hill-front"/><span className="art-stars">✧<br/>·<br/>✧</span><span className="art-flowers">✿</span><span className="art-heart">♡</span><p>A moment to keep</p><small>YOUR PHOTO BELONGS HERE</small></div>;
}
