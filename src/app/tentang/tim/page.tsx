// app/tentang/tim/page.tsx
import TeamPage from "@/components/timpage/TeamPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board of Director | Batara Dharma Persada",
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

export default function TimPage() {
  return <TeamPage />;
}
