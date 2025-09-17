'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArticleService } from '@/services/new-articles.service';
import { ArticleResponse } from '@/types/article.types';
import { Loader2, Calendar, Clock, Share2, Instagram, Linkedin, MessageCircle, ArrowLeft, Heart, Bookmark } from 'lucide-react';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.bubble.css';

const NewsletterArticle = () => {
  const [article, setArticle] = useState<ArticleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const params = useParams();
  const slug = params.slug as string;

  // Share functions
  const shareToInstagram = () => {
    const url = window.location.href;
    const text = `Check out this article: ${article?.article.title}`;
    navigator.clipboard.writeText(`${text}\n${url}`);
    alert('Link copied to clipboard! You can now paste it in your Instagram story.');
  };

  const shareToLinkedIn = () => {
    const url = window.location.href;
    const title = article?.article.title || '';
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };

  const shareToWhatsApp = () => {
    const url = window.location.href;
    const text = `Check out this interesting article: *${article?.article.title}*\n\n${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        const response = await ArticleService.getArticleBySlug(slug);
        setArticle(response);
      } catch (err) {
        setError('Failed to fetch the article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-gray-300 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold transition-colors duration-300 mt-4"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 text-lg">Article not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[70vh] overflow-hidden">
        {article.article.image ? (
          <div className="absolute inset-0">
            <Image
              src={article.article.image}
              alt={article.article.title}
              fill
              className="object-cover scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-black" />
        )}
        
        {/* Navigation */}
        <nav className="relative z-20 flex items-center justify-between p-6">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
                isLiked 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
                isBookmarked 
                  ? 'bg-cyan-500/20 text-cyan-400' 
                  : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {article.article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(article.article.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.article.readTime} min read
              </div>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mb-8">
              {article.article.author.avatar ? (
                <Image
                  src={article.article.author.avatar}
                  alt={article.article.author.name}
                  width={48}
                  height={48}
                  className="rounded-full ring-2 ring-white/20"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {article.article.author.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              )}
              <div>
                <p className="text-white font-semibold">{article.article.author.name}</p>
                <p className="text-gray-300 text-sm">{article.article.author.department}</p>
              </div>
            </div>

            {/* Share Button */}
            <div className="relative inline-block">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 border border-white/20"
              >
                <Share2 className="w-4 h-4" />
                Share Article
              </button>

              {showShareMenu && (
                <div className="absolute bottom-full mb-4 left-0 bg-gray-900/95 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 shadow-2xl">
                  <div className="flex gap-3">
                    <button
                      onClick={shareToInstagram}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 min-w-[80px]"
                    >
                      <Instagram className="w-5 h-5" />
                      <span className="text-xs font-medium">Instagram</span>
                    </button>
                    
                    <button
                      onClick={shareToLinkedIn}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#0077B5] hover:bg-[#005885] text-white transition-all duration-300 min-w-[80px]"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="text-xs font-medium">LinkedIn</span>
                    </button>
                    
                    <button
                      onClick={shareToWhatsApp}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#25D366] hover:bg-[#1DA851] text-white transition-all duration-300 min-w-[80px]"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-xs font-medium">WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="relative z-10 -mt-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            
            {/* Content with React Quill */}
            <div className="prose prose-invert prose-lg max-w-none mb-12">
              <ReactQuill
                value={article.article.content}
                readOnly={true}
                theme="bubble"
                modules={{ toolbar: false }}
                className="quill-reader"
              />
            </div>

            {/* Tags */}
            {article.article.tags && article.article.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-8 pt-8 border-t border-white/10">
                {article.article.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium border border-cyan-500/30 hover:border-cyan-400/50 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowShareMenu(false)}
        />
      )}

      {/* Custom styles for Quill reader */}
      <style jsx global>{`
        .quill-reader .ql-editor {
          padding: 0 !important;
          color: #e5e7eb !important;
          font-size: 1.125rem !important;
          line-height: 1.75 !important;
        }
        
        .quill-reader .ql-editor h1,
        .quill-reader .ql-editor h2,
        .quill-reader .ql-editor h3,
        .quill-reader .ql-editor h4,
        .quill-reader .ql-editor h5,
        .quill-reader .ql-editor h6 {
          color: #ffffff !important;
          font-weight: 600 !important;
          margin-top: 2rem !important;
          margin-bottom: 1rem !important;
        }
        
        .quill-reader .ql-editor h1 { font-size: 2rem !important; }
        .quill-reader .ql-editor h2 { font-size: 1.75rem !important; }
        .quill-reader .ql-editor h3 { font-size: 1.5rem !important; }
        
        .quill-reader .ql-editor strong {
          color: #22d3ee !important;
          font-weight: 600 !important;
        }
        
        .quill-reader .ql-editor a {
          color: #22d3ee !important;
          text-decoration: underline !important;
          transition: color 0.2s ease !important;
        }
        
        .quill-reader .ql-editor a:hover {
          color: #06b6d4 !important;
        }
        
        .quill-reader .ql-editor blockquote {
          border-left: 4px solid #22d3ee !important;
          background: rgba(34, 211, 238, 0.05) !important;
          padding: 1rem 1.5rem !important;
          margin: 2rem 0 !important;
          font-style: italic !important;
          color: #d1d5db !important;
          border-radius: 0 0.5rem 0.5rem 0 !important;
        }
        
        .quill-reader .ql-editor ul,
        .quill-reader .ql-editor ol {
          color: #e5e7eb !important;
          padding-left: 1.5rem !important;
        }
        
        .quill-reader .ql-editor li {
          margin-bottom: 0.5rem !important;
        }
        
        .quill-reader .ql-editor code {
          background: rgba(34, 211, 238, 0.1) !important;
          color: #22d3ee !important;
          padding: 0.25rem 0.5rem !important;
          border-radius: 0.375rem !important;
          font-family: 'Monaco', 'Menlo', monospace !important;
        }
        
        .quill-reader .ql-editor pre {
          background: rgba(15, 23, 42, 0.8) !important;
          border: 1px solid rgba(34, 211, 238, 0.2) !important;
          border-radius: 0.75rem !important;
          padding: 1.5rem !important;
          overflow-x: auto !important;
          margin: 2rem 0 !important;
        }
        
        .quill-reader .ql-editor p {
          margin-bottom: 1.5rem !important;
        }
      `}</style>
    </div>
  );
};

export default NewsletterArticle;