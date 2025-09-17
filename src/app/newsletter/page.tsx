"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArticleService } from "@/services/new-articles.service";
import { Article, ArticleListResponse } from "@/types/article.types";
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Eye,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Star,
  Globe,
  Briefcase,
  Truck,
  Leaf,
  AlertCircle,
  Loader2,
  Filter,
  X,
  Bell,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";

// Types and constants
interface CategoryInfo {
  name: string;
  icon: any;
  count: number;
}

const categoryIcons: Record<string, any> = {
  All: Globe,
  Sustainability: Leaf,
  Technology: TrendingUp,
  Operations: Briefcase,
  Mining: Truck,
  Environment: Leaf,
  Production: Briefcase,
  Procurement: Truck,
  HRGA: User,
  Finance: TrendingUp,
  Plant: Briefcase,
  IT: TrendingUp,
  HSE: Leaf,
};

const POSTS_PER_PAGE = 6;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

const slideInVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
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

const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Hook for newsletter data
function useNewsletterData() {
  const [state, setState] = useState({
    articles: [] as Article[],
    featuredArticles: [] as Article[],
    categories: [{ name: "All", icon: Globe, count: 0 }] as CategoryInfo[],
    pagination: {
      page: 1,
      limit: POSTS_PER_PAGE,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
    loading: true,
    error: null as string | null,
  });

  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedCategory: "All",
    currentPage: 1,
  });

  const loadArticles = async () => {
    try {
      setState((prev) => ({ ...prev, error: null }));

      const apiFilters = {
        page: filters.currentPage,
        limit: POSTS_PER_PAGE,
        published: true,
        ...(filters.selectedCategory !== "All" && {
          category: filters.selectedCategory,
        }),
        ...(filters.searchQuery.trim() && {
          search: filters.searchQuery.trim(),
        }),
      };

      const response: ArticleListResponse =
        await ArticleService.getPublishedArticles(apiFilters);

      setState((prev) => ({
        ...prev,
        articles: response.articles,
        pagination: response.pagination,
      }));

      if (filters.selectedCategory === "All" && !filters.searchQuery.trim()) {
        setState((prev) => ({
          ...prev,
          categories: prev.categories.map((cat) => ({
            ...cat,
            count: cat.name === "All" ? response.pagination.total : cat.count,
          })),
        }));
      }
    } catch (err) {
      console.error("Error loading articles:", err);
      setState((prev) => ({
        ...prev,
        error: "Failed to load articles. Please try again.",
        articles: [],
      }));
    }
  };

  const loadInitialData = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const [featuredResponse, categoriesResponse] = await Promise.all([
        ArticleService.getFeaturedArticles(3),
        ArticleService.getCategories().catch(() => ({ categories: [] })),
      ]);

      const categoryList: CategoryInfo[] = [
        { name: "All", icon: Globe, count: 0 },
      ];

      if (categoriesResponse.categories) {
        categoriesResponse.categories.forEach((cat) => {
          categoryList.push({
            name: cat,
            icon: categoryIcons[cat] || Briefcase,
            count: 0,
          });
        });
      }

      setState((prev) => ({
        ...prev,
        featuredArticles: featuredResponse.articles,
        categories: categoryList,
      }));

      await loadArticles();
    } catch (err) {
      console.error("Error loading initial data:", err);
      setState((prev) => ({
        ...prev,
        error: "Failed to load articles. Please try again.",
      }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      selectedCategory: "All",
      currentPage: 1,
    });
  };

  return {
    ...state,
    filters,
    loadInitialData,
    loadArticles,
    updateFilters,
    clearFilters,
  };
}

// Utility functions
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getAuthorInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Components
const LoadingState = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white flex items-center justify-center">
    <div className="text-center">
      <motion.div
        className="relative w-24 h-24 mx-auto mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 border-r-orange-500"></div>
      </motion.div>
      <motion.p
        className="text-gray-300 text-lg"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading newsletter...
      </motion.p>
      <motion.div
        className="mt-4 flex justify-center space-x-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-cyan-400 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  </div>
);

const ErrorState = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white flex items-center justify-center">
    <div className="text-center max-w-md mx-auto px-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
      </motion.div>
      <motion.h2
        className="text-2xl font-bold text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Something went wrong
      </motion.h2>
      <motion.p
        className="text-gray-300 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {error}
      </motion.p>
      <motion.button
        onClick={onRetry}
        className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-orange-500 hover:to-orange-400 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Try Again
      </motion.button>
    </div>
  </div>
);

const Header = ({ isVisible }: { isVisible: boolean }) => (
  <motion.div
    className="text-center mb-16 relative"
    variants={containerVariants}
    initial="hidden"
    animate={isVisible ? "visible" : "hidden"}
  >
    {/* Animated background elements */}
    <motion.div
      className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-orange-500/10 rounded-full blur-3xl"
      variants={pulseVariants}
      animate="animate"
    />

    <motion.div
      variants={itemVariants}
      className="flex items-center justify-center gap-3 mb-6"
    >
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
      >
        <Sparkles className="w-5 h-5 text-cyan-400" />
        <span className="text-cyan-400 font-semibold tracking-wider uppercase text-sm">
          Industry Insights
        </span>
        <Newspaper className="w-5 h-5 text-orange-500" />
      </motion.div>
    </motion.div>

    <motion.h1
      variants={itemVariants}
      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
    >
      Batara{" "}
      <span className="relative inline-block">
        <motion.span
          className="text-orange-500 relative z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Article Newsletter
        </motion.span>
        <motion.span
          className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-orange-500/30 to-orange-600/40 -z-1 rounded"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </span>
    </motion.h1>

    <motion.p
      variants={itemVariants}
      className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-8"
    >
      Stay informed with the latest insights, innovations, and success stories
      from PT Batara's mining operations and industry expertise.
    </motion.p>
    <motion.div
      variants={itemVariants}
      className="flex flex-col sm:flex-row items-center justify-center gap-4"
    ></motion.div>
  </motion.div>
);

const SearchFilters = ({
  searchQuery,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
  isVisible,
}: {
  searchQuery: string;
  selectedCategory: string;
  categories: CategoryInfo[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
  isVisible: boolean;
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <motion.div
      className="mb-12"
      variants={itemVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500">
        <div className="flex flex-col gap-6">
          {/* Search bar with enhanced styling */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles, tags, or topics..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-300 text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter toggle for mobile */}
          <div className="flex items-center justify-between lg:hidden">
            <span className="text-gray-300 font-medium">Categories</span>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide" : "Show"} Filters
            </button>
          </div>

          {/* Category filters */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <motion.button
                    key={category.name}
                    onClick={() => onCategoryChange(category.name)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium border ${
                      selectedCategory === category.name
                        ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-black shadow-lg border-cyan-300"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border-white/20"
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                    {category.count > 0 && (
                      <span className="bg-black/20 text-xs px-2 py-0.5 rounded-full">
                        {category.count}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedArticle = ({
  article,
  isVisible,
}: {
  article: Article;
  isVisible: boolean;
}) => (
  <motion.div
    className="mb-16"
    variants={itemVariants}
    initial="hidden"
    animate={isVisible ? "visible" : "hidden"}
  >
    <Link href={`/newsletter/${article.slug}`}>
      <motion.div
        className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="grid lg:grid-cols-2 gap-0 h-auto lg:h-[500px]">
          {/* Image Section */}
          <div className="relative overflow-hidden h-64 lg:h-full">
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                <BookOpen className="w-24 h-24 text-gray-500" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <motion.div
              className="absolute top-6 left-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <Star className="w-4 h-4" />
                Featured Article
              </div>
            </motion.div>

            <div className="absolute bottom-6 left-6 flex items-center gap-4">
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full text-sm border border-white/20">
                <Eye className="w-4 h-4 text-cyan-400" />
                {article.views.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full text-sm border border-white/20">
                <Clock className="w-4 h-4 text-orange-500" />
                {article.readTime} min
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium border border-cyan-500/30">
                {article.category}
              </span>
              <div className="flex items-center text-gray-400 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime} min read
              </div>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-400 transition-colors duration-300">
              {article.title}
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                {article.author.avatar ? (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-white/20"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full flex items-center justify-center border-2 border-orange-500/30">
                    <span className="text-orange-500 font-semibold text-sm">
                      {getAuthorInitials(article.author.name)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-white font-medium">
                    {article.author.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {article.author.department}
                  </p>
                </div>
              </div>
              <div className="text-gray-400 text-sm">
                <Calendar className="w-4 h-4 inline mr-1" />
                {formatDate(article.createdAt)}
              </div>
            </div>

            <motion.button
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-orange-500 hover:to-orange-400 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-500 shadow-lg hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read Full Article
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  </motion.div>
);

const ArticleGrid = ({
  articles,
  isVisible,
}: {
  articles: Article[];
  isVisible: boolean;
}) => (
  <motion.div
    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
    variants={containerVariants}
    initial="hidden"
    animate={isVisible ? "visible" : "hidden"}
  >
    {articles.map((article, index) => (
      <motion.article
        key={article.id}
        variants={itemVariants}
        className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl group cursor-pointer transition-all duration-500 hover:border-white/20"
        whileHover={{ y: -8, scale: 1.02 }}
        custom={index}
      >
        <Link href={`/newsletter/${article.slug}`}>
          <div>
            <div className="relative h-48 overflow-hidden">
              {article.image ? (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-gray-500" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Article actions overlay */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-colors duration-200">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-colors duration-200">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium border border-cyan-500/30">
                  {article.category}
                </span>
                <div className="flex items-center text-gray-400 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {article.readTime} min
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                {article.title}
              </h3>

              <p className="text-gray-300 mb-4 line-clamp-3 text-sm">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  {article.author.avatar ? (
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full flex items-center justify-center border border-orange-500/30">
                      <span className="text-orange-500 font-semibold text-xs">
                        {getAuthorInitials(article.author.name)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-white font-medium text-sm">
                      {article.author.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {article.author.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {article.views > 999
                      ? `${Math.round(article.views / 1000)}k`
                      : article.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    ))}
  </motion.div>
);

const EmptyState = ({
  onClearFilters,
  isVisible,
  searchQuery,
  selectedCategory,
}: {
  onClearFilters: () => void;
  isVisible: boolean;
  searchQuery?: string;
  selectedCategory?: string;
}) => {
  const getEmptyMessage = () => {
    if (searchQuery && searchQuery.trim()) {
      return {
        title: "No Articles Match Your Search",
        description: `We couldn't find any articles matching "${searchQuery}". Try different keywords or browse our featured categories below.`,
        suggestion:
          "Search suggestions: Try broader terms like 'mining', 'sustainability', or 'operations'",
      };
    }

    if (selectedCategory && selectedCategory !== "All") {
      return {
        title: `No Articles in ${selectedCategory}`,
        description: `We don't have any articles in the ${selectedCategory} category yet. Our team is working on bringing you the latest insights.`,
        suggestion:
          "Check back soon or explore other categories to discover valuable content.",
      };
    }

    return {
      title: "No Articles Available",
      description:
        "We're currently preparing fresh content for you. Our editorial team is working hard to bring you the latest industry insights and company updates.",
      suggestion:
        "Stay tuned! New articles are published regularly with insights from PT Batara's mining operations and industry expertise.",
    };
  };

  const message = getEmptyMessage();

  return (
    <motion.div
      className="text-center py-16 max-w-3xl mx-auto"
      variants={itemVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <motion.div
        className="w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20"
        whileHover={{ scale: 1.1, rotate: 10 }}
        transition={{ duration: 0.3 }}
      >
        <BookOpen className="w-16 h-16 text-gray-400" />
      </motion.div>

      <motion.h3
        className="text-3xl font-bold text-white mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message.title}
      </motion.h3>

      <motion.p
        className="text-gray-300 mb-6 leading-relaxed text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {message.description}
      </motion.p>

      <motion.p
        className="text-gray-400 text-sm mb-10 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {message.suggestion}
      </motion.p>

      <div className="space-y-6">
        {(searchQuery || (selectedCategory && selectedCategory !== "All")) && (
          <motion.button
            onClick={onClearFilters}
            className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-orange-500 hover:to-orange-400 text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Clear Filters & Browse All Articles
          </motion.button>
        )}

        {/* Enhanced suggestions */}
        <motion.div
          className="mt-12 p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            What you can do:
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                <Bell className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <h5 className="text-white font-medium mb-1">
                    Subscribe for Updates
                  </h5>
                  <p className="text-gray-400 text-sm">
                    Get notified when new articles are published
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                <Globe className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h5 className="text-white font-medium mb-1">
                    Explore Categories
                  </h5>
                  <p className="text-gray-400 text-sm">
                    Browse topics like Sustainability, Technology, Operations
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                <Clock className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <h5 className="text-white font-medium mb-1">
                    Check Back Regularly
                  </h5>
                  <p className="text-gray-400 text-sm">
                    New content published weekly with fresh insights
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                <MessageCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h5 className="text-white font-medium mb-1">
                    Suggest Topics
                  </h5>
                  <p className="text-gray-400 text-sm">
                    Contact our editorial team with content ideas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Pagination = ({
  pagination,
  currentPage,
  onPageChange,
  isVisible,
}: {
  pagination: any;
  currentPage: number;
  onPageChange: (page: number) => void;
  isVisible: boolean;
}) => (
  <motion.div
    className="flex justify-center items-center gap-4 flex-wrap"
    variants={itemVariants}
    initial="hidden"
    animate={isVisible ? "visible" : "hidden"}
  >
    <motion.button
      onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      disabled={!pagination.hasPrev}
      className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-300 hover:bg-white/10 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      whileHover={pagination.hasPrev ? { scale: 1.05, x: -2 } : {}}
      whileTap={pagination.hasPrev ? { scale: 0.95 } : {}}
    >
      <ChevronLeft className="w-4 h-4" />
      Previous
    </motion.button>

    <div className="flex items-center gap-2">
      {Array.from({ length: Math.min(pagination.totalPages, 7) }, (_, i) => {
        let page;
        if (pagination.totalPages <= 7) {
          page = i + 1;
        } else if (currentPage <= 4) {
          page = i + 1;
        } else if (currentPage >= pagination.totalPages - 3) {
          page = pagination.totalPages - 6 + i;
        } else {
          page = currentPage - 3 + i;
        }

        return (
          <motion.button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-12 h-12 rounded-xl font-medium transition-all duration-300 ${
              currentPage === page
                ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-black shadow-lg"
                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/20"
            }`}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            {page}
          </motion.button>
        );
      })}
    </div>

    <motion.button
      onClick={() =>
        onPageChange(Math.min(currentPage + 1, pagination.totalPages))
      }
      disabled={!pagination.hasNext}
      className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-300 hover:bg-white/10 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      whileHover={pagination.hasNext ? { scale: 1.05, x: 2 } : {}}
      whileTap={pagination.hasNext ? { scale: 0.95 } : {}}
    >
      Next
      <ChevronRight className="w-4 h-4" />
    </motion.button>
  </motion.div>
);

// Main component
export default function Newsletter() {
  const [isVisible, setIsVisible] = useState(false);
  const {
    articles,
    featuredArticles,
    categories,
    pagination,
    loading,
    error,
    filters,
    loadInitialData,
    loadArticles,
    updateFilters,
    clearFilters,
  } = useNewsletterData();

  useEffect(() => {
    setIsVisible(true);
    loadInitialData();
  }, []);

  useEffect(() => {
    loadArticles();
  }, [filters.selectedCategory, filters.searchQuery, filters.currentPage]);

  if (loading) return <LoadingState />;

  if (error && articles.length === 0 && featuredArticles.length === 0) {
    return <ErrorState error={error} onRetry={loadInitialData} />;
  }

  const featuredPost = featuredArticles[0];
  const showFeatured =
    featuredPost &&
    filters.selectedCategory === "All" &&
    !filters.searchQuery.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/8 via-orange-500/4 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-cyan-400/8 via-cyan-400/4 to-transparent" />

        {/* Animated floating elements */}
        <motion.div
          className="absolute top-32 right-20 w-80 h-80 rounded-full bg-orange-500/6 blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-40 left-16 w-96 h-96 rounded-full bg-cyan-400/5 blur-3xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-purple-500/4 blur-3xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
        />

        {/* Geometric patterns */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/5 rounded-full" />
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/5 rounded-lg rotate-45" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-20 relative z-10">
        <Header isVisible={isVisible} />

        <SearchFilters
          searchQuery={filters.searchQuery}
          selectedCategory={filters.selectedCategory}
          categories={categories}
          onSearchChange={(value) => updateFilters({ searchQuery: value })}
          onCategoryChange={(category) =>
            updateFilters({ selectedCategory: category, currentPage: 1 })
          }
          isVisible={isVisible}
        />
        {showFeatured && (
          <FeaturedArticle article={featuredPost} isVisible={isVisible} />
        )}

        {/* Results count */}
        {!loading && (
          <motion.div
            className="flex items-center justify-between mb-8"
            variants={slideInVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <div className="text-gray-400">
              {articles.length > 0 ? (
                <>
                  Showing {articles.length} of {pagination.total} articles
                </>
              ) : (
                <>No articles found</>
              )}
              {filters.searchQuery && (
                <span className="ml-2">
                  for "
                  <span className="text-cyan-400">{filters.searchQuery}</span>"
                </span>
              )}
            </div>
            {articles.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <TrendingUp className="w-4 h-4" />
                Updated regularly
              </div>
            )}
          </motion.div>
        )}

        <ArticleGrid articles={articles} isVisible={isVisible} />

        {articles.length === 0 && !loading && (
          <EmptyState
            onClearFilters={clearFilters}
            isVisible={isVisible}
            searchQuery={filters.searchQuery}
            selectedCategory={filters.selectedCategory}
          />
        )}

        {pagination.totalPages > 1 && (
          <Pagination
            pagination={pagination}
            currentPage={filters.currentPage}
            onPageChange={(page) => updateFilters({ currentPage: page })}
            isVisible={isVisible}
          />
        )}

        {/* Enhanced error banner */}
        {error && articles.length > 0 && (
          <motion.div
            className="fixed bottom-6 right-6 bg-red-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-2xl border border-red-400/50 max-w-sm"
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-sm mb-1">
                  Error Loading Content
                </div>
                <div className="text-xs opacity-90">{error}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Scroll to top button */}
        <motion.button
          className="fixed bottom-6 left-6 p-3 bg-cyan-500/20 backdrop-blur-sm text-cyan-400 rounded-full border border-cyan-500/30 hover:bg-cyan-500/30 transition-all duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 2 }}
        >
          <ArrowRight className="w-5 h-5 rotate-[-90deg]" />
        </motion.button>
      </div>
    </div>
  );
}
