import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true, // Necessário caso use componentes de imagem do Next.js de forma estática
  },
};

export default nextConfig;
