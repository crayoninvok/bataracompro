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
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Optional validation
    if (!formData.name || !formData.email || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Isi semua field!",
        text: "Nama, email, dan password wajib diisi.",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    if (formData.password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Password terlalu pendek",
        text: "Minimal 6 karakter.",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    try {
      setLoading(true);

      const avatar = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, avatar }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Pendaftaran gagal");
      }

      await Swal.fire({
        icon: "success",
        title: "Register Berhasil!",
        text: "Silakan cek email untuk verifikasi.",
        confirmButtonColor: "#2563EB",
      });

      router.push("/login");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal Daftar",
        text: err.message || "Terjadi kesalahan",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200">
        <h2 className="text-center text-2xl font-bold text-blue-700">Create New Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" name="name" type="text" value={formData.name} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Login here
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
  value,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
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
        value={value}
        required
        onChange={onChange}
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}
