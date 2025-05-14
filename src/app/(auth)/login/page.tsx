"use client";

import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black/80 backdrop-blur-lg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-[length:60px_60px]"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#E85C23]/30"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-xl overflow-hidden bg-gray-900/60 border border-gray-800 relative z-10 shadow-xl">
        <div className="w-full md:w-1/2 bg-black/40 relative md:block group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E85C23]/20 to-black/30 z-20"></div>
          <img 
            src="/recruitbanners.png" 
            alt="Recruitment Banner"
            className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-8 z-30">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full border-2 border-[#E85C23] bg-black/40 p-1 flex items-center justify-center overflow-hidden">
                <img
                  src="/nobgbtrlogo.png"
                  alt="Company Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-white ml-3 font-medium">PT. Batara Dharma Persada</h3>
            </div>
            <div className="bg-gradient-to-t from-black/90 to-transparent pt-10">
              <h1 className="text-3xl font-bold text-white">Join Our Team</h1>
              <p className="text-white/90 mt-2">Discover opportunities to grow with <span className="text-[#E85C23]">PT. Batara</span></p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-transparent flex items-center justify-center p-6 md:p-8">
          <LoginForm />
        </div>
      </div>
      
      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </div>
  );
}