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
  image?: string;
  experience: string[];
}

// Sample data
const commissionersData: Person[] = [
  {
    name: "Lau Lie In",
    position: "Commissioner",
    experience: ["20+ years in mining operations", "Board Member at XYZ Corp"],
  },
];

const directorsData: Person[] = [
  {
    name: "A. Kurnia",
    position: "President Director",
    image: "/dark.jpg",
    experience: [
      "General Manager, Mining Division at PT United Tractors",
      "Operations Director, PT Pamapersada Nusantara",
      "Plant Director, PT Sapta Indra Sejati",
      "President Director, PT Batara Dharma Persada",
    ],
  },
  {
    name: "Eric NG",
    position: "Director",
    image: "/dark.jpg",
    experience: [""],
  },
  {
    name: "Yohanes C. Wibowo",
    position: "Operations Director",
    image: "/dark.jpg",
    experience: [
      "Plant Manager, PT Pamapersada Nusantara",
      "Operations Director, PT Riung Mitra Lestari",
      "Operations Director, PT Batara Dharma Persada",
    ],
  },
];

const managersData: Person[] = [
  {
    name: "Dio Tragitza Rescha",
    position: "Operation Manager",
    image: "/dark.jpg",
    experience: ["Logistic Coordinator, PT ABC", "Operation Lead, PT XYZ"],
  },
  {
    name: "Dadang Setyawan",
    position: "Manager",
    image: "/dark.jpg",
    experience: ["Project Manager at PQR Corp."],
  },
  {
    name: "A. Heru Prastowo",
    position: "Manager",
    image: "/dark.jpg",
    experience: ["Manager, Equipment Division"],
  },
  {
    name: "Susanto",
    position: "Manager",
    image: "/dark.jpg",
    experience: ["Site Supervisor", "Maintenance Lead"],
  },
];

const siteManagersData: Person[] = [
  {
    name: "Anggi Okta Yudha P.",
    position: "Project Site Manager",
    image: "/dark.jpg",
    experience: ["Site Manager, PT IP"],
  },
  {
    name: "Zulfahmi",
    position: "Deputy Site Manager",
    image: "/dark.jpg",
    experience: ["Deputy Site Supervisor, PT Batara"],
  },
];

// Site info
const siteInfo = {
  company: "PT INDONESIA PRATAMA",
  location: "Tabang, East Kalimantan",
};

// Modal
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

        {/* Image only if available */}
        {person.image && (
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
        )}

        <div className="w-full md:w-2/3 text-left space-y-4">
          <h3 className="text-2xl font-bold text-[#1a1a1a]">{person.name}</h3>
          <p className="text-[#7c7c7c] font-semibold">{person.position}</p>
          <div className="w-16 h-0.5 bg-[#1FBFB8]/50" />
          <div>
            <h4 className="font-semibold text-gray-800 mt-4 mb-1">
              Experience
            </h4>
            <ul className="list-disc ml-5 text-gray-700">
              {person.experience.map((exp, idx) => (
                <li key={idx}>{exp}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main page
const OrganizationPage: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f11] via-[#1a1a1d] to-[#2a2a2e]">
      <Hero
        title="Our Leadership Team"
        subtitle="Meet the team driving our vision and operations"
      />

      <CommissionerSection commissioners={commissionersData} />

      <DirectorsSection
        directors={directorsData.map((d) => ({
          ...d,
          image: d.image ?? "/dark.jpg",
        }))}
        onSelect={(person) => {
          if (person.image !== "/dark.jpg") setSelectedPerson(person);
        }}
      />

      <ManagersSection
        managers={managersData.map((m) => ({
          ...m,
          image: m.image ?? "/dark.jpg",
        }))}
        onSelect={(person) => {
          if (person.image !== "/dark.jpg") setSelectedPerson(person);
        }}
      />

      <SiteManagersSection
        siteManagers={siteManagersData.map((s) => ({
          ...s,
          image: s.image ?? "/dark.jpg",
        }))}
        siteCompany={siteInfo.company}
        siteLocation={siteInfo.location}
        onSelect={(person) => {
          if (person.image !== "/dark.jpg") setSelectedPerson(person);
        }}
      />

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
