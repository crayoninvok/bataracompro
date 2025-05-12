import { fetchApi, getAuthHeader } from "./api-services";
import {
  JobApplication,
  SubmitApplicationRequest,
  UpdateApplicationStatusRequest,
} from "@/types/application";

export const applicationService = {
  async submitApplication(
    data: SubmitApplicationRequest
  ): Promise<{ message: string; application: JobApplication }> {
    return fetchApi<{ message: string; application: JobApplication }>(
      "/applications/submit",
      {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(data),
      }
    );
  },

  async getUserApplications(): Promise<{ applications: JobApplication[] }> {
    return fetchApi<{ applications: JobApplication[] }>("/applications/me", {
      headers: getAuthHeader(),
    });
  },

  async getApplicationById(
    id: string
  ): Promise<{ application: JobApplication }> {
    return fetchApi<{ application: JobApplication }>(
      `/applications/detail/${id}`,
      {
        headers: getAuthHeader(),
      }
    );
  },

  async getAllApplications(): Promise<{ applications: JobApplication[] }> {
    return fetchApi<{ applications: JobApplication[] }>("/applications", {
      headers: getAuthHeader(),
    });
  },

  async updateApplicationStatus(
    id: string,
    data: UpdateApplicationStatusRequest
  ): Promise<{ message: string; application: JobApplication }> {
    return fetchApi<{ message: string; application: JobApplication }>(
      `/applications/status/${id}`,
      {
        method: "PATCH",
        headers: getAuthHeader(),
        body: JSON.stringify(data),
      }
    );
  },
};
