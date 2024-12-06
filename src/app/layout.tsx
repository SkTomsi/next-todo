import type { Metadata } from "next";
import { Crimson_Text } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

const crimsonText = Crimson_Text({
	weight: ["400", "600", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-crimson-text",
});

export const metadata: Metadata = {
	title: "Todo App - Next.js, Zustand, TypeScript, Tailwind CSS",
	description:
		"A simple todo app built with Next.js, Zustand, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={` ${crimsonText.variable} ${geistSans.className} antialiased`}
			>
				<main className="relative min-h-screen w-full">
					<div className="mx-auto max-w-[568px]">{children}</div>
					<Toaster richColors position="top-center" />
				</main>
			</body>
		</html>
	);
}
