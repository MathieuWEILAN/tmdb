/** @type {import('next').NextConfig} */
// next.config.js

const nextConfig = {
  i18n: {
    locales: ["en-US", "fr-FR", "es-ES"],
    defaultLocale: "en-US",
    localeDetection: false,
  },
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/original/**",
      },
    ],
  },
};

export default nextConfig;
