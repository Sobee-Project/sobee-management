/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "localhost"
      },
      {
        hostname: "avatar.iran.liara.run"
      },
      {
        hostname: "res.cloudinary.com"
      }
    ]
  }
}

export default nextConfig
