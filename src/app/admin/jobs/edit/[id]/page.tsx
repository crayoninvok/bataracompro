"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-provider";
import { useJobs } from "@/hooks/useJobs";
import { UpdateJobRequest, Job } from "@/types/job";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {
  AlertTriangle,
  CheckCircle,
  Building,
  CreditCard,
} from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function EditJobPage({ params }: { params: { id: string } }) {
  const { user, isAdmin, isAuthenticated, isLoading: authLoading } = useAuthContext();
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

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/admin/login");
    else if (!authLoading && !isAdmin) router.push("/dashboard");
  }, [authLoading, isAuthenticated, isAdmin, router]);

  useEffect(() => {
    if (isAdmin && params.id) fetchJob();
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
    } catch (err) {
      console.error("Failed to load job:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === "salaryMin" || name === "salaryMax" ? (value === "" ? undefined : Number(value)) : value;

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleQuillChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title?.trim()) newErrors.title = "Job title is required";
    if (!formData.description?.trim()) newErrors.description = "Job description is required";
    if (!formData.requirements?.trim()) newErrors.requirements = "Job requirements are required";
    if (!formData.location?.trim()) newErrors.location = "Job location is required";
    if (formData.salaryMin !== undefined && formData.salaryMax !== undefined && formData.salaryMin > formData.salaryMax) {
      newErrors.salaryMin = "Minimum salary cannot be greater than maximum salary";
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
        setTimeout(() => router.push("/admin/dashboard"), 2000);
      }
    } catch (error: any) {
      setSubmitError(error.message || "Failed to update job");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-[#E85C23] border-[#E85C23]/30 animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin || !job) return null;

  return (
    <div className="h-full overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Job</h1>
        <p className="text-gray-500">Update existing job details</p>
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
            <h3 className="text-sm font-medium text-green-800">{submitSuccess}</h3>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md border border-gray-100 divide-y divide-gray-200">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
              placeholder="e.g. Project Engineer"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Building className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                placeholder="e.g. Jakarta, Indonesia"
              />
            </div>
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Salary (IDR)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <CreditCard className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="number"
                name="salaryMin"
                value={formData.salaryMin === undefined ? "" : formData.salaryMin}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                placeholder="e.g. 5000000"
              />
            </div>
            {errors.salaryMin && <p className="mt-1 text-sm text-red-600">{errors.salaryMin}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Salary (IDR)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <CreditCard className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="number"
                name="salaryMax"
                value={formData.salaryMax === undefined ? "" : formData.salaryMax}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                placeholder="e.g. 10000000"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Description*</label>
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={(value) => handleQuillChange(value, "description")}
            modules={modules}
            className="rounded h-64"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Requirements*</label>
          <ReactQuill
            theme="snow"
            value={formData.requirements}
            onChange={(value) => handleQuillChange(value, "requirements")}
            modules={modules}
            className="rounded h-48"
          />
          {errors.requirements && <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>}
        </div>

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
              isSubmitting ? "bg-[#E85C23]/70 cursor-not-allowed" : "bg-[#E85C23] hover:bg-[#d14b17]"
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
