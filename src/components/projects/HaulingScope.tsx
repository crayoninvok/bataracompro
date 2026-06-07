"use client";

import React from "react";
import {
  Route,
  Wrench,
  ShieldCheck,
  BarChart3,
  Clock,
  Radio,
} from "lucide-react";

const haulingServices = [
  {
    icon: Route,
    title: "Pit-to-Stockpile Hauling",
    description:
      "Dedicated coal hauling routes from mining pit to stockpile and transfer points, executed with consistent cycle times and load accuracy.",
    color: "#E85C23",
  },
  {
    icon: Radio,
    title: "Fleet Dispatch & Control",
    description:
      "Centralized dispatch coordination, shift planning, and real-time fleet monitoring to maintain production targets and minimize idle time.",
    color: "#1FBFB8",
  },
  {
    icon: Wrench,
    title: "Workshop & Maintenance",
    description:
      "In-house plant workshop supporting preventive maintenance, breakdown response, and fleet readiness for continuous hauling operations.",
    color: "#E85C23",
  },
  {
    icon: ShieldCheck,
    title: "HSE & Compliance",
    description:
      "Safety-first hauling operations with standardized procedures, driver training, and compliance with client and mining industry regulations.",
    color: "#1FBFB8",
  },
  {
    icon: BarChart3,
    title: "Production Reporting",
    description:
      "Daily production tracking, tonnage reporting, and operational KPIs shared with the client for transparent performance management.",
    color: "#E85C23",
  },
  {
    icon: Clock,
    title: "24/7 Operation Support",
    description:
      "Round-the-clock hauling support aligned with mine production schedules, ensuring uninterrupted coal movement during active shifts.",
    color: "#1FBFB8",
  },
];

export default function HaulingScope() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-24 border-b border-gray-800 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E85C23]/10 text-[#E85C23] text-xs font-semibold uppercase tracking-[0.14em] border border-[#E85C23]/20 mb-4">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What We Do in{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#1FBFB8]">Coal Hauling</span>
              <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#1FBFB8]/20 z-0" />
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We specialize exclusively in coal hauling contractor services — not general
            mining — giving our clients focused expertise, dedicated fleet capacity, and
            proven execution on site.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-project opacity-0 translate-y-6 transition-all duration-700">
          {haulingServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:border-gray-700 hover:bg-gray-900/80 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: service.color }} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#1FBFB8] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
