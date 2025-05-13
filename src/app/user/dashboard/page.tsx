"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Calendar,
  FileText,
  LogOut,
  Settings,
  User,
  X,
} from "lucide-react";

import { useApplications } from "@/hooks/useApplication";
import { JobApplication } from "@/types/application";
import useProfile from "@/hooks/useProfile";

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status.toUpperCase()) {
      case "APPLIED":
        return "bg-blue-100 text-blue-800";
      case "INTERVIEW":
        return "bg-purple-100 text-purple-800";
      case "ACCEPTED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
};

export default function DashboardPage() {
  const router = useRouter();
  const { getUserApplications } = useApplications();
  const { profile, loading: profileLoading } = useProfile();

  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchApplications = async () => {
      setIsLoading(true);
      const res = await getUserApplications();
      if (res.data) {
        setApplications(res.data.applications);
      }
      setIsLoading(false);
    };

    fetchApplications();
  }, []);

  const user = profile?.user;
  const userInitials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-center pb-4 border-b border-gray-200">
            {user?.avatar ? (
              <div className="h-24 w-24 mx-auto relative rounded-full overflow-hidden">
                <Image
                  src={user.avatar}
                  alt={user.name || "User"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-24 w-24 rounded-full bg-[#607D8B] mx-auto flex items-center justify-center text-white text-3xl font-semibold">
                {userInitials || "US"}
              </div>
            )}
            <h2 className="mt-2 text-xl font-bold text-gray-900">
              {user?.name || "User"}
            </h2>
            <p className="text-sm text-gray-500">{user?.email || ""}</p>
          </div>

          <nav className="mt-4 space-y-2">
            <Link
              href="/user/dashboard"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-[#FF5722]/10 text-[#FF5722]"
            >
              <Briefcase className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/user/myprofile"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-[#FF5722] hover:bg-[#FF5722]/10"
            >
              <User className="mr-3 h-5 w-5" />
              My Profile
            </Link>
            <Link
              href="/user/mysettings"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-[#FF5722] hover:bg-[#FF5722]/10"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
            <button className="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-700 hover:bg-red-50">
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Applied Jobs
              </h3>
              <span className="text-sm text-gray-500">
                {applications.length} applications
              </span>
            </div>

            {isLoading || profileLoading ? (
              <p className="text-sm text-gray-500">Loading applications...</p>
            ) : applications.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                You haven't applied to any jobs yet.
              </p>
            ) : (
              <div className="space-y-4">
                {applications.map((job) => (
                  <div
                    key={job.id}
                    className="border rounded-lg p-4 shadow-sm hover:shadow transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-medium text-gray-900 truncate">
                            {job.job?.title || "Unknown Position"}
                          </h4>
                          <StatusBadge status={job.status} />
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {job.job?.location || "-"}
                        </p>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            Applied on{" "}
                            {new Date(job.appliedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                        <X className="h-3 w-3 mr-1" />
                        Withdraw
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
