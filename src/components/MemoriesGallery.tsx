'use client';
import { useState } from 'react';
import { Expand } from 'lucide-react';
import { memories } from './content/memories';
import { site } from './content/site';
import Reveal from './Reveal';
import MemoryArtwork from './MemoryArtwork';
import PhotoLightbox from './PhotoLightbox';
export default function MemoriesGallery(){const [index,setIndex]=useState<number|null>(null);return <section id="memories" className="memories-section section"><Reveal><p className="eyebrow">04 / THE MOMENTS THAT STAY</p><h2>{site.memoriesHeading}<span className="small-heart">♡</span></h2><p className="section-description">{site.memoriesSubtitle}</p></Reveal><div className="memories-grid">{memories.map((memory,i)=><Reveal key={memory.id} delay={i*.1} className={`polaroid-wrap polaroid-${i%3}`}><button className="polaroid" onClick={()=>setIndex(i)} aria-label={`View ${memory.caption}`} aria-haspopup="dialog"><span className="photo-tape"/><span className="polaroid-image"><MemoryArtwork memory={memory}/><span className="photo-expand"><Expand size={17}/></span></span><span className="photo-caption">{memory.caption}</span>{memory.note&&<span className="photo-note">{memory.note}</span>}<span className="photo-number">{String(i+1).padStart(2,'0')} <span>♡</span></span></button></Reveal>)}</div><p className="memories-footnote">Little moments. Big feelings. Our story.</p>{index!==null&&<PhotoLightbox index={index} setIndex={setIndex} onClose={()=>setIndex(null)}/>}</section>;}
