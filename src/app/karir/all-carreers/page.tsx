"use client"
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Dummy job list data
const jobList = [
  { title: "Site Manager - East Kalimantan", location: "Tabang, East Kalimantan", deadline: "30 June 2025", link: "/careers/site-manager" },
  { title: "HSE Supervisor", location: "Tabang, East Kalimantan", deadline: "15 June 2025", link: "/careers/hse-supervisor" },
  { title: "Logistic Coordinator", location: "East Jakarta (Head Office)", deadline: "20 June 2025", link: "/careers/logistic-coordinator" },
  { title: "Project Engineer", location: "Jakarta, Indonesia", deadline: "25 June 2025", link: "/careers/project-engineer" },
  { title: "Construction Manager", location: "Banjarmasin, South Kalimantan", deadline: "10 July 2025", link: "/careers/construction-manager" },
  { title: "Operations Manager", location: "Surabaya, East Java", deadline: "30 July 2025", link: "/careers/operations-manager" },
  { title: "HR Specialist", location: "Jakarta, Indonesia", deadline: "15 July 2025", link: "/careers/hr-specialist" },
  { title: "Finance Analyst", location: "East Jakarta", deadline: "30 June 2025", link: "/careers/finance-analyst" },
  { title: "Electrical Engineer", location: "Bali, Indonesia", deadline: "30 August 2025", link: "/careers/electrical-engineer" },
  { title: "Site Supervisor", location: "Aceh, Indonesia", deadline: "5 August 2025", link: "/careers/site-supervisor" },
  { title: "Civil Engineer", location: "Surabaya, East Java", deadline: "25 July 2025", link: "/careers/civil-engineer" },
  { title: "IT Specialist", location: "Jakarta, Indonesia", deadline: "15 August 2025", link: "/careers/it-specialist" },
  { title: "Procurement Manager", location: "Medan, North Sumatra", deadline: "30 September 2025", link: "/careers/procurement-manager" }
];

const ITEMS_PER_PAGE = 8; // Number of jobs to display per page

export default function AllCareers() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the current jobs to display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const jobsToDisplay = jobList.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(jobList.length / ITEMS_PER_PAGE);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <section className="py-20 px-4 md:px-8 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">All Available Positions</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-300 opacity-40 z-0"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore the open positions at PT Batara Dharma Persada and find your next career opportunity.
            </p>
          </div>

          <div className="space-y-6">
            {jobsToDisplay.map((job, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                        Full Time
                      </span>
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-gray-500 text-sm mb-4">
                        <div className="flex items-center">
                          <span className="w-4 h-4 mr-1">📍</span>
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-4 h-4 mr-1">⏳</span>
                          <span>Open until {job.deadline}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 max-w-xl">
                        {/* Short description can be added here */}
                        Explore this role and become part of our growing team.
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Link
                        href={job.link}
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
                      >
                        <span>Position Details</span>
                        <ArrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between mt-8">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
