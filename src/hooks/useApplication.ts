import { useState } from "react";
import { applicationService } from "@/services/application-services";
import { ApiResponse } from "@/types/api";
import {
  JobApplication,
  SubmitApplicationRequest,
  UpdateApplicationStatusRequest
} from "@/types/application";

export function useApplications() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitApplication = async (
    data: SubmitApplicationRequest
  ): Promise<ApiResponse<{ message: string; application: JobApplication }>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await applicationService.submitApplication(data);
      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Failed to submit application");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  const getUserApplications = async (): Promise<ApiResponse<{ applications: JobApplication[] }>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await applicationService.getUserApplications();
      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Failed to fetch your applications");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  const getApplicationById = async (
    id: string
  ): Promise<ApiResponse<{ application: JobApplication }>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await applicationService.getApplicationById(id);
      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Failed to fetch application details");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  const getAllApplications = async (): Promise<ApiResponse<{ applications: JobApplication[] }>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await applicationService.getAllApplications();
      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Failed to fetch applications");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  const updateApplicationStatus = async (
    id: string,
    data: UpdateApplicationStatusRequest
  ): Promise<ApiResponse<{ message: string; application: JobApplication }>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await applicationService.updateApplicationStatus(id, data);
      return { data: response, isLoading: false };
    } catch (err: any) {
      setError(err.message || "Failed to update application status");
      return { error: err, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    submitApplication,
    getUserApplications,
    getApplicationById,
    getAllApplications,
    updateApplicationStatus
  };
}