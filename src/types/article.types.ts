// src/types/article.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'STAFF' | 'AUTHOR';
  department: 'PRODUCTION' | 'PROCUREMENT' | 'HRGA' | 'FINANCE' | 'PLANT' | 'IT' | 'HSE' | 'OPERATIONS';
  avatar?: string;
}

export interface Author {
  name: string;
  avatar?: string;
  department: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  featured: boolean;
  published: boolean;
  views: number;
  readTime: number;
  category: string;
  tags: string[];
  authorId: string;
  author: {
    name: string;
    avatar?: string;
    department: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CreateArticleData {
  title: string;
  content: string;
  category: string;
  excerpt?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  image?: File;
}

export interface UpdateArticleData {
  title?: string;
  content?: string;
  category?: string;
  excerpt?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  image?: File;
}

export interface ArticleFilters {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  published?: boolean;
  search?: string;
  authorId?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ArticleListResponse {
  message: string;
  articles: Article[];
  pagination: PaginationInfo;
}

export interface ArticleResponse {
  message: string;
  article: Article;
}

export interface ArticleStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  featuredArticles: number;
  totalViews: number;
}

export interface ArticleStatsResponse {
  message: string;
  stats: ArticleStats;
}

export interface DeleteArticleResponse {
  message: string;
}