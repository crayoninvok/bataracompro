// src/components/dashboard/DashboardHeader.tsx
import React from "react";
import Image from "next/image";

interface DashboardHeaderProps {
  username: string;
  avatarUrl?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  username,
  avatarUrl,
}) => {
  // Get current time for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <div className="hidden sm:block mr-4">
            {avatarUrl ? (
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
                <Image
                  src={avatarUrl}
                  alt={username}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-semibold border-2 border-blue-300">
                {username.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getGreeting()}, {username}
            </h1>
            <p className="text-gray-600 mt-1">
              Here's an overview of your job applications and career progress
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center shadow-sm transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Explore New Jobs
          </button>
        </div>
      </div>
    </div>
  );
};
export {DashboardHeader}