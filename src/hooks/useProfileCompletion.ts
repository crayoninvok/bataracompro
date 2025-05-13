import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth"; // Your existing auth hook

interface UserProfile {
  phone?: string;
  address?: string;
}

interface Education {
  id: string;
  institution: string;
  // other education fields
}

interface Experience {
  id: string;
  companyName: string;
  // other experience fields
}

// User type with extended details
interface UserWithDetails {
  id: string;
  profile?: UserProfile;
  educations?: Education[];
  experiences?: Experience[] | null; // 👈 allow null
}

type ProfileCompletionStatus = {
  hasProfile: boolean;
  hasEducation: boolean;
  hasExperience: boolean; // optional but still tracked
  isComplete: boolean;
};

export function useProfileCompletion() {
  const { user, isAuthenticated } = useAuth();
  const [status, setStatus] = useState<ProfileCompletionStatus>({
    hasProfile: false,
    hasEducation: false,
    hasExperience: false,
    isComplete: false,
  });
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (!isAuthenticated || !user) {
        setStatus({
          hasProfile: false,
          hasEducation: false,
          hasExperience: false,
          isComplete: false,
        });
        setIsChecking(false);
        return;
      }

      try {
        const userWithDetails = user as unknown as UserWithDetails;

        const profile = userWithDetails.profile;
        const educations = userWithDetails.educations || [];
        const experiences = userWithDetails.experiences || [];

        const hasProfile = Boolean(profile?.phone && profile?.address);
        const hasEducation = educations.length > 0;
        const hasExperience = experiences.length > 0;

        // 👇 Only require profile + education; experience is optional
        const isComplete = hasProfile && hasEducation;

        setStatus({
          hasProfile,
          hasEducation,
          hasExperience,
          isComplete,
        });
      } catch (error) {
        console.error("Error checking profile completion:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkProfileCompletion();
  }, [isAuthenticated, user]);

  return {
    ...status,
    isChecking,
  };
}
