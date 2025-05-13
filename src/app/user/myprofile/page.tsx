"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  FileText,
  LogOut,
  Settings,
  User,
  Upload,
  Plus,
  School,
  Calendar,
  Building,
  Trash2,
  Edit,
} from "lucide-react";
import useProfile from "@/hooks/useProfile";
import { Education, Experience, Certificate, UpdateProfileRequest } from "@/types/profile";

export default function MyProfile() {
  const router = useRouter();
  const { profile, loading, error, updateProfile, uploadAvatar, uploadCertificate } = useProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  // For avatar upload
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // For education entries
  const [educations, setEducations] = useState<Omit<Education, "id" | "userId">[]>([]);
  const [newEducation, setNewEducation] = useState<Omit<Education, "id" | "userId">>({
    degree: "",
    institution: "",
  });
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  
  // For experience entries
  const [experiences, setExperiences] = useState<Omit<Experience, "id" | "userId">[]>([]);
  const [newExperience, setNewExperience] = useState<Omit<Experience, "id" | "userId">>({
    companyName: "",
    position: "",
    startDate: "",
  });
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  
  // For certificate upload
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [newCertificate, setNewCertificate] = useState({
    title: "",
    issuer: "",
    issuedAt: "",
    type: "TRAINING",
  });
  const [isAddingCertificate, setIsAddingCertificate] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  // Initialize form with profile data when it loads
  useEffect(() => {
    if (profile && profile.user) {
      setBio(profile.user.profile?.bio || "");
      setPhone(profile.user.profile?.phone || "");
      setAddress(profile.user.profile?.address || "");
      
      // Initialize education and experience arrays from profile data
      if (profile.user.educations) {
        setEducations(profile.user.educations.map(({ id, userId, ...rest }) => rest));
      }
      
      if (profile.user.experiences) {
        setExperiences(profile.user.experiences.map(({ id, userId, ...rest }) => rest));
      }
    }
  }, [profile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) setAvatarPreview(event.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCertificateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertificateFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      // First upload avatar if there's a new one
      if (avatarFile) {
        await uploadAvatar(avatarFile);
      }
      
      // Update profile information
      const updateData: UpdateProfileRequest = {
        bio,
        phone,
        address,
        educations,
        experiences
      };
      
      await updateProfile(updateData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setEducations([...educations, newEducation]);
      setNewEducation({ degree: "", institution: "" });
      setIsAddingEducation(false);
    }
  };

  const handleAddExperience = () => {
    if (newExperience.companyName && newExperience.position && newExperience.startDate) {
      setExperiences([...experiences, newExperience]);
      setNewExperience({ companyName: "", position: "", startDate: "" });
      setIsAddingExperience(false);
    }
  };

  const handleUploadCertificate = async () => {
    if (certificateFile && newCertificate.title && newCertificate.issuer && newCertificate.issuedAt) {
      try {
        await uploadCertificate(certificateFile, newCertificate);
        setCertificateFile(null);
        setNewCertificate({
          title: "",
          issuer: "",
          issuedAt: "",
          type: "TRAINING",
        });
        setIsAddingCertificate(false);
      } catch (error) {
        console.error("Failed to upload certificate:", error);
      }
    }
  };

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading profile. Please try again later.</p>
      </div>
    );
  }

  const userName = profile?.user?.name || "User";
  const userEmail = profile?.user?.email || "";
  const userAvatar = profile?.user?.avatar || null;
  const userInitials = userName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-center pb-4 border-b border-gray-200">
            {userAvatar || avatarPreview ? (
              <div className="h-24 w-24 mx-auto relative rounded-full overflow-hidden">
                <Image 
                  src={avatarPreview || userAvatar || ""} 
                  alt={userName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-24 w-24 rounded-full bg-[#607D8B] mx-auto flex items-center justify-center text-white text-3xl font-semibold">
                {userInitials}
              </div>
            )}
            <h2 className="mt-2 text-xl font-bold text-gray-900">{userName}</h2>
            <p className="text-sm text-gray-500">{userEmail}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-[#00BCD4] bg-blue-50 hover:bg-blue-100"
            >
              Edit Profile
            </button>
          </div>

          <nav className="mt-4 space-y-2">
            <Link
              href="/user/dashboard"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:text-[#FF5722] hover:bg-[#FF5722]/10"
            >
              <Briefcase className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/user/myprofile"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-[#FF5722]/10 text-[#FF5722]"
            >
              <User className="mr-3 h-5 w-5" />
              My Profile
            </Link>
            <Link
              href="/user/mysettings"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:text-[#FF5722] hover:bg-[#FF5722]/10"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
            <button className="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-700 hover:bg-red-50">
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Avatar</label>
                  <div className="mt-1 flex items-center space-x-4">
                    {avatarPreview || userAvatar ? (
                      <div className="h-16 w-16 relative rounded-full overflow-hidden">
                        <Image 
                          src={avatarPreview || userAvatar || ""} 
                          alt={userName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-[#607D8B] flex items-center justify-center text-white text-xl font-semibold">
                        {userInitials}
                      </div>
                    )}
                    <label className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleAvatarChange} 
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="flex gap-2 justify-end mt-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm bg-[#00BCD4] text-white rounded hover:bg-[#00ACC1]"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Bio</p>
                  <p className="text-gray-900">{bio || "No bio provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <p className="text-gray-900">{phone || "No phone provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Address</p>
                  <p className="text-gray-900">{address || "No address provided"}</p>
                </div>
              </div>
            )}
          </div>

          {/* Education Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Education</h3>
              {isEditing && (
                <button
                  onClick={() => setIsAddingEducation(true)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-[#00BCD4] bg-blue-50 hover:bg-blue-100"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Education
                </button>
              )}
            </div>

            {isEditing && isAddingEducation ? (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Degree</label>
                    <input
                      type="text"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Institution</label>
                    <input
                      type="text"
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Major (Optional)</label>
                    <input
                      type="text"
                      value={newEducation.major || ""}
                      onChange={(e) => setNewEducation({...newEducation, major: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Year</label>
                      <input
                        type="number"
                        value={newEducation.yearStart || ""}
                        onChange={(e) => setNewEducation({...newEducation, yearStart: parseInt(e.target.value) || undefined})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Year</label>
                      <input
                        type="number"
                        value={newEducation.yearEnd || ""}
                        onChange={(e) => setNewEducation({...newEducation, yearEnd: parseInt(e.target.value) || undefined})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsAddingEducation(false)}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEducation}
                    className="px-3 py-1 text-sm bg-[#00BCD4] text-white rounded hover:bg-[#00ACC1]"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : null}

            {educations.length > 0 ? (
              <div className="space-y-4">
                {educations.map((edu, index) => (
                  <div key={index} className="flex justify-between p-3 border border-gray-200 rounded-md">
                    <div>
                      <div className="flex items-center">
                        <School className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="font-medium">{edu.degree}</span>
                        {edu.major && <span className="ml-1 text-gray-500">in {edu.major}</span>}
                      </div>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                      {(edu.yearStart || edu.yearEnd) && (
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {edu.yearStart ? edu.yearStart : ""} 
                          {edu.yearStart && edu.yearEnd ? " - " : ""}
                          {edu.yearEnd ? edu.yearEnd : "Present"}
                        </p>
                      )}
                    </div>
                    {isEditing && (
                      <button 
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">No education entries yet.</p>
            )}
          </div>

          {/* Experience Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
              {isEditing && (
                <button
                  onClick={() => setIsAddingExperience(true)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-[#00BCD4] bg-blue-50 hover:bg-blue-100"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Experience
                </button>
              )}
            </div>

            {isEditing && isAddingExperience ? (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                      type="text"
                      value={newExperience.companyName}
                      onChange={(e) => setNewExperience({...newExperience, companyName: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Position</label>
                    <input
                      type="text"
                      value={newExperience.position}
                      onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={newExperience.startDate}
                      onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date (or leave blank for current)</label>
                    <input
                      type="date"
                      value={newExperience.endDate || ""}
                      onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value || undefined})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newExperience.description || ""}
                    onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    rows={2}
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setIsAddingExperience(false)}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddExperience}
                    className="px-3 py-1 text-sm bg-[#00BCD4] text-white rounded hover:bg-[#00ACC1]"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : null}

            {experiences.length > 0 ? (
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div key={index} className="flex justify-between p-3 border border-gray-200 rounded-md">
                    <div>
                      <div className="flex items-center">
                        <Building className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="font-medium">{exp.position}</span>
                      </div>
                      <p className="text-sm text-gray-600">{exp.companyName}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(exp.startDate).toLocaleDateString()} 
                        {" - "}
                        {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}
                      </p>
                      {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                    </div>
                    {isEditing && (
                      <button 
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">No work experience entries yet.</p>
            )}
          </div>

          {/* Certificates Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Certificates</h3>
              <button
                onClick={() => setIsAddingCertificate(true)}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-[#00BCD4] bg-blue-50 hover:bg-blue-100"
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Certificate
              </button>
            </div>

            {isAddingCertificate && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={newCertificate.title}
                      onChange={(e) => setNewCertificate({...newCertificate, title: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Issuer</label>
                    <input
                      type="text"
                      value={newCertificate.issuer}
                      onChange={(e) => setNewCertificate({...newCertificate, issuer: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                    <input
                      type="date"
                      value={newCertificate.issuedAt}
                      onChange={(e) => setNewCertificate({...newCertificate, issuedAt: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      value={newCertificate.type}
                      onChange={(e) => setNewCertificate({...newCertificate, type: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="TRAINING">Training</option>
                      <option value="LICENSE">License</option>
                      <option value="DIPLOMA">Diploma</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Certificate File</label>
                  <div className="mt-1 flex items-center">
                    <label className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Certificate
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png" 
                        onChange={handleCertificateFileChange} 
                      />
                    </label>
                    {certificateFile && (
                      <span className="ml-2 text-sm text-gray-600">{certificateFile.name}</span>
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setIsAddingCertificate(false)}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUploadCertificate}
                    className="px-3 py-1 text-sm bg-[#00BCD4] text-white rounded hover:bg-[#00ACC1]"
                    disabled={!certificateFile}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}

            {profile?.user?.certificates && profile.user.certificates.length > 0 ? (
              <div className="space-y-4">
                {profile.user.certificates.map((cert) => (
                  <div key={cert.id} className="flex justify-between p-3 border border-gray-200 rounded-md">
                    <div>
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="font-medium">{cert.title}</span>
                        {cert.type && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {cert.type}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(cert.issuedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <a 
                      href={cert.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 self-center"
                    >
                      <FileText className="h-5 w-5" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">No certificates uploaded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}