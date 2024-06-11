/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images : {
        remotePatterns: [
            {
                hostname : 'image.tmdb.org'
            },
            {
                hostname : 'avatars.githubusercontent.com'
            }, 
            {
                hostname : 'lh3.googleusercontent.com'
            }
        ]
    }
};

export default nextConfig;
