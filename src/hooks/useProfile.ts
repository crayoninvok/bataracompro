import { useState, useEffect } from 'react';
import { profileService } from '@/services/profile.services';
import { UserProfile, UpdateProfileRequest } from '@/types/profile';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await profileService.getProfile();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: UpdateProfileRequest) => {
    setLoading(true);
    try {
      const response = await profileService.updateProfile(data);
      await fetchProfile(); // Refresh profile data
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update profile'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    setLoading(true);
    try {
      const response = await profileService.uploadAvatar(file);
      await fetchProfile(); // Refresh profile data
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to upload avatar'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadCertificate = async (
    file: File,
    data: { title: string; issuer: string; issuedAt: string; type?: string }
  ) => {
    setLoading(true);
    try {
      const response = await profileService.uploadCertificate(file, data);
      await fetchProfile(); // Refresh profile data
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to upload certificate'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    uploadAvatar,
    uploadCertificate
  };
};

export default useProfile;