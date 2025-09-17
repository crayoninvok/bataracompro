// hooks/useNewsletterData.ts
import { useState } from "react";
import { ArticleService } from "@/services/new-articles.service";
import { Article, ArticleListResponse } from "@/types/article.types";
import { Globe, Briefcase } from "lucide-react";
import { categoryIcons, CategoryInfo } from "@/lib/constants";

const POSTS_PER_PAGE = 6;

export function useNewsletterData() {
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