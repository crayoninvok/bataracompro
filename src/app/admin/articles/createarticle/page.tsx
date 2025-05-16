"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { articleService } from "@/services/article.services";
import { useArticleSubmit } from "@/hooks/useArticle";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import { AlertTriangle, CheckCircle, ArrowLeft, Image, Tag } from "lucide-react";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function CreateArticlePage() {
  const { user, isLoading: authLoading } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const isAuthenticated = !!user;
  
  const router = useRouter();
  const { createArticle, loading: isSubmitting, error: submitError, success: submitSuccess } = useArticleSubmit(articleService);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    type: "ARTICLE",
    isPublished: false
  });
  
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
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

  // Handle thumbnail change
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          thumbnail: "Please upload a valid image (JPEG, PNG, or WebP)"
        }));
        return;
      }
      
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          thumbnail: "Image must be less than 2MB"
        }));
        return;
      }
      
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
      
      // Clear error if exists
      if (errors.thumbnail) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.thumbnail;
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
  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
    
    // Clear error for this field
    if (errors.content) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.content;
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Article title is required";
    }

    if (!formData.content.trim() || formData.content === '<p><br></p>') {
      newErrors.content = "Article content is required";
    }
    
    if (!formData.summary.trim()) {
      newErrors.summary = "Article summary is required";
    }
    
    if (!thumbnail) {
      newErrors.thumbnail = "Featured image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const formSubmitData = new FormData();
    formSubmitData.append("title", formData.title);
    formSubmitData.append("content", formData.content);
    formSubmitData.append("summary", formData.summary);
    formSubmitData.append("type", formData.type);
    formSubmitData.append("isPublished", formData.isPublished.toString());
    
    if (thumbnail) {
      formSubmitData.append("articleThumbnail", thumbnail);
    }

    try {
      const success = await createArticle(formSubmitData);
      
      if (success) {
        // Reset form
        setFormData({
          title: "",
          content: "",
          summary: "",
          type: "ARTICLE",
          isPublished: false
        });
        setThumbnail(null);
        setThumbnailPreview(null);

        // Redirect after short delay
        setTimeout(() => {
          router.push("/admin/articles");
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
          <h1 className="text-2xl font-bold text-gray-800">Create New Article</h1>
          <p className="text-gray-500">Publish a new article or announcement</p>
        </div>
        <button
          onClick={() => router.push("/admin/articles")}
          className="flex items-center text-gray-600 hover:text-[#E85C23] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Articles
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
            <h3 className="text-sm font-medium text-green-800">Article published successfully!</h3>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-100">
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          {/* Basic Information */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Article Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Article Title*
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                  placeholder="Enter article title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                  Summary*
                </label>
                <textarea
                  name="summary"
                  id="summary"
                  rows={3}
                  value={formData.summary}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                  placeholder="Write a brief summary of the article"
                ></textarea>
                {errors.summary && (
                  <p className="mt-1 text-sm text-red-600">{errors.summary}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Type*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Tag className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23] transition-colors"
                    >
                      <option value="ARTICLE">Article</option>
                      <option value="NEWS">News</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center h-full pt-6">
                  <input
                    type="checkbox"
                    name="isPublished"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#E85C23] focus:ring-[#E85C23]"
                  />
                  <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                    Publish immediately
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image*
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {thumbnailPreview ? (
                      <div className="mb-4">
                        <img 
                          src={thumbnailPreview} 
                          alt="Thumbnail preview" 
                          className="mx-auto h-48 object-cover rounded-lg"
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            setThumbnail(null);
                            setThumbnailPreview(null);
                          }}
                          className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E85C23]"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="thumbnail"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#E85C23] hover:text-[#d14b17] focus-within:outline-none"
                          >
                            <div className="flex flex-col items-center">
                              <Image className="mx-auto h-12 w-12 text-gray-400" />
                              <span>Upload an image</span>
                              <input
                                id="thumbnail"
                                name="thumbnail"
                                type="file"
                                accept="image/png, image/jpeg, image/webp"
                                className="sr-only"
                                onChange={handleThumbnailChange}
                              />
                            </div>
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 2MB</p>
                      </>
                    )}
                  </div>
                </div>
                {errors.thumbnail && (
                  <p className="mt-1 text-sm text-red-600">{errors.thumbnail}</p>
                )}
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Article Content*</h2>
            <p className="text-sm text-gray-500 mb-3">
              Write the full content of your article
            </p>
            <div className="bg-white">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={modules}
                formats={formats}
                placeholder="Write your article content here..."
                className="rounded h-96"
              />
            </div>
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push("/admin/articles")}
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
                "Publish Article"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}