import { fetchApi, getAuthHeader } from "./api-services";
import {
  Job,
  JobsResponse,
  JobFilters,
  CreateJobRequest,
  UpdateJobRequest,
} from "@/types/job";

export const jobService = {
  async getJobs(filters?: JobFilters): Promise<JobsResponse> {
    const queryParams = new URLSearchParams();

    if (filters) {
      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.limit) queryParams.append("limit", filters.limit.toString());
      if (filters.search) queryParams.append("search", filters.search);
      if (filters.location) queryParams.append("location", filters.location);
      if (filters.minSalary)
        queryParams.append("minSalary", filters.minSalary.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = `/jobs${queryString ? `?${queryString}` : ""}`;

    return fetchApi<JobsResponse>(endpoint);
  },

  async getJobById(id: string): Promise<{ job: Job }> {
    return fetchApi<{ job: Job }>(`/jobs/${id}`);
  },

  async getJobBySlug(slug: string): Promise<{ job: Job }> {
    return fetchApi<{ job: Job }>(`/jobs/${slug}`);
  },

  async createJob(
    data: CreateJobRequest
  ): Promise<{ message: string; job: Job }> {
    return fetchApi<{ message: string; job: Job }>("/jobs", {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });
  },

  async updateJob(
    id: string,
    data: UpdateJobRequest
  ): Promise<{ message: string; job: Job }> {
    return fetchApi<{ message: string; job: Job }>(`/jobs/${id}`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });
  },

  async deleteJob(id: string): Promise<{ message: string }> {
    return fetchApi<{ message: string }>(`/jobs/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
  },
};
