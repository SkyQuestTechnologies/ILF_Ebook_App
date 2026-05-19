
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "iFLEbook — Free Ebooks for Students",
	description: "Empower your learning journey with exclusive access to digital books. Claim your free ebook in seconds.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			</head>
			<body
				className={`min-h-screen bg-white text-slate-900 antialiased ${geistSans.variable} ${geistMono.variable}`}
			>
				<LenisProvider>{children}</LenisProvider>
			</body>
		</html>
	);
}
