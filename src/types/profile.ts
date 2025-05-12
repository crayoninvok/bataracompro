export type CertificateType = "TRAINING" | "LICENSE" | "DIPLOMA";

export interface Profile {
  id: string;
  userId: string;
  bio?: string;
  phone?: string;
  address?: string;
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

export interface Certificate {
  id: string;
  userId: string;
  title: string;
  issuer: string;
  issuedAt: string;
  fileUrl: string;
  type?: CertificateType;
}

export interface UserProfile {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: "ADMIN" | "USER";
    isVerify: boolean;
    profile?: Profile;
    educations: Education[];
    experiences: Experience[];
    certificates: Certificate[];
  };
}

export interface UpdateProfileRequest {
  bio?: string;
  phone?: string;
  address?: string;
  educations?: Omit<Education, "id" | "userId">[];
  experiences?: Omit<Experience, "id" | "userId">[];
}
