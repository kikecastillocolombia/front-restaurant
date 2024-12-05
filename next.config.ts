import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,  // Desactiva el modo estricto de React
  eslint: {
    ignoreDuringBuilds: true,  // Ignora los warnings de eslint durante la compilación
  },
  typescript: {
    ignoreBuildErrors: true,  // Ignora los errores de TypeScript durante la compilación
  },
  images: {
    domains: ['res.cloudinary.com'],  // Permite cargar imágenes desde Cloudinary
  },
};

export default nextConfig;
