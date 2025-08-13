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
  title: "Undangan Pernikahan Agung & Ayu",
  description: "Minggu, 31 Agustus 2025 || Resepsi Pernikahan Agung & Ayu",
  icons: {
    icon: '/favicon.ico', // ikon default (favicon)
    shortcut: '/favicon.ico', // ikon shortcut (untuk iOS/Android lama)
    apple: '/apple-touch-icon.png', // untuk perangkat Apple
     },
  openGraph: {
    title: "Undangan Pernikahan Agung & Ayu",
    description: "Minggu, 31 Agustus 2025 || Resepsi Pernikahan Agung & Ayu",
    url: "https://wedding-agungayu.com",
    siteName: "Undangan Agung & Ayu",
    images: [
      {
        url: "https://wedding-agungayu.com/img/g19_cover.jpg", // ✅ path lengkap
        width: 1200,
        height: 630,
        alt: "Undangan Agung & Ayu",
      },
    ],
    type: "website",
  },   
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>   
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Link atau metadata lainnya yang diperlukan */}
        <link href="https://fonts.googleapis.com/css2?family=Allura&family=Lora:ital,wght@0,400..700;1,400..700&family=Tangerine:wght@400;700&family=Viaoda+Libre&display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
