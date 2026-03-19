export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  slug?: string;
  role: 'user' | 'author' | 'editor' | 'admin';
  subscription_status: 'free' | 'premium' | 'expired';
  subscription_expires_at?: string;
  is_active: boolean;
  created_at: string;
  activeSubscription?: Subscription;
  bookmarks?: Article[];
  readingHistory?: ReadingHistory[];
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  image_caption?: string;
  author_id: number;
  category_id: number;
  is_premium: boolean;
  is_featured: boolean;
  is_trending: boolean;
  is_breaking: boolean;
  is_published: boolean;
  has_video: boolean;
  video_url?: string;
  view_count: number;
  read_time: number;
  meta_title?: string;
  meta_description?: string;
  meta_image?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  author?: User;
  category?: Category;
  tags?: Tag[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
  parent_id?: number;
  order: number;
  is_featured: boolean;
  articles_count?: number;
  children?: Category[];
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  description?: string;
  articles_count?: number;
}

export interface Subscription {
  id: number;
  user_id: number;
  plan_type: 'monthly' | 'yearly';
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  amount: number;
  currency: string;
  start_date: string;
  end_date: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  savings?: string;
  features: string[];
}

export interface Comment {
  id: number;
  article_id: number;
  user_id: number;
  parent_id?: number;
  content: string;
  is_approved: boolean;
  likes_count: number;
  created_at: string;
  user?: User;
  replies?: Comment[];
}

export interface Bookmark {
  id: number;
  user_id: number;
  article_id: number;
  created_at: string;
  article?: Article;
}

export interface ReadingHistory {
  id: number;
  user_id: number;
  article_id: number;
  read_at: string;
  read_percentage: number;
  article?: Article;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from?: number;
  to?: number;
  next_page_url?: string;
  prev_page_url?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
