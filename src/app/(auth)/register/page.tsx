"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      let avatarUrl = "";
      if (avatarFile) {
        const uploadData = new FormData();
        uploadData.append("file", avatarFile);
        uploadData.append("upload_preset", "unsigned_avatar");
        uploadData.append("folder", "avatar_reqruiters");

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: uploadData,
          }
        );

        const data = await res.json();
        if (!res.ok || !data.secure_url) throw new Error("Gagal upload avatar");
        avatarUrl = data.secure_url;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, avatar: avatarUrl }),
      });

      if (!response.ok) throw new Error("Gagal mendaftar");

      await Swal.fire({
        icon: "success",
        title: "Register Berhasil!",
        text: "Silakan cek email dan verifikasi akun Anda.",
        confirmButtonColor: "#2563EB",
      });

      router.push("/login");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal mendaftar",
        text: err.message || "Terjadi kesalahan.",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200">
        <h2 className="text-center text-2xl font-bold text-blue-700">Buat Akun Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nama Lengkap" name="name" type="text" onChange={handleChange} />
          <Input label="Email" name="email" type="email" onChange={handleChange} />
          <Input label="Password" name="password" type="password" onChange={handleChange} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-600 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Mendaftarkan..." : "Daftar"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Masuk di sini
          </a>
        </p>
      </div>
    </main>
  );
}

function Input({
  label,
  name,
  type,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        onChange={onChange}
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}
