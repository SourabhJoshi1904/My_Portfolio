import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sourabhjoshi.dev"),
  title: "Sourabh Joshi — Full-Stack Developer",
  description:
    "Full-stack developer specializing in React, Next.js, Node.js, MongoDB, AI integrations and interactive web experiences. Building digital experiences that feel as good as they function.",
  keywords: [
    "Sourabh Joshi",
    "Full-Stack Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "MongoDB",
    "AI Integrations",
    "3D Web",
    "Three.js",
    "Web Developer India",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sourabhjoshi.dev",
    siteName: "Sourabh Joshi",
    title: "Sourabh Joshi — Full-Stack Developer",
    description: "Building digital experiences that feel as good as they function.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Sourabh Joshi — Full-Stack Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sourabh Joshi — Full-Stack Developer",
    description: "Building digital experiences that feel as good as they function.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-universe">{children}</body>
    </html>
  );
}
