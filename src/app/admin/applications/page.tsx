"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeftCircle } from "lucide-react";

export default function RecruiterApplication() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[70vh]">
      <div className="mb-6">
        <Image
          src="/nobgbtrlogo.png"
          alt="Batara Logo"
          width={80}
          height={80}
          className="animate-bounce opacity-80"
        />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
        Page Under Construction
      </h1>
      <p className="text-gray-500 mb-8 max-w-md">
        We're currently working on this page. Please check back soon.
      </p>

      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 px-5 py-3 border border-[#E85C23] text-[#E85C23] hover:bg-[#E85C23]/10 rounded-md transition-all"
      >
        <ArrowLeftCircle className="w-5 h-5" />
        Back to Previous Page
      </button>
    </div>
  );
}
