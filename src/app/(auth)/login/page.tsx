"use client";

import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row max-w-6xl w-full shadow-xl rounded-2xl overflow-hidden">
        <div className="w-full md:w-1/2 bg-[#FF5722] relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF5722] to-[#FF5722]/90"></div>
          <img 
            src="/recruitbanners.png" 
            alt="Recruitment Banner"
            className="w-full h-full object-cover relative z-10"
          />
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#607D8B]/90 to-transparent text-white z-20">
            <h1 className="text-3xl font-bold">Join Our Team</h1>
            <p className="text-white/90 mt-2">Discover opportunities to grow with us</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}