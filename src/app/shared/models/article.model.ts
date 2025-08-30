export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  subcategory?: string;
  timeAgo: string;
  readTime: string;
  gradient: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  publishedDate: string; // ISO date string
  publishedTimestamp: number;
  modifiedDate?: string;
  author: Author;
  tags: string[];
  image: ArticleImage;
  seo: ArticleSEO;
  stats: ArticleStats;
  relatedArticles?: string[]; // Array of article IDs
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  email?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface ArticleImage {
  url: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
}

export interface ArticleSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  twitterImage?: string;
}

export interface ArticleStats {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  readingTime: number; // in minutes
  wordCount: number;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  articleCount: number;
  badge: string;
  icon: string;
  gradient: string;
  badgeColor: string;
  isActive: boolean;
  parentCategory?: string;
  subcategories?: string[];
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: 'success' | 'error';
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  meta?: {
    timestamp: string;
    version: string;
  };
}

export interface ArticleFilters {
  category?: string;
  author?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  sortBy?: 'date' | 'views' | 'likes' | 'title';
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
