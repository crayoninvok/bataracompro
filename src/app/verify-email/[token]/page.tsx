// src/app/(auth)/verify-email/[token]/page.tsx
"use client";

import { EmailVerification } from "@/components/auth/EmailVerification";

// Define the params type for the page component
interface VerifyEmailPageProps {
  params: {
    token: string;
  };
}

export default function VerifyEmailPage({ params }: VerifyEmailPageProps) {
  return <EmailVerification token={params.token} />;
}
