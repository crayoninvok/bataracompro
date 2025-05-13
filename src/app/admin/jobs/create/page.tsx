"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useJobs } from "@/hooks/useJobs";
import { CreateJobRequest } from "@/types/job";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import { AlertTriangle, CheckCircle } from "lucide-react";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

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
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Editor modules and formats configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link'
  ];

  // Check if user is authenticated and is an admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    } else if (!authLoading && !isAdmin) {
      router.push("/dashboard"); // Redirect to user dashboard if not admin
    }
  }, [authLoading, isAuthenticated, isAdmin, router]);

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

  // Handle rich text editor changes
  const handleRichTextChange = (field: string, value: string) => {
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

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required";
    }

    if (!formData.description.trim() || formData.description === '<p><br></p>') {
      newErrors.description = "Job description is required";
    }

    if (!formData.requirements.trim() || formData.requirements === '<p><br></p>') {
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
      <div className="flex h-screen items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-blue-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Only render content if user is authenticated and admin
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-10">"
        {submitError && (
          <div className="mb-8 rounded-lg bg-red-50 p-5 flex items-start">
            <AlertTriangle className="h-6 w-6 text-red-500 mt-0.5 mr-4" />
            <div>
              <h3 className="text-base font-medium text-red-800">
                {submitError}
              </h3>
            </div>
          </div>
        )}

        {submitSuccess && (
          <div className="mb-8 rounded-lg bg-green-50 p-5 flex items-start">
            <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 mr-4" />
            <div>
              <h3 className="text-base font-medium text-green-800">
                {submitSuccess}
              </h3>
            </div>
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg">
          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Basic Job Information */}
            <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-base font-medium text-gray-700"
                >
                  Job Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-base border-gray-300 rounded-md"
                  />
                </div>
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="location"
                  className="block text-base font-medium text-gray-700"
                >
                  Location
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-base border-gray-300 rounded-md"
                    placeholder="e.g. Jakarta"
                  />
                </div>
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="salaryMin"
                  className="block text-base font-medium text-gray-700"
                >
                  Minimum Salary (IDR)
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="salaryMin"
                    id="salaryMin"
                    value={formData.salaryMin === undefined ? "" : formData.salaryMin}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-base border-gray-300 rounded-md"
                    placeholder="Optional"
                  />
                </div>
                {errors.salaryMin && (
                  <p className="mt-2 text-sm text-red-600">{errors.salaryMin}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="salaryMax"
                  className="block text-base font-medium text-gray-700"
                >
                  Maximum Salary (IDR)
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="salaryMax"
                    id="salaryMax"
                    value={formData.salaryMax === undefined ? "" : formData.salaryMax}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-base border-gray-300 rounded-md"
                    placeholder="Optional"
                  />
                </div>
                {errors.salaryMax && (
                  <p className="mt-2 text-sm text-red-600">{errors.salaryMax}</p>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className="pt-4">
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-800"
              >
                Job Description
              </label>
              <p className="mt-2 text-base text-gray-500">
                Provide details about the role, responsibilities, and expectations.
              </p>
              <div className="mt-3 bg-white">
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={(value) => handleRichTextChange('description', value)}
                  modules={modules}
                  formats={formats}
                  placeholder="Describe the role, responsibilities, and company..."
                  className="rounded-md h-72 bg-white text-base"
                />
              </div>
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Requirements Section */}
            <div className="pt-10">
              <label
                htmlFor="requirements"
                className="block text-lg font-medium text-gray-800"
              >
                Job Requirements
              </label>
              <p className="mt-2 text-base text-gray-500">
                List the required skills, experience, education, and qualifications.
              </p>
              <div className="mt-3 bg-white">
                <ReactQuill
                  theme="snow"
                  value={formData.requirements}
                  onChange={(value) => handleRichTextChange('requirements', value)}
                  modules={modules}
                  formats={formats}
                  placeholder="List required skills, experience, education..."
                  className="rounded-md h-56 bg-white text-base"
                />
              </div>
              {errors.requirements && (
                <p className="mt-2 text-sm text-red-600">{errors.requirements}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-10 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push("/admin/dashboard")}
                className="inline-flex items-center px-5 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
              >
                {isSubmitting ? "Posting..." : "Post Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}