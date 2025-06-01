// CompanyGoals.tsx
import React from "react";
import { Target, TrendingUp, Zap, BarChart } from "lucide-react";

interface GoalCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

function GoalCard({
  title,
  description,
  icon,
  color,
}: GoalCardProps): React.ReactNode {
  return (
    <div className="bg-black/40 p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-lg group">
      <div className="flex items-start">
        <div
          className={`bg-${color}/10 p-4 rounded-lg mr-4 group-hover:bg-${color}/20 transition-colors`}
        >
          {icon}
        </div>
        <div>
          <h3
            className={`font-bold text-xl mb-2 text-white group-hover:text-${color} transition-colors`}
          >
            {title}
          </h3>
          <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function CompanyGoals(): React.ReactNode {
  const goals = [
    {
      title: "Operational Excellence",
      description:
        "Continuously improve our mining and transportation processes to achieve industry-leading efficiency and reliability.",
      icon: <Target className="w-6 h-6 text-[#E85C23]" />,
      color: "[#E85C23]",
    },
    {
      title: "Sustainable Growth",
      description:
        "Expand our operational capacity while maintaining our commitment to environmental responsibility and community development.",
      icon: <TrendingUp className="w-6 h-6 text-[#1FBFB8]" />,
      color: "[#1FBFB8]",
    },
    {
      title: "Productivity",
      description:
        "Maximize output through optimized resource allocation, state-of-the-art equipment, and data-driven operational strategies.",
      icon: <BarChart className="w-6 h-6 text-[#E85C23]" />,
      color: "[#E85C23]",
    },
    {
      title: "Efficiency",
      description:
        "Streamline all operational processes to minimize waste, reduce costs, and deliver exceptional value to our clients and stakeholders.",
      icon: <Zap className="w-6 h-6 text-[#1FBFB8]" />,
      color: "[#1FBFB8]",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-24 relative border-b border-gray-800">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#1FBFB8]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#E85C23]/10 to-transparent rounded-full -ml-48 -mb-48"></div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal-project opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            <span className="relative z-10 text-white">
              Our Strategic Goals
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0"></span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Guiding principles that drive our commitment to excellence in mining
            and transportation operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-full">
          {goals.map((goal, index) => (
            <GoalCard
              key={index}
              title={goal.title}
              description={goal.description}
              icon={goal.icon}
              color={goal.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
