/** @type {import('next').NextConfig} */
const nextConfig = {
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
    },
    reactStrictMode: false
}

export default nextConfig
