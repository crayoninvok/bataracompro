"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";

type Member = {
  name: string;
  position: string;
  description: string;
  image: string;
};

const topMembers: Member[] = [
  {
    name: "A. Kurnia",
    position: "President Director",
    description: `A. Kurnia (AK) started his career in the mining industry in 1974 by joining the Service Division of PT United Tractors (UT). He ended his career at PT UT in 1997 with his last position as General Manager of the Mining Division.

He was then trusted to handle the position of Plant Director at PT Pamapersada Nusantara (PAMA) with his vision and competence, and later served as Operations Director. Since 2007, AK became Plant Director at PT Saptaindra Sejati (SIS) and was also trusted to be Director of Operations at PT SIS, focusing on increasing productivity and achieving optimal efficiency.

From 2012 to 2019, AK served as Vice President. After a long career and proven experience, AK established PT Bahtera Putera Nusantara (BATARA) and PT Batara Dharma Persada in 2024.`,
    image: "/team/kurnia.jpg",
  },
  {
    name: "Eric NG",
    position: "Vice President Director",
    description: "Corporate Management",
    image: "/team/eric.jpg",
  },
  {
  name: "Yohanes C. Wibowo",
  position: "Operations Director",
  description: `Yohanes C. Wibowo (YCW) devoted himself to PT Pamapersada Nusantara (PAMA), where he worked until achieving the position of Plant Manager in 2008.

He continued his career by joining PT Riung Mitra Lestari (RML) and was trusted to serve as Operations Director for six years. During his tenure, YCW played a significant role in transforming RML into one of the leading pioneer mining contractors in Indonesia, known for its rapid growth and production achievements.

Currently, YCW is entrusted with the role of Operations / Plant Director at PT Batara Dharma Persada.`,
  image: "/team/yohanes.jpg"
}
];

const bottomMembers: Member[] = [
  {
    name: "John Doe1",
    position: "XXXXXXXXX",
    description: `Berkewarganegaraan Indonesia, lahir tahun 1943, diangkat pertama kali sebagai Komisaris Independen Perseroan berdasarkan keputusan RUPS Luar Biasa tanggal 28 November 2017 yang pengangkatannya efektif per tanggal 1 Januari 2018 dan saat ini menjabat berdasarkan keputusan RUPS Tahunan tanggal 19 April 2023. Saat ini, beliau juga menjabat sebagai Penasihat Senior Grup Gajah Tunggal dan PT Mayora. Sebelumnya, beliau menjabat sebagai Partner dan Penasihat Hukum Senior di Hadiputranto, Hadinoto & Partners.`,
    image: "/team/sri.jpg",
  },
  {
    name: "John Doe2",
    position: "XXXXXX",
    description:
      "Financial Oversight and regulatory governance expert with experience in national financial institutions.",
    image: "/team/muliaman.jpg",
  },
  {
    name: "John Doe3",
    position: "XXXXXXX",
    description: "Strategic Investment & Industry Relations",
    image: "/team/apinont.jpg",
  },
  {
    name: "John Doe3",
    position: "XXXXXXXX",
    description: "Corporate Oversight & Risk Management",
    image: "/team/prijono.jpg",
  },
];

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal-member");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main className="min-h-screen bg-black/80 backdrop-blur-lg">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden border-b border-gray-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48" />
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747206106/IMG_0002_rjugv5.jpg"
            alt="Mining operations"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10">Board of Directors</span>
                <span
                  className="absolute bottom-0 left-0 w-full h-3 bg-[#E85C23]/30 z-0"
                  style={{ bottom: "5px" }}
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Our directors drive daily operations and innovation, ensuring
              excellence across every division
            </p>
            <div className="animate-bounce mt-8">
              <ChevronRight className="w-8 h-8 text-[#1FBFB8] transform rotate-90" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 px-4 md:px-8 lg:px-24 border-b border-gray-800">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Top Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topMembers.map((member, idx) => (
              <MemberCard
                key={idx}
                member={member}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
          {/* Bottom Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bottomMembers.map((member, idx) => (
              <MemberCard
                key={idx}
                member={member}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedMember && (
        <Modal onClose={() => setSelectedMember(null)}>
          <div className="w-full md:w-1/3 flex justify-center items-start">
            <div className="relative w-56 h-72 rounded-lg overflow-hidden border">
              <Image
                src={selectedMember.image}
                alt={selectedMember.name}
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="w-full md:w-2/3 text-left space-y-4 overflow-auto">
            <h3 className="text-2xl font-bold text-[#1a1a1a]">
              {selectedMember.name}
            </h3>
            <p className="text-[#7c7c7c] font-semibold">
              {selectedMember.position}
            </p>
            <div className="w-16 h-0.5 bg-[#1FBFB8]/50" />
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedMember.description}
            </p>
          </div>
        </Modal>
      )}
    </main>
  );
}

// Member Card Component
function MemberCard({
  member,
  onClick,
}: {
  member: Member;
  onClick: () => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div onClick={onClick} className="cursor-pointer h-full group">
      <div className="rounded-lg overflow-hidden shadow-md h-full flex flex-col border border-gray-200 group-hover:border-[#1677FF] transition-colors duration-300">
        <div className="h-80 relative bg-gray-100 group-hover:brightness-90 transition duration-300">
          <Image
            src={imageError ? "/fallback.jpg" : member.image}
            alt={member.name}
            fill
            onError={() => setImageError(true)}
            className="object-cover object-center"
            unoptimized
          />
        </div>
        <div className="p-6 text-center bg-white text-gray-800 group-hover:bg-[#1677FF] group-hover:text-white transition-all mt-auto">
          <h3 className="text-lg font-bold uppercase">{member.name}</h3>
          <p className="mt-1 text-gray-600 group-hover:text-white">
            {member.position}
          </p>
        </div>
      </div>
    </div>
  );
}

// Modal Wrapper
function Modal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-5xl relative flex flex-col md:flex-row gap-6 p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
}
