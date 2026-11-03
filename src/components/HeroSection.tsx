'use client';
import dynamic from 'next/dynamic';
import { ArrowDown, Sparkles } from 'lucide-react';
import { site } from '@/content/site';
import Reveal from './Reveal';
const BouquetScene=dynamic(()=>import('./BouquetScene'),{ssr:false,loading:()=> <div className="bouquet-fallback"><span>✿</span><p>Gathering a little love…</p></div>});
export default function HeroSection(){return <section id="beginning" className="hero"><div className="hero-orbit" aria-hidden="true"/><div className="hero-layout"><Reveal className="hero-copy"><p className="eyebrow"><span/> FOR YOU, ALWAYS</p><h1>{site.heroHeading}<br/><em>{site.girlfriendName}</em><span className="heading-heart">♡</span></h1><p className="hero-subtitle">{site.subtitle}</p><p className="hero-line">{site.heroLine}</p><a href="#our-story" className="story-link">Scroll to Unwrap Our Story <ArrowDown size={15}/></a></Reveal><div className="bouquet-stage"><div className="bouquet-halo"/><span className="bouquet-label"><Sparkles size={13}/> A bouquet, just for you</span><BouquetScene/><span className="bouquet-note">every petal says “I love you”</span><span className="drag-note">Gently drag to turn · made with love</span></div></div><div className="hero-foot"><span>ONE YEAR. THREE MONTHS. ALWAYS US.</span><span>01 — THE BEGINNING</span></div></section>;}
