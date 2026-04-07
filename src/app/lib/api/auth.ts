import { api } from './client';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../../types';

export const authAPI = {
  login: (data: LoginRequest) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    return api.post<AuthResponse>('/auth/token', formData);
  },
  register: (data: RegisterRequest) => api.post<User>('/auth/register', data),
  refresh: (refreshToken: string) =>
    api.post<AuthResponse>('/auth/refresh', { refresh_token: refreshToken }),
  getMe: () => api.get<User>('/auth/me'),
};
