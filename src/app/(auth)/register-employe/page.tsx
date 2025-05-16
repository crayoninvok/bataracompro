"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-provider";
import Image from "next/image";
import { UserPlus, AlertCircle, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function EmployeeRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const { registerEmployee } = useAuthContext();
  const router = useRouter();

  const validate = (): boolean => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@bataramining\.com$/.test(email)) {
      newErrors.email = "Please use your @bataramining.com email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setRegisterError(null);

    try {
      const result = await registerEmployee({ 
        name, 
        email, 
        password 
      });

      if (result.error) {
        setRegisterError(result.error.message);
      } else {
        setRegistrationSuccess(true);
        // Auto-redirect after 5 seconds
        setTimeout(() => {
          router.push("/login-employe");
        }, 5000);
      }
    } catch (error: any) {
      setRegisterError(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Left side - Company branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#E85C23] items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-600/30 to-transparent rounded-full -ml-48 -mb-48"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-400/20 to-transparent rounded-full -mr-48 -mt-48"></div>

        <div className="z-10 text-center px-8 max-w-md">
          <div className="mb-8">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">
              <Image
                src="/nobgbtrlogo.png"
                alt="Batara Mining Corp Logo"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Batara Mining Corp
          </h1>
          <p className="text-white/80 text-lg">
            Join our employee network to access company resources, documents, and stay updated
          </p>
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex justify-center mb-6 lg:hidden">
              <Image
                src="/nobgbtrlogo.png"
                alt="Batara Mining Corp Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <UserPlus className="h-6 w-6 text-[#E85C23]" />
                <h2 className="ml-2 text-2xl font-bold text-gray-800">
                  Employee Registration
                </h2>
              </div>
              <p className="text-gray-500 text-sm">
                Create your account with your company email
              </p>
            </div>

            {registerError && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{registerError}</p>
              </div>
            )}

            {registrationSuccess ? (
              <div className="p-6 bg-green-50 rounded-lg border border-green-100 text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Registration Successful!</h3>
                <p className="text-gray-600 mb-4">
                  Please check your email to verify your account.
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting to login in 5 seconds...
                </p>
                <button
                  onClick={() => router.push("/login-employe")}
                  className="mt-4 px-5 py-2 bg-[#E85C23] text-white rounded-md hover:bg-orange-700 transition-colors"
                >
                  Go to Login
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                    placeholder="John Smith"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                    placeholder="yourname@bataramining.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Must be a valid @bataramining.com email address
                  </p>
                </div>

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
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#E85C23] text-white font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-[#E85C23] focus:ring-offset-2 transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating account...
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <a
                      href="/login-employe"
                      className="font-medium text-[#E85C23] hover:text-orange-700 transition-colors"
                    >
                      Sign in here
                    </a>
                  </p>
                </div>

                <div className="mt-2 text-center">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center text-sm font-medium text-gray-600 hover:text-[#E85C23] transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Home
                  </a>
                </div>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                © 2024 Batara Mining Corp. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}