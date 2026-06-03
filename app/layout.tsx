import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "@/components/providers";
import { defaultLanguage, LANGUAGE_COOKIE, type Language } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Portfolio | Creative Developer",
    template: "%s | Portfolio",
  },
  description:
    "Crafting digital experiences with precision and creativity. Explore my work in web development, design, and interactive experiences.",
  keywords: ["portfolio", "developer", "web design", "creative", "frontend"],
  authors: [{ name: siteConfig.author }],
  openGraph: {
    title: "Portfolio | Creative Developer",
    description: "Crafting digital experiences with precision and creativity.",
    type: "website",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Creative Developer",
    description: "Crafting digital experiences with precision and creativity.",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const stored = cookieStore.get(LANGUAGE_COOKIE)?.value;
  const initialLanguage: Language =
    stored === "ja" || stored === "en" ? stored : defaultLanguage;

  return (
    <html lang={initialLanguage} className="bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers initialLanguage={initialLanguage}>{children}</Providers>
      </body>
    </html>
  );
}
