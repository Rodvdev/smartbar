import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartBar - Restaurant Management System",
  description: "Intelligent restaurant management system with dynamic pricing, AI-powered insights, and real-time analytics for optimal revenue optimization.",
  keywords: ["restaurant", "management", "pricing", "AI", "analytics", "revenue", "optimization"],
  authors: [{ name: "SmartBar Team" }],
  creator: "SmartBar",
  publisher: "SmartBar",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smartbar.vercel.app",
    title: "SmartBar - Restaurant Management System",
    description: "Intelligent restaurant management system with dynamic pricing and AI-powered insights",
    siteName: "SmartBar",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartBar - Restaurant Management System",
    description: "Intelligent restaurant management system with dynamic pricing and AI-powered insights",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
