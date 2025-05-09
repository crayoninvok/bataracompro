import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthService } from '@/services/auth.service';
import { LoginResponse } from '@/types/auth.types';
import Swal from 'sweetalert2';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export function useAuth() {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken) {
      setToken(storedToken);

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem(USER_KEY);
        }
      } else {
        AuthService.getProfile(storedToken)
          .then((profile) => {
            setUser(profile);
            localStorage.setItem(USER_KEY, JSON.stringify(profile));
          })
          .catch(async () => {
            await Swal.fire({
              icon: 'warning',
              title: 'Sesi telah berakhir',
              text: 'Silakan login kembali.',
              confirmButtonColor: '#2563EB',
            });
            logout();
          });
      }
    }

    // Optional redirect if already logged in and on /login
    // if (storedToken && pathname === '/login') {
    //   router.push('/profile');
    // }

  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await AuthService.login({ email, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const result = await Swal.fire({
      title: 'Keluar dari akun?',
      text: 'Anda akan keluar dari sesi saat ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563EB',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, keluar',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setToken(null);
      setUser(null);

      await Swal.fire({
        icon: 'success',
        title: 'Berhasil keluar',
        showConfirmButton: false,
        timer: 1500,
      });

      router.push('/login');
    }
  };

  const refreshProfile = async () => {
    if (!token) return;
    const profile = await AuthService.getProfile(token);
    setUser(profile);
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
  };

  return {
    user,
    token,
    loading,
    login,
    logout,
    refreshProfile,
    isLoggedIn: Boolean(user),
  };
}
