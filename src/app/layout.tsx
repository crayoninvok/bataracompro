// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import Navbar from "@/components/Navbar";
import AuthWrapper from "@/components/AuthWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Batara Dharma Persada",
    template: "%s | Batara Dharma Persada",
  },
  description: "Profil Perusahaan PT. Batara Dharma Persada",
  keywords: ["Batara Dharma Persada", "Perusahaan", "Indonesia", "Bekasi"],
  authors: [
    {
      name: "PT. Batara Dharma Persada",
    },
  ],
  creator: "PT. Batara Dharma Persada",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bataradharma.com",
    title: "Batara Dharma Persada",
    description: "Profil Perusahaan PT. Batara Dharma Persada",
    siteName: "Batara Dharma Persada",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="bg-white text-gray-900 antialiased">
        <AuthWrapper>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthWrapper>
        <Analytics />
      </body>
    </html>
  );
}
 