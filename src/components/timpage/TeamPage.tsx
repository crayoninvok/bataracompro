"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";

type Member = {
  name: string;
  position: string;
  description: string;
  image: string;
  category?: string;
};

const topMembers: Member[] = [
  {
    name: "Dr. Bambang Sulistyo",
    position: "Corporate Governance & Compliance Commissioner",
    description: `Dr. Bambang Sulistyo has over 25 years of experience in regulatory oversight and corporate governance for mining and energy sectors. Prior to joining our company, he served as a Director at the Indonesia Financial Services Authority.

He holds a Ph.D. in Economics from University of Indonesia and has been recognized for his contributions to improving corporate governance standards in the mining industry throughout Southeast Asia.

Dr. Sulistyo provides strategic guidance to ensure our company maintains the highest standards of compliance and governance in all operations.`,
    image: "/team/bambang.jpg",
    category: "commissioner"
  },
  {
    name: "A. Kurnia",
    position: "President Director",
    description: `A. Kurnia (AK) started his career in the mining industry in 1974 by joining the Service Division of PT United Tractors (UT). He ended his career at PT UT in 1997 with his last position as General Manager of the Mining Division.

He was then trusted to handle the position of Plant Director at PT Pamapersada Nusantara (PAMA) with his vision and competence, and later served as Operations Director. Since 2007, AK became Plant Director at PT Saptaindra Sejati (SIS) and was also trusted to be Director of Operations at PT SIS, focusing on increasing productivity and achieving optimal efficiency.

From 2012 to 2019, AK served as Vice President. After a long career and proven experience, AK established PT Bahtera Putera Nusantara (BATARA) and PT Batara Dharma Persada in 2024.`,
    image: "/team/kurnia.jpg",
    category: "director"
  },
  {
    name: "Yohanes C. Wibowo",
    position: "Operations Director",
    description: `Yohanes C. Wibowo (YCW) devoted himself to PT Pamapersada Nusantara (PAMA), where he worked until achieving the position of Plant Manager in 2008.

He continued his career by joining PT Riung Mitra Lestari (RML) and was trusted to serve as Operations Director for six years. During his tenure, YCW played a significant role in transforming RML into one of the leading pioneer mining contractors in Indonesia, known for its rapid growth and production achievements.

Currently, YCW is entrusted with the role of Operations / Plant Director at PT Batara Dharma Persada.`,
    image: "/team/yohanes.jpg",
    category: "director"
  },
  {
    name: "Eric NG",
    position: "Vice President Director",
    description: `Eric NG brings over 20 years of corporate management experience to our organization. His background in strategic planning and financial oversight has been instrumental in our company's growth.

Prior to joining us, Eric held leadership positions at several multinational mining corporations across Southeast Asia, where he successfully implemented innovative business models and efficiency improvements.

Eric holds an MBA from INSEAD and is committed to sustainable business practices in the mining industry.`,
    image: "/team/eric.jpg",
    category: "director"
  }
];

const bottomMembers: Member[] = [
  {
    name: "Rini Widyastuti",
    position: "Finance & Administration Manager",
    description: `Rini Widyastuti has 15 years of experience in mining financial operations and corporate accounting. She oversees all financial reporting, budgeting, and treasury operations for the company.

Prior to joining our team, Rini held senior financial positions at several major mining corporations in Indonesia. She has implemented innovative financial management systems that have significantly improved our operational efficiency.

Rini holds a Master's degree in Finance from Universitas Gadjah Mada and is a Certified Public Accountant.`,
    image: "/team/rini.jpg",
    category: "manager"
  },
  {
    name: "Budi Santoso",
    position: "HR & General Affairs Manager",
    description: `Budi Santoso specializes in workforce development for industrial operations with over 12 years of experience in the mining sector. He leads our human resources and general affairs departments, ensuring we maintain an outstanding company culture and efficient administrative operations.

Budi has pioneered several employee development programs that have improved retention rates and productivity across all company sites. His expertise in labor relations has been crucial for maintaining positive working environments.

He holds a Bachelor's degree in Human Resource Management from Universitas Indonesia.`,
    image: "/team/budi.jpg",
    category: "manager"
  },
  {
    name: "Michael Tanaka",
    position: "Business Development Manager",
    description: `Michael Tanaka brings valuable international perspective to our business development initiatives. As a former consultant for major Asian mining projects, he has extensive knowledge of regional markets and industry trends.

Michael leads our efforts to identify new business opportunities, develop strategic partnerships, and expand our market presence. His analytical approach and relationship-building skills have resulted in several successful ventures for our company.

He holds an MBA from National University of Singapore and speaks fluent Indonesian, English, and Japanese.`,
    image: "/team/michael.jpg",
    category: "manager"
  },
  {
    name: "Dewi Purnama",
    position: "Operations Manager",
    description: `Dewi Purnama is a mining engineer with expertise in operational efficiency and safety management. She oversees our day-to-day mining operations and coordinates between project sites to ensure consistent standards and practices.

With over 10 years of field experience, Dewi has implemented innovative operational protocols that have improved both productivity and safety metrics across all project sites. She works closely with our Project Site Managers to optimize resource allocation and meet production targets.

Dewi holds a Bachelor's degree in Mining Engineering from Institut Teknologi Bandung and a Master's in Mineral Resources Management.`,
    image: "/team/dewi.jpg",
    category: "manager"
  },
  {
    name: "Agus Setiawan",
    position: "Project Site Manager - East Kalimantan",
    description: `Agus Setiawan has 12 years of experience in coal mining operations. He manages our East Kalimantan project site, overseeing all aspects of daily operations, from extraction to transportation and site management.

Under his leadership, the East Kalimantan site has consistently exceeded production targets while maintaining excellent safety records. Agus has implemented several efficiency improvements that have become standard practices across all our project sites.

He reports directly to our Operations Manager and works closely with the engineering and maintenance teams to ensure optimal performance of all equipment and personnel.`,
    image: "/team/agus.jpg",
    category: "site-manager"
  },
  {
    name: "Robert Tanjung",
    position: "Project Site Manager - Central Java",
    description: `Robert Tanjung specializes in environmental compliance and sustainable mining practices. He manages our Central Java project site with a focus on balancing productivity with environmental responsibility.

Robert has implemented innovative reclamation programs that have been recognized by local authorities as industry best practices. His commitment to community engagement has fostered positive relationships with local stakeholders.

With over 9 years of experience in the mining industry, Robert brings valuable technical expertise and management skills to our operations. He reports to our Operations Manager and collaborates closely with the environmental compliance team.`,
    image: "/team/robert.jpg",
    category: "site-manager"
  }
];

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
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

  const allMembers = [...topMembers, ...bottomMembers];
  
  const filteredMembers = activeCategory === "all" 
    ? allMembers 
    : allMembers.filter(member => member.category === activeCategory);

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

      {/* Category Tabs */}
      <div className="flex justify-center py-6 bg-gray-900 sticky top-0 z-30 border-b border-gray-700">
        <div className="flex space-x-2 overflow-x-auto px-4 max-w-full">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-[#1FBFB8] text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory("commissioner")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeCategory === "commissioner"
                ? "bg-[#1FBFB8] text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Commissioner
          </button>
          <button
            onClick={() => setActiveCategory("director")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeCategory === "director"
                ? "bg-[#1FBFB8] text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Directors
          </button>
          <button
            onClick={() => setActiveCategory("manager")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeCategory === "manager"
                ? "bg-[#1FBFB8] text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Managers
          </button>
          <button
            onClick={() => setActiveCategory("site-manager")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeCategory === "site-manager"
                ? "bg-[#1FBFB8] text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Site Managers
          </button>
        </div>
      </div>

      {/* Team Members Section */}
      <section className="py-20 px-4 md:px-8 lg:px-24 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member, idx) => (
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