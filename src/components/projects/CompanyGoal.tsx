import React from "react";
import { Shield, Truck, TrendingUp, Handshake } from "lucide-react";

interface GoalCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
}

function GoalCard({
  title,
  description,
  icon,
  accent,
}: GoalCardProps): React.ReactNode {
  return (
    <div className="bg-gray-900/60 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div
          className="p-4 rounded-xl shrink-0 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${accent}20` }}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
          <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function CompanyGoals(): React.ReactNode {
  const goals = [
    {
      title: "Safety & Zero Harm Culture",
      description:
        "Every hauling shift is governed by strict HSE protocols, driver competency standards, and continuous safety briefings to protect people and assets on site.",
      icon: <Shield className="w-6 h-6 text-[#E85C23]" />,
      accent: "#E85C23",
    },
    {
      title: "Fleet Uptime & Reliability",
      description:
        "Preventive maintenance, rapid breakdown response, and workshop support keep our hauling fleet available and productive for client production targets.",
      icon: <Truck className="w-6 h-6 text-[#1FBFB8]" />,
      accent: "#1FBFB8",
    },
    {
      title: "Scalable Hauling Capacity",
      description:
        "From 15 units at Senyiur project start to 30 units today — and 23 units planned for Muara Pahu in July 2026, we grow fleet capacity in step with client demand.",
      icon: <TrendingUp className="w-6 h-6 text-[#E85C23]" />,
      accent: "#E85C23",
    },
    {
      title: "Long-Term Client Partnership",
      description:
        "We build trust through consistent tonnage delivery, transparent reporting, and professional execution — the foundation for lasting hauling contracts.",
      icon: <Handshake className="w-6 h-6 text-[#1FBFB8]" />,
      accent: "#1FBFB8",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-24 relative border-b border-gray-800">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#1FBFB8]/10 to-transparent rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#E85C23]/10 to-transparent rounded-full -ml-48 -mb-48" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            <span className="relative z-10 text-white">
              Why Clients Choose Us
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0" />
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Proven performance on the Senyiur hauling contract — built on safety,
            reliability, and the capacity to scale with your operation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <GoalCard
              key={goal.title}
              title={goal.title}
              description={goal.description}
              icon={goal.icon}
              accent={goal.accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
