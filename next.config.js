/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
  // 🔥 Turbopack ko khali object de kar silence karein
  // Isse Next.js ko pata chal jayega ki hume Turbopack use karna hai
  turbopack: {}, 
};

module.exports = withPWA(nextConfig);