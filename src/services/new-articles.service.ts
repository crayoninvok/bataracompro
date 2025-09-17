// src/services/article.service.ts
import { fetchApi, getAuthHeader } from './api-services';
import {
  Article,
  CreateArticleData,
  UpdateArticleData,
  ArticleFilters,
  ArticleListResponse,
  ArticleResponse,
  ArticleStatsResponse,
  DeleteArticleResponse,
} from '@/types/article.types';

export class ArticleService {
  private static readonly BASE_PATH = '/articles';

  /**
   * Get all articles with optional filters and pagination
   */
  static async getArticles(filters?: ArticleFilters): Promise<ArticleListResponse> {
    const params = new URLSearchParams();
    
    if (filters) {
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.category) params.append('category', filters.category);
      if (filters.featured !== undefined) params.append('featured', filters.featured.toString());
      if (filters.published !== undefined) params.append('published', filters.published.toString());
      if (filters.search) params.append('search', filters.search);
      if (filters.authorId) params.append('authorId', filters.authorId);
    }

    const queryString = params.toString();
    const endpoint = queryString ? `${this.BASE_PATH}?${queryString}` : this.BASE_PATH;

    return fetchApi<ArticleListResponse>(endpoint);
  }

  /**
   * Get a single article by slug
   */
  static async getArticleBySlug(slug: string): Promise<ArticleResponse> {
    return fetchApi<ArticleResponse>(`${this.BASE_PATH}/${slug}`);
  }

  /**
   * Create a new article
   */
  static async createArticle(data: CreateArticleData): Promise<ArticleResponse> {
    const formData = new FormData();
    
    // Add text fields
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('category', data.category);
    
    if (data.excerpt) formData.append('excerpt', data.excerpt);
    if (data.tags && data.tags.length > 0) {
      formData.append('tags', JSON.stringify(data.tags));
    }
    if (data.featured !== undefined) {
      formData.append('featured', data.featured.toString());
    }
    if (data.published !== undefined) {
      formData.append('published', data.published.toString());
    }
    
    // Add image file if provided
    if (data.image) {
      formData.append('image', data.image);
    }

    // Use fetch directly for FormData (don't use fetchApi as it sets JSON headers)
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
    
    try {
      const response = await fetch(`${API_URL}${this.BASE_PATH}`, {
        method: 'POST',
        headers: {
          ...getAuthHeader(),
          // Don't set Content-Type for FormData - browser will set it with boundary
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw {
          message: responseData.message || "Failed to create article",
          status: response.status,
        };
      }

      return responseData as ArticleResponse;
    } catch (error) {
      console.error("Create article error:", error);
      throw error;
    }
  }

  /**
   * Update an existing article
   */
  static async updateArticle(id: string, data: UpdateArticleData): Promise<ArticleResponse> {
    const formData = new FormData();
    
    // Add text fields (only if provided)
    if (data.title) formData.append('title', data.title);
    if (data.content) formData.append('content', data.content);
    if (data.category) formData.append('category', data.category);
    if (data.excerpt) formData.append('excerpt', data.excerpt);
    if (data.tags !== undefined) {
      formData.append('tags', JSON.stringify(data.tags));
    }
    if (data.featured !== undefined) {
      formData.append('featured', data.featured.toString());
    }
    if (data.published !== undefined) {
      formData.append('published', data.published.toString());
    }
    
    // Add image file if provided
    if (data.image) {
      formData.append('image', data.image);
    }

    // Use fetch directly for FormData
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
    
    try {
      const response = await fetch(`${API_URL}${this.BASE_PATH}/${id}`, {
        method: 'PUT',
        headers: {
          ...getAuthHeader(),
          // Don't set Content-Type for FormData
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw {
          message: responseData.message || "Failed to update article",
          status: response.status,
        };
      }

      return responseData as ArticleResponse;
    } catch (error) {
      console.error("Update article error:", error);
      throw error;
    }
  }

  /**
   * Delete an article
   */
  static async deleteArticle(id: string): Promise<DeleteArticleResponse> {
    return fetchApi<DeleteArticleResponse>(`${this.BASE_PATH}/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });
  }

  /**
   * Get article statistics
   */
  static async getArticleStats(): Promise<ArticleStatsResponse> {
    return fetchApi<ArticleStatsResponse>(`${this.BASE_PATH}/stats/summary`, {
      headers: {
        ...getAuthHeader(),
      },
    });
  }

  /**
   * Get published articles only (public)
   */
  static async getPublishedArticles(filters?: Omit<ArticleFilters, 'published'>): Promise<ArticleListResponse> {
    return this.getArticles({
      ...filters,
      published: true,
    });
  }

  /**
   * Get featured articles (public)
   */
  static async getFeaturedArticles(limit = 5): Promise<ArticleListResponse> {
    return this.getArticles({
      featured: true,
      published: true,
      limit,
    });
  }

  /**
   * Get articles by category (public)
   */
  static async getArticlesByCategory(
    category: string, 
    filters?: Omit<ArticleFilters, 'category'>
  ): Promise<ArticleListResponse> {
    return this.getArticles({
      ...filters,
      category,
      published: true,
    });
  }

  /**
   * Search articles (public)
   */
  static async searchArticles(
    searchQuery: string, 
    filters?: Omit<ArticleFilters, 'search'>
  ): Promise<ArticleListResponse> {
    return this.getArticles({
      ...filters,
      search: searchQuery,
      published: true,
    });
  }

  /**
   * Get user's own articles (authenticated)
   */
  static async getMyArticles(filters?: ArticleFilters): Promise<ArticleListResponse> {
    const endpoint = `${this.BASE_PATH}/auth/me/articles`;

    return fetchApi<ArticleListResponse>(endpoint, {
      method: 'POST',  // Use POST to send the filters as body
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json', // Ensure content type is JSON
      },
      body: JSON.stringify(filters),  // Send filters in the body
    });
  }

  /**
   * Get articles by author (public)
   */
  static async getArticlesByAuthor(
    authorId: string, 
    filters?: Omit<ArticleFilters, 'authorId'>
  ): Promise<ArticleListResponse> {
    return this.getArticles({
      ...filters,
      authorId,
      published: true,
    });
  }

  /**
   * Bulk operations (admin/manager only)
   */
  static async bulkUpdateArticles(
    articleIds: string[], 
    updates: Partial<Pick<UpdateArticleData, 'featured' | 'published' | 'category'>>
  ): Promise<{ message: string; updatedCount: number }> {
    return fetchApi<{ message: string; updatedCount: number }>(`${this.BASE_PATH}/bulk/update`, {
      method: 'PUT',
      headers: {
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        articleIds,
        updates,
      }),
    });
  }

  static async bulkDeleteArticles(articleIds: string[]): Promise<{ message: string; deletedCount: number }> {
    return fetchApi<{ message: string; deletedCount: number }>(`${this.BASE_PATH}/bulk/delete`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        articleIds,
      }),
    });
  }

  /**
   * Utility methods
   */
  
  /**
   * Get article categories (public)
   */
  static async getCategories(): Promise<{ categories: string[] }> {
    return fetchApi<{ categories: string[] }>(`${this.BASE_PATH}/categories`);
  }

  /**
   * Get popular tags (public)
   */
  static async getPopularTags(limit = 20): Promise<{ tags: string[] }> {
    return fetchApi<{ tags: string[] }>(`${this.BASE_PATH}/tags/popular?limit=${limit}`);
  }

  /**
   * Validate article data before submission
   */
  static validateArticleData(data: CreateArticleData | UpdateArticleData): string[] {
    const errors: string[] = [];

    if ('title' in data && data.title) {
      if (data.title.length < 3) {
        errors.push('Title must be at least 3 characters long');
      }
      if (data.title.length > 200) {
        errors.push('Title must not exceed 200 characters');
      }
    }

    if ('content' in data && data.content) {
      if (data.content.length < 10) {
        errors.push('Content must be at least 10 characters long');
      }
      if (data.content.length > 50000) {
        errors.push('Content must not exceed 50,000 characters');
      }
    }

    if ('category' in data && data.category) {
      if (data.category.length < 2) {
        errors.push('Category must be at least 2 characters long');
      }
    }

    if ('excerpt' in data && data.excerpt) {
      if (data.excerpt.length > 500) {
        errors.push('Excerpt must not exceed 500 characters');
      }
    }

    if ('tags' in data && data.tags) {
      if (data.tags.length > 10) {
        errors.push('Maximum 10 tags allowed');
      }
      
      data.tags.forEach((tag, index) => {
        if (tag.length < 2) {
          errors.push(`Tag ${index + 1} must be at least 2 characters long`);
        }
        if (tag.length > 50) {
          errors.push(`Tag ${index + 1} must not exceed 50 characters`);
        }
      });
    }

    if ('image' in data && data.image) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (data.image.size > maxSize) {
        errors.push('Image size must not exceed 5MB');
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(data.image.type)) {
        errors.push('Image must be in JPEG, PNG, or WebP format');
      }
    }

    return errors;
  }
  
}