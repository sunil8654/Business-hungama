import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://businesshungama.com/cms/wp-json/wp/v2';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

class WPClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: WP_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          Cookies.remove('auth_token');
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}

export const wp = new WPClient();
export const api = new ApiClient();

export const wpApi = {
  getPosts: (params?: { 
    categories?: number; 
    tags?: number; 
    author?: number;
    search?: string; 
    slug?: string;
    page?: number; 
    per_page?: number;
    orderby?: string;
    order?: string;
    _embed?: boolean;
  }) => wp.get('/posts', { _embed: true, ...(params || {}) }),

  getPost: (id: number | string) => wp.get(`/posts/${id}`),

  getCategories: (params?: { search?: string; slug?: string; page?: number; per_page?: number; hide_empty?: boolean }) => 
    wp.get('/categories', params),

  getCategory: (id: number | string) => wp.get(`/categories/${id}`),

  getTags: (params?: { search?: string; slug?: string; page?: number; per_page?: number }) => 
    wp.get('/tags', params),

  getTag: (id: number | string) => wp.get(`/tags/${id}`),

  getUsers: (params?: { search?: string; slug?: string; page?: number; per_page?: number }) => wp.get('/users', params),

  getUser: (id: number | string) => wp.get(`/users/${id}`),

  getMedia: (id: number | string) => wp.get(`/media/${id}`),

  getPages: (params?: { page?: number; per_page?: number }) => wp.get('/pages', params),

  getPage: (id: number | string) => wp.get(`/pages/${id}`),

  getComments: (params?: { post?: number; page?: number; per_page?: number }) => 
    wp.get('/comments', params),

  getSearch: (query: string, page = 1, perPage = 10) => 
    wp.get('/posts', { search: query, page, per_page: perPage }),

  getPostBySlug: (slug: string) => wp.get('/posts', { slug, _embed: true }),
};

export const authApi = {
  register: (data: { name: string; email: string; password: string; password_confirmation: string }) =>
    api.post<{ user: unknown; token: string }>('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post<{ user: unknown; token: string }>('/auth/login', data),

  logout: () => api.post('/auth/logout'),

  getUser: () => api.get<unknown>('/auth/user'),

  updateProfile: (data: { name?: string; bio?: string; avatar?: string }) =>
    api.put('/auth/profile', data),

  changePassword: (data: { current_password: string; password: string; password_confirmation: string }) =>
    api.post('/auth/change-password', data),

  forgotPassword: (data: { email: string }) =>
    api.post('/auth/forgot-password/send-otp', data),
  
  verifyPasswordOtp: (data: { email: string; otp: string }) =>
    api.post('/auth/forgot-password/verify-otp', data),
  
  resetPasswordWithOtp: (data: { email: string; reset_token: string; password: string; password_confirmation: string }) =>
    api.post('/auth/forgot-password/reset', data),
  
  resendPasswordOtp: (data: { email: string }) =>
    api.post('/auth/forgot-password/resend-otp', data),

  resetPassword: (data: { email: string; token: string; password: string; password_confirmation: string }) =>
    api.post('/auth/reset-password', data),
};

export const articleApi = {
  getAll: (params?: Record<string, unknown>) => wpApi.getPosts(params),
  getFeatured: () => wpApi.getPosts({ orderby: 'date', per_page: 10 }),
  getTrending: () => wpApi.getPosts({ orderby: 'views', per_page: 10 }),
  getBreaking: () => wpApi.getPosts({ categories: 1, per_page: 5 }),
  getLatest: (params?: Record<string, unknown>) => wpApi.getPosts({ orderby: 'date', ...params }),
  getPremium: (params?: Record<string, unknown>) => wpApi.getPosts({ categories: 2, per_page: 10, ...params }),
  getVideo: () => wpApi.getPosts({ tags: 1, per_page: 10 }),
  getSearch: (params: { q: string; per_page?: number }) => wpApi.getSearch(params.q, 1, params.per_page || 10),
  getBySlug: (slug: string) => wpApi.getPostBySlug(slug),
  getByCategory: async (slug: string, params?: Record<string, unknown>) => {
    const categories = await wpApi.getCategories({ slug, hide_empty: false });
    const catArray = categories as any[];
    if (catArray && catArray.length > 0) {
      return wpApi.getPosts({ categories: catArray[0].id, _embed: true, ...params });
    }
    return wpApi.getPosts({ _embed: true, ...params });
  },
  getByTag: (slug: string, params?: Record<string, unknown>) => wpApi.getPosts({ tags: slug as unknown as number, ...params }),
  getByAuthor: (slug: string, params?: Record<string, unknown>) => wpApi.getPosts({ author: slug as unknown as number, ...params }),
};

export const categoryApi = {
  getAll: () => wpApi.getCategories({ hide_empty: false }),
  getFeatured: () => wpApi.getCategories({ per_page: 20, hide_empty: false }),
  getTree: () => wpApi.getCategories({ hide_empty: false }),
  getBySlug: (slug: string) => wpApi.getCategories({ slug, hide_empty: false }),
};

export const tagApi = {
  getAll: () => wpApi.getTags(),
  getPopular: () => wpApi.getTags({ per_page: 20 }),
  getBySlug: (slug: string) => wpApi.getTags({ search: slug }),
};

export const userApi = {
  getBookmarks: (params?: Record<string, unknown>) => api.get('/user/bookmarks', params),
  addBookmark: (articleId: number) => api.post(`/user/bookmarks/${articleId}`),
  removeBookmark: (articleId: number) => api.delete(`/user/bookmarks/${articleId}`),
  isBookmarked: (articleId: number) => api.get<{ is_bookmarked: boolean }>(`/user/bookmarks/${articleId}/check`),
  getReadingHistory: (params?: Record<string, unknown>) => api.get('/user/reading-history', params),
  clearReadingHistory: () => api.delete('/user/reading-history'),
};

export const subscriptionApi = {
  getPlans: () => api.get<{ plans: unknown[] }>('/subscription/plans'),
  getCurrent: () => api.get<{ subscription: unknown; is_premium: boolean }>('/subscription/current'),
  createCheckout: (planId: string) => api.post<{ url: string; session_id: string }>('/subscription/create-checkout', { plan_id: planId }),
  cancel: () => api.post('/subscription/cancel'),
};

export const commentApi = {
  getByArticle: (articleId: number, params?: Record<string, unknown>) => api.get(`/comments/${articleId}`, params),
  create: (articleId: number, data: { content: string; parent_id?: number }) => api.post(`/comments/${articleId}`, data),
  update: (id: number, data: { content: string }) => api.put(`/comments/${id}`, data),
  delete: (id: number) => api.delete(`/comments/${id}`),
  like: (id: number) => api.post(`/comments/${id}/like`),
};

export const newsletterApi = {
  subscribe: (data: { email: string; name?: string }) => api.post('/newsletter/subscribe', data),
  unsubscribe: (data: { email: string }) => api.post('/newsletter/unsubscribe', data),
};

export const authorApi = {
  getAll: () => wpApi.getUsers(),
  getBySlug: (slug: string) => wpApi.getUsers({ search: slug }),
};
