"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  X,
  ImageIcon,
  Tag,
  Loader,
  AlertCircle,
  CheckCircle,
  Star,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import validator from "validator";
import { ArticleService } from "@/services/new-articles.service";
import { CreateArticleData } from "@/types/article.types";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-900/50 rounded-lg animate-pulse" />
});

// Import ReactQuill styles
import "react-quill/dist/quill.snow.css";

export default function CreateNewArticlePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState<CreateArticleData>({
    title: "",
    content: "",
    category: "",
    excerpt: "",
    tags: [],
    featured: false,
    published: false,
    image: undefined,
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [categories] = useState<string[]>([
    "Company News",
    "Technology",
    "Industry Updates",
    "Team Spotlight",
    "Events",
    "Product Updates",
    "Culture",
    "Innovation",
    "Announcements"
  ]);

  // ReactQuill modules configuration
  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean']
    ],
  }), []);

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'script', 'indent', 'direction',
    'color', 'background', 'align', 'link', 'image', 'video',
    'blockquote', 'code-block'
  ];

  // Auto-save draft functionality (removed localStorage usage)
  useEffect(() => {
    const autoSave = () => {
      if (formData.title || formData.content) {
        // Auto-save logic would go here - could save to server or other storage
        console.log("Auto-saving draft...");
      }
    };

    const interval = setInterval(autoSave, 30000);
    return () => clearInterval(interval);
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = [
        "image/jpeg",
        "image/jpg", 
        "image/png",
        "image/webp",
      ];

      if (file.size > maxSize) {
        setErrors(["Image size must not exceed 5MB"]);
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        setErrors(["Image must be in JPEG, PNG, or WebP format"]);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: undefined,
    }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      const newTag = tagInput.trim();
      if (formData.tags && formData.tags.length >= 10) {
        setErrors(["Maximum 10 tags allowed"]);
        return;
      }
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag],
      }));
      setTagInput("");
      setErrors([]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = (): boolean => {
    const validationErrors: string[] = [];

    // Title validation
    if (!formData.title || !formData.title.trim()) {
      validationErrors.push("Title is required");
    } else if (formData.title.length > 200) {
      validationErrors.push("Title must not exceed 200 characters");
    }

    // Content validation
    if (!formData.content || !formData.content.trim() || formData.content === '<p><br></p>') {
      validationErrors.push("Content is required");
    } else if (formData.content.length > 50000) {
      validationErrors.push("Content must not exceed 50,000 characters");
    }

    // Category validation
    if (!formData.category || !formData.category.trim()) {
      validationErrors.push("Category is required");
    } else if (!categories.includes(formData.category)) {
      validationErrors.push("Please select a valid category");
    }

    // Excerpt validation
    if (formData.excerpt && formData.excerpt.length > 500) {
      validationErrors.push("Excerpt must not exceed 500 characters");
    }

    // Tags validation
    if (formData.tags && formData.tags.length > 10) {
      validationErrors.push("Maximum 10 tags allowed");
    }

    // Email validation if needed (example)
    // if (formData.authorEmail && !validator.isEmail(formData.authorEmail)) {
    //   validationErrors.push("Please enter a valid email address");
    // }

    // URL validation for any links in content (basic check)
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = formData.content.match(urlRegex);
    if (urls) {
      for (const url of urls) {
        if (!validator.isURL(url)) {
          validationErrors.push(`Invalid URL found: ${url}`);
        }
      }
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleSubmit = async (publish: boolean = false) => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const submitData: CreateArticleData = {
        ...formData,
        published: publish,
      };

      const response = await ArticleService.createArticle(submitData);

      setSuccess(true);

      // Redirect after success
      setTimeout(() => {
        router.push("/dashboard-emp/newsupdate");
      }, 2000);
    } catch (error: any) {
      console.error("Error creating article:", error);
      setErrors([error.message || "Failed to create article"]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => handleSubmit(false);
  const handlePublish = () => handleSubmit(true);

  // Helper function to strip HTML tags for word count
  const getPlainText = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">
            Article Created Successfully!
          </h1>
          <p className="text-gray-400 mb-4">
            Redirecting to article management...
          </p>
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E85C23]/8 via-[#E85C23]/4 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1FBFB8]/8 via-[#1FBFB8]/4 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => router.push("/article-management")}
                className="flex items-center gap-2 text-gray-300 hover:text-[#1FBFB8] transition-colors duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Articles
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveDraft}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
                <button
                  onClick={handlePublish}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#1FBFB8] to-[#1BABA5] hover:from-[#1BABA5] hover:to-[#159B96] text-black font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Globe className="w-4 h-4" />
                  )}
                  Publish
                </button>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Create New Article
              </h1>
              <p className="text-gray-400">
                Write and publish your article for the company newsletter
              </p>
            </div>
          </motion.div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <motion.div variants={itemVariants} className="mb-6">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-1">
                      Please fix the following errors:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-red-300 text-sm">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-6"
            >
              {/* Title */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter an engaging title..."
                  maxLength={200}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FBFB8]/50 focus:border-transparent text-white text-lg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.title?.length || 0}/200 characters
                </p>
              </div>

              {/* Excerpt */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Article Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief description of your article (optional)..."
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FBFB8]/50 focus:border-transparent text-white resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.excerpt?.length || 0}/500 characters
                </p>
              </div>

              {/* Content Editor with ReactQuill */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Article Content *
                </label>

                <div className="bg-white rounded-lg overflow-hidden">
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={handleContentChange}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Write your article content here..."
                    style={{
                      height: '400px',
                    }}
                  />
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  {formData.content?.length || 0}/50,000 characters
                </p>
              </div>

              {/* Featured Image */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Featured Image
                </label>

                {imagePreview ? (
                  <div className="relative">
                    <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      onClick={removeImage}
                      className="flex items-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-600/50 rounded-lg p-8 text-center cursor-pointer hover:border-[#1FBFB8]/50 hover:bg-[#1FBFB8]/5 transition-all duration-300"
                  >
                    <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400 mb-1">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WebP up to 5MB
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Article Settings */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Article Settings
                </h3>

                {/* Category */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FBFB8]/50 focus:border-transparent text-white"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-[#1FBFB8] focus:ring-[#1FBFB8]/50"
                    />
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#E85C23]" />
                      <span className="text-gray-300">Featured Article</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>

                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add tags..."
                    className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FBFB8]/50 focus:border-transparent text-white text-sm"
                  />
                  <button
                    onClick={handleAddTag}
                    disabled={!tagInput.trim() || (formData.tags?.length || 0) >= 10}
                    className="px-4 py-2 bg-[#1FBFB8] hover:bg-[#1BABA5] text-black rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 bg-[#1FBFB8]/20 text-[#1FBFB8] px-3 py-1 rounded-full text-sm border border-[#1FBFB8]/30"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  {formData.tags?.length || 0}/10 tags
                </p>
              </div>

              {/* Quick Stats */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Quick Stats
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Word Count</span>
                    <span className="text-white font-medium">
                      {formData.content
                        ? getPlainText(formData.content)
                            .split(/\s+/)
                            .filter((word) => word.length > 0).length
                        : 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Character Count</span>
                    <span className="text-white font-medium">
                      {formData.content ? getPlainText(formData.content).length : 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Est. Read Time</span>
                    <span className="text-white font-medium">
                      {Math.ceil(
                        (formData.content
                          ? getPlainText(formData.content)
                              .split(/\s+/)
                              .filter((word) => word.length > 0).length
                          : 0) / 200
                      )}{" "}
                      min
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Custom styles for ReactQuill dark theme */}
      <style jsx global>{`
        .ql-toolbar {
          border-top: 1px solid #374151 !important;
          border-left: 1px solid #374151 !important;
          border-right: 1px solid #374151 !important;
          background: #1f2937 !important;
        }
        .ql-container {
          border-bottom: 1px solid #374151 !important;
          border-left: 1px solid #374151 !important;
          border-right: 1px solid #374151 !important;
          background: #111827 !important;
          color: white !important;
        }
        .ql-editor {
          color: white !important;
          min-height: 350px !important;
        }
        .ql-editor.ql-blank::before {
          color: #9CA3AF !important;
        }
        .ql-snow .ql-picker-label {
          color: #D1D5DB !important;
        }
        .ql-snow .ql-stroke {
          stroke: #D1D5DB !important;
        }
        .ql-snow .ql-fill {
          fill: #D1D5DB !important;
        }
        .ql-snow .ql-picker-options {
          background: #374151 !important;
          border: 1px solid #4B5563 !important;
        }
        .ql-snow .ql-picker-item:hover {
          background: #4B5563 !important;
          color: white !important;
        }
        .ql-snow.ql-toolbar button:hover .ql-stroke {
          stroke: #1FBFB8 !important;
        }
        .ql-snow.ql-toolbar button:hover .ql-fill {
          fill: #1FBFB8 !important;
        }
        .ql-snow.ql-toolbar button.ql-active .ql-stroke {
          stroke: #1FBFB8 !important;
        }
        .ql-snow.ql-toolbar button.ql-active .ql-fill {
          fill: #1FBFB8 !important;
        }
      `}</style>
    </div>
  );
}