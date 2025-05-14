"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        title: "Missing Email",
        text: "Please enter your email address.",
        icon: "warning",
        confirmButtonColor: "#00BCD4",
      });
      return;
    }

    try {
      setIsLoading(true);

      Swal.fire({
        title: "Sending reset link...",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      Swal.close();

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      }

      Swal.fire({
        title: "Email Sent",
        text: "Please check your email for the password reset link.",
        icon: "success",
        confirmButtonColor: "#00BCD4",
      });

      setEmail("");
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#00BCD4",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="max-w-md w-full bg-gray-900 text-white rounded-xl shadow-lg p-8 border border-gray-700">
        <h2 className="text-3xl font-bold mb-2 text-center">Forgot Password</h2>
        <p className="text-sm text-gray-300 text-center mb-6">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-[#00BCD4] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md font-semibold text-white ${
              isLoading
                ? "bg-[#00BCD4]/60 cursor-not-allowed"
                : "bg-[#00BCD4] hover:bg-[#00BCD4]/90"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
