// ✅ types/profile.ts
export interface IProfile {
  id: string;
  bio?: string;
  phone?: string;
  address?: string;
}

export interface IEducation {
  id?: string;
  degree: string;
  institution: string;
  major?: string;
  yearStart?: number;
  yearEnd?: number;
}

export interface IExperience {
  id?: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
  reasonForLeaving?: string;
}

export interface IUserWithProfile {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: "USER" | "ADMIN";
  profile?: IProfile;
  educations: IEducation[];
  experiences: IExperience[];
}