// src/components/dashboard/RecentJobs.tsx
import React from "react";
import Link from "next/link";
import { Job } from "@/types/job.types";

interface RecentJobsProps {
  jobs: Job[];
}

const RecentJobs: React.FC<RecentJobsProps> = ({ jobs }) => {
  // Format salary
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return "Salary not specified";
    if (min && !max) return `From $${min.toLocaleString()}`;
    if (!min && max) return `Up to $${max.toLocaleString()}`;
    return `$${min?.toLocaleString()} - $${max?.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-lg text-gray-900">
          Latest Job Opportunities
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="px-6 py-4">
              <h3 className="font-medium text-gray-900">{job.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{job.location}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {formatSalary(job.salaryMin, job.salaryMax)}
              </div>
              <div className="mt-3">
                <Link
                  href={`/jobs/${job.slug}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Job →
                </Link>
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-4 text-gray-900 font-medium">
              No jobs available
            </h3>
            <p className="mt-2 text-gray-500 text-sm">
              Check back later for new opportunities.
            </p>
          </div>
        )}
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <Link
          href="/jobs"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Browse all jobs
        </Link>
      </div>
    </div>
  );
};
