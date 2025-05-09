// src/types/profile.types.ts

export interface Profile {
    id: string;
    userId: string;
    bio: string | null;
    phone: string | null;
    address: string | null;
  }
  
  export interface Education {
    id?: string;
    degree: string;
    institution: string;
    major: string | null;
    yearStart: number | null;
    yearEnd: number | null;
  }
  
  export interface Experience {
    id?: string;
    companyName: string;
    position: string;
    startDate: string | Date; // ISO string when coming from API, Date object in frontend
    endDate: string | Date | null; // ISO string when coming from API, Date object in frontend
    description: string | null;
    reasonForLeaving: string | null;
  }
  
  export interface User {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
    role: 'ADMIN' | 'USER';
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    isVerify: boolean;
  }
  
  export interface UserProfile {
    user: User & {
      profile: Profile | null;
      educations: Education[];
      experiences: Experience[];
    };
  }
  
  export interface UpdateProfilePayload {
    bio: string | null;
    phone: string | null;
    address: string | null;
    educations: Education[];
    experiences: Experience[];
  }
  
  export interface ApiResponse<T> {
    message: string;
    data?: T;
  }