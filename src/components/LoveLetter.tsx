'use client';
import { loveLetter } from '@/content/love-letter';
import Modal from './Modal';
export default function LoveLetter({onClose}:{onClose:()=>void}){return <Modal onClose={onClose} label="A little letter for you" className="letter-modal"><article className="letter-paper"><span className="letter-flower" aria-hidden="true">❦</span><p className="eyebrow">FROM MY HEART TO YOURS</p><h3>{loveLetter.greeting}</h3>{loveLetter.paragraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}<div className="letter-signature"><span>{loveLetter.closing}</span><strong>{loveLetter.signature}</strong></div><span className="letter-flower bottom" aria-hidden="true">❦</span></article></Modal>;}
