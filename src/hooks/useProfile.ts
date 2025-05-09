import { useState, useEffect } from "react";
import { IUserWithProfile } from "@/types/profile.types";
import { ProfileService } from "@/services/profile.service";

export function useProfile(token: string | null) {
  const [profile, setProfile] = useState<IUserWithProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const data = await ProfileService.getProfile(token);
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  return {
    profile,
    loading,
    error,
    isProfileComplete:
      !!profile?.profile &&
      profile.educations.length > 0 &&
      profile.experiences.length > 0,
  };
}
