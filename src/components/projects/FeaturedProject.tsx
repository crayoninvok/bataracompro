"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  MapPin,
  Truck,
  Users,
  Gauge,
  Calendar,
  CheckCircle2,
  Clock,
  Wrench,
} from "lucide-react";
import { muaraPahuPhotos, senyiurPhotos } from "@/constants/projectPhotos";

const senyiurStats = [
  { icon: Truck, label: "Active Fleet", value: "30 Units" },
  { icon: Gauge, label: "Annual Capacity", value: "5M Tons" },
  { icon: Users, label: "Workforce", value: "300++" },
  { icon: Calendar, label: "Since", value: "2024" },
];

const muaraPahuStats = [
  { icon: Truck, label: "Planned Fleet", value: "23 Units" },
  { icon: Calendar, label: "Go-Live", value: "Jul 2026" },
  { icon: Clock, label: "Target Start", value: "2nd Week" },
  { icon: Wrench, label: "Status", value: "Preparation" },
];

const scopeItems = [
  "Coal hauling from pit to stockpile and designated delivery points",
  "Double-trailer fleet operations with Volvo FH 16-700 tractor heads",
  "On-site dispatch, route management, and production support",
  "In-house workshop maintenance for fleet readiness and uptime",
  "HSE-compliant operations aligned with client and regulatory standards",
];

const preparationItems = [
  "Fleet mobilization and equipment staging for 23 hauling units",
  "Manpower recruitment, deployment, and site induction programs",
  "Workshop and support facility setup at Muara Pahu project site",
  "Route planning, dispatch systems, and operational readiness review",
  "HSE briefing and pre-commissioning aligned with PT Indonesia Pratama standards",
];

function ProjectCard({
  badge,
  badgeClass,
  imageSrc,
  imageAlt,
  contractLabel,
  siteName,
  location,
  scopeTitle,
  scopeList,
  stats,
  fleetSpec = true,
}: {
  badge: string;
  badgeClass: string;
  imageSrc: string;
  imageAlt: string;
  contractLabel: string;
  siteName: string;
  location: string;
  scopeTitle: string;
  scopeList: string[];
  stats: typeof senyiurStats;
  fleetSpec?: boolean;
}) {
  return (
    <div className="bg-gray-900/70 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      <div className="relative h-52 sm:h-56">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-semibold uppercase tracking-wide ${badgeClass}`}
          >
            {badge}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[#1FBFB8] text-xs font-semibold uppercase tracking-[0.12em] mb-1">
            {contractLabel}
          </p>
          <h3 className="text-lg md:text-xl font-bold text-white">{siteName}</h3>
        </div>
      </div>

      <div className="p-5 md:p-6 flex-1 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-4 pb-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-white/95 p-2 flex items-center justify-center border border-gray-700 shrink-0">
              <Image
                src="/bayan/ipbayan.png"
                alt="PT Indonesia Pratama"
                width={48}
                height={48}
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Client</p>
              <p className="text-white font-semibold text-sm">PT Indonesia Pratama</p>
              <p className="text-gray-400 text-xs">PT Bayan Resources Group</p>
            </div>
          </div>
          <div className="flex items-start gap-2 text-gray-300 text-sm">
            <MapPin className="w-4 h-4 text-[#E85C23] mt-0.5 shrink-0" />
            <span>{location}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-black/40 border border-gray-800 rounded-lg p-3"
            >
              <stat.icon className="w-4 h-4 text-[#1FBFB8] mb-1.5" />
              <p className="text-base font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
            <Building2 className="w-4 h-4 text-[#1FBFB8]" />
            {scopeTitle}
          </h4>
          <ul className="space-y-2.5">
            {scopeList.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-gray-300 text-xs leading-relaxed"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1FBFB8] mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {fleetSpec && (
          <div className="mt-auto pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500 mb-2">Fleet Specification</p>
            <p className="text-gray-300 text-xs leading-relaxed">
              Volvo FH 16-700 HP · Double Vessel · 110 m³ + 125 m³ payload capacity
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FeaturedProject() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-24 border-b border-gray-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14 reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1FBFB8]/10 text-[#1FBFB8] text-xs font-semibold uppercase tracking-[0.14em] border border-[#1FBFB8]/20 mb-4">
            Client Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Coal Hauling for{" "}
            <span className="text-[#1FBFB8]">PT Indonesia Pratama</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            PT Batara Dharma Persada serves as the dedicated coal hauling contractor
            for PT Indonesia Pratama, a member of{" "}
            <span className="text-white font-medium">PT Bayan Resources Tbk</span> —
            with an active operation at Senyiur and the Muara Pahu project currently
            in preparation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <ProjectCard
            badge="Active Project"
            badgeClass="bg-[#E85C23]/90"
            imageSrc={senyiurPhotos[0].src}
            imageAlt={senyiurPhotos[0].alt}
            contractLabel="Coal Hauling Contract"
            siteName="Senyiur Mining Site, East Kalimantan"
            location="Senyiur, East Kalimantan, Indonesia"
            scopeTitle="Scope of Hauling Work"
            scopeList={scopeItems}
            stats={senyiurStats}
          />

          <ProjectCard
            badge="In Preparation"
            badgeClass="bg-[#1FBFB8]/90"
            imageSrc={muaraPahuPhotos[0].src}
            imageAlt={muaraPahuPhotos[0].alt}
            contractLabel="Upcoming Coal Hauling Contract"
            siteName="Muara Pahu Project Site, East Kalimantan"
            location="Muara Pahu, East Kalimantan, Indonesia"
            scopeTitle="Preparation Activities"
            scopeList={preparationItems}
            stats={muaraPahuStats}
            fleetSpec={false}
          />
        </div>

        <div className="mt-12 reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Muara Pahu Site Preparation
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              Progress on the ground ahead of go-live in the 2nd week of July 2026
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {muaraPahuPhotos.map((photo) => (
              <div
                key={photo.src}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-800 shadow-lg"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-semibold uppercase tracking-wide">
                    {photo.caption}
                  </p>
                  <p className="text-gray-400 text-[10px] mt-0.5">{photo.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 p-5 md:p-6 rounded-xl bg-[#1FBFB8]/5 border border-[#1FBFB8]/20 reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#1FBFB8] mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-semibold">Muara Pahu — Scheduled Go-Live</p>
                <p className="text-gray-300 text-sm mt-1">
                  Operations targeted to commence in the{" "}
                  <span className="text-[#1FBFB8] font-medium">
                    2nd week of July 2026
                  </span>
                  , deploying{" "}
                  <span className="text-white font-medium">23 hauling units</span> for
                  PT Indonesia Pratama at the Muara Pahu project site.
                </p>
              </div>
            </div>
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center gap-2 shrink-0 bg-[#1FBFB8] hover:bg-[#1BABA5] text-black font-semibold px-6 py-3 rounded-xl transition-colors group text-sm"
            >
              Discuss a Hauling Partnership
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
