"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  MapPin,
  LayoutGrid,
  Network,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Member = {
  name: string;
  position: string;
  description: string;
  image?: string;
  category: "commissioner" | "director" | "manager" | "site-manager";
};

const teamMembers: Member[] = [
  {
    name: "Lauw Lie In",
    position: "Commissioner",
    description:
      "Mr. Lauw Lie In provides strategic oversight and governance guidance to PT Batara Dharma Persada, ensuring the company upholds the highest standards of corporate integrity and long-term sustainability in the mining industry.",
    category: "commissioner",
  },
  {
    name: "Eric NG",
    position: "President Director",
    description:
      "Mr. Eric NG leads PT Batara Dharma Persada with over 3 years of corporate management experience. His background in strategic planning and financial oversight has been instrumental in the company's growth across Southeast Asian mining operations.",
    image: "/director/ericng.png",
    category: "director",
  },
  {
    name: "Sumardi",
    position: "Operations Director",
    description:
      "Mr. Sumardi oversees all operational activities across project sites, driving productivity, safety performance, and efficient execution of mining and coal hauling operations at PT Batara Dharma Persada.",
    image: "/director/sumardi.jpg",
    category: "director",
  },
  {
    name: "Tommy",
    position: "HRGA Director",
    description:
      "Mr. Tommy leads the Human Resources and General Affairs division, ensuring effective workforce management, employee development, and administrative excellence across the organization.",
    image: "/director/tommy1.jpeg",
    category: "director",
  },
  {
    name: "Alice NG",
    position: "FA & Procurement Director",
    description:
      "Mrs. Alice NG oversees finance, accounting, and procurement functions, ensuring strategic financial management and efficient supply chain operations across PT Batara Dharma Persada.",
    image: "/director/aliceng.png",
    category: "director",
  },
  {
    name: "Dio Tragitza Rescha",
    position: "Operations Manager",
    description:
      "Mr. Dio Tragitza Rescha leads operational planning and execution across project sites, coordinating teams to deliver safe, efficient, and productive mining and hauling operations.",
    category: "manager",
  },
  {
    name: "Dadang Setyawan",
    position: "Plant & Maintenance Manager",
    description:
      "Mr. Dadang Setyawan manages plant operations and maintenance programs, ensuring equipment reliability, workshop efficiency, and optimal fleet performance across all sites.",
    category: "manager",
  },
  {
    name: "Teddy Susanto",
    position: "Procurement Manager",
    description:
      "Mr. Teddy Susanto oversees procurement processes and vendor management, ensuring timely supply of materials and services to support uninterrupted operational activities.",
    category: "manager",
  },
  {
    name: "Susanto",
    position: "Finance Manager",
    description:
      "Mr. Susanto manages financial operations including budgeting, reporting, and treasury functions, supporting sound financial decision-making across the company.",
    category: "manager",
  },
  {
    name: "Eko Supriyanto",
    position: "HRGA Manager",
    description:
      "Mr. Eko Supriyanto supports human resources and general affairs operations, fostering a productive work environment and effective administrative processes.",
    category: "manager",
  },
  {
    name: "Aldi Mezofanti",
    position: "Infrastructure Manager",
    description:
      "Mr. Aldi Mezofanti manages infrastructure development and maintenance, ensuring site facilities and supporting systems meet operational requirements and safety standards.",
    category: "manager",
  },
  {
    name: "Djumadi Herlambang",
    position: "Accounting Manager",
    description:
      "Mr. Djumadi Herlambang oversees accounting operations and financial records, ensuring accurate reporting and compliance with corporate accounting standards.",
    category: "manager",
  },
  {
    name: "Anggi Okta Yudha P.",
    position: "Project Site Manager",
    description:
      "Mr. Anggi Okta Yudha P. manages daily operations at the PT Indonesia Pratama project site in Senyiur, East Kalimantan, overseeing production, safety, and team coordination on the ground.",
    category: "site-manager",
  },
  {
    name: "Zulfahmi",
    position: "Deputy Site Manager",
    description:
      "Mr. Zulfahmi supports site leadership at PT Indonesia Pratama, ensuring operational continuity, equipment readiness, and effective execution of site management plans.",
    category: "site-manager",
  },
];

const categoryConfig = {
  commissioner: {
    label: "Commissioner",
    title: "Board Commissioner",
    subtitle: "Governance and strategic oversight at the highest level",
    accent: "from-[#E85C23] to-[#d14b17]",
    border: "border-[#E85C23]/30",
    badge: "bg-[#E85C23]/15 text-[#E85C23]",
  },
  director: {
    label: "Directors",
    title: "Board of Directors",
    subtitle: "Executive leadership driving strategy and operational excellence",
    accent: "from-[#1FBFB8] to-[#1BABA5]",
    border: "border-[#1FBFB8]/30",
    badge: "bg-[#1FBFB8]/15 text-[#1FBFB8]",
  },
  manager: {
    label: "Managers",
    title: "Management Team",
    subtitle: "Operational leaders executing our vision across every division",
    accent: "from-[#E85C23]/80 to-[#1FBFB8]/80",
    border: "border-gray-700",
    badge: "bg-white/10 text-gray-200",
  },
  "site-manager": {
    label: "Site Managers",
    title: "Project Site Leadership",
    subtitle: "On-site leaders at PT Indonesia Pratama, Senyiur — East Kalimantan",
    accent: "from-[#1FBFB8] to-[#E85C23]",
    border: "border-[#1FBFB8]/20",
    badge: "bg-[#1FBFB8]/10 text-[#1FBFB8]",
  },
};

const categoryOrder: Member["category"][] = [
  "commissioner",
  "director",
  "manager",
  "site-manager",
];

const orgTree = {
  commissioner: "Lauw Lie In",
  president: "Eric NG",
  branches: [
    {
      director: "Sumardi",
      managers: [
        "Dio Tragitza Rescha",
        "Dadang Setyawan",
        "Aldi Mezofanti",
      ],
      site: {
        company: "PT Indonesia Pratama",
        location: "Senyiur, East Kalimantan",
        underManager: "Dio Tragitza Rescha",
        members: ["Anggi Okta Yudha P.", "Zulfahmi"],
      },
    },
    {
      director: "Tommy",
      managers: ["Eko Supriyanto"],
    },
    {
      director: "Alice NG",
      managers: ["Teddy Susanto", "Susanto", "Djumadi Herlambang"],
    },
  ],
};

function findMember(name: string): Member {
  const member = teamMembers.find((m) => m.name === name);
  if (!member) throw new Error(`Member not found: ${name}`);
  return member;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function MemberAvatar({
  name,
  image,
  className = "",
  textSize = "text-2xl",
}: {
  name: string;
  image?: string;
  className?: string;
  textSize?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(name);
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradients = [
    "from-[#E85C23] to-[#9a3412]",
    "from-[#1FBFB8] to-[#0f766e]",
    "from-[#6366f1] to-[#4338ca]",
    "from-[#f59e0b] to-[#b45309]",
  ];

  if (image && !imageError) {
    return (
      <Image
        src={image}
        alt={name}
        fill
        onError={() => setImageError(true)}
        className={`object-cover object-top ${className}`}
        unoptimized
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradients[hash % gradients.length]} flex items-center justify-center ${className}`}
    >
      <span className={`${textSize} font-bold text-white/90 tracking-wide`}>
        {initials}
      </span>
    </div>
  );
}

function MemberCard({
  member,
  featured = false,
  onClick,
}: {
  member: Member;
  featured?: boolean;
  onClick: () => void;
}) {
  const config = categoryConfig[member.category];
  const isCommissioner = member.category === "commissioner";

  if (isCommissioner) {
    return (
      <button
        onClick={onClick}
        className={`group text-left w-full h-full rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${config.border} bg-gradient-to-b from-[#E85C23]/10 to-gray-900/90 hover:border-[#E85C23]/60 hover:shadow-[#E85C23]/10 p-6 sm:p-8`}
      >
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${config.badge}`}
        >
          {config.label.replace(/s$/, "")}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#E85C23] group-hover:text-[#1FBFB8] transition-colors">
          {member.name}
        </h3>
        <p className="text-gray-300 text-sm mt-2">{member.position}</p>
        <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mt-5">
          {member.description.split("\n")[0]}
        </p>
        <span className="inline-flex items-center gap-1 text-[#1FBFB8] text-sm font-medium mt-6 group-hover:gap-2 transition-all">
          View profile
          <ArrowRight className="w-4 h-4" />
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`group text-left w-full h-full rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        featured
          ? `${config.border} bg-gradient-to-b from-gray-900/90 to-black shadow-lg hover:shadow-[#1FBFB8]/10`
          : "border-gray-800 bg-gray-900/50 hover:border-[#1FBFB8]/40 hover:shadow-[#1FBFB8]/5"
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "h-72" : "h-56"}`}>
        <MemberAvatar
          name={member.name}
          image={member.image}
          textSize={featured ? "text-4xl" : "text-3xl"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        <div className="absolute top-4 left-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${config.badge}`}
          >
            {config.label.replace(/s$/, "")}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3
            className={`font-bold text-white group-hover:text-[#1FBFB8] transition-colors ${
              featured ? "text-2xl" : "text-lg"
            }`}
          >
            {member.name}
          </h3>
          <p className="text-gray-300 text-sm mt-1">{member.position}</p>
        </div>
      </div>

      <div className="p-5 border-t border-gray-800/80">
        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
          {member.description.split("\n")[0]}
        </p>
        <span className="inline-flex items-center gap-1 text-[#1FBFB8] text-sm font-medium mt-4 group-hover:gap-2 transition-all">
          View profile
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </button>
  );
}

function OrgConnector({ height = 24 }: { height?: number }) {
  return (
    <div
      className="w-[2px] shrink-0 bg-[#1FBFB8]"
      style={{ height }}
      aria-hidden
    />
  );
}

function OrgChartNode({
  member,
  variant,
  onSelect,
  className = "",
}: {
  member: Member;
  variant: "commissioner" | "president" | "director" | "manager" | "site";
  onSelect: (member: Member) => void;
  className?: string;
}) {
  const styles = {
    commissioner: {
      wrapper:
        "w-full max-w-[280px] border-[#E85C23]/50 bg-gradient-to-b from-[#E85C23]/10 to-gray-900 shadow-[0_0_30px_rgba(232,92,35,0.12)]",
      name: "text-[#E85C23] text-base sm:text-lg",
      badge: "Commissioner",
    },
    president: {
      wrapper:
        "w-full max-w-[300px] border-[#E85C23] bg-gradient-to-b from-[#E85C23]/20 to-gray-900 shadow-[0_0_40px_rgba(232,92,35,0.18)]",
      name: "text-white text-base sm:text-lg",
      badge: "President Director",
    },
    director: {
      wrapper: "w-full border-[#1FBFB8]/40 bg-gray-900/90",
      name: "text-[#1FBFB8] text-base",
      badge: "Director",
    },
    manager: {
      wrapper: "w-full border-gray-700 bg-[#111111]",
      name: "text-white text-sm",
      badge: "Manager",
    },
    site: {
      wrapper: "w-full border-[#1FBFB8]/30 bg-[#0a0a0a]",
      name: "text-[#E85C23] text-sm",
      badge: "Site",
    },
  }[variant];

  return (
    <button
      onClick={() => onSelect(member)}
      className={`group relative rounded-xl border px-3 py-3 sm:px-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1FBFB8] hover:shadow-lg hover:shadow-[#1FBFB8]/10 ${
        variant === "director" || variant === "manager" || variant === "site"
          ? "shrink-0 w-full"
          : "w-full"
      } ${styles.wrapper} ${className}`}
    >
      <span className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gray-950 text-gray-400 border border-gray-700">
        {styles.badge}
      </span>
      <h3 className={`font-bold leading-snug mt-1 group-hover:text-[#1FBFB8] transition-colors ${styles.name}`}>
        {member.name}
      </h3>
      <p className="text-gray-400 text-xs mt-1 leading-relaxed">{member.position}</p>
    </button>
  );
}

function ManagerStack({
  managers,
  site,
  siteAnchor,
  onSelect,
}: {
  managers: Member[];
  site?: (typeof orgTree.branches)[0]["site"];
  siteAnchor: Member | null;
  onSelect: (member: Member) => void;
}) {
  const siteMembers = site?.members.map(findMember) ?? [];

  return (
    <div className="flex flex-col items-center w-full">
      {managers.map((manager, index) => {
        const isSiteAnchor = siteAnchor && manager.name === siteAnchor.name;

        return (
          <React.Fragment key={manager.name}>
            {index === 0 ? (
              <OrgConnector height={20} />
            ) : (
              <OrgConnector height={14} />
            )}
            <OrgChartNode member={manager} variant="manager" onSelect={onSelect} />

            {isSiteAnchor && site && (
              <>
                <OrgConnector height={16} />
                <div className="w-full rounded-xl border border-dashed border-[#1FBFB8]/30 bg-gray-900/40 p-4">
                  <div className="flex items-start gap-2 mb-4 pb-3 border-b border-gray-800">
                    <MapPin className="w-4 h-4 text-[#1FBFB8] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white text-sm font-semibold">{site.company}</p>
                      <p className="text-[#1FBFB8] text-xs">{site.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-full">
                    {siteMembers.map((siteManager, siteIndex) => (
                      <React.Fragment key={siteManager.name}>
                        {siteIndex > 0 && <OrgConnector height={10} />}
                        <OrgChartNode
                          member={siteManager}
                          variant="site"
                          onSelect={onSelect}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function TeamOrgChart({ onSelect }: { onSelect: (member: Member) => void }) {
  const commissioner = findMember(orgTree.commissioner);
  const president = findMember(orgTree.president);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Top executive levels — responsive, not inside horizontal scroll */}
      <div className="px-4 sm:px-6 flex flex-col items-center w-full">
        <OrgChartNode
          member={commissioner}
          variant="commissioner"
          onSelect={onSelect}
        />
        <OrgConnector height={28} />
        <OrgChartNode
          member={president}
          variant="president"
          onSelect={onSelect}
        />
        <OrgConnector height={28} />
      </div>

      {/* Director branches — scroll horizontally on small screens */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-6">
        <div className="min-w-[720px] max-w-5xl mx-auto">
          <div className="relative w-full">
            {/* horizontal rail — meets president stem and each column drop */}
            <div
              className="absolute top-0 h-[2px] bg-[#1FBFB8]"
              style={{ left: "16.666%", right: "16.666%" }}
            />

            <div className="flex w-full">
              {orgTree.branches.map((branch) => {
                const director = findMember(branch.director);
                const managers = branch.managers.map(findMember);
                const siteAnchor = branch.site
                  ? findMember(branch.site.underManager)
                  : null;

                return (
                  <div
                    key={branch.director}
                    className="flex flex-1 flex-col items-center px-2 sm:px-3 min-w-[200px]"
                  >
                    <OrgConnector height={28} />
                    <OrgChartNode
                      member={director}
                      variant="director"
                      onSelect={onSelect}
                    />
                    <ManagerStack
                      managers={managers}
                      site={branch.site}
                      siteAnchor={siteAnchor}
                      onSelect={onSelect}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-14 px-4 sm:px-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm border border-[#E85C23]/50 bg-[#E85C23]/10" />
          Executive
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm border border-[#1FBFB8]/50 bg-[#1FBFB8]/10" />
          Director
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm border border-gray-700 bg-[#111111]" />
          Manager
        </span>
        <span className="flex items-center gap-2">
          <span className="w-[2px] h-4 bg-[#1FBFB8]" />
          Reports to
        </span>
      </div>
    </div>
  );
}

function MemberModal({
  member,
  onClose,
}: {
  member: Member;
  onClose: () => void;
}) {
  const config = categoryConfig[member.category];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <div
        className="relative w-full md:max-w-4xl max-h-[92vh] overflow-y-auto bg-gray-950 border border-gray-800 rounded-t-3xl md:rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-gray-400 hover:text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {member.category === "commissioner" ? (
          <div className="p-6 md:p-8 pt-12">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${config.badge}`}
            >
              {config.label.replace(/s$/, "")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#E85C23]">
              {member.name}
            </h2>
            <p className="text-[#1FBFB8] text-lg mt-2 font-medium">
              {member.position}
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#E85C23] to-[#1FBFB8] rounded-full my-6" />
            <div className="prose prose-invert max-w-none">
              {member.description.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-gray-300 leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <>
        <div className="relative h-56 md:h-64">
          <MemberAvatar
            name={member.name}
            image={member.image}
            textSize="text-5xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${config.badge}`}
            >
              {config.label.replace(/s$/, "")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {member.name}
            </h2>
            <p className="text-[#1FBFB8] text-lg mt-2 font-medium">
              {member.position}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="w-16 h-1 bg-gradient-to-r from-[#E85C23] to-[#1FBFB8] rounded-full mb-6" />
          <div className="prose prose-invert max-w-none">
            {member.description.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-gray-300 leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"cards" | "org">("org");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredCategories =
    activeCategory === "all"
      ? categoryOrder
      : categoryOrder.filter((cat) => cat === activeCategory);

  const getMembersByCategory = (category: Member["category"]) =>
    teamMembers.filter((m) => m.category === category);

  return (
    <main className="min-h-screen bg-black/80 backdrop-blur-lg">
      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden border-b border-gray-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48" />
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747206106/IMG_0002_rjugv5.jpg"
            alt="Mining operations"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
        <div
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-[length:60px_60px]"
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1FBFB8]/10 text-[#1FBFB8] text-sm font-medium border border-[#1FBFB8]/20 mb-6">
              Our People
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10">Leadership Team</span>
                <span
                  className="absolute bottom-0 left-0 w-full h-3 bg-[#E85C23]/30 z-0"
                  style={{ bottom: "5px" }}
                />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Meet the experienced professionals guiding PT Batara Dharma Persada
              toward operational excellence in mining and coal hauling.
            </p>
          </div>
        </div>
      </section>

      {/* Controls */}
      <div className="sticky top-[72px] z-30 bg-gray-950/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === "all"
                  ? "bg-[#1FBFB8] text-black"
                  : "bg-gray-800/80 text-gray-300 hover:bg-gray-700"
              }`}
            >
              All Team
            </button>
            {categoryOrder.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-[#1FBFB8] text-black"
                    : "bg-gray-800/80 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {categoryConfig[cat].label}
              </button>
            ))}
          </div>

          <div className="flex rounded-full bg-gray-800/80 p-1 self-start md:self-auto">
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === "cards"
                  ? "bg-[#E85C23] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Cards
            </button>
            <button
              onClick={() => setViewMode("org")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === "org"
                  ? "bg-[#E85C23] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Network className="w-4 h-4" />
              Org Chart
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4 md:px-8 lg:px-24">
        {viewMode === "org" ? (
          <TeamOrgChart onSelect={setSelectedMember} />
        ) : (
          <div className="max-w-6xl mx-auto space-y-20">
            {filteredCategories.map((category) => {
              const members = getMembersByCategory(category);
              const config = categoryConfig[category];
              const isLeadership =
                category === "commissioner" || category === "director";

              return (
                <section key={category}>
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-1 h-10 rounded-full bg-gradient-to-b ${config.accent}`}
                      />
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                          {config.title}
                        </h2>
                        <p className="text-gray-400 mt-1">{config.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {category === "site-manager" ? (
                    <div className="rounded-2xl bg-gradient-to-br from-gray-900/80 to-black border border-gray-800 p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-gray-800">
                        <div className="p-2 rounded-lg bg-[#E85C23]/15">
                          <MapPin className="w-5 h-5 text-[#E85C23]" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">
                            PT Indonesia Pratama
                          </p>
                          <p className="text-[#1FBFB8] text-sm">
                            Senyiur, East Kalimantan
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {members.map((member) => (
                          <MemberCard
                            key={member.name}
                            member={member}
                            onClick={() => setSelectedMember(member)}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`grid gap-6 ${
                        isLeadership
                          ? category === "commissioner"
                            ? "grid-cols-1 max-w-md"
                            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                      }`}
                    >
                      {members.map((member) => (
                        <MemberCard
                          key={member.name}
                          member={member}
                          featured={category === "director" && member.name === "Eric NG"}
                          onClick={() => setSelectedMember(member)}
                        />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want to join our team?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Explore career opportunities at PT Batara Dharma Persada and grow
            with a leading mining contractor.
          </p>
          <Link
            href="/karir"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E85C23] to-[#d14b17] hover:from-[#d14b17] hover:to-[#E85C23] text-white px-8 py-4 rounded-lg font-medium transition-all shadow-lg group"
          >
            View Open Positions
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </main>
  );
}
