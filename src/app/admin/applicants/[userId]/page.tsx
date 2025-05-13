"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUserDetail } from "@/services/user.services";
import { UserDetail } from "@/types/user";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Setup worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ApplicantDetailPage() {
  const { userId } = useParams();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof userId === "string") {
      fetchUserDetail(userId)
        .then(setUser)
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Pelamar tidak ditemukan.</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Profile Section */}
      <section>
        <h3 className="text-xl font-semibold">Profil</h3>
        <p><strong>Bio:</strong> {user.profile?.bio || "-"}</p>
        <p><strong>Telepon:</strong> {user.profile?.phone || "-"}</p>
        <p><strong>Alamat:</strong> {user.profile?.address || "-"}</p>
      </section>

      {/* Education Section */}
      <section>
        <h3 className="text-xl font-semibold">Pendidikan</h3>
        {user.educations.length > 0 ? (
          <ul className="list-disc ml-5">
            {user.educations.map((edu, i) => (
              <li key={i}>
                {edu.degree} - {edu.institution} ({edu.yearStart} - {edu.yearEnd})
              </li>
            ))}
          </ul>
        ) : (
          <p>-</p>
        )}
      </section>

      {/* Experience Section */}
      <section>
        <h3 className="text-xl font-semibold">Pengalaman Kerja</h3>
        {user.experiences.length > 0 ? (
          <ul className="list-disc ml-5">
            {user.experiences.map((exp, i) => (
              <li key={i}>
                {exp.position} di {exp.companyName} (
                {exp.startDate.slice(0, 10)} -{" "}
                {exp.endDate ? exp.endDate.slice(0, 10) : "Sekarang"})
                <br />
                <small>{exp.description}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>-</p>
        )}
      </section>

      {/* Certificate Section */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Sertifikat</h3>
        {user.certificates.length > 0 ? (
          <div className="space-y-6">
            {user.certificates.map((cert, i) => (
              <div key={i} className="border p-4 rounded shadow">
                <p className="font-semibold">{cert.title}</p>
                <p>Diterbitkan oleh: {cert.issuer}</p>
                <p>Tanggal: {cert.issuedAt.slice(0, 10)}</p>
                <p>Jenis: {cert.type}</p>

                <div className="mt-4 border rounded">
                  <Document
                    file={cert.fileUrl}
                    onLoadError={(err) => console.error("PDF load error", err)}
                    className="w-full"
                  >
                    <Page pageNumber={1} width={600} />
                  </Document>
                </div>

                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 inline-block"
                >
                  Lihat Sertifikat Lengkap
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>Tidak ada sertifikat.</p>
        )}
      </section>
    </div>
  );
}
