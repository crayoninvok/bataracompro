"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
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
        confirmButtonColor: "#00BCD4",
        confirmButtonText: "Got it",
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
        confirmButtonColor: "#00BCD4",
        confirmButtonText: "Try Again",
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
        confirmButtonColor: "#00BCD4",
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
      });

      // Call login from auth hook
      const response = await login({ email, password });

      // Close loading alert
      Swal.close();

      // After successful login, navigate to dashboard or return URL
      const destination = returnUrl || "/user/dashboard";
      router.push(destination);

      // Optional: Show welcome message after successful login
      Swal.fire({
        title: "Welcome Back!",
        text: "Login successful",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      // Error is handled by the auth hook useEffect above
      Swal.close(); // Make sure to close the loading alert if error
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Image Header */}
      <div className="bg-gradient-to-r from-[#FF5722] to-[#00BCD4] py-6 px-8">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-12 h-12 rounded-full border-2 border-white bg-white p-1 flex items-center justify-center overflow-hidden">
            <Image
              src="/nobgbtr.png"
              alt="Company Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-white">
            <h1 className="text-xl font-bold">Batara Dharma Persada</h1>
            <p className="text-white/80 text-sm">Career Portals</p>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Login to Your Account
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-[#00BCD4]"
              placeholder="your.email@example.com"
              disabled={isLoading}
            />
          </div>

          {/* Password field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-[#00BCD4] hover:text-[#00BCD4]/80"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-[#00BCD4]"
                placeholder="••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading
                  ? "bg-[#607D8B]/70 cursor-not-allowed"
                  : "bg-[#FF5722] hover:bg-[#FF5722]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5722]"
              }`}
              disabled={isLoading}
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Register link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-[#00BCD4] hover:text-[#00BCD4]/80"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};