import { Heart } from 'lucide-react';
import HeroSection from './components/HeroSection';
import MusicPlayer from './components/MusicPlayer';
import RomanticMessage from './components/RomanticMessage';
import LoveEnvelope from './components/LoveEnvelope';
import MemoriesGallery from './components/MemoriesGallery';
import ClosingSection from './components/ClosingSection';
import { site } from './content/site';
export default function Home(){return <><a className="skip-link" href="#our-story">Skip to our story</a><header className="site-header"><a href="#beginning" className="wordmark" aria-label="Our beginning">us<span>♡</span><small>VOL. 15</small></a><nav aria-label="Our story"><a href="#our-story">Our story</a><a href="#love-letter">The letter</a><a href="#memories">Memories</a></nav><span className="header-dedication"><Heart size={12}/>{site.dedication}</span></header><main><HeroSection/><RomanticMessage/><LoveEnvelope/><MemoriesGallery/><ClosingSection/></main><MusicPlayer/></>;}
