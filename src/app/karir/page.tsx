"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Clock, MapPin, Search, Briefcase, ChevronRight } from "lucide-react";
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
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    fetchJobs();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
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

  // Parallax effect calculation
  const parallaxOffset = scrollPosition * 0.3;

  return (
    <main className="min-h-screen bg-black/80 backdrop-blur-lg">
      {/* Hero Header */}
      <section className="relative py-28 overflow-hidden border-b border-gray-800">
        {/* Background layers */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#3A3A3D] to-[#1F1F23]"
          style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
        />
        
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747209045/IMG_8432_xtgkxt.jpg" 
            alt="Mining operations"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
        </div>
        
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-[length:60px_60px]"
          style={{ 
            transform: `translateY(${parallaxOffset * 0.1}px)`,
            animation: 'gridMove 20s linear infinite'
          }} 
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#E85C23]/30"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-block mb-6">
              <div className="w-full h-0.5 bg-[#E85C23]/30 mt-2" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10">Career Opportunities</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-[#1BABA5]/30 z-0" style={{ bottom: '5px' }} />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join <span className="text-[#1fbfb8] font-medium">PT. Batara Dharma Persada</span> and be part of our growing team of professionals
            </p>
            
            <div className="animate-bounce mt-8">
              <ChevronRight className="w-8 h-8 text-[#1FBFB8] transform rotate-90" />
            </div>
          </div>
        </div>
        
        {/* Custom animations */}
        <style jsx global>{`
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-20px) translateX(10px); }
            100% { transform: translateY(0) translateX(0); }
          }
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 60px 60px; }
          }
        `}</style>
      </section>

      {/* Search & Filter */}
      <section className="py-12 px-4 md:px-8 lg:px-24 bg-gray-900/60 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSearch} className="grid md:grid-cols-3 gap-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by job title or keyword"
                className="w-full pl-12 pr-4 py-4 text-base bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FBFB8] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-4 text-gray-500" size={20} />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by location"
                className="w-full pl-12 pr-4 py-4 text-base bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FBFB8] focus:border-transparent"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
              <MapPin className="absolute left-4 top-4 text-gray-500" size={20} />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#E85C23] to-[#d14b17] hover:from-[#d14b17] hover:to-[#E85C23] text-white py-4 px-6 text-base font-medium rounded-lg transition-all duration-300 shadow-lg"
            >
              Search Jobs
            </button>
          </form>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 px-4 md:px-8 lg:px-24 relative">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48"></div>
        
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-white relative inline-block">
            <span className="relative z-10">Available Positions : </span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#E85C23]/20 z-0"></span>
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-14 h-14 border-4 border-[#1FBFB8] border-t-[#E85C23] rounded-full animate-spin"></div>
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid gap-8">
              {jobs.map((job) => (
                <div 
                  key={job.id} 
                  className="bg-gray-900/60 border border-gray-800 hover:border-[#1FBFB8]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#1FBFB8]/5 group"
                >
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <span className="bg-[#1FBFB8]/20 text-[#1FBFB8] border border-[#1FBFB8]/30 px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                          Full Time
                        </span>
                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#1FBFB8] transition-colors">{job.title}</h3>
                        <div className="flex flex-wrap gap-5 text-gray-400 text-base mb-4">
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-[#E85C23]" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-[#E85C23]" />
                            <span>Posted: {formatDate(job.postedAt)}</span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="w-5 h-5 mr-2 text-[#1FBFB8]" />
                            <span>Apply by: {formatDate(new Date(new Date(job.postedAt).getTime() + 30*24*60*60*1000).toISOString())}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 max-w-xl text-base">
                          {createTextPreview(job.description, 180)}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                        <a
                          href={`/karir/${job.slug}`}
                          className="inline-flex items-center bg-[#E85C23] hover:bg-[#d14b17] text-white px-6 py-3 rounded-lg transition-colors shadow-md font-medium group"
                        >
                          <span>View Details</span>
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-900/60 rounded-xl border border-gray-800">
              <div className="mb-4">
                <svg className="w-20 h-20 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No positions found</h3>
              <p className="text-gray-400 mb-6 text-base">We couldn't find any positions matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("");
                  setFilters({ page: 1, limit: 10 });
                }}
                className="text-[#1FBFB8] hover:text-[#E85C23] font-medium text-base transition-colors"
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
                className="px-4 py-2 bg-black/40 border border-gray-700 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#1FBFB8] transition-colors"
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
                      : 'bg-black/40 border border-gray-700 hover:border-[#1FBFB8] text-white'
                  } transition-colors`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(Math.min(totalPages, (filters.page || 1) + 1))}
                disabled={(filters.page || 1) >= totalPages}
                className="px-4 py-2 bg-black/40 border border-gray-700 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#1FBFB8] transition-colors"
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