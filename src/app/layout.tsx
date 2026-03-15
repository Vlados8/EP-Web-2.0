import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/seo/Analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Empire Premium Bau | Exzellenz in Photovoltaik & Wärmepumpen",
  description: "Premium-Lösungen für Photovoltaik, Wärmepumpen und exklusiven Innenausbau in Bremen. Wir gestalten die Energie-Zukunft Ihres Hauses.",
  keywords: ["Photovoltaik Bremen", "Wärmepumpen Bremen", "Innenausbau", "Smart Home", "Empire Premium Bau", "Solaranlagen"],
  authors: [{ name: "Empire Premium Bau GmbH" }],
  openGraph: {
    title: "Empire Premium Bau | Exzellenz in Energie",
    description: "Zukunftssichere Energie-Lösungen und exklusiver Innenausbau.",
    url: "https://empire-premium-bau.de",
    siteName: "Empire Premium Bau",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Empire Premium Bau | Exzellenz in Energie",
    description: "Premium Photovoltaik & Wärmepumpen Lösungen.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_ID || "your-gsc-verification-code",
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} antialiased`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
