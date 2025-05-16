// CTASection.tsx
import React from "react";
import { ArrowRight } from "lucide-react";

export default function CTASection(): React.ReactNode {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-24 relative">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#E85C23]/10 to-transparent rounded-full -ml-48 -mb-48"></div>
      
      <div className="max-w-4xl mx-auto text-center reveal-project opacity-0 translate-y-6 transition-all duration-700">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Interested in Our Services?
        </h2>
        <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
          Contact our team to discuss your coal transportation needs and mining solutions. We're ready to help optimize your operations.
        </p>
        <a
          href="/kontak"
          className="inline-flex items-center bg-[#1FBFB8] hover:bg-[#d14b17] text-black px-8 py-4 rounded-md transition-colors shadow-lg text-lg group"
        >
          <span>Contact Our Team</span>
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}