"use client";

import { OrgNode } from "./OrgNode";

export default function OrgChart() {
  return (
    <section className="py-20 px-4 md:px-8 relative border-b border-gray-800 bg-black text-white">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#1FBFB8]/10 to-transparent rounded-full -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 bg-[length:60px_60px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 relative inline-block">
          <span className="relative z-10">Our Teams</span>
          <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0"></span>
        </h2>
        <p className="text-lg text-gray-300">
          Explore the leadership behind our operations
        </p>
      </div>

      {/* Chart Tree */}
      <div className="flex justify-center relative z-10">
        <OrgNode
          title="Project Manager"
          name="A. Qyta Yudha Prakasa"
          photoUrl="/photos/qyta.jpg"
          description="Oversees all project operations and strategic planning."
        >
          <OrgNode
            title="Deputy Project Manager"
            name="Zulfahmi"
            photoUrl="https://res.cloudinary.com/dysmj8esf/image/upload/v1746991692/avatar_reqruiters/t6nml3ywr5wskzdojqzl.png"
            description="Assists Project Manager and leads inter-departmental coordination."
          >
            <OrgNode
              title="Dept Head Plant & Log"
              name="Dadang S"
              photoUrl="/photos/dadang.jpg"
              description="Manages plant operations and logistics support."
            />
            <OrgNode
              title="Dept Head Production"
              name="VACANT"
              description="Responsible for production efficiency and output."
            />
            <OrgNode
              title="HSE SPV"
              name="VACANT"
              description="Supervises safety, health, and environmental programs."
            >
              <OrgNode
                title="Safety Officer"
                name="Prasatama A. Hendra"
                photoUrl="/photos/prasatama.jpg"
                description="Ensures site safety compliance and accident prevention."
              />
              <OrgNode title="Envi Officer" name="VACANT" />
              <OrgNode title="Paramedic" name="VACANT" />
            </OrgNode>
            <OrgNode title="Dept Head HRGA" name="VACANT" />
            <OrgNode title="Finance & Acct Officer" name="VACANT" />
          </OrgNode>
        </OrgNode>
      </div>
    </section>
  );
}
