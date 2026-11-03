'use client';
import { useEffect, useRef, useState } from 'react';
import { Heart, MoveUpRight } from 'lucide-react';
import { site } from './content/site';
import { useReducedMotion } from './hooks/useReducedMotion';
import Reveal from './Reveal';
import LoveLetter from './LoveLetter';
export default function LoveEnvelope(){const [opening,setOpening]=useState(false);const [open,setOpen]=useState(false);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);const reduced=useReducedMotion();useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 function reveal(){if(opening)return;setOpening(true);timer.current=setTimeout(()=>setOpen(true),reduced?0:1150);}
 function close(){setOpen(false);setOpening(false);}
 return <section className="letter-section section" id="love-letter"><Reveal><p className="eyebrow">03 / WORDS I KEEP CLOSE</p><h2>{site.letterHeading}<span className="small-heart">♡</span></h2><p className="section-description">{site.letterSubtitle}</p></Reveal><Reveal><button className={`envelope ${opening?'opening':''}`} onClick={reveal} aria-label="Open your love letter" aria-haspopup="dialog" aria-expanded={open}><span className="envelope-back"/><span className="envelope-letter"><span>To my favorite person,</span><i/><i/><i/><Heart size={20}/></span><span className="envelope-front"/><span className="envelope-flap"/><span className="wax-seal"><Heart size={24} fill="currentColor" strokeWidth={1}/></span><span className="envelope-address">for you, with all my love</span></button><p className="envelope-hint">A little piece of my heart <MoveUpRight size={15}/></p><span className="tiny-note">TAP THE ENVELOPE TO OPEN</span></Reveal>{open&&<LoveLetter onClose={close}/>}</section>;}
