// ✅ services/profile.service.ts
import { IProfile, IUserWithProfile } from "@/types/profile.types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export const ProfileService = {
  async getProfile(token: string): Promise<IUserWithProfile> {
    const res = await fetch(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch profile");
    const data = await res.json();
    return data.user;
  },

  async updateProfile(token: string, data: Partial<IProfile>): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/profile/full`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update profile");
    }

    return res.json();
  },
};