"use client";

import { EmployeeEmailVerification } from "@/components/auth/EmployeEmailVerification";

// Define the params type for the page component
interface VerifyEmployeeEmailPageProps {
  params: {
    token: string;
  };
}

export default function VerifyEmployeeEmailPage({ params }: VerifyEmployeeEmailPageProps) {
  return <EmployeeEmailVerification token={params.token} />;
}