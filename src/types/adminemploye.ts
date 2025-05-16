export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'ADMIN' | 'USER' | 'EMPLOYEE';
  isVerify: boolean;
}

export interface Profile {
  id: string;
  userId: string;
  bio?: string;
  phone?: string;
  address?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  title: string;
  issuer: string;
  issuedAt: string;
  fileUrl: string;
  type?: 'TRAINING' | 'LICENSE' | 'DIPLOMA';
}

export interface Education {
  id: string;
  userId: string;
  degree: string;
  institution: string;
  major?: string;
  yearStart?: number;
  yearEnd?: number;
}

export interface Experience {
  id: string;
  userId: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
  reasonForLeaving?: string;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  postedAt: string;
  applications?: JobApplication[];
  createdBy?: User;
}

export interface JobApplication {
  id: string;
  userId: string;
  jobId: string;
  appliedAt: string;
  status: 'APPLIED' | 'REVIEWED' | 'INTERVIEW' | 'REJECTED' | 'ACCEPTED';
  user?: User;
  job?: Job;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  imageUrl?: string;
  type: 'NEWS' | 'ARTICLE';
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
  };
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  type: 'REPORT' | 'FORM' | 'CERTIFICATE' | 'OTHER';
  uploadedAt: string;
  ownerId: string;
}

export interface DriverUpdate {
  id: string;
  version: string;
  title: string;
  description: string;
  changeLog?: string;
  fileUrl?: string;
  isRequired: boolean;
  releaseDate: string;
  author?: {
    id: string;
    name: string;
  };
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  message?: string;
  data?: T;
  success?: boolean;
}