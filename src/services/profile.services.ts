import { fetchApi, getAuthHeader } from "./api-services";
import { UserProfile, UpdateProfileRequest } from "@/types/profile";

export const profileService = {
  async getProfile(): Promise<UserProfile> {
    return fetchApi<UserProfile>("/profile", {
      headers: getAuthHeader(),
    });
  },

  async updateProfile(
    data: UpdateProfileRequest
  ): Promise<{ message: string }> {
    return fetchApi<{ message: string }>("/profile/update", {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });
  },

  async uploadAvatar(
    file: File
  ): Promise<{ message: string; secure_url: string }> {
    const formData = new FormData();
    formData.append("avatar", file);

    return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/avatar`, {
      method: "POST",
      headers: {
        ...getAuthHeader(),
        // Don't set Content-Type here, it will be set automatically with boundary
      },
      body: formData,
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to upload avatar");
      return res.json();
    });
  },

  async uploadCertificate(
    file: File,
    data: { title: string; issuer: string; issuedAt: string; type?: string }
  ): Promise<{ message: string; certificate: any }> {
    const formData = new FormData();
    formData.append("certificate", file);
    formData.append("title", data.title);
    formData.append("issuer", data.issuer);
    formData.append("issuedAt", data.issuedAt);
    if (data.type) formData.append("type", data.type);

    return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/certificate`, {
      method: "POST",
      headers: getAuthHeader(),
      body: formData,
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to upload certificate");
      return res.json();
    });
  },
};
