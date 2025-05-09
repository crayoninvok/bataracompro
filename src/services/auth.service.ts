// src/services/auth.service.ts
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export const AuthService = {
  async register(data: { email: string; password: string; name: string; avatar?: string }) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },

  async login(data: { email: string; password: string }) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  async verify(token: string) {
    const res = await fetch(`${API_URL}/auth/verifyuser/${token}`, {
      method: 'GET',
    });

    if (!res.ok) throw new Error('Verification failed');
    return res.json();
  },

  async getProfile(token: string) {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  },
};
