// src/app/tentang/visi-misi/page.tsx
import VisiMisiPage from "@/components/visimisipage/VisiMisiPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visi & Misi | Batara Dharma Persada",
  description:
    "Visi, misi, dan nilai-nilai yang menjadi dasar pelayanan PT. Batara Dharma Persada dalam industri transportasi batubara",
  keywords: [
    "Visi Misi",
    "Batara Dharma Persada",
    "Transportasi Batubara",
    "Bekasi",
    "Indonesia",
  ],
};

export default function VisiMisi() {
  return <VisiMisiPage />;
}
