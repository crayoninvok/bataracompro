export interface Profile {
    bio?: string;
    phone?: string;
    address?: string;
  }
  
  export interface Education {
    degree: string;
    institution: string;
    major?: string;
    yearStart?: number;
    yearEnd?: number;
  }
  
  export interface Experience {
    companyName: string;
    position: string;
    startDate: string;
    endDate?: string;
    description?: string;
    reasonForLeaving?: string;
  }
  
  export interface Certificate {
    title: string;
    issuer: string;
    issuedAt: string;
    fileUrl: string;
    type?: string;
  }
  
  export interface UserDetail {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: string;
    profile?: Profile;
    educations: Education[];
    experiences: Experience[];
    certificates: Certificate[];
  }
  