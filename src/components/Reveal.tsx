'use client';
import { motion } from 'motion/react';
import { useReducedMotion } from './hooks/useReducedMotion';
export default function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
 const reduced = useReducedMotion();
 return <motion.div className={className} initial={{ opacity: 0, y: reduced ? 0 : 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: reduced ? 0 : .9, delay: reduced ? 0 : delay, ease: [.2,.65,.3,1] }}>{children}</motion.div>;
}
