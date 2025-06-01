import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import AuthWrapper from "@/components/AuthWrapper";
import NavbarWrapper from "@/components/NavbarWrapper";

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
  keywords: [
    "Batara Dharma Persada",
    "Perusahaan",
    "Indonesia",
    "Cakung",
    "Jakarta",
    "Mining",
    "Coal Hauling",
    "Kalimantan Timur",
    "Indonesia Pratama",
    "Bayan Group",
  ],
  authors: [
    {
      name: "PT. Batara Dharma Persada",
    },
  ],
  creator: "PT. Batara Dharma Persada",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bataramining.com",
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
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inder&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* ✅ Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PT Batara Dharma Persada",
              url: "https://bataramining.com",
              logo: "https://bataramining.com/favicon.ico",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+622138865143",
                contactType: "Customer Support",
                areaServed: "ID",
                availableLanguage: "Indonesian",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Agung Sedayu City Boulevard Utara No.58",
                addressLocality: "Jakarta Timur",
                postalCode: "13910",
                addressCountry: "ID",
              },
            }),
          }}
        />
      </head>

      <body className="bg-white text-gray-900 antialiased overflow-x-hidden">
        <AuthWrapper>
          <div className="relative flex min-h-screen flex-col">
            <NavbarWrapper>
              <main className="flex-1">{children}</main>
            </NavbarWrapper>
            <Footer />
          </div>
        </AuthWrapper>
        <Analytics />
      </body>
    </html>
  );
}
