"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { driverService } from "@/services/driver.services";
import { useDriverUpdateSubmit } from "@/hooks/useDriver";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import { AlertTriangle, CheckCircle, ArrowLeft, FileUp, Tag } from "lucide-react";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function CreateDriverUpdatePage() {
  const { user, isLoading: authLoading } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const isAuthenticated = !!user;
  
  const router = useRouter();
  const { createDriverUpdate, loading: isSubmitting, error: submitError, success: submitSuccess } = useDriverUpdateSubmit(driverService);

  const [formData, setFormData] = useState({
    version: "",
    title: "",
    description: "",
    changeLog: "",
    isRequired: false
  });
  
  const [appFile, setAppFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Editor modules and formats configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link'
  ];

  // Check if user is authenticated and is an admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    } else if (!authLoading && !isAdmin) {
      router.push("/dashboard");
    }
  }, [authLoading, isAuthenticated, isAdmin, router]);

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      const validTypes = ['application/zip', 'application/x-zip-compressed', 'application/vnd.android.package-archive', 'application/octet-stream', 'application/x-msdownload'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          appFile: "Please upload a valid file (ZIP, APK, or EXE)"
        }));
        return;
      }
      
      // Validate file size (100MB max)
      if (file.size > 100 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          appFile: "File must be less than 100MB"
        }));
        return;
      }
      
      setAppFile(file);
      
      // Clear error if exists
      if (errors.appFile) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.appFile;
          return newErrors;
        });
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle rich text editor changes
  const handleRichTextChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.version.trim()) {
      newErrors.version = "Version number is required";
    } else if (!/^\d+\.\d+\.\d+$/.test(formData.version)) {
      newErrors.version = "Version must be in format x.y.z (e.g., 1.2.3)";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Update title is required";
    }

    if (!formData.description.trim() || formData.description === '<p><br></p>') {
      newErrors.description = "Description is required";
    }
    
    if (!appFile) {
      newErrors.appFile = "Application file is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const formSubmitData = new FormData();
    formSubmitData.append("version", formData.version);
    formSubmitData.append("title", formData.title);
    formSubmitData.append("description", formData.description);
    formSubmitData.append("changeLog", formData.changeLog);
    formSubmitData.append("isRequired", formData.isRequired.toString());
    
    if (appFile) {
      formSubmitData.append("driverApp", appFile);
    }

    try {
      const success = await createDriverUpdate(formSubmitData);
      
      if (success) {
        // Reset form
        setFormData({
          version: "",
          title: "",
          description: "",
          changeLog: "",
          isRequired: false
        });
        setAppFile(null);

        // Redirect after short delay
        setTimeout(() => {
          router.push("/admin/drivers");
        }, 2000);
      }
    } catch (error) {
      // Error handling is managed by the hook
    }
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-[#E85C23] border-[#E85C23]/30 animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  // Only render content if user is authenticated and admin
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Upload Driver Update</h1>
          <p className="text-gray-500">Publish a new version of the application</p>
        </div>
        <button
          onClick={() => router.push("/admin/driver")}
          className="flex items-center text-gray-600 hover:text-[#E85C23] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Drivers
        </button>
      </div>

      {submitError && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 flex items-start border border-red-100">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800">{submitError}</h3>
          </div>
        </div>
      )}

      {submitSuccess && (
        <div className="mb-6 rounded-lg bg-green-50 p-4 flex items-start border border-green-100">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-green-800">Driver update published successfully!</h3>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-100">
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          {/* Basic Information */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Update Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-1">
                  Version Number*
                </label>
                <input
                  type="text"
                  name="version"
                  id="version"
                  value={formData.version}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                  placeholder="e.g. 2.5.1"
                />
                {errors.version && (
                  <p className="mt-1 text-sm text-red-600">{errors.version}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Update Title*
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                  placeholder="e.g. May 2025 Safety Update"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isRequired"
                    id="isRequired"
                    checked={formData.isRequired}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#E85C23] focus:ring-[#E85C23]"
                  />
                  <label htmlFor="isRequired" className="ml-2 block text-sm text-gray-700">
                    Required Update (Users must install this version)
                  </label>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application File*
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {appFile ? (
                      <div className="mb-4">
                        <div className="flex flex-col items-center">
                          <FileUp className="h-12 w-12 text-[#E85C23]" />
                          <p className="text-sm font-medium text-gray-900 mt-2">{appFile.name}</p>
                          <p className="text-xs text-gray-500">
                            {(appFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setAppFile(null)}
                          className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E85C23]"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="driverApp"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#E85C23] hover:text-[#d14b17] focus-within:outline-none"
                          >
                            <div className="flex flex-col items-center">
                              <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                              <span>Upload application file</span>
                              <input
                                id="driverApp"
                                name="driverApp"
                                type="file"
                                accept=".zip,.apk,.ipa,.exe"
                                className="sr-only"
                                onChange={handleFileChange}
                              />
                            </div>
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">ZIP, APK, IPA, or EXE up to 100MB</p>
                      </>
                    )}
                  </div>
                </div>
                {errors.appFile && (
                  <p className="mt-1 text-sm text-red-600">{errors.appFile}</p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Update Description*</h2>
            <p className="text-sm text-gray-500 mb-3">
              Provide a detailed description of what this update includes
            </p>
            <div className="bg-white">
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(value) => handleRichTextChange('description', value)}
                modules={modules}
                formats={formats}
                placeholder="Describe the update and its features..."
                className="rounded h-52"
              />
            </div>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Changelog */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Change Log</h2>
            <p className="text-sm text-gray-500 mb-3">
              List the changes, improvements, and bug fixes in this update
            </p>
            <div className="bg-white">
              <ReactQuill
                theme="snow"
                value={formData.changeLog}
                onChange={(value) => handleRichTextChange('changeLog', value)}
                modules={modules}
                formats={formats}
                placeholder="- Added new features
- Fixed bugs
- Improved performance"
                className="rounded h-52"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push("/admin/drivers")}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E85C23] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2 rounded-lg text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E85C23] transition-colors ${
                isSubmitting
                  ? "bg-[#E85C23]/70 cursor-not-allowed"
                  : "bg-[#E85C23] hover:bg-[#d14b17]"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </span>
              ) : (
                "Publish Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}