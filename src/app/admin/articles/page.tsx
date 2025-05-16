"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { articleService } from "@/services/article.services";
import { useArticles } from "@/hooks/useArticle";
import { Article } from "@/types/adminemploye";
import { 
  FileEdit, Trash2, Eye, Plus, 
  Search, Filter, CheckCircle, AlertTriangle 
} from "lucide-react";

export default function ArticlesAdminPage() {
  const { user, isLoading: authLoading } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const isAuthenticated = !!user;
  
  const router = useRouter();
  const { articles, loading, error } = useArticles(articleService);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterPublished, setFilterPublished] = useState<boolean | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if user is authenticated and is an admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    } else if (!authLoading && !isAdmin) {
      router.push("/dashboard");
    }
  }, [authLoading, isAuthenticated, isAdmin, router]);
  
  // Filter articles based on search and filters
  useEffect(() => {
    if (!articles) return;
    
    let filtered = [...articles];
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(search) || 
        (article.summary && article.summary.toLowerCase().includes(search))
      );
    }
    
    // Apply type filter
    if (filterType) {
      filtered = filtered.filter(article => article.type === filterType);
    }
    
    // Apply published filter
    if (filterPublished !== null) {
      filtered = filtered.filter(article => article.isPublished === filterPublished);
    }
    
    setFilteredArticles(filtered);
  }, [articles, searchTerm, filterType, filterPublished]);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      setDeleteError(null);
      setDeleteSuccess(null);
      
      await articleService.delete(id);
      
      // Update article list after successful deletion
      setFilteredArticles(prev => prev.filter(article => article.id !== id));
      setDeleteSuccess("Article deleted successfully");
      setDeleteConfirm(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setDeleteSuccess(null);
      }, 3000);
    } catch (err: any) {
      setDeleteError(err.response?.data?.message || "Failed to delete article");
    } finally {
      setIsDeleting(false);
    }
  };

  // Loading state
  if (authLoading || loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-[#E85C23] border-[#E85C23]/30 animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-lg bg-red-50 p-4 flex items-start border border-red-100">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error loading articles</h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
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
          <h1 className="text-2xl font-bold text-gray-800">Articles Management</h1>
          <p className="text-gray-500">Manage company articles and news</p>
        </div>
        <Link
          href="/admin/articles/create"
          className="flex items-center px-4 py-2 bg-[#E85C23] text-white rounded-lg hover:bg-[#d14b17] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Article
        </Link>
      </div>

      {deleteSuccess && (
        <div className="mb-6 rounded-lg bg-green-50 p-4 flex items-start border border-green-100">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-green-800">{deleteSuccess}</h3>
          </div>
        </div>
      )}

      {deleteError && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 flex items-start border border-red-100">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800">{deleteError}</h3>
          </div>
        </div>
      )}

      {/* Search and filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-[#E85C23] focus:border-[#E85C23]"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={filterType || ""}
                onChange={(e) => setFilterType(e.target.value || null)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23]"
              >
                <option value="">All Types</option>
                <option value="ARTICLE">Articles</option>
                <option value="NEWS">News</option>
              </select>
            </div>
            
            <select
              value={filterPublished === null ? "" : filterPublished ? "published" : "draft"}
              onChange={(e) => {
                if (e.target.value === "") setFilterPublished(null);
                else setFilterPublished(e.target.value === "published");
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#E85C23] focus:border-[#E85C23]"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles list */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        {filteredArticles.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No articles found matching your criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {article.imageUrl && (
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            <img 
                              src={article.imageUrl} 
                              alt={article.title} 
                              className="h-10 w-10 rounded-sm object-cover"
                            />
                          </div>
                        )}
                        <div className="truncate max-w-md">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {article.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        article.type === 'NEWS' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {article.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        article.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {article.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {deleteConfirm === article.id ? (
                        <div className="flex justify-end items-center space-x-2">
                          <span className="text-sm text-red-600">Confirm?</span>
                          <button
                            onClick={() => handleDelete(article.id)}
                            disabled={isDeleting}
                            className="text-red-600 hover:text-red-900"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            disabled={isDeleting}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-3">
                          <Link
                            href={`/articles/${article.slug}`}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View"
                          >
                            <Eye className="h-5 w-5" />
                          </Link>
                          <Link
                            href={`/admin/articles/edit/${article.id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <FileEdit className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(article.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}