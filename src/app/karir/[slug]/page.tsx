"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Loader,
  ChevronRight,
} from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { useApplications } from "@/hooks/useApplication";
import { Job } from "@/types/job";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";
import { formatCurrency, formatSalaryRange, formatDate } from "@/utils/format";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import CustomLoading from "@/components/CustomLoading";

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function JobDetails() {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [descriptionHtml, setDescriptionHtml] = useState("");
  const [requirementsHtml, setRequirementsHtml] = useState("");
  const [showModal, setShowModal] = useState(false);

  const params = useParams();
  const router = useRouter();
  const { getJobBySlug } = useJobs();
  const { submitApplication } = useApplications();
  const { user, isAuthenticated } = useAuth();
  const { isComplete: profileComplete, isChecking: isCheckingProfile } =
    useProfileCompletion();

  const slug = params.slug as string;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    const fetchJob = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getJobBySlug(slug);
        if (response.data) {
          setJob(response.data.job);
          setDescriptionHtml(response.data.job.description);
          setRequirementsHtml(response.data.job.requirements);
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

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slug]);

  // Define Quill modules and formats
  const modules = {
    toolbar: false, // Disable toolbar for read-only view
  };

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

  // Parallax effect calculation
  const parallaxOffset = scrollPosition * 0.3;

  // Check for profile loading condition
  if (isCheckingProfile || isLoading) {
    return <CustomLoading />;
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-black/80 backdrop-blur-lg pt-24 px-4">
        <div className="max-w-4xl mx-auto bg-gray-900/60 rounded-xl shadow-lg p-8 text-center border border-gray-800">
          <h1 className="text-2xl font-bold text-white mb-4">Job Not Found</h1>
          <p className="text-gray-300 mb-6">
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
            src="https://res.cloudinary.com/dysmj8esf/image/upload/v1747204272/IMG_8480_sc9mlm.jpg"
            alt="Mining operations"
            className="w-full h-full object-cover opacity-"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70"></div>
        </div>

        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-[length:60px_60px]"
          style={{
            transform: `translateY(${parallaxOffset * 0.1}px)`,
            animation: "gridMove 20s linear infinite",
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
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={goBack}
                className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md transition border border-white/20 group"
              >
                <ArrowLeft
                  className="mr-2 group-hover:-translate-x-1 transition-transform"
                  size={16}
                />
                <span>Back to Jobs</span>
              </button>

              <div className="bg-[#1FBFB8]/20 text-[#1FBFB8] px-4 py-1.5 rounded-full text-sm font-medium border border-[#1FBFB8]/30 capitalize">
                {job.jobType.replace("_", " ").toLowerCase()}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-gray-300 text-lg mb-8">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-[#E85C23]" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[#E85C23]" />
                <span>Posted: {formatDate(job.postedAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[#E85C23]" />
                <span>Expires: {formatDate(job.expiredAt)}</span>
              </div>
              {(job.salaryMin || job.salaryMax) && (
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-[#1FBFB8]" />
                  <span>{formatSalaryRange(job.salaryMin, job.salaryMax)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Custom animations */}
        <style jsx global>{`
          @keyframes float {
            0% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-20px) translateX(10px);
            }
            100% {
              transform: translateY(0) translateX(0);
            }
          }
          @keyframes gridMove {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 60px 60px;
            }
          }

          /* Custom styling for React Quill content */
          .quill-content .ql-editor {
            padding: 0;
          }

          .quill-content .ql-editor h1,
          .quill-content .ql-editor h2,
          .quill-content .ql-editor h3 {
            color: #f3f4f6;
            margin-bottom: 1rem;
            font-weight: 600;
          }

          .quill-content .ql-editor h1 {
            font-size: 1.5rem;
          }

          .quill-content .ql-editor h2 {
            font-size: 1.25rem;
          }

          .quill-content .ql-editor p {
            margin-bottom: 1rem;
          }

          .quill-content .ql-editor ul,
          .quill-content .ql-editor ol {
            padding-left: 1.5rem;
            margin-bottom: 1rem;
          }

          .quill-content .ql-editor li {
            margin-bottom: 0.5rem;
          }

          .quill-content .ql-editor a {
            color: #1fbfb8;
            text-decoration: underline;
          }

          .quill-content .ql-container.ql-snow {
            border: none;
          }

          .quill-content .ql-editor blockquote {
            border-left: 4px solid #e85c23;
            padding-left: 1rem;
            margin-left: 0;
            margin-right: 0;
            font-style: italic;
          }
        `}</style>
      </section>

      {/* Job Content */}
      <section className="py-16 px-4 md:px-8 lg:px-24 relative">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E85C23]/10 to-transparent rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FBFB8]/10 to-transparent rounded-full -ml-48 -mb-48"></div>

        <div className="max-w-4xl mx-auto bg-gray-900/60 rounded-xl shadow-lg overflow-hidden border border-gray-800">
          <div className="p-8 md:p-10">
            <div className="prose prose-invert max-w-none">
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-[#E85C23] relative inline-block">
                  <span>Job Description</span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#E85C23]/30"></span>
                </h2>
                <div className="text-gray-300 leading-relaxed quill-content">
                  <ReactQuill
                    value={descriptionHtml}
                    readOnly={true}
                    modules={modules}
                    theme="snow"
                  />
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-[#1FBFB8] relative inline-block">
                  <span>Requirements</span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#1FBFB8]/30"></span>
                </h2>
                <div className="text-gray-300 leading-relaxed quill-content">
                  <ReactQuill
                    value={requirementsHtml}
                    readOnly={true}
                    modules={modules}
                    theme="snow"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-700">
              <a
                href="https://bit.ly/recruitmentbatara"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-[#E85C23] to-[#d14b17] hover:from-[#d14b17] hover:to-[#E85C23] text-white px-8 py-4 rounded-lg transition-all duration-300 font-medium shadow-lg group"
              >
                <Briefcase className="mr-2 group-hover:scale-110 transition-transform" />
                <span>Apply for this Position</span>
              </a>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowModal(true)}
                className="text-sm text-[#1FBFB8] underline hover:text-[#E85C23] transition"
              >
                Read Terms and Conditions
              </button>
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700 max-w-lg w-full mx-4 p-6 rounded-xl shadow-lg text-white relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-[#E85C23] mb-4">
              PENGUMUMAN RESMI TERKAIT PENIPUAN REKRUTMEN
            </h2>
            <p className="text-sm text-gray-300 mb-2">
              Sehubungan dengan beredarnya pesan melalui aplikasi WhatsApp yang
              mengatasnamakan PT Batara Dharma Persada.
            </p>
            <p className="text-sm text-gray-300 mb-2">
              PT Batara Dharma Persada tidak pernah memungut biaya apapun dalam
              proses rekrutmen. Segala proses seleksi dan komunikasi resmi dari
              perusahaan hanya dilakukan melalui saluran resmi dan bukan melalui
              nomor WhatsApp pribadi yang tidak dikenal.
            </p>
            <p className="text-sm text-gray-300 mb-2">
              Kami menghimbau kepada seluruh masyarakat untuk:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-300 mb-2 space-y-1">
              <li>Waspada terhadap undangan interview yang mencurigakan</li>
              <li>Tidak memberikan data pribadi secara sembarangan</li>
              <li>Tidak melakukan pembayaran dalam bentuk apapun</li>
            </ul>
            <p className="text-sm text-gray-300 mb-2">
              Jika Anda menerima pesan mencurigakan seperti ini, segera laporkan
              ke pihak berwenang atau hubungi kontak resmi perusahaan kami untuk
              klarifikasi.
            </p>
            <p className="text-sm text-gray-300">
              Terima kasih atas perhatian dan kerja samanya.
            </p>
            <p className="text-sm font-medium text-[#1FBFB8] mt-4">
              PT Batara Dharma Persada
            </p>
            <p className="text-sm text-gray-400">HRGA Dept</p>
          </div>
        </div>
      )}
    </main>
  );
}
