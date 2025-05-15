// src/components/dashboard/RecentApplications.tsx
import React from "react";
import Link from "next/link";
import { JobApplication } from "@/types/application";

interface RecentApplicationsProps {
  applications: JobApplication[];
}

const RecentApplications: React.FC<RecentApplicationsProps> = ({
  applications,
}) => {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-100 text-blue-800";
      case "REVIEWED":
        return "bg-purple-100 text-purple-800";
      case "INTERVIEW":
        return "bg-yellow-100 text-yellow-800";
      case "ACCEPTED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-lg text-gray-900">
          Recent Applications
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {applications.length > 0 ? (
          applications.slice(0, 5).map((application) => (
            <div key={application.id} className="px-6 py-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {application.job?.title || "Job Title Unavailable"}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Applied on {formatDate(application.appliedAt)}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 flex items-center">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                  <Link
                    href={`/applications/${application.id}`}
                    className="ml-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-4 text-gray-900 font-medium">
              No applications yet
            </h3>
            <p className="mt-2 text-gray-500 text-sm">
              Start applying for jobs to see your applications here.
            </p>
            <Link
              href="/jobs"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Browse Jobs
            </Link>
          </div>
        )}
      </div>

      {applications.length > 5 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
          <Link
            href="/applications"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View all applications
          </Link>
        </div>
      )}
    </div>
  );
};
