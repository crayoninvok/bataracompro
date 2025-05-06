// src/app/tentang/profil/page.tsx
import ProfilePage from "@/components/profilepage/ProfilePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Perusahaan | Batara Dharma Persada",
  description:
    "Mengenal lebih dekat PT. Batara Dharma Persada sebagai mitra transportasi batubara yang terpercaya di Indonesia",
  keywords: [
    "Batara Dharma Persada",
    "Profil Perusahaan",
    "Transportasi Batubara",
    "Bekasi",
    "Indonesia",
  ],
};

export default function Profile() {
  return <ProfilePage />;
}
