// ✅ app/profile/edit-profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";
import { ProfileService } from "@/services/profile.service";
import Swal from "sweetalert2";

export default function EditProfilePage() {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { profile, loading, error } = useProfile(token);
  const [form, setForm] = useState({
    bio: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (profile?.profile) {
      setForm({
        bio: profile.profile.bio || "",
        phone: profile.profile.phone || "",
        address: profile.profile.address || "",
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      await ProfileService.updateProfile(token, form);

      await Swal.fire({
        icon: "success",
        title: "Profil berhasil diperbarui",
        confirmButtonColor: "#2563EB",
      });

      router.push("/profile");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal update",
        text: err.message,
        confirmButtonColor: "#EF4444",
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Simpan
          </button>
        </form>
      </div>
    </main>
  );
}
