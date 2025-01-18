/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
            },
            {
                protocol: 'https',
                hostname: 'soyunacaca.net'
            }
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
