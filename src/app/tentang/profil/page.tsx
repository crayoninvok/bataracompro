// src/app/tentang/profil/page.tsx
import ProfilePage from "@/components/profilepage/ProfilePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Perusahaan | Batara Dharma Persada",
  description:
    "Get to know PT. Batara Dharma Persada as a trusted coal transportation partner in Indonesia.",
  keywords: [
    "Batara Dharma Persada",
    "Profil Perusahaan",
    "Company Profile",
    "Transportasi Batubara",
    "Coal Transport",
    "Jakarta",
    "Kalimantan",
    "Kalimantan Timur",
    "Tabang",
    "Indonesia",
  ],
};

export default function Profile() {
  return <ProfilePage />;
}
