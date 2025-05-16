import { 
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

// Document Services
export const documentService = {
  upload: async (formData: FormData): Promise<Document> => {
    const token = getToken();
    const response = await fetch(`${API_URL}/documents/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await handleResponse(response);
    return data.data!;
  },

  getUserDocuments: async (userId: string): Promise<Document[]> => {
    const token = getToken();
    const response = await fetch(`${API_URL}/documents/user/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse(response);
    return data.data || [];
  },

  getDocument: async (id: string): Promise<Document> => {
    const token = getToken();
    const response = await fetch(`${API_URL}/documents/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse(response);
    return data.data!;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const token = getToken();
    const response = await fetch(`${API_URL}/documents/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  }
};