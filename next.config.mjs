/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // i.ibb.co images (old)
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      // Any subdomain of ibb.co (optional)
      {
        protocol: "https",
        hostname: "*.ibb.co",
      },
      // Cloudinary images (for future uploads)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
