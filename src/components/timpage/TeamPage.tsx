"use client";

export default function TeamPage() {
  return (
    <section className="pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#E85C23] text-center mb-4">
          Board of Directors
        </h1>
        <p className="text-center text-[#5B5B5F] mb-10 max-w-2xl mx-auto">
          <i>The Board of Directors comprises seasoned professionals who provide
          strategic direction, ensure good corporate governance, and uphold the
          company’s values in achieving sustainable growth.</i>
        </p>

        {/* Diagram Vertikal */}
        <div className="flex flex-col items-center relative space-y-8">
          {/* President Director */}
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm text-center border-t-4 border-[#E85C23] z-10">
            <h3 className="text-lg font-semibold text-[#E85C23]">A. Kurnia</h3>
            <p className="text-sm text-[#5B5B5F]">President Director</p>
          </div>

          {/* Connecting Line */}
          <div className="w-1 h-8 bg-[#1FBFB8] z-0" />

          {/* Vice President Director */}
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm text-center border-t-4 border-[#E85C23] z-10">
            <h3 className="text-lg font-semibold text-[#E85C23]">Eric NG</h3>
            <p className="text-sm text-[#5B5B5F]">Vice President Director</p>
          </div>

          {/* Connecting Line */}
          <div className="w-1 h-8 bg-[#1FBFB8] z-0" />

          {/* Operation Director */}
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm text-center border-t-4 border-[#E85C23] z-10">
            <h3 className="text-lg font-semibold text-[#E85C23]">
              Yohanes C. Wibowo
            </h3>
            <p className="text-sm text-[#5B5B5F]">Operation Director</p>
          </div>
        </div>
      </div>
    </section>
  );
}
