"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Job } from "@/types/job";
import { useJobs } from "@/hooks/useJobs";
import { formatSalaryRange, formatDate } from "@/utils/format";
import { Briefcase, ChevronLeft, ChevronRight, Eye, Edit, Search, Plus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

// Update the Job type to include the deadline property
declare module "@/types/job" {
  interface Job {
    deadline: string;
  }
}

export default function AdminDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { getJobs, deleteJob, isLoading: jobsLoading } = useJobs();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  });
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const isAdmin = user?.role === "ADMIN";
  const isAuthenticated = !!user;

  // Check if user is authenticated and is an admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    } else if (!authLoading && !isAdmin) {
      router.push("/dashboard");
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
      search: searchTerm,
    });

    if (response.data) {
      setJobs(response.data.jobs);
      setPagination(response.data.pagination);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchJobs();
  };

  const handleDeleteJob = async (id: string, title: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${title}". This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E85C23',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#fff',
      customClass: {
        title: 'text-gray-800 text-xl',
        htmlContainer: 'text-gray-600'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeleteLoading(id);
        try {
          const response = await deleteJob(id);
          if (response.data) {
            // Remove from state and update pagination
            setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
            setPagination(prev => ({ 
              ...prev, 
              totalItems: prev.totalItems - 1,
              totalPages: Math.ceil((prev.totalItems - 1) / prev.limit)
            }));
            
            Swal.fire({
              title: 'Deleted!',
              text: 'Job listing has been deleted successfully.',
              icon: 'success',
              confirmButtonColor: '#E85C23'
            });
          }
        } catch (error) {
          console.error("Failed to delete job:", error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete the job. Please try again.',
            icon: 'error',
            confirmButtonColor: '#E85C23'
          });
        } finally {
          setDeleteLoading(null);
        }
      }
    });
  };

  // Loading state
  if (authLoading || jobsLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-[#E85C23] border-[#E85C23]/30 animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Only render content if user is authenticated and admin
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500">Manage job listings and applications</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-[#E85C23]/10 rounded-lg">
              <Briefcase className="h-6 w-6 text-[#E85C23]" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total Jobs</p>
              <h3 className="text-2xl font-bold text-gray-800">{pagination.totalItems}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-[#1FBFB8]/10 rounded-lg">
              <Eye className="h-6 w-6 text-[#1FBFB8]" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Active Listings</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {jobs.filter(job => new Date(job.deadline) > new Date()).length}
              </h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-start">
            <div className="p-3 bg-[#E85C23]/10 rounded-lg">
              <Briefcase className="h-6 w-6 text-[#E85C23]" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Applications</p>
              <h3 className="text-2xl font-bold text-gray-800">-</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List and Search */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-[#E85C23]" />
              Job Listings
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <form onSubmit={handleSearch} className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] text-sm"
                />
                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Search className="h-4 w-4 text-gray-400" />
                </button>
              </form>
              
              <button
                onClick={() => router.push("/admin/jobs/create")}
                className="flex items-center justify-center px-4 py-2 bg-[#E85C23] text-white rounded-lg hover:bg-[#d14b17] transition-colors text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Post New Job
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto flex-grow">
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
                jobs.map((job) => {
                  const isActive = new Date(job.deadline) > new Date();
                  
                  return (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {job.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {job.id.substring(0, 8)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {job.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {formatSalaryRange(job.salaryMin, job.salaryMax)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {formatDate(job.postedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => router.push(`/admin/jobs/edit/${job.id}`)}
                            className="text-[#E85C23] hover:text-[#d14b17]"
                            title="Edit job"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => router.push(`/admin/jobs/applications/${job.id}`)}
                            className="text-[#1FBFB8] hover:text-[#1aa9a3]"
                            title="View applications"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id, job.title)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete job"
                            disabled={deleteLoading === job.id}
                          >
                            {deleteLoading === job.id ? (
                              <div className="h-4 w-4 rounded-full border-2 border-t-red-500 border-red-500/30 animate-spin"></div>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center">
                      <Briefcase className="h-12 w-12 text-gray-300 mb-2" />
                      <p>No jobs found</p>
                      {searchTerm && (
                        <button
                          onClick={() => {
                            setSearchTerm("");
                            fetchJobs();
                          }}
                          className="mt-2 text-[#E85C23] hover:text-[#d14b17] text-sm"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.totalItems)} of {pagination.totalItems} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                disabled={pagination.page === 1}
                className="inline-flex items-center p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-700">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
                disabled={pagination.page === pagination.totalPages}
                className="inline-flex items-center p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}