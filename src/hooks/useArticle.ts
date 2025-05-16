import { useState, useEffect } from 'react';
import { Article } from '../types/adminemploye';

// Define the structure of the article service for DI
export interface ArticleService {
  getAll: (type?: string, published?: boolean) => Promise<Article[]>;
  getBySlug: (slug: string) => Promise<Article>;
  create: (formData: FormData) => Promise<Article>;
  update: (id: string, formData: FormData) => Promise<Article>;
  delete: (id: string) => Promise<any>;
}

export const useArticles = (
  articleService: ArticleService, 
  type?: string, 
  published?: boolean
) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await articleService.getAll(type, published);
        setArticles(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [articleService, type, published]);

  return { articles, loading, error };
};

export const useArticle = (articleService: ArticleService, slug: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const data = await articleService.getBySlug(slug);
        setArticle(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleService, slug]);

  return { article, loading, error };
};

export const useArticleSubmit = (articleService: ArticleService) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createArticle = async (formData: FormData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await articleService.create(formData);
      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create article');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = async (id: string, formData: FormData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await articleService.update(id, formData);
      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update article');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createArticle, updateArticle, loading, error, success };
};