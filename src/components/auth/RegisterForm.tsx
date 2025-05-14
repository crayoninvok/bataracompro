"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import Swal from "sweetalert2";

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { register, isLoading, error } = useAuth();
  const router = useRouter();

  // Show error message when auth error occurs
  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Registration Failed",
        text: error,
        icon: "error",
        confirmButtonColor: "#E85C23",
        confirmButtonText: "Try Again",
        background: "#1a1a1a",
        color: "#fff"
      });
    }
  }, [error]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    // Validate name
    if (!formData.name.trim()) {
      Swal.fire({
        title: "Invalid Name",
        text: "Please enter your full name",
        icon: "warning",
        confirmButtonColor: "#E85C23",
        background: "#1a1a1a",
        color: "#fff"
      });
      return false;
    }

    // Validate email
    if (!formData.email || !validateEmail(formData.email)) {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address",
        icon: "warning",
        confirmButtonColor: "#E85C23",
        background: "#1a1a1a",
        color: "#fff"
      });
      return false;
    }

    // Validate password
    if (!formData.password || !validatePassword(formData.password)) {
      Swal.fire({
        title: "Invalid Password",
        text: "Password must be at least 8 characters long",
        icon: "warning",
        confirmButtonColor: "#E85C23",
        background: "#1a1a1a",
        color: "#fff"
      });
      return false;
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "Passwords Do Not Match",
        text: "Please make sure your passwords match",
        icon: "warning",
        confirmButtonColor: "#E85C23",
        background: "#1a1a1a",
        color: "#fff"
      });
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Show loading state
      Swal.fire({
        title: "Creating Account...",
        text: "Please wait",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        background: "#1a1a1a",
        color: "#fff"
      });

      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = formData;

      // Call register from auth hook
      await register(registerData);

      // Close loading alert
      Swal.close();

      // Show success message before redirecting
      await Swal.fire({
        title: "Registration Successful!",
        text: "You will be redirected to the login page. Please check your email for verification.",
        icon: "success",
        confirmButtonColor: "#E85C23",
        confirmButtonText: "Continue to Login",
        background: "#1a1a1a",
        color: "#fff"
      });

      // Registration success handled by the hook (redirects to login with registered=true)
      router.push("/login?registered=true");
    } catch (err) {
      // Error is handled by the auth hook useEffect above
      Swal.close(); // Make sure to close the loading alert if error
    }
  };

  return (
    <div className="w-full">
      {/* Animated logo */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full border-2 border-[#E85C23] bg-black/40 p-2 flex items-center justify-center overflow-hidden shadow-lg">
          <Image
            src="/nobgbtrlogo.png"
            alt="Company Logo"
            width={70}
            height={70}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      <div className="bg-gray-900/60 rounded-xl overflow-hidden border border-gray-800 shadow-lg backdrop-blur-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#E85C23] to-[#1FBFB8] py-6 px-8">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="text-white/80 text-sm mt-1">Join our talent community</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FBFB8] focus:border-transparent"
                  placeholder="John Doe"
                  disabled={isLoading}
                />
              </div>
            </div>

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
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FBFB8] focus:border-transparent"
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
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
              <p className="mt-1 text-xs text-gray-400">
                Must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FBFB8] focus:border-transparent"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
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
                Create Account
              </button>
            </div>
          </form>

          {/* Login link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-[#1FBFB8] hover:text-[#E85C23] transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};