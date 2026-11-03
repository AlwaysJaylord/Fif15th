import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: '15 Months of Us ♡', description: 'A little corner of the universe, just for you. One year, three months, and a lifetime still to come.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
