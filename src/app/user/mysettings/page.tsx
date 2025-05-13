"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, FileText, LogOut, Settings, User } from "lucide-react";
import Swal from "sweetalert2";


export default function MySetting() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to change password");
      }

      setSuccess("Password successfully updated!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-center pb-4 border-b border-gray-200">
            <div className="h-24 w-24 rounded-full bg-[#607D8B] mx-auto flex items-center justify-center text-white text-3xl font-semibold">
              JD
            </div>
            <h2 className="mt-2 text-xl font-bold text-gray-900">John Doe</h2>
            <p className="text-sm text-gray-500">Frontend Developer</p>
          </div>

          <nav className="mt-4 space-y-2">
            <Link
              href="/user/dashboard"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:text-[#FF5722] hover:bg-[#FF5722]/10"
            >
              <Briefcase className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/user/myprofile"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:text-[#FF5722] hover:bg-[#FF5722]/10"
            >
              <User className="mr-3 h-5 w-5" />
              My Profile
            </Link>
            <Link
              href="/user/mysettings"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-[#FF5722]/10 text-[#FF5722]"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
            <button
  onClick={() => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire("Logged out!", "You have been successfully logged out.", "success").then(() => {
          router.push("/login");
        });
      }
    });
  }}
  className="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-700 hover:bg-red-50"
>
  <LogOut className="mr-3 h-5 w-5" />
  Sign out
</button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-green-600">{success}</p>}

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-[#FF5722] text-white text-sm rounded hover:bg-[#e64a19]"
                >
                  Save Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
