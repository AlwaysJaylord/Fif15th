import type { NextConfig } from 'next';
const config: NextConfig = { output: 'export', distDir: 'docs', basePath: '/PIPTEEN', env: { NEXT_PUBLIC_BASE_PATH: '/PIPTEEN' }, turbopack: { root: process.cwd() }, images: { unoptimized: true }, poweredByHeader: false };
export default config;
