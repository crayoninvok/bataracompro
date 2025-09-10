"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-provider";
import Image from "next/image";
import { User, AlertCircle } from "lucide-react";

export default function EmployeeLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const { loginEmployee } = useAuthContext();
  const router = useRouter();

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@bataramining\.com$/.test(email)) {
      newErrors.email = "Please use your @bataramining.com email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setLoginError(null);

    try {
      const result = await loginEmployee({ email, password });

      if (result.error) {
        setLoginError(result.error.message);
      } else {
        router.push("/employee");
      }
    } catch (error: any) {
      setLoginError(error.message || "Login failed");
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
            PT Batara Dharma Persada
          </h1>
          <p className="text-white/80 text-lg">
            Employee Portal for accessing company resources, documents, and updates
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
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
                <User className="h-6 w-6 text-[#E85C23]" />
                <h2 className="ml-2 text-2xl font-bold text-gray-800">
                  Employee Portal
                </h2>
              </div>
              <p className="text-gray-500 text-sm">
                Sign in with your company email
              </p>
            </div>

            {loginError && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{loginError}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
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
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center"></div>
                <div className="text-sm">
                  <a href="/employee/reset-password" className="text-sm text-[#E85C23] hover:text-orange-700">
                    Forgot your password?
                  </a>
                </div>
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
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <a
                    href="/register-employe"
                    className="font-medium text-[#E85C23] hover:text-orange-700 transition-colors"
                  >
                    Register here
                  </a>
                </p>
              </div>

              <div className="mt-4 text-center">
                <a
                  href="/"
                  className="inline-flex items-center justify-center text-sm font-medium text-gray-600 hover:text-[#E85C23] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Home
                </a>
              </div>
            </form>

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