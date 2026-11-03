export type Memory = { id: string; src: string; caption: string; note: string; alt: string };
// Put your photos in public/images/memories, then change src below. Order here is display order.
// Empty or missing images show illustrated keepsakes, never broken image icons.
export const memories: Memory[] = [
  { id: '01', src: '/images/memories/photo1.jpg', caption: 'Cute mo Babe', note: '', alt: 'Our first memory together' },
  { id: '02', src: '/images/memories/photo2.jpg', caption: 'Takbo na ulit!', note: '', alt: 'A little everyday moment together' },
  { id: '03', src: '/images/memories/photo3.jpg', caption: 'Cutiess', note: '', alt: 'A favorite adventure together' },
  { id: '04', src: '/images/memories/photo4.jpg', caption: 'After kain', note: '', alt: 'Another beautiful memory' },
  { id: '05', src: '/images/memories/photo5.jpg', caption: 'Kisss!', note: '', alt: 'A cherished memory together' },
  { id: '06', src: '/images/memories/photo6.jpg', caption: 'Travel with you!', note: '', alt: 'A precious memory' },
];
