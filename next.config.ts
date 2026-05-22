import type { NextConfig } from "next";

if (process.env.NODE_ENV === "development") {
	const { initOpenNextCloudflareForDev } = await import("@opennextjs/cloudflare");
	initOpenNextCloudflareForDev();
}

const nextConfig: NextConfig = {};

export default nextConfig;
