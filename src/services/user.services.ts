import { UserDetail } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export async function fetchUserDetail(userId: string): Promise<UserDetail> {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/app-detail/admin/applicants/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // token dari localStorage atau cookies
        },
      });

  if (!res.ok) throw new Error("Failed to fetch user detail");

  const data = await res.json();
  return data.user;
}
