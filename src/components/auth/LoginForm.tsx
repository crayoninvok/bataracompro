"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Swal from "sweetalert2";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading, error } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if redirected from registration
  const justRegistered = searchParams.get("registered") === "true";

  // Get return URL if any
  const returnUrl = searchParams.get("returnUrl");

  // Show registration success message
  useEffect(() => {
    if (justRegistered) {
      Swal.fire({
        title: "Registration Successful!",
        text: "Please check your email to verify your account.",
        icon: "success",
        confirmButtonColor: "#E85C23",
        confirmButtonText: "Got it",
        background: "#1a1a1a",
        color: "#fff"
      });
    }
  }, [justRegistered]);

  // Show error message when auth error occurs
  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Login Failed",
        text: error,
        icon: "error",
        confirmButtonColor: "#E85C23",
        confirmButtonText: "Try Again",
        background: "#1a1a1a",
        color: "#fff"
      });
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      Swal.fire({
        title: "Missing Information",
        text: "Please enter both email and password",
        icon: "warning",
        confirmButtonColor: "#E85C23",
        background: "#1a1a1a",
        color: "#fff"
      });
      return;
    }

    try {
      // Show loading state
      Swal.fire({
        title: "Signing in...",
        text: "Please wait",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        background: "#1a1a1a",
        color: "#fff"
      });

      // Call login from auth hook
      const response = await login({ email, password });

      // Close loading alert
      Swal.close();

      // After successful login, navigate to dashboard or return URL
      const destination = returnUrl || "/user/dashboard";
      window.location.assign(destination);

      // Optional: Show welcome message after successful login
      Swal.fire({
        title: "Welcome Back!",
        text: "Login successful",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#1a1a1a",
        color: "#fff"
      });
    } catch (err) {
      // Error is handled by the auth hook useEffect above
      Swal.close(); // Make sure to close the loading alert if error
    }
  };

  return (
    <div className="w-full">
      {/* Animated logo - only shown on mobile */}
      <div className="flex justify-center mb-6 md:hidden">
        <div className="w-16 h-16 rounded-full border-2 border-[#E85C23] bg-black/40 p-1 flex items-center justify-center overflow-hidden shadow-lg">
          <Image
            src="/nobgbtrlogo.png"
            alt="Company Logo"
            width={60}
            height={60}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      <div className="bg-gray-900/60 rounded-xl overflow-hidden border border-gray-800 shadow-lg backdrop-blur-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#E85C23] to-[#1FBFB8] py-6 px-8">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-white/80 text-sm mt-1">Sign in to access your account</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FBFB8] focus:border-transparent"
                  placeholder="your.email@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#1FBFB8] hover:text-[#E85C23] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FBFB8] focus:border-transparent"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-md text-white font-medium ${
                  isLoading
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#E85C23] to-[#d14b17] hover:from-[#d14b17] hover:to-[#E85C23] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E85C23]"
                } transition-all duration-300`}
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Register link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-[#1FBFB8] hover:text-[#E85C23] transition-colors"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};