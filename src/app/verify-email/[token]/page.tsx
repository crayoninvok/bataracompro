"use client";

import { useEffect } from "react";

export default function VerifyEmailPage({ params }: { params: { token: string } }) {
  useEffect(() => {
    // ✅ Redirect langsung ke backend tanpa fetch
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verifyuser/${params.token}`;
  }, [params.token]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-center px-4">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">Memverifikasi akun Anda...</h1>
        <p className="text-gray-600">Mohon tunggu, Anda akan diarahkan ke halaman login.</p>
      </div>
    </main>
  );
}
