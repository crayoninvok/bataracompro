import { useState } from "react";
import { jobService } from "@/services/job-services";
import { ApiResponse } from "@/types/api";
import {
  Job,
  JobsResponse,
  JobFilters,
  CreateJobRequest,
  UpdateJobRequest,
} from "@/types/job";

export function useJobs() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getJobs = async (
    filters?: JobFilters
  ): Promise<ApiResponse<JobsResponse>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await jobService.getJobs(filters);
      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Failed to fetch jobs");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  const getJobById = async (id: string): Promise<ApiResponse<{ job: Job }>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await jobService.getJobById(id);
      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Failed to fetch job details");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  const getJobBySlug = async (
    slug: string
  ): Promise<ApiResponse<{ job: Job }>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await jobService.getJobBySlug(slug);
      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Failed to fetch job details");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  const createJob = async (
    data: CreateJobRequest
  ): Promise<ApiResponse<{ message: string; job: Job }>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await jobService.createJob(data);
      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Failed to create job");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  const updateJob = async (
    id: string,
    data: UpdateJobRequest
  ): Promise<ApiResponse<{ message: string; job: Job }>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await jobService.updateJob(id, data);
      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Failed to update job");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteJob = async (
    id: string
  ): Promise<ApiResponse<{ message: string }>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await jobService.deleteJob(id);
      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Failed to delete job");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getJobs,
    getJobById,
    getJobBySlug,
    createJob,
    updateJob,
    deleteJob,
  };
}
