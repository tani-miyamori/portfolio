import type { Metadata, Viewport } from "next";
import { Noto_Serif_JP, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "歴史館 | 美は、時間を超える。",
  description: "千年の時を超えて受け継がれる美の本質。日本の歴史と文化の深淵を探求する、唯一無二のミュージアム体験。",
  keywords: ["歴史館", "美術館", "日本文化", "歴史", "伝統"],
  authors: [{ name: "歴史館" }],
  openGraph: {
    title: "歴史館 | 美は、時間を超える。",
    description: "千年の時を超えて受け継がれる美の本質を探求する。",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="bg-background">
      <body
        className={`${notoSerifJP.variable} ${cormorant.variable} font-serif antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
