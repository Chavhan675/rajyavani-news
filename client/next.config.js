const withPWA = require("next-pwa")({
 dest: "public",
 disable: process.env.NODE_ENV === "development"
})

/** @type {import('next').NextConfig} */

const nextConfig = {
 reactStrictMode: true,
 images: {
  domains: ["localhost"]
 },
 env: {
  NEXT_PUBLIC_API_URL: "http://localhost:5000/api"
 }
}

module.exports = withPWA(nextConfig)