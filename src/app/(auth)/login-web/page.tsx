"use client";

import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Shield,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth"; // Import useAuth instead of the service

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Use the auth context instead of router
  const { login, isLoading } = useAuth();

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Validate form data
      if (!formData.email || !formData.password) {
        throw new Error("Please fill in all fields");
      }

      // Use the auth context login method (this will handle redirect automatically)
      await login(formData.email, formData.password);
      
      // No need to redirect here - the auth context handles it
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 3, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E85C23]/8 via-[#E85C23]/4 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1FBFB8]/8 via-[#1FBFB8]/4 to-transparent" />

        <motion.div
          className="absolute top-32 right-20 w-80 h-80 rounded-full bg-[#E85C23]/6 blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-40 left-16 w-96 h-96 rounded-full bg-[#1FBFB8]/5 blur-3xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-md mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Logo and Header */}
          <motion.div
            className="text-center mb-8"
            variants={itemVariants}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[#1FBFB8] to-[#E85C23] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Sign in to access your PT Batara dashboard
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl"
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#1FBFB8]/50 focus:border-[#1FBFB8] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full pl-10 pr-12 py-3 bg-gray-800/60 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#1FBFB8]/50 focus:border-[#1FBFB8] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    disabled={isLoading}
                    className="w-4 h-4 text-[#1FBFB8] bg-gray-800 border-gray-600 rounded focus:ring-[#1FBFB8]/50 focus:ring-2 disabled:opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                <a
                  href="/forgot-password"
                  className={`text-sm text-[#1FBFB8] hover:text-[#1BABA5] transition-colors ${
                    isLoading ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1FBFB8] to-[#1FBFB8]/90 hover:from-[#E85C23] hover:to-[#E85C23]/90 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-500 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className={`text-[#1FBFB8] hover:text-[#1BABA5] font-medium transition-colors ${
                    isLoading ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  Sign up here
                </a>
              </p>
            </div>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            className="mt-6 text-center"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <Shield className="w-4 h-4" />
              <span>Secured by PT Batara Security</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}