/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  output: "standalone",
  images: {
    domains: ["assets.kogan.com", "loremflickr.com", "picsum.photos"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "ecommercedemo.blob.core.windows.net",
      },
    ],
  },
};

export default nextConfig;
