// src/app/admin/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-provider";
import { Job } from "@/types/job";
import { useJobs } from "@/hooks/useJobs";

export default function AdminDashboardPage() {
  const {
    user,
    isAdmin,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuthContext();
  const router = useRouter();
  const { getJobs, isLoading: jobsLoading } = useJobs();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  });

  // Check if user is authenticated and is an admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    } else if (!authLoading && !isAdmin) {
      router.push("/dashboard"); // Redirect to user dashboard if not admin
    }
  }, [authLoading, isAuthenticated, isAdmin, router]);

  // Load jobs on mount and page change
  useEffect(() => {
    if (isAdmin) {
      fetchJobs();
    }
  }, [isAdmin, pagination.page]);

  const fetchJobs = async () => {
    const response = await getJobs({
      page: pagination.page,
      limit: pagination.limit,
    });

    if (response.data) {
      setJobs(response.data.jobs);
      setPagination(response.data.pagination);
    }
  };

  // Loading state
  if (authLoading || jobsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Only render content if user is authenticated and admin
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => router.push("/admin/jobs/create")}
          className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Post New Job
        </button>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Job Listings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Salary Range
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Posted Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {job.title}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {job.location}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {job.salaryMin && job.salaryMax
                          ? `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}`
                          : job.salaryMin
                          ? `From $${job.salaryMin.toLocaleString()}`
                          : "Not specified"}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {new Date(job.postedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() =>
                          router.push(`/admin/jobs/edit/${job.id}`)
                        }
                        className="mr-2 text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/admin/jobs/applications/${job.id}`)
                        }
                        className="text-gray-600 hover:text-gray-900"
                      >
                        View Applications
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center space-x-2">
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: Math.max(1, prev.page - 1),
                }))
              }
              disabled={pagination.page === 1}
              className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: Math.min(prev.totalPages, prev.page + 1),
                }))
              }
              disabled={pagination.page === pagination.totalPages}
              className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
