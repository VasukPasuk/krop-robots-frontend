/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: process.env.NEXT_PUBLIC_ORIGIN,
				port: "1337",
				pathname: "/uploads/**/*",
			},
		],
		unoptimized: true
	},
	
};

export default nextConfig;
