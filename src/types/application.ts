export type ApplicationStatus =
  | "APPLIED"
  | "REVIEWED"
  | "INTERVIEW"
  | "REJECTED"
  | "ACCEPTED";

export interface JobApplication {
  id: string;
  userId: string;
  jobId: string;
  appliedAt: string;
  status: ApplicationStatus;
  job?: {
    id: string;
    title: string;
    location: string;
    salaryMin?: number;
    salaryMax?: number;
    postedAt: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export interface SubmitApplicationRequest {
  jobId: string;
}

export interface UpdateApplicationStatusRequest {
  status: ApplicationStatus;
}
