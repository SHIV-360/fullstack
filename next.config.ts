
import type {NextConfig} from 'next';

// Check for required Firebase environment variables during build
if (process.env.NODE_ENV === 'production') {
  const requiredEnv = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
  ];
  const missingEnv = requiredEnv.filter(envVar => !process.env[envVar]);
  if (missingEnv.length > 0) {
    throw new Error(
      `[ForensicHub] Missing required environment variables for production build: ${missingEnv.join(
        ', '
      )}. Please set them in your Vercel project settings.`
    );
  }
}


const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
