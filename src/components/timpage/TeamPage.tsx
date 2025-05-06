"use client";

import Image from "next/image";

const teamMembers = [
  {
    name: "Budi Santoso",
    position: "Direktur Utama",
    photo: "/tim/budi.jpg",
  },
  {
    name: "Sari Wulandari",
    position: "Manajer Operasional",
    photo: "/tim/sari.jpg",
  },
  {
    name: "Joko Prasetyo",
    position: "Kepala Teknik",
    photo: "/tim/joko.jpg",
  },
];

export default function TeamPage() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-4">
          Tim Kami
        </h1>
        <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto">
          Tim profesional yang berdedikasi tinggi dalam mewujudkan visi dan misi
          perusahaan.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-lg shadow p-6"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-blue-900">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
