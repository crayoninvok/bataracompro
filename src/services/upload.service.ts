// src/services/upload.service.ts

export async function uploadAvatar(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("avatar", file);
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/avatar-public`, {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) throw new Error("Gagal upload avatar");
    const data = await res.json();
    return data.secure_url;
  }
  
  export async function uploadCertificate(file: File, token: string): Promise<string> {
    const formData = new FormData();
    formData.append("certificate", file);
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/certificate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    if (!res.ok) throw new Error("Gagal upload sertifikat");
    const data = await res.json();
    return data.secure_url;
  }
  