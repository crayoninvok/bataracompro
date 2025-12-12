import type { Metadata } from "next";
import localFont from "next/font/local";
import { Comfortaa, Inder } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import MaintenanceLayout from "@/components/MaintenanceLayout";
import { AuthProvider } from "@/hooks/useAuth"; // Add this import

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
      className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} ${inder.variable} scroll-smooth`}
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
        <AuthProvider>
          <MaintenanceLayout>{children}</MaintenanceLayout>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
