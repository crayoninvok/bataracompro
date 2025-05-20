export type JobType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE" | "INTERNSHIP";

export interface Job {
  id: string;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  location: string;
  jobType: JobType;
  expiredAt: string;
  salaryMin?: number;
  salaryMax?: number;
  postedAt: string;
  isDeleted: boolean;
  createdById?: string;
  updatedById?: string;
}

export interface JobsResponse {
  jobs: Job[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface JobFilters {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  minSalary?: number;
}

export interface CreateJobRequest {
  title: string;
  description: string;
  requirements: string;
  location: string;
  expiredAt: string;
  jobType: JobType;
  salaryMin?: number;
  salaryMax?: number;
}

export interface UpdateJobRequest {
  title?: string;
  description?: string;
  requirements?: string;
  jobType?: JobType;
  expiredAt?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
}
