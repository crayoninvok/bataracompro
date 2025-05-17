"use client";

import React, { useState } from "react";
import Hero from "@/components/bod/BODHero";
import CommissionerSection from "@/components/bod/CommisionersSection";
import DirectorsSection from "@/components/bod/DirectorSection";
import ManagersSection from "@/components/bod/ManagerSection";
import SiteManagersSection from "@/components/bod/SiteManagerSection";
import { X } from "lucide-react";
import Image from "next/image";

// Types
interface Person {
  name: string;
  position: string;
  description: string;
  image: string;
}

// Sample data
const commissionersData: Person[] = [
  {
    name: "Lau Lie In",
    position: "Commisioners",
    description: ``,
    image: "/defavatar.jpg",
  },
];

const directorsData: Person[] = [
  {
    name: "A. Kurnia",
    position: "President Director",
    description: `A. Kurnia (AK) started his career in the mining industry in 1974 by joining the Service Division of PT United Tractors (UT). He ended his career at PT UT in 1997 with his last position as General Manager of the Mining Division.
He was then trusted to handle the position of Plant Director at PT Pamapersada Nusantara (PAMA) with his vision and competence, and later served as Operations Director.`,
    image: "/defavatar.jpg",
  },
  {
    name: "Eric NG",
    position: "Director",
    description: ``,
    image: "/defavatar.jpg",
  },
  {
    name: "Yohanes C. Wibowo",
    position: "Operations Director",
    description: `Yohanes C. Wibowo (YCW) devoted himself to PT Pamapersada Nusantara (PAMA), where he worked until achieving the position of Plant Manager in 2008.
He continued his career by joining PT Riung Mitra Lestari (RML) and was trusted to serve as Operations Director for six years.`,
    image: "/defavatar.jpg",
  },
];

const managersData: Person[] = [
  {
    name: "Dhio Tragitza Rescha",
    position: "Operation Manager",
    description: ``,
    image: "/defavatar.jpg",
  },
  {
    name: "Dadang Setyawan",
    position: "Manager",
    description: ``,
    image: "/defavatar.jpg",
  },
  {
    name: "A. Heru Prastowo",
    position: "Manager",
    description: ``,
    image: "/defavatar.jpg",
  },
  {
    name: "Susanto",
    position: "Manager",
    description: ``,
    image: "/defavatar.jpg",
  },
];

const siteManagersData: Person[] = [
  {
    name: "Anggi Okta Yudha P.",
    position: "Project Site Manager",
    description: ``,
    image: "/defavatar.jpg",
  },
  {
    name: "Zulfahmi",
    position: "Deputy Site Manager",
    description: ``,
    image: "/defavatar.jpg",
  },
];

// Site Information
const siteInfo = {
  company: "PT INDONESIA PRATAMA 🔥",
  location: "Tabang, East Kalimantan",
};

// Modal Component
const PersonModal = ({
  person,
  onClose,
}: {
  person: Person;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-5xl relative flex flex-col md:flex-row gap-6 p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full md:w-1/3 flex justify-center items-start">
          <div className="relative w-56 h-72 rounded-lg overflow-hidden border">
            <Image
              src={person.image}
              alt={person.name}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="w-full md:w-2/3 text-left space-y-4 overflow-auto">
          <h3 className="text-2xl font-bold text-[#1a1a1a]">{person.name}</h3>
          <p className="text-[#7c7c7c] font-semibold">{person.position}</p>
          <div className="w-16 h-0.5 bg-[#1FBFB8]/50" />
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {person.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Complete Organization Chart Page
const OrganizationPage: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <main className="min-h-screen bg-black/90">
      <Hero
        title="Our Leadership Team"
        subtitle="Meet the team driving our vision and operations"
      />

      <CommissionerSection
        commissioners={commissionersData}
        onSelect={setSelectedPerson}
      />

      <DirectorsSection
        directors={directorsData}
        onSelect={setSelectedPerson}
      />

      <ManagersSection managers={managersData} onSelect={setSelectedPerson} />

      <SiteManagersSection
        siteManagers={siteManagersData}
        siteCompany={siteInfo.company}
        siteLocation={siteInfo.location}
        onSelect={setSelectedPerson}
      />

      {/* Modal */}
      {selectedPerson && (
        <PersonModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </main>
  );
};

export default OrganizationPage;
