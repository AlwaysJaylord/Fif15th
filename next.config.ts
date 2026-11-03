import type { NextConfig } from 'next';
const config: NextConfig = { output: 'export', basePath: '/15th', env: { NEXT_PUBLIC_BASE_PATH: '/15th' }, turbopack: { root: process.cwd() }, images: { unoptimized: true }, poweredByHeader: false };
export default config;
