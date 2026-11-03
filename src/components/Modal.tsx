'use client';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
export default function Modal({ children, onClose, label, className='' }: {children:React.ReactNode;onClose:()=>void;label:string;className?:string}) {
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const dialog=ref.current;const previous=document.activeElement as HTMLElement|null;dialog?.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{dialog?.close();document.body.style.overflow=old;previous?.focus();};},[]);
 return <dialog ref={ref} className={`modal ${className}`} aria-label={label} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===ref.current)onClose();}}><div className="modal-content"><button className="icon-button modal-close" onClick={onClose} aria-label="Close dialog" autoFocus><X size={20}/></button>{children}</div></dialog>;
}
