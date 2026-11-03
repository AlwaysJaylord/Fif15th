import { ArrowUp, Heart } from 'lucide-react';
import { site } from '@/content/site';
import Reveal from './Reveal';
import FloatingPetals from './FloatingPetals';
export default function ClosingSection(){return <section className="closing-section section"><FloatingPetals/><Reveal><p className="eyebrow">05 / TO ALL OUR TOMORROWS</p><div className="closing-heart"><Heart size={58} strokeWidth={.8}/><span>♡</span></div><h2>{site.closingHeading}<span className="small-heart">♡</span></h2><p className="section-description">{site.closingText}</p><p className="handwritten">{site.closingLine}</p><a className="back-button" href="#beginning">Back to Our Beginning <ArrowUp size={16}/></a></Reveal><footer><span>Made with Love ♡</span><span>YOU & ME, ALWAYS.</span></footer></section>;}
