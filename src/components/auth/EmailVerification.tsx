"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface EmailVerificationProps {
  token: string;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({ token }) => {
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
        <p className="text-lg animate-pulse">Verifying your email...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 p-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Verification Failed</h2>
        <p className="text-gray-700 mb-4">
          The token is invalid or has expired. Please request a new verification email.
        </p>
        <Link
          href="/login"
          className="px-6 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  // Success UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 px-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 rounded-full border-2 border-white bg-white p-1">
              <Image
                src="/nobgbtr.png"
                alt="Batara Dharma Persada"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">Batara Dharma</h1>
              <p className="text-blue-100 text-sm">Persada</p>
            </div>
          </div>
        </div>

        <div className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Email Verified Successfully</h2>
          <p className="text-gray-600 mb-6">
            Your email has been successfully verified. You can now log in to your account.
          </p>
          <Link
            href="/login"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
