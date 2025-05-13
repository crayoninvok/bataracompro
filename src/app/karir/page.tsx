"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Clock, MapPin, Search } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { Job, JobFilters } from "@/types/job";
import { formatDate } from "@/utils/format";

// Strip HTML tags for text preview
const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

export default function AllJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilters>({
    page: 1,
    limit: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const { getJobs } = useJobs();

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await getJobs(filters);
      if (response.data) {
        setJobs(response.data.jobs);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ 
      ...prev, 
      page: 1, 
      search: searchTerm,
      location: locationFilter 
    }));
  };

  // Create a safe text preview from HTML content
  const createTextPreview = (htmlContent: string, maxLength: number = 150) => {
    // Handle DOM parsing only on client side
    if (typeof window !== 'undefined') {
      const plainText = stripHtml(htmlContent);
      return plainText.length > maxLength ? 
        `${plainText.substring(0, maxLength)}...` : 
        plainText;
    }
    return "";
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <section className="bg-[#E85C23] text-white py-20 px-4 md:px-8 lg:px-24 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1FBFB8] rounded-full -mr-32 -mt-32 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5B5B5F] rounded-full -ml-48 -mb-48 opacity-30"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Career Opportunities
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Find positions that match your skills and interests at PT Batara Dharma Persada
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-10 px-4 md:px-8 lg:px-24 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSearch} className="grid md:grid-cols-3 gap-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by job title or keyword"
                className="w-full pl-12 pr-4 py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FBFB8]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by location"
                className="w-full pl-12 pr-4 py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FBFB8]"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
              <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
            </div>
            <button
              type="submit"
              className="bg-[#E85C23] hover:bg-[#d14b17] text-white py-4 px-6 text-base font-medium rounded-lg transition"
            >
              Search Jobs
            </button>
          </form>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 px-4 md:px-8 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#5B5B5F]">Available Positions</h2>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-14 h-14 border-4 border-[#1FBFB8] border-t-[#E85C23] rounded-full animate-spin"></div>
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-8">
              {jobs.map((job) => (
                <div 
                  key={job.id} 
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-shadow hover:shadow-lg"
                >
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <span className="bg-[#1FBFB8]/20 text-[#1FBFB8] border border-[#1FBFB8]/30 px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                          Full Time
                        </span>
                        <h3 className="text-2xl font-bold mb-3 text-[#5B5B5F]">{job.title}</h3>
                        <div className="flex flex-wrap gap-5 text-gray-500 text-base mb-4">
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-[#E85C23]" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-[#E85C23]" />
                            <span>Posted: {formatDate(job.postedAt)}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 max-w-xl text-base">
                          {createTextPreview(job.description, 180)}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                        <a
                          href={`/karir/${job.slug}`}
                          className="inline-flex items-center bg-[#E85C23] hover:bg-[#d14b17] text-white px-6 py-3 rounded-lg transition font-medium"
                        >
                          <span>View Details</span>
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
              <div className="mb-4">
                <svg className="w-20 h-20 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No positions found</h3>
              <p className="text-gray-500 mb-6 text-base">We couldn't find any positions matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("");
                  setFilters({ page: 1, limit: 10 });
                }}
                className="text-[#E85C23] hover:text-[#d14b17] font-medium text-base"
              >
                Clear filters and try again
              </button>
            </div>
          )}

          {/* Pagination */}
          {!isLoading && jobs.length > 0 && totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2">
              <button
                onClick={() => handlePageChange(Math.max(1, (filters.page || 1) - 1))}
                disabled={(filters.page || 1) <= 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-md text-base ${
                    page === filters.page 
                      ? 'bg-[#E85C23] text-white' 
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(Math.min(totalPages, (filters.page || 1) + 1))}
                disabled={(filters.page || 1) >= totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}