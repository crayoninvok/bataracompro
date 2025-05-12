// src/components/auth/RegisterForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
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
        text: error.message,
        icon: "error",
        confirmButtonColor: "#2563eb",
        confirmButtonText: "Try Again",
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
        confirmButtonColor: "#2563eb",
      });
      return false;
    }

    // Validate email
    if (!formData.email || !validateEmail(formData.email)) {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });
      return false;
    }

    // Validate password
    if (!formData.password || !validatePassword(formData.password)) {
      Swal.fire({
        title: "Invalid Password",
        text: "Password must be at least 8 characters long",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });
      return false;
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "Passwords Do Not Match",
        text: "Please make sure your passwords match",
        icon: "warning",
        confirmButtonColor: "#2563eb",
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
        confirmButtonColor: "#2563eb",
        confirmButtonText: "Continue to Login",
      });

      // Registration success handled by the hook (redirects to login with registered=true)
      router.push("/login?registered=true");
    } catch (err) {
      // Error is handled by the auth hook useEffect above
      Swal.close(); // Make sure to close the loading alert if error
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Image Header */}
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

      {/* Register Form */}
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Create an Account
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Join us and discover opportunities that match your skills
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
              disabled={isLoading}
            />
          </div>

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
              value={formData.email}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              disabled={isLoading}
            />
          </div>

          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 8 characters long
            </p>
          </div>

          {/* Confirm Password field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Login link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
