import type { Metadata, Viewport } from "next";
import { Shippori_Mincho, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const sans = Zen_Maru_Gothic({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
});

const serif = Shippori_Mincho({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "受付 | 株式会社 Y Agency",
  description: "株式会社 Y Agency のタブレット受付システム",
  applicationName: "Y Agency 受付",
  appleWebApp: {
    capable: true,
    title: "Y Agency 受付",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#f3eee4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${sans.variable} ${serif.variable} ${sans.className} antialiased`}>{children}</body>
    </html>
  );
}
