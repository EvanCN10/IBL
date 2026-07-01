import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const hollywood = localFont({
  src: [
    {
      path: "../public/fonts/HollyWoodFont/SF Hollywood Hills.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/HollyWoodFont/SF Hollywood Hills Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/HollyWoodFont/SF Hollywood Hills Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/HollyWoodFont/SF Hollywood Hills Bold Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-hollywood",
  display: "swap",
});

const crosner = localFont({
  src: "../public/fonts/Crosner-Regular-FREE.otf",
  variable: "--font-crosner",
  display: "swap",
});

const drowner = localFont({
  src: "../public/fonts/Drowner-Free.otf",
  variable: "--font-drowner",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "IBL 2K26 | Open Recruitment Staff UKM Basket ITS",
  description: "Daftarkan diri kamu di IBL 2K26 — Open Recruitment Staff untuk ITS Basketball League tahun 2026. Acara tahunan UKM Basket Institut Teknologi Sepuluh Nopember.",
  keywords: ["IBL", "ITS Basketball League", "Open Recruitment", "UKM Basket ITS", "2K26"],
  openGraph: {
    title: "IBL 2K26 | Open Recruitment Staff",
    description: "Daftar sekarang untuk Open Recruitment Staff IBL 2K26!",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hollywood.variable} ${crosner.variable} ${drowner.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
