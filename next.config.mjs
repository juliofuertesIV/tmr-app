/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.fallback = { 
            net: false,
            tls: false,
            fs: false,
            'pg-hstore': false
        };
    
        return config;
    },
    experimental: {
        serverComponentsExternalPackages: ['sequelize'],
    },
};

export default nextConfig;
