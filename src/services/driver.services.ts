import { 
  DriverUpdate,
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


// Driver Update Services
export const driverService = {
  getAll: async (): Promise<DriverUpdate[]> => {
    const token = getToken();
    const response = await fetch(`${API_URL}/driver-updates`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse(response);
    return data.data || [];
  },

  getLatest: async (): Promise<DriverUpdate> => {
    const token = getToken();
    const response = await fetch(`${API_URL}/driver-updates/latest`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse(response);
    return data.data!;
  },

  create: async (formData: FormData): Promise<DriverUpdate> => {
    const token = getToken();
    const response = await fetch(`${API_URL}/driver-updates`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await handleResponse(response);
    return data.data!;
  },

  update: async (id: string, formData: FormData): Promise<DriverUpdate> => {
    const token = getToken();
    const response = await fetch(`${API_URL}/driver-updates/${id}`, {
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
    const response = await fetch(`${API_URL}/driver-updates/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  }
};