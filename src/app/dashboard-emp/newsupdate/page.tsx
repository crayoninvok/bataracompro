"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  Calendar,
  Users,
  Edit3,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Star,
  Clock,
  TrendingUp,
  FileText,
  BarChart3,
  Tag,
  ImageIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  User,
  Settings,
  Download,
  Share2,
} from "lucide-react";

// Import types and services
import {
  Article,
  ArticleStats,
  ArticleFilters,
  User as UserType,
} from "@/types/article.types";
import { ArticleService } from "@/services/new-articles.service";

// Local types for component state
interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  articleTitle: string;
  isDeleting: boolean;
}

// Delete Modal Component
const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  articleTitle,
  isDeleting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Delete Article</h3>
            <p className="text-sm text-gray-400">
              This action cannot be undone
            </p>
          </div>
        </div>

        <p className="text-gray-300 mb-6">
          Are you sure you want to delete "{articleTitle}"? This will
          permanently remove the article and all associated data.
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Article
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Notification Container Component
const NotificationContainer: React.FC<{
  notifications: Notification[];
  onRemove: (id: string) => void;
}> = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg max-w-md flex items-center gap-3 transform transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-500/20 border border-green-500/30 text-green-400"
              : notification.type === "error"
              ? "bg-red-500/20 border border-red-500/30 text-red-400"
              : "bg-blue-500/20 border border-blue-500/30 text-blue-400"
          }`}
        >
          {notification.type === "success" && (
            <CheckCircle className="w-5 h-5" />
          )}
          {notification.type === "error" && <XCircle className="w-5 h-5" />}
          {notification.type === "info" && <AlertCircle className="w-5 h-5" />}

          <p className="flex-1">{notification.message}</p>

          <button
            onClick={() => onRemove(notification.id)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

// Custom hook for notifications
const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    const id = Date.now().toString();
    const notification: Notification = { id, message, type };

    setNotifications((prev) => [...prev, notification]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return {
    notifications,
    showNotification,
    removeNotification,
  };
};

// Custom hook for article deletion
const useArticleDelete = () => {
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    article: Article | null;
  }>({
    isOpen: false,
    article: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const openDeleteModal = (article: Article) => {
    setDeleteModal({
      isOpen: true,
      article,
    });
  };

  const closeDeleteModal = () => {
    if (!isDeleting) {
      setDeleteModal({
        isOpen: false,
        article: null,
      });
    }
  };

  const executeDelete = async (
    onSuccess: (deletedId: string) => void,
    onError: (error: string) => void
  ) => {
    if (!deleteModal.article) return;

    setIsDeleting(true);
    try {
      await ArticleService.deleteArticle(deleteModal.article.id);
      onSuccess(deleteModal.article.id);
      closeDeleteModal();
    } catch (error: any) {
      onError(error.message || "Failed to delete article");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteModal,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    executeDelete,
  };
};

export default function UserArticleManagement(): JSX.Element {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "my-articles" | "all-articles" | "insights"
  >("my-articles");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Data states
  const [myArticles, setMyArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<ArticleStats | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Custom hooks
  const { notifications, showNotification, removeNotification } =
    useNotifications();
  const {
    deleteModal,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    executeDelete,
  } = useArticleDelete();

  useEffect(() => {
    loadData();
    loadCategories();
  }, [activeTab]);

  const loadCategories = async () => {
    try {
      const response = await ArticleService.getCategories();
      setCategories(response.categories);
    } catch (error: any) {
      // If categories endpoint doesn't exist, use fallback categories
      console.warn(
        "Categories endpoint not available, using fallback categories"
      );
      setCategories([
        "Technology",
        "Web Development",
        "Backend Development",
        "Database",
        "Programming",
        "DevOps",
        "Security",
        "Mobile Development",
        "UI/UX Design",
        "Data Science",
      ]);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === "my-articles") {
        const [articlesResponse, statsResponse] = await Promise.all([
          ArticleService.getArticles(), // Get all articles, then filter client-side if needed
          ArticleService.getArticleStats(),
        ]);
        setMyArticles(articlesResponse.articles);
        setStats(statsResponse.stats);
      } else if (activeTab === "all-articles") {
        const articlesResponse = await ArticleService.getArticles({
          limit: 50,
          published: true,
        });
        setAllArticles(articlesResponse.articles);
      } else if (activeTab === "insights") {
        const [articlesResponse, statsResponse] = await Promise.all([
          ArticleService.getArticles(), // Get all articles for insights
          ArticleService.getArticleStats(),
        ]);
        setMyArticles(articlesResponse.articles);
        setStats(statsResponse.stats);
      }
    } catch (error: any) {
      console.error("Error loading data:", error);
      if (error?.status === 401) {
        showNotification("Authentication required. Please log in.", "error");
      } else if (error?.status === 403) {
        showNotification(
          "Access forbidden. Insufficient permissions.",
          "error"
        );
      } else {
        showNotification("Failed to load data. Please try again.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = (article: Article) => {
    openDeleteModal(article);
  };

  const onDeleteSuccess = (deletedId: string) => {
    setMyArticles((prev) => prev.filter((article) => article.id !== deletedId));
    setAllArticles((prev) =>
      prev.filter((article) => article.id !== deletedId)
    );

    // Refresh stats if on insights tab
    if (activeTab === "insights" && stats) {
      setStats({
        ...stats,
        totalArticles: stats.totalArticles - 1,
        publishedArticles:
          stats.publishedArticles - (deleteModal.article?.published ? 1 : 0),
        draftArticles:
          stats.draftArticles - (!deleteModal.article?.published ? 1 : 0),
        featuredArticles:
          stats.featuredArticles - (deleteModal.article?.featured ? 1 : 0),
      });
    }

    showNotification("Article deleted successfully", "success");
  };

  const onDeleteError = (error: string) => {
    console.error("Delete error:", error);
    showNotification(error, "error");
  };

  const handleEditArticle = (article: Article) => {
    router.push(`/dashboard-emp/newsupdate/edit/${article.id}`);
  };

  const getStatusColor = (article: Article) => {
    if (!article.published)
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    if (article.featured)
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    return "bg-green-500/20 text-green-400 border-green-500/30";
  };

  const getStatusText = (article: Article) => {
    if (!article.published) return "Draft";
    if (article.featured) return "Featured";
    return "Published";
  };

  const getStatusIcon = (article: Article) => {
    if (!article.published) return <Edit3 className="w-3 h-3" />;
    if (article.featured) return <Star className="w-3 h-3" />;
    return <CheckCircle className="w-3 h-3" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filterArticles = (articles: Article[]) => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || article.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "published" && article.published) ||
        (selectedStatus === "draft" && !article.published) ||
        (selectedStatus === "featured" && article.featured);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    description,
  }: {
    title: string;
    value: string;
    icon: React.ComponentType<any>;
    color: string;
    description: string;
  }) => (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
      <div className="flex items-center justify-between mb-2">
        <div
          className={`w-10 h-10 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <TrendingUp className="w-4 h-4 text-green-400" />
      </div>
      <h3 className="text-2xl font-bold mb-1">{value}</h3>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-xs text-green-400">{description}</p>
    </div>
  );

  const ArticleCard = ({
    article,
    showAuthor = false,
    showActions = true,
  }: {
    article: Article;
    showAuthor?: boolean;
    showActions?: boolean;
  }) => {
    const handleArticleClick = (e: React.MouseEvent) => {
      // Prevent navigation if clicking on action buttons
      if ((e.target as HTMLElement).closest("button")) {
        return;
      }

      // Navigate to article detail page using the slug
      router.push(`/dashboard-emp/newsupdate/${article.slug}`);
    };

    return (
      <div
        className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-200 cursor-pointer group"
        onClick={handleArticleClick}
      >
        <div className="flex items-start gap-4">
          {article.image && (
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-white line-clamp-2 flex-1 mr-2 group-hover:text-cyan-400 transition-colors duration-300">
                {article.title}
              </h3>
              {showActions && (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditArticle(article);
                    }}
                    className="p-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors opacity-0 group-hover:opacity-100"
                    title="Edit Article"
                  >
                    <Edit3 className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteArticle(article);
                    }}
                    className="p-1.5 rounded-lg bg-gray-700/50 hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete Article"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-gray-400 text-sm line-clamp-2 mb-3">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
              {showAuthor && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {article.author.name}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(article.createdAt)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime} min read
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {article.views} views
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${getStatusColor(
                    article
                  )}`}
                >
                  {getStatusIcon(article)}
                  {getStatusText(article)}
                </span>
                <span className="px-2 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300 border border-gray-600/30">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-xs border border-cyan-500/20"
                  >
                    #{tag}
                  </span>
                ))}
                {article.tags.length > 2 && (
                  <span className="px-2 py-0.5 bg-gray-700/50 text-gray-400 rounded text-xs">
                    +{article.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Article Management</h1>
          <p className="text-gray-400">
            Manage your articles and track their performance
          </p>
        </div>
        <Link href="/dashboard-emp/newsupdate/create-new">
          <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300">
            <Plus className="w-4 h-4" />
            New Article
          </button>
        </Link>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-700/50">
        <nav className="flex space-x-8">
          {[
            { id: "my-articles", label: "My Articles", icon: FileText },
            { id: "all-articles", label: "All Articles", icon: BookOpen },
            { id: "insights", label: "Insights", icon: BarChart3 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-cyan-500 text-cyan-400"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Insights Tab */}
      {activeTab === "insights" && (
        <div className="space-y-6">
          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Articles"
                value={stats.totalArticles.toString()}
                icon={FileText}
                color="from-blue-500 to-blue-600"
                description="+2 this month"
              />
              <StatCard
                title="Published"
                value={stats.publishedArticles.toString()}
                icon={CheckCircle}
                color="from-green-500 to-green-600"
                description="+1 this week"
              />
              <StatCard
                title="Total Views"
                value={stats.totalViews.toLocaleString()}
                icon={Eye}
                color="from-purple-500 to-purple-600"
                description="+15% this month"
              />
              <StatCard
                title="Featured Articles"
                value={stats.featuredArticles.toString()}
                icon={Star}
                color="from-orange-500 to-orange-600"
                description="Featured content"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Articles */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Top Performing Articles
              </h3>
              <div className="space-y-3">
                {myArticles
                  .filter((a) => a.published)
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 3)
                  .map((article) => (
                    <div
                      key={article.id}
                      className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
                      onClick={() => router.push(`/newsupdate/${article.slug}`)}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1 hover:text-cyan-400 transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {formatDate(article.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-semibold">
                          <Eye className="w-3 h-3" />
                          {article.views}
                        </div>
                        <p className="text-xs text-gray-400">
                          {article.readTime} min read
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {myArticles.slice(0, 4).map((article) => (
                  <div
                    key={article.id}
                    className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
                    onClick={() => router.push(`/newsupdate/${article.slug}`)}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        article.published ? "bg-green-400" : "bg-orange-400"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">
                          {article.published ? "Published" : "Updated"}
                        </span>
                        <span className="text-gray-400 hover:text-cyan-400 transition-colors">
                          {" "}
                          "{article.title}"
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(article.updatedAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles Lists */}
      {(activeTab === "my-articles" || activeTab === "all-articles") && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="featured">Featured</option>
            </select>
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-800 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filterArticles(
                activeTab === "my-articles" ? myArticles : allArticles
              ).map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  showAuthor={activeTab === "all-articles"}
                  showActions={activeTab === "my-articles"}
                />
              ))}

              {filterArticles(
                activeTab === "my-articles" ? myArticles : allArticles
              ).length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400">
                    No articles found matching your criteria
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={() => executeDelete(onDeleteSuccess, onDeleteError)}
        articleTitle={deleteModal.article?.title || ""}
        isDeleting={isDeleting}
      />

      {/* Notifications */}
      <NotificationContainer
        notifications={notifications}
        onRemove={removeNotification}
      />
    </div>
  );
}
