/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "localhost"
            },
            {
                hostname: "avatar.iran.liara.run"
            }
        ]
    },
    reactStrictMode: false
}

export default nextConfig
