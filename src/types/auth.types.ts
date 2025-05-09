export interface LoginResponse {
    message: string;
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
      role: 'USER' | 'ADMIN';
      avatar?: string;
      isVerify?: boolean;
      createdAt?: string;
      updatedAt?: string;
    };
  }
  