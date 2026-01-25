import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aiideavalidator.com"),
  title: {
    default: "AI Idea Validator - Is Your Startup Idea Defensible?",
    template: "%s | AI Idea Validator",
  },
  description:
    "A brutally honest defensibility assessment for founders. Find out if your business idea can survive competition, platform changes, and solo-founder realities before you build.",
  keywords: [
    "startup validation",
    "idea validation",
    "business defensibility",
    "founder tools",
    "startup assessment",
    "moat analysis",
    "solo founder",
    "indie hacker",
    "startup ideas",
    "business validation",
    "ai idea validator",
  ],
  authors: [{ name: "AI Idea Validator" }],
  creator: "AI Idea Validator",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aiideavalidator.com",
    siteName: "AI Idea Validator",
    title: "AI Idea Validator - Is Your Startup Idea Defensible?",
    description:
      "A brutally honest defensibility assessment for founders. Find out if your business idea can survive before you build.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Idea Validator - Defensibility Assessment for Founders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Idea Validator - Is Your Startup Idea Defensible?",
    description:
      "A brutally honest defensibility assessment for founders. Find out if your business idea can survive before you build.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
