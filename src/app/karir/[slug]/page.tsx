"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Loader,
} from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { useApplications } from "@/hooks/useApplication";
import { Job } from "@/types/job";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";
import { formatCurrency, formatSalaryRange, formatDate } from "@/utils/format";
import Swal from "sweetalert2";

export default function JobDetails() {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useParams();
  const router = useRouter();
  const { getJobBySlug } = useJobs();
  const { submitApplication } = useApplications();
  const { user, isAuthenticated } = useAuth();
  const { isComplete: profileComplete, isChecking: isCheckingProfile } =
    useProfileCompletion();

  const slug = params.slug as string;

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getJobBySlug(slug);
        if (response.data) {
          setJob(response.data.job);
        } else if (response.error) {
          setError("Failed to load job details");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Failed to load job details");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchJob();
    }
  }, [slug]);

  const goBack = () => {
    router.back();
  };

  const handleApply = async () => {
    const returnUrl = `/karir/${slug}`;

    if (!isAuthenticated) {
      Swal.fire({
        title: "Login Required",
        text: "You need to login first to apply for this position",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login Now",
        confirmButtonColor: "#E85C23",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`);
        }
      });
      return;
    }

    if (!profileComplete) {
      Swal.fire({
        title: "Complete Your Profile",
        text: "Please complete your profile and education before applying.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Complete Profile",
        confirmButtonColor: "#E85C23",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/user/myprofile");
        }
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Confirm Application",
      text: `Are you sure you want to apply for ${job?.title}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Apply Now",
      confirmButtonColor: "#E85C23",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) return;

    setIsSubmitting(true);

    try {
      const response = await submitApplication({ jobId: job?.id as string });

      if (response.data) {
        Swal.fire({
          title: "Application Submitted!",
          text: "Your application has been submitted successfully!",
          icon: "success",
          confirmButtonColor: "#E85C23",
          confirmButtonText: "OK",
        });
      } else {
        const errorMessage =
          response.error?.message === "You have already applied for this job"
            ? "You have already applied for this position."
            : "Failed to submit application.";

        Swal.fire({
          title: "Application Error",
          text: errorMessage,
          icon: "error",
          confirmButtonColor: "#E85C23",
          confirmButtonText: "OK",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Application Error",
        text:
          error.message ||
          "An error occurred while submitting your application.",
        icon: "error",
        confirmButtonColor: "#E85C23",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check for profile loading condition
  if (isCheckingProfile || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#1FBFB8] border-t-[#E85C23] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Job Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The job position you're looking for doesn't exist or has been
            removed.
          </p>
          <button
            onClick={goBack}
            className="inline-flex items-center bg-[#E85C23] hover:bg-[#d14b17] text-white px-5 py-2 rounded-md transition"
          >
            <ArrowLeft className="mr-2" size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <section className="bg-[#E85C23] text-white py-16 px-4 md:px-8 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1FBFB8] rounded-full -mr-32 -mt-32 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5B5B5F] rounded-full -ml-48 -mb-48 opacity-30"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <button
            onClick={goBack}
            className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md transition mb-6"
          >
            <ArrowLeft className="mr-2" size={16} />
            <span>Back to Jobs</span>
          </button>

          <div className="bg-[#1FBFB8]/20 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-3 border border-[#1FBFB8]/30">
            Full Time
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.title}</h1>

          <div className="flex flex-wrap gap-4 text-white/90">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>Posted: {formatDate(job.postedAt)}</span>
            </div>
            {(job.salaryMin || job.salaryMax) && (
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                <span>{formatSalaryRange(job.salaryMin, job.salaryMax)}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Job Content */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="prose max-w-none">
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-[#E85C23]">
                  Job Description
                </h2>
                <div
                  dangerouslySetInnerHTML={{ __html: job.description }}
                  className="text-gray-700 leading-relaxed"
                />
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-[#E85C23]">
                  Requirements
                </h2>
                <div
                  dangerouslySetInnerHTML={{ __html: job.requirements }}
                  className="text-gray-700 leading-relaxed"
                />
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <button
                onClick={handleApply}
                disabled={isSubmitting || !profileComplete}
                className={`inline-flex items-center ${
                  isSubmitting || !profileComplete
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#E85C23] hover:bg-[#d14b17]"
                } text-white px-8 py-3 rounded-lg transition font-medium`}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin mr-2" size={20} />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Briefcase className="mr-2" />
                    <span>Apply for this Position</span>
                  </>
                )}
              </button>

              {!isAuthenticated && (
                <p className="text-sm text-gray-600 mt-3">
                  You need to{" "}
                  <a href="/auth/login" className="text-[#E85C23] font-medium">
                    log in
                  </a>{" "}
                  to apply for this position
                </p>
              )}

              {isAuthenticated && !profileComplete && (
                <p className="text-sm text-[#E85C23] mt-3">
                  Please complete your profile before applying for positions
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
