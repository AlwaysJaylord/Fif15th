# 15 Months of Us ♡
A complete, frontend-only romantic keepsake built with Next.js App Router, TypeScript, Tailwind CSS 4, React Three Fiber, Drei, Three.js, Motion, GSAP ScrollTrigger, and Lucide.

## Run locally
Requires Node.js 20.9+ (Node.js 22 recommended).

```sh
npm install
npm run dev
```
Open http://localhost:3000. For verification:

```sh
npm run typecheck
npm run build
```
The build produces a static website in `out/`. No server endpoints, accounts, database, API keys, or paid assets are used. `npm start` is not used for static exports; serve `out/` using any static HTTP server when inspecting the production output.

## Make it yours
- **Names and headings:** `src/content/site.ts`. The anniversary date is optional and is not invented. Set it for your records; the experience celebrates the specified 15 months rather than calculating a changing counter.
- **Personal letter:** `src/content/love-letter.ts`. Each paragraph is a separate array entry.
- **Photographs:** copy real images into `public/images/memories/`, then edit `src/content/memories.ts`. Set `src` to `/images/memories/your-photo.jpg`. Set meaningful `alt`, caption, and note. Reorder/add/remove array entries to change the gallery. Use unique IDs. WebP/JPEG around 1200–1600px wide and under 400KB work well. Avoid personal information in filenames. Empty or missing photos display original CSS keepsake illustrations. No stock photos are presented as your personal memories.
- **Music:** copy your MP3 to `public/music/our-song.mp3`, or change `musicPath` in site configuration. The user starts playback; the volume fades to 55%, loops, and persists while scrolling. Missing/unplayable files show a gentle message. No fake MP3 is included.
- **Colors:** all eight theme colors are CSS variables at the top of `src/app/globals.css`.
- **Typography:** Cormorant Garamond, Great Vibes, and DM Sans load through Google Fonts with `display=swap` and system fallbacks. Google Fonts needs an internet connection; no build-time font download is required.

## Experience and accessibility
The main bouquet is real procedural geometry: layered roses, tulips, white accent flowers, stems, leaves, paper wrapping, ribbon loops and tails. No GLB or image is required. A capped pixel ratio and performance monitor adapt rendering quality. Rendering stops offscreen or when the page is hidden. ScrollTrigger interpolates rotation, position, and camera distance without hijacking scrolling. Touch drag gently turns the bouquet and preserves vertical page scrolling.

Letter and photo viewers use native modal dialogs with focus containment, Escape dismissal, focus restoration, and background scroll locking. Photos support arrow keys, previous/next buttons, and horizontal touch swipes. Reduced motion disables CSS animations and scroll-driven bouquet movement. The bouquet remains visible with lighting and manual rotation. WebGL errors fall back to a lightweight floral dedication.

Next Image is configured as unoptimized for a portable static export. Images still get lazy loading, responsive sizes, and reserved aspect ratios; compress your original files before adding them. The 3D component is dynamically imported. No binary placeholder assets are included.

## Project map
`src/app` contains the page, layout, and responsive visual system. `src/components` contains the full bouquet, story, envelope, gallery, music, and closing experience. `src/content` contains all personalized copy and photo settings. `src/hooks` contains reduced-motion and visibility handling.
