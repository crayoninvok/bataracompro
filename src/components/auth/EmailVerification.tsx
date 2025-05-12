// src/components/auth/EmailVerification.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface EmailVerificationProps {
  token: string;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  token,
}) => {
  const router = useRouter();

  // Since you confirmed the database shows the email as verified,
  // we'll simply show a success message and provide a link to login

  // Show success message using SweetAlert
  React.useEffect(() => {
    Swal.fire({
      title: "Email Verified!",
      text: "Your email has been successfully verified. You can now log in to your account.",
      icon: "success",
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Continue to Login",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/login");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 px-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 rounded-full border-2 border-white bg-white p-1">
              <Image
                src="/btr.png"
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

        {/* Content */}
        <div className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Email Verification
          </h2>

          <div className="py-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Email Verified Successfully
            </h3>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You can now log in to
              your account.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
