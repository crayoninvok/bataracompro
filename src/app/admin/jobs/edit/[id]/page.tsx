"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-provider";
import { useJobs } from "@/hooks/useJobs";
import { UpdateJobRequest, Job } from "@/types/job";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function EditJobPage({ params }: { params: { id: string } }) {
  const {
    user,
    isAdmin,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuthContext();
  const router = useRouter();
  const { getJobById, updateJob } = useJobs();

  const [job, setJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<UpdateJobRequest>({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salaryMin: undefined,
    salaryMax: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Quill editor modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  // Check if user is authenticated and is an admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    } else if (!authLoading && !isAdmin) {
      router.push("/dashboard");
    }
  }, [authLoading, isAuthenticated, isAdmin, router]);

  // Load job data
  useEffect(() => {
    if (isAdmin && params.id) {
      fetchJob();
    }
  }, [isAdmin, params.id]);

  const fetchJob = async () => {
    setIsLoading(true);
    try {
      const response = await getJobById(params.id);
      if (response.data) {
        const jobData = response.data.job;
        setJob(jobData);
        setFormData({
          title: jobData.title,
          description: jobData.description,
          requirements: jobData.requirements,
          location: jobData.location,
          salaryMin: jobData.salaryMin,
          salaryMax: jobData.salaryMax,
        });
      }
    } catch (error) {
      console.error("Failed to load job:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // Handle salary fields specially to convert string to number
    if (name === "salaryMin" || name === "salaryMax") {
      const numericValue = value === "" ? undefined : Number(value);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle Quill editor changes
  const handleQuillChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user types
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

    if (!formData.title?.trim()) {
      newErrors.title = "Job title is required";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Job description is required";
    }

    if (!formData.requirements?.trim()) {
      newErrors.requirements = "Job requirements are required";
    }

    if (!formData.location?.trim()) {
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
      const result = await updateJob(params.id, formData);

      if (result.error) {
        setSubmitError(result.error.message);
      } else {
        setSubmitSuccess("Job updated successfully!");

        // Redirect after short delay
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 2000);
      }
    } catch (error: any) {
      setSubmitError(error.message || "Failed to update job");
    } finally {
      setIsSubmitting(false);
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
  if (!user || !isAdmin || !job) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Job</h1>
      </div>

      {submitError && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {submitError}
              </h3>
            </div>
          </div>
        </div>
      )}

      {submitSuccess && (
        <div className="mb-4 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                {submitSuccess}
              </h3>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g. New York, NY or Remote"
          />
          {errors.location && (
            <p className="mt-2 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="salaryMin"
              className="block text-sm font-medium text-gray-700"
            >
              Minimum Salary (optional)
            </label>
            <input
              type="number"
              name="salaryMin"
              id="salaryMin"
              value={formData.salaryMin === undefined ? "" : formData.salaryMin}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g. 50000"
            />
            {errors.salaryMin && (
              <p className="mt-2 text-sm text-red-600">{errors.salaryMin}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="salaryMax"
              className="block text-sm font-medium text-gray-700"
            >
              Maximum Salary (optional)
            </label>
            <input
              type="number"
              name="salaryMax"
              id="salaryMax"
              value={formData.salaryMax === undefined ? "" : formData.salaryMax}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g. 80000"
            />
            {errors.salaryMax && (
              <p className="mt-2 text-sm text-red-600">{errors.salaryMax}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Job Description
          </label>
          <div className="mt-1">
            <ReactQuill
              theme="snow"
              value={formData.description || ""}
              onChange={(content) => handleQuillChange(content, "description")}
              modules={modules}
              className="h-64"
            />
          </div>
          {errors.description && (
            <p className="mt-2 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="requirements"
            className="block text-sm font-medium text-gray-700"
          >
            Job Requirements
          </label>
          <div className="mt-1">
            <ReactQuill
              theme="snow"
              value={formData.requirements || ""}
              onChange={(content) => handleQuillChange(content, "requirements")}
              modules={modules}
              className="h-48"
            />
          </div>
          {errors.requirements && (
            <p className="mt-2 text-sm text-red-600">{errors.requirements}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-5">
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard")}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
          >
            {isSubmitting ? "Updating..." : "Update Job"}
          </button>
        </div>
      </form>
    </div>
  );
}