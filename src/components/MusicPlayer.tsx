'use client';
import { useEffect, useRef, useState } from 'react';
import { Music2, Pause, Play } from 'lucide-react';
import { site } from './content/site';
export default function MusicPlayer(){const audio=useRef<HTMLAudioElement>(null);const frame=useRef(0);const [playing,setPlaying]=useState(false);const [error,setError]=useState(false);const [busy,setBusy]=useState(false);
 useEffect(()=>()=>cancelAnimationFrame(frame.current),[]);
 async function toggle(){const song=audio.current;if(!song||busy)return;cancelAnimationFrame(frame.current);if(!song.paused){song.pause();return;}setBusy(true);setError(false);song.volume=0;try{await song.play();const begin=performance.now();const fade=(now:number)=>{song.volume=Math.min(.55,(now-begin)/1800*.55);if(song.volume<.55&&!song.paused)frame.current=requestAnimationFrame(fade);};frame.current=requestAnimationFrame(fade);}catch{setError(true);}finally{setBusy(false);}}
 const base=process.env.NEXT_PUBLIC_BASE_PATH??'';return <div className="music-wrap"><audio ref={audio} src={`${base}${site.musicPath}`} loop preload="none" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>{setError(true);setPlaying(false);}}/><button className={`music-button ${playing?'is-playing':''}`} onClick={toggle} disabled={busy} aria-label={playing?'Pause our song':'Play our song'} aria-pressed={playing}><Music2 size={16}/><span>{playing?'Our song is playing':busy?'Opening our song…':'Play Our Song ♡'}</span>{playing?<Pause size={13}/>:<Play size={13}/>}</button>{error&&<p className="music-error" role="status">Our song isn’t available yet. Enjoy our story in the quiet. ♡</p>}</div>;
}
