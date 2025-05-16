"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface EmailVerificationProps {
  token: string;
}

export const EmployeeEmailVerification: React.FC<EmailVerificationProps> = ({ token }) => {
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verifyuser/${token}`);
        if (!res.ok) throw new Error("Failed to verify");
        setStatus("success");
      } catch (err) {
        setStatus("failed");
      }
    };

    verifyEmail();
  }, [token]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg">Verifying your email...</p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h2>
        <p className="text-gray-600 mb-6">
          The verification link is invalid or has expired. Please contact IT support for assistance.
        </p>
        <Link
          href="/employee/login"
          className="px-6 py-2.5 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  // Success UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-8 px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-white p-2 shadow-lg">
              <div className="w-full h-full rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl font-bold">
                B
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Batara Dharma Persada Employe</h1>
          <p className="text-orange-100 text-sm">Employee Portal</p>
        </div>

        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Email Verified Successfully</h2>
          <p className="text-gray-600 mb-6">
            Your employee account has been successfully verified. You can now access the employee portal.
          </p>
          
          <div className="flex flex-col space-y-3">
            <Link
              href="/login-employe"
              className="px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition shadow-md"
            >
              Sign In to Employee Portal
            </Link>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Batara Dharma Persada. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};