import { useState } from "react";
import { uploadAvatar, uploadCertificate } from "@/services/upload.service";

export function useUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadAvatar = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      setError(null);
      const url = await uploadAvatar(file);
      return url;
    } catch (err) {
      setError("Gagal mengunggah avatar.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleUploadCertificate = async (file: File, token: string): Promise<string | null> => {
    try {
      setUploading(true);
      setError(null);
      const url = await uploadCertificate(file, token);
      return url;
    } catch (err) {
      setError("Gagal mengunggah sertifikat.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    error,
    uploadAvatar: handleUploadAvatar,
    uploadCertificate: handleUploadCertificate,
  };
}
