import { 
  AuthResponse,
  Article,
  DriverUpdate,
  Document,
  ApiResponse
} from '../types/adminemploye';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw { response: { data } };
  }
  return data;
};

// Get auth token from storage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};


// Article Services
export const articleService = {
  getAll: async (type?: string, published?: boolean): Promise<Article[]> => {
    let url = `${API_URL}/articles`;
    
    // Add query parameters if needed
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (published !== undefined) params.append('published', published.toString());
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await handleResponse(response);
    return data.data || [];
  },

  getBySlug: async (slug: string): Promise<Article> => {
    const response = await fetch(`${API_URL}/articles/${slug}`, {
      method: 'GET',
    });
    const data = await handleResponse(response);
    return data.data!;
  },

  create: async (formData: FormData): Promise<Article> => {
    const token = getToken();
    const response = await fetch(`${API_URL}/articles`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await handleResponse(response);
    return data.data!;
  },

  update: async (id: string, formData: FormData): Promise<Article> => {
    const token = getToken();
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await handleResponse(response);
    return data.data!;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const token = getToken();
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  }
};