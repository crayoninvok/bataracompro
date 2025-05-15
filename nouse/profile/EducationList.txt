// src/components/profile/EducationList.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { EducationForm } from "./EducationForm";
import { useProfile } from "@/hooks/useProfile";
import { Education } from "@/types/profile.types";

export const EducationList: React.FC = () => {
  const { profileData, isLoading, error, getProfile, updateProfile } =
    useProfile();
  const [showForm, setShowForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null
  );
  const [educations, setEducations] = useState<Education[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (profileData) {
      setEducations(profileData.user.educations);
    }
  }, [profileData]);

  const handleShowForm = () => {
    setEditingEducation(null);
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
    setEditingEducation(null);
  };

  const handleEdit = (education: Education) => {
    setEditingEducation(education);
    setShowForm(true);
  };

  const handleSubmit = async (education: Education) => {
    // Create a copy of current educations
    let updatedEducations = [...educations];

    if (editingEducation) {
      // Update existing education
      updatedEducations = updatedEducations.map((edu) =>
        edu.id === editingEducation.id ? { ...education, id: edu.id } : edu
      );
    } else {
      // Add new education
      updatedEducations.push(education);
    }

    try {
      await updateProfile({ educations: updatedEducations });
      setSuccessMessage(
        `Education ${editingEducation ? "updated" : "added"} successfully`
      );
      setEducations(updatedEducations);
      handleHideForm();
    } catch (err) {
      console.error("Failed to update education:", err);
    }
  };

  const handleDelete = async (educationId: string) => {
    if (!confirm("Are you sure you want to delete this education?")) {
      return;
    }

    const updatedEducations = educations.filter(
      (edu) => edu.id !== educationId
    );

    try {
      await updateProfile({ educations: updatedEducations });
      setSuccessMessage("Education deleted successfully");
      setEducations(updatedEducations);
    } catch (err) {
      console.error("Failed to delete education:", err);
    }
  };

  if (isLoading && !profileData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (showForm || editingEducation) {
    return (
      <EducationForm
        education={editingEducation || undefined}
        onSubmit={handleSubmit}
        onCancel={handleHideForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Education</h2>
        <Button variant="primary" onClick={handleShowForm}>
          Add Education
        </Button>
      </div>

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

      {educations.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <p className="text-gray-500">No education records yet.</p>
            <Button variant="outline" onClick={handleShowForm} className="mt-4">
              Add Your First Education
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {educations.map((education) => (
            <Card key={education.id} className="relative">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{education.degree}</h3>
                  <p className="text-gray-700">{education.institution}</p>
                  {education.major && (
                    <p className="text-gray-600">{education.major}</p>
                  )}
                  {(education.yearStart || education.yearEnd) && (
                    <p className="text-gray-500 text-sm mt-1">
                      {education.yearStart && education.yearStart.toString()}
                      {education.yearStart && education.yearEnd && " - "}
                      {education.yearEnd && education.yearEnd.toString()}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    className="text-gray-400 hover:text-blue-500"
                    onClick={() => education.id && handleEdit(education)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => education.id && handleDelete(education.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
