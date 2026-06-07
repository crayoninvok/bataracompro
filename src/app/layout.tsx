import type { Metadata } from "next";
import localFont from "next/font/local";
import { Comfortaa, Inder, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/hooks/useAuth";

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

const comfortaa = Comfortaa({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

const inder = Inder({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-inder",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
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
    "Cilincing",
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
      className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} ${inder.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <head>
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
                streetAddress:
                  "Rukan Grand Orchard Square, Jl. Terusan Klp. Hybrida Blok D22, RT.9/RW.1",
                addressLocality: "Sukapura, Cilincing, Jakarta",
                postalCode: "14140",
                addressCountry: "ID",
              },
            }),
          }}
        />
      </head>

      <body className="bg-white text-gray-900 antialiased overflow-x-hidden">
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <NavbarWrapper>
              <main className="flex-1">{children}</main>
            </NavbarWrapper>
            <Footer />
          </div>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
