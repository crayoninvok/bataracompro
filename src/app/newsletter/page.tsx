"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Clock,
  Calendar,
  ArrowRight,
  Loader2,
  BookOpen,
} from "lucide-react";
import { useNewsletterData } from "@/hooks/useNewslatterData";

export default function Newsletter() {
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
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!loading) {
      loadArticles();
    }
  }, [filters.currentPage, filters.selectedCategory, filters.searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ currentPage: 1 });
    loadArticles();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white">
      <section className="relative pt-28 pb-16 px-4 md:px-8 border-b border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#1FBFB8]/10 text-[#1FBFB8] px-4 py-2 rounded-full mb-6 border border-[#1FBFB8]/20">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Company Newsletter</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Latest News & Updates
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Stay informed with the latest stories, insights, and announcements
            from PT Batara Dharma Persada.
          </p>
        </div>
      </section>

      {featuredArticles.length > 0 && (
        <section className="py-12 px-4 md:px-8 border-b border-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/newsletter/${article.slug}`}
                  className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#1FBFB8]/40 transition-all"
                >
                  {article.image && (
                    <div className="relative h-48">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-[#1FBFB8] text-sm font-medium">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-bold mt-2 mb-3 group-hover:text-[#1FBFB8] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.name}
                      onClick={() =>
                        updateFilters({
                          selectedCategory: category.name,
                          currentPage: 1,
                        })
                      }
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        filters.selectedCategory === category.name
                          ? "bg-[#1FBFB8]/20 text-[#1FBFB8] border border-[#1FBFB8]/30"
                          : "bg-white/5 text-gray-300 hover:bg-white/10 border border-transparent"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="flex-1">
              <form onSubmit={handleSearch} className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={filters.searchQuery}
                  onChange={(e) =>
                    updateFilters({ searchQuery: e.target.value, currentPage: 1 })
                  }
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1FBFB8]/50"
                />
              </form>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-[#1FBFB8]" />
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-red-400 mb-4">{error}</p>
                  <button
                    onClick={() => loadInitialData()}
                    className="text-[#1FBFB8] hover:underline"
                  >
                    Try again
                  </button>
                </div>
              ) : articles.length > 0 ? (
                <>
                  <div className="grid gap-6">
                    {articles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/newsletter/${article.slug}`}
                        className="group flex flex-col md:flex-row gap-6 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#1FBFB8]/40 transition-all p-6"
                      >
                        {article.image && (
                          <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <span className="text-[#1FBFB8] text-sm font-medium">
                            {article.category}
                          </span>
                          <h3 className="text-xl font-bold mt-1 mb-2 group-hover:text-[#1FBFB8] transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-gray-500 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(article.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {article.readTime} min read
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-[#1FBFB8] self-center hidden md:block" />
                      </Link>
                    ))}
                  </div>

                  {pagination.totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-10">
                      <button
                        onClick={() =>
                          updateFilters({
                            currentPage: Math.max(1, filters.currentPage - 1),
                          })
                        }
                        disabled={!pagination.hasPrev}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg disabled:opacity-50 hover:border-[#1FBFB8]/40 transition-colors"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 text-gray-400">
                        Page {pagination.page} of {pagination.totalPages}
                      </span>
                      <button
                        onClick={() =>
                          updateFilters({
                            currentPage: filters.currentPage + 1,
                          })
                        }
                        disabled={!pagination.hasNext}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg disabled:opacity-50 hover:border-[#1FBFB8]/40 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-400 mb-4">No articles found.</p>
                  <button
                    onClick={clearFilters}
                    className="text-[#1FBFB8] hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
