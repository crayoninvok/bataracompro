"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useJobs } from "@/hooks/useJobs";
import { CreateJobRequest } from "@/types/job";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Building,
  Calendar,
  CreditCard,
} from "lucide-react";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function CreateJobPage() {
  const { user, isLoading: authLoading } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const isAuthenticated = !!user;

  const router = useRouter();
  const { createJob } = useJobs();

  const [formData, setFormData] = useState<CreateJobRequest>({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salaryMin: undefined,
    salaryMax: undefined,
    expiredAt: "",
    jobType: "CONTRACT",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Editor modules and formats configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
  ];

  // Check if user is authenticated and is an admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    } else if (!authLoading && !isAdmin) {
      router.push("/dashboard");
    }
  }, [authLoading, isAuthenticated, isAdmin, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Handle salary fields to convert string to number
    if (name === "salaryMin" || name === "salaryMax") {
      const numericValue = value === "" ? undefined : Number(value);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle rich text editor changes
  const handleRichTextChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required";
    }

    if (
      !formData.description.trim() ||
      formData.description === "<p><br></p>"
    ) {
      newErrors.description = "Job description is required";
    }

    if (
      !formData.requirements.trim() ||
      formData.requirements === "<p><br></p>"
    ) {
      newErrors.requirements = "Job requirements are required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Job location is required";
    }

    if (formData.salaryMin !== undefined && formData.salaryMax !== undefined) {
      if (formData.salaryMin > formData.salaryMax) {
        newErrors.salaryMin =
          "Minimum salary cannot be greater than maximum salary";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const result = await createJob(formData);

      if (result.error) {
        setSubmitError(result.error.message || "Failed to post job");
      } else {
        setSubmitSuccess("Job posted successfully!");
        // Reset form
        setFormData({
          title: "",
          description: "",
          requirements: "",
          location: "",
          salaryMin: undefined,
          salaryMax: undefined,
          expiredAt: "",
          jobType: "CONTRACT",
        });

        // Redirect after short delay
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 2000);
      }
    } catch (error: any) {
      setSubmitError(error.message || "Failed to post job");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-[#E85C23] border-[#E85C23]/30 animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading form...</p>
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create New Job</h1>
          <p className="text-gray-500">
            Post a new job opening with complete details
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="flex items-center text-gray-600 hover:text-[#E85C23] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </button>
      </div>

      {submitError && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 flex items-start border border-red-100">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800">{submitError}</h3>
          </div>
        </div>
      )}

      {submitSuccess && (
        <div className="mb-6 rounded-lg bg-green-50 p-4 flex items-start border border-green-100">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-green-800">
              {submitSuccess}
            </h3>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-100">
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          {/* Basic Information */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Title*
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                  placeholder="e.g. Senior Mining Engineer"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Building className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                    placeholder="e.g. Jakarta, Indonesia"
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Type
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                >
                  <option value="FULL_TIME">Full-time</option>
                  <option value="PART_TIME">Part-time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="FREELANCE">Freelance</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Application Deadline
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="expiredAt"
                    id="expiredAt"
                    value={formData.expiredAt}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="salaryMin"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Minimum Salary (IDR)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="salaryMin"
                    id="salaryMin"
                    value={
                      formData.salaryMin === undefined ? "" : formData.salaryMin
                    }
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                    placeholder="e.g. 10000000"
                  />
                </div>
                {errors.salaryMin && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.salaryMin}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="salaryMax"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Maximum Salary (IDR)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="salaryMax"
                    id="salaryMax"
                    value={
                      formData.salaryMax === undefined ? "" : formData.salaryMax
                    }
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                    placeholder="e.g. 15000000"
                  />
                </div>
                {errors.salaryMax && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.salaryMax}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Job Description*
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Provide details about the role, responsibilities, and what the job
              entails
            </p>
            <div className="bg-white">
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(value) => handleRichTextChange("description", value)}
                modules={modules}
                formats={formats}
                placeholder="Describe the role, responsibilities, and expectations..."
                className="rounded h-64"
              />
            </div>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Job Requirements */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Job Requirements*
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              List qualifications, skills, experience, and education required
              for this position
            </p>
            <div className="bg-white">
              <ReactQuill
                theme="snow"
                value={formData.requirements}
                onChange={(value) =>
                  handleRichTextChange("requirements", value)
                }
                modules={modules}
                formats={formats}
                placeholder="List required skills, experience, education..."
                className="rounded h-52"
              />
            </div>
            {errors.requirements && (
              <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard")}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E85C23] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2 rounded-lg text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E85C23] transition-colors ${
                isSubmitting
                  ? "bg-[#E85C23]/70 cursor-not-allowed"
                  : "bg-[#E85C23] hover:bg-[#d14b17]"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Posting...
                </span>
              ) : (
                "Post Job"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
