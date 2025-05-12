// src/app/admin/jobs/applications/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-provider";
import {
  JobApplication,
  UpdateApplicationStatusRequest,
} from "@/types/application";
import { applicationService } from "@/services/application-services";
import { useJobs } from "@/hooks/useJobs";

export default function ViewJobApplicationsPage({
  params,
}: {
  params: { id: string };
}) {
  const {
    user,
    isAdmin,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuthContext();
  const router = useRouter();
  const { getJobById } = useJobs();

  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [statusUpdateLoading, setStatusUpdateLoading] = useState<
    Record<string, boolean>
  >({});
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

  // Check if user is authenticated and is an admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    } else if (!authLoading && !isAdmin) {
      router.push("/dashboard");
    }
  }, [authLoading, isAuthenticated, isAdmin, router]);

  // Load job data and applications
  useEffect(() => {
    if (isAdmin && params.id) {
      fetchApplications();
      fetchJobDetails();
    }
  }, [isAdmin, params.id]);

  const fetchApplications = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await applicationService.getAllApplications();
      // Filter applications for this specific job
      const jobApplications = response.applications.filter(
        (app) => app.jobId === params.id
      );
      setApplications(jobApplications);
    } catch (err: any) {
      setError(err.message || "Failed to load applications");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchJobDetails = async () => {
    try {
      const response = await getJobById(params.id);
      if (response.data) {
        setJobTitle(response.data.job.title);
      }
    } catch (err) {
      console.error("Failed to load job details:", err);
    }
  };

  const handleStatusUpdate = async (
    applicationId: string,
    status: UpdateApplicationStatusRequest
  ) => {
    setStatusUpdateLoading((prev) => ({ ...prev, [applicationId]: true }));
    setUpdateSuccess(null);

    try {
      await applicationService.updateApplicationStatus(applicationId, status);

      // Update local state
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === applicationId ? { ...app, status: status.status } : app
        )
      );

      setUpdateSuccess(`Application status updated to ${status.status}`);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(null);
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update application status");
    } finally {
      setStatusUpdateLoading((prev) => ({ ...prev, [applicationId]: false }));
    }
  };

  // Loading state
  if (authLoading || isLoading) {
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
      <div className="mb-4 flex items-center space-x-2">
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="flex items-center text-indigo-600 hover:text-indigo-900"
        >
          <svg
            className="mr-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Dashboard
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold">Applications for: {jobTitle}</h1>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {updateSuccess && (
        <div className="mb-4 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                {updateSuccess}
              </h3>
            </div>
          </div>
        </div>
      )}

      {applications.length === 0 ? (
        <div className="rounded-md bg-gray-50 p-4 text-center">
          <p className="text-gray-700">No applications found for this job.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {applications.map((application) => (
                <tr key={application.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      {application.user?.avatar && (
                        <div className="mr-4 h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={application.user.avatar}
                            alt={application.user.name}
                          />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {application.user?.name || "Unknown User"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.user?.email || "No email provided"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(application.appliedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        application.status === "ACCEPTED"
                          ? "bg-green-100 text-green-800"
                          : application.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : application.status === "INTERVIEW"
                          ? "bg-blue-100 text-blue-800"
                          : application.status === "REVIEWED"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <select
                        className="rounded-md border border-gray-300 py-1 pl-2 pr-8 text-sm"
                        value={application.status}
                        onChange={(e) =>
                          handleStatusUpdate(application.id, {
                            status: e.target.value as any,
                          })
                        }
                        disabled={statusUpdateLoading[application.id]}
                      >
                        <option value="APPLIED">Applied</option>
                        <option value="REVIEWED">Reviewed</option>
                        <option value="INTERVIEW">Interview</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="ACCEPTED">Accepted</option>
                      </select>
                      <button
                        onClick={() =>
                          router.push(`/admin/applicants/${application.userId}`)
                        }
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Profile
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
