"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  BookOpen,
  TrendingUp,
  Eye,
  MessageSquare,
  Share2,
  Heart,
  Bookmark,
  Tag,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Mail,
  Star,
  Printer,
  Download,
  Loader,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ArticleService } from "@/services/new-articles.service";
import { Article } from "@/types/article.types";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-700 rounded mb-3"></div>
      <div className="h-4 bg-gray-700 rounded mb-3 w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded mb-3 w-4/6"></div>
    </div>
  )
});
import "react-quill/dist/quill.snow.css";

// Next.js standard PageProps interface for dynamic routes
interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ArticleDetailPage({ params, searchParams }: PageProps) {
  const router = useRouter();
  const articleSlug = params.slug;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // React Quill modules configuration for read-only mode
  const quillModules = useMemo(() => ({
    toolbar: false, // Disable toolbar for read-only
    clipboard: {
      matchVisual: false // Prevent paste formatting issues
    }
  }), []);

  // React Quill formats - include all formats you might use
  const quillFormats = useMemo(() => [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'align', 'color', 'background',
    'script', 'code', 'code-block'
  ], []);

  // Fetch article data
  useEffect(() => {
    const fetchArticleData = async () => {
      if (!articleSlug) {
        setError("Article slug is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch main article
        const articleResponse = await ArticleService.getArticleBySlug(articleSlug);
        setArticle(articleResponse.article);

        // Fetch related articles from the same category
        if (articleResponse.article.category) {
          const relatedResponse = await ArticleService.getArticlesByCategory(
            articleResponse.article.category,
            { limit: 3 }
          );
          // Filter out the current article from related articles
          const filteredRelated = relatedResponse.articles.filter(
            (relatedArticle) => relatedArticle.id !== articleResponse.article.id
          );
          setRelatedArticles(filteredRelated);
        }
      } catch (err: any) {
        console.error("Error fetching article:", err);
        setError(err.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [articleSlug]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Custom styles for React Quill in read-only mode
  useEffect(() => {
    // Apply custom styles to Quill editor
    const style = document.createElement('style');
    style.textContent = `
      .ql-editor {
        border: none !important;
        padding: 0 !important;
        font-size: 16px !important;
        line-height: 1.8 !important;
        color: #e5e7eb !important;
      }
      
      .ql-editor h1, .ql-editor h2, .ql-editor h3 {
        color: #ffffff !important;
        font-weight: 700 !important;
        margin: 1.5em 0 0.75em 0 !important;
      }
      
      .ql-editor h1 {
        font-size: 2em !important;
      }
      
      .ql-editor h2 {
        font-size: 1.5em !important;
      }
      
      .ql-editor h3 {
        font-size: 1.25em !important;
      }
      
      .ql-editor p {
        margin-bottom: 1em !important;
      }
      
      .ql-editor strong {
        color: #1FBFB8 !important;
        font-weight: 600 !important;
      }
      
      .ql-editor em {
        color: #E85C23 !important;
      }
      
      .ql-editor a {
        color: #1FBFB8 !important;
        text-decoration: underline !important;
      }
      
      .ql-editor a:hover {
        color: #1BABA5 !important;
      }
      
      .ql-editor blockquote {
        border-left: 4px solid #1FBFB8 !important;
        padding-left: 1em !important;
        margin: 1em 0 !important;
        font-style: italic !important;
        background: rgba(31, 191, 184, 0.1) !important;
        border-radius: 4px !important;
        padding: 1em !important;
      }
      
      .ql-editor ul, .ql-editor ol {
        padding-left: 1.5em !important;
        margin: 1em 0 !important;
      }
      
      .ql-editor li {
        margin-bottom: 0.5em !important;
      }
      
      .ql-editor code {
        background: rgba(255, 255, 255, 0.1) !important;
        color: #E85C23 !important;
        padding: 0.2em 0.4em !important;
        border-radius: 4px !important;
        font-family: 'Monaco', 'Consolas', monospace !important;
      }
      
      .ql-editor pre {
        background: rgba(0, 0, 0, 0.5) !important;
        color: #e5e7eb !important;
        padding: 1em !important;
        border-radius: 8px !important;
        margin: 1em 0 !important;
        overflow-x: auto !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
      }
      
      .ql-editor img {
        max-width: 100% !important;
        height: auto !important;
        border-radius: 8px !important;
        margin: 1em 0 !important;
      }
      
      .ql-container {
        border: none !important;
        font-family: inherit !important;
      }
      
      .ql-snow {
        border: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-[#1FBFB8]" />
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-500" />
          <h1 className="text-2xl font-bold text-gray-400 mb-4">Article Not Found</h1>
          <p className="text-gray-500 mb-6">
            {error || "The article you're looking for doesn't exist or has been removed."}
          </p>
          <button
            onClick={() => router.push("/newsletter")}
            className="bg-[#1FBFB8] hover:bg-[#1BABA5] text-black px-6 py-3 rounded-xl font-semibold transition-colors duration-300"
          >
            Back to Newsletter
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case "HSE":
        return "🛡️";
      case "PRODUCTION":
        return "⚡";
      case "OPERATIONS":
        return "🔧";
      case "FINANCE":
        return "💰";
      case "HRGA":
        return "👥";
      case "IT":
        return "💻";
      case "PROCUREMENT":
        return "📋";
      case "PLANT":
        return "🏭";
      default:
        return "🏢";
    }
  };

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = article.title;
    const text = article.excerpt;

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(url);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
        break;
      case "email":
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + "\n\n" + url)}`, "_blank");
        break;
    }
    
    if (platform !== "copy") {
      setShowShareModal(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a simple text version of the article for download
    const content = `
${article.title}
${article.excerpt}

Published: ${formatDate(article.publishedAt || article.createdAt)}
Author: ${article.author.name}
Department: ${article.author.department}
Category: ${article.category}
Read Time: ${article.readTime} minutes

Content:
${article.content.replace(/<[^>]*>/g, '')} // Strip HTML tags for plain text

Tags: ${article.tags.join(', ')}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${article.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 3, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E85C23]/8 via-[#E85C23]/4 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1FBFB8]/8 via-[#1FBFB8]/4 to-transparent" />

        <motion.div
          className="absolute top-32 right-20 w-80 h-80 rounded-full bg-[#E85C23]/6 blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-40 left-16 w-96 h-96 rounded-full bg-[#1FBFB8]/5 blur-3xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-20 relative z-10">
        {/* Back Navigation */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <button
            onClick={() => router.push("/newsletter")}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-[#1FBFB8] transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Newsletter
          </button>
        </motion.div>

        {/* Article Header */}
        <motion.header
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="bg-[#1FBFB8]/20 text-[#1FBFB8] px-3 py-1.5 rounded-full text-sm font-medium">
                {article.category}
              </span>
              {article.featured && (
                <div className="flex items-center gap-1 bg-[#E85C23]/20 text-[#E85C23] px-3 py-1.5 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4" />
                  Featured
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
              {article.title}
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              {article.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#E85C23]/20 rounded-full flex items-center justify-center">
                    {article.author.avatar ? (
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="w-5 h-5 text-[#E85C23]" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium">{article.author.name}</p>
                    <p className="text-sm text-gray-400">
                      {getDepartmentIcon(article.author.department)} {article.author.department}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.publishedAt || article.createdAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime} min read
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {article.views.toLocaleString()} views
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          {article.image && (
            <motion.div
              variants={itemVariants}
              className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8"
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isLiked
                  ? "bg-[#E85C23] text-white"
                  : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              Like
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isBookmarked
                  ? "bg-[#1FBFB8] text-black"
                  : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
              Bookmark
            </button>

            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 rounded-xl transition-all duration-300"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>

            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrint}
                className="p-2 bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 rounded-xl transition-all duration-300"
                title="Print Article"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button 
                onClick={handleDownload}
                className="p-2 bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 rounded-xl transition-all duration-300"
                title="Download Article"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.header>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Article Content */}
          <motion.main
            className="lg:col-span-3"
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl mb-8">
              {/* React Quill Reader */}
              <div className="quill-content-reader">
                <ReactQuill
                  value={article.content}
                  readOnly={true}
                  theme="snow"
                  modules={quillModules}
                  formats={quillFormats}
                />
              </div>
            </div>

            {/* Tags */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 mb-8"
            >
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 bg-gray-800/60 text-gray-300 px-3 py-2 rounded-xl text-sm hover:bg-gray-700/60 transition-colors duration-300 cursor-pointer"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Author Bio */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl mb-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#E85C23]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  {article.author.avatar ? (
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="w-8 h-8 text-[#E85C23]" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {article.author.name}
                  </h3>
                  <p className="text-gray-400 mb-2">
                    {getDepartmentIcon(article.author.department)} {article.author.department} Department
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Experienced professional in the mining industry with expertise in sustainable practices and operational excellence.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.main>

          {/* Sidebar */}
          <motion.aside
            className="lg:col-span-1"
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl mb-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#1FBFB8]" />
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <div
                      key={relatedArticle.id}
                      className="group cursor-pointer"
                      onClick={() => router.push(`/newsupdate/${relatedArticle.slug}`)}
                    >
                      <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={relatedArticle.image || "/placeholder-image.jpg"}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-2">
                          <span className="bg-black/80 text-[#1FBFB8] px-2 py-1 rounded text-xs font-medium">
                            {relatedArticle.category}
                          </span>
                        </div>
                      </div>
                      <h4 className="text-white font-semibold mb-2 group-hover:text-[#1FBFB8] transition-colors duration-300 line-clamp-2">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {relatedArticle.readTime} min read
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#E85C23]" />
                Article Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Views</span>
                  <span className="text-white font-semibold">{article.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Read Time</span>
                  <span className="text-white font-semibold">{article.readTime} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Published</span>
                  <span className="text-white font-semibold">
                    {formatDate(article.publishedAt || article.createdAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="text-[#1FBFB8] font-semibold">{article.category}</span>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700/50 relative"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Share Article</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="flex items-center gap-2 p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-colors"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="flex items-center gap-2 p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </button>
              <button
                onClick={() => handleShare("email")}
                className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button
                onClick={() => handleShare("copy")}
                className={`col-span-2 flex items-center justify-center gap-2 p-3 rounded-xl transition-colors ${
                  copySuccess 
                    ? "bg-green-600 text-white" 
                    : "bg-[#1FBFB8] hover:bg-[#1BABA5] text-black"
                }`}
              >
                <Link2 className="w-4 h-4" />
                {copySuccess ? "Copied!" : "Copy Link"}
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="mt-4 w-full p-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}