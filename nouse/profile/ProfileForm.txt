// src/components/profile/ProfileForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { useProfile } from "@/hooks/useProfile";
import { ProfileUpdateRequest } from "@/types/profile.types";

export const ProfileForm: React.FC = () => {
  const { profileData, isLoading, error, getProfile, updateProfile } =
    useProfile();
  const [formData, setFormData] = useState<ProfileUpdateRequest>({
    bio: "",
    phone: "",
    address: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (profileData) {
      setFormData({
        bio: profileData.user.profile?.bio || "",
        phone: profileData.user.profile?.phone || "",
        address: profileData.user.profile?.address || "",
      });
    }
  }, [profileData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear success message when form changes
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateProfile(formData);
      setSuccessMessage("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading && !profileData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Card title="Personal Information" className="max-w-2xl mx-auto">
      {error && (
        <Alert variant="error" message={error.message} className="mb-6" />
      )}

      {successMessage && (
        <Alert
          variant="success"
          message={successMessage}
          className="mb-6"
          onClose={() => setSuccessMessage("")}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              placeholder="Tell us about yourself"
              value={formData.bio || ""}
              onChange={handleChange}
            />
          </div>

          <Input
            type="tel"
            name="phone"
            label="Phone Number"
            placeholder="+62 812 3456 7890"
            value={formData.phone || ""}
            onChange={handleChange}
            fullWidth
          />

          <Input
            type="text"
            name="address"
            label="Address"
            placeholder="Your full address"
            value={formData.address || ""}
            onChange={handleChange}
            fullWidth
          />

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};
