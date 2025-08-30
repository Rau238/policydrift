import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, delay, of, filter, take } from 'rxjs';
import {
  NewsArticle,
  NewsCategory,
  Author,
  ApiResponse,
  ArticleFilters,
  PaginationParams
} from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiBaseUrl = 'https://api.policydrift.com/v1'; // Future API URL
  private readonly mockDataPath = '/assets/data';

  // Use mock data for now - easily switchable to real API
  private useMockData = true;

  // Cache for better performance
  private articlesCache$ = new BehaviorSubject<NewsArticle[]>([]);
  private categoriesCache$ = new BehaviorSubject<NewsCategory[]>([]);
  private authorsCache$ = new BehaviorSubject<Author[]>([]);

  // Loading states
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeData();
  }

  private initializeData(): void {
    this.loadingSubject.next(true);

    // Load articles
    this.loadArticlesObservable().subscribe({
      next: (articles: NewsArticle[]) => {
        this.articlesCache$.next(articles);
        console.log('Articles loaded:', articles.length);
      },
      error: (error: any) => {
        console.error('Error loading articles:', error);
        this.articlesCache$.next([]);
      }
    });

    // Load categories and authors
    this.loadCategoriesAndAuthorsObservable().subscribe({
      next: (data: { categories: NewsCategory[], authors: Author[] }) => {
        this.categoriesCache$.next(data.categories);
        this.authorsCache$.next(data.authors);
        console.log('Categories loaded:', data.categories.length);
        console.log('Authors loaded:', data.authors.length);
        this.loadingSubject.next(false);
      },
      error: (error: any) => {
        console.error('Error loading categories and authors:', error);
        this.categoriesCache$.next([]);
        this.authorsCache$.next([]);
        this.loadingSubject.next(false);
      }
    });
  }

  // ARTICLES API METHODS

  /**
   * Get all articles with optional filtering and pagination
   */
  getArticles(
    filters?: ArticleFilters,
    pagination?: PaginationParams
  ): Observable<ApiResponse<NewsArticle[]>> {
    if (this.useMockData) {
      return this.getMockArticles(filters, pagination);
    }

    // Future API implementation
    const params = this.buildApiParams(filters, pagination);
    return this.http.get<ApiResponse<NewsArticle[]>>(`${this.apiBaseUrl}/articles`, { params });
  }

  /**
   * Get single article by slug
   */
  getArticleBySlug(slug: string): Observable<ApiResponse<NewsArticle | null>> {
    if (this.useMockData) {
      return this.getMockArticleBySlug(slug);
    }

    return this.http.get<ApiResponse<NewsArticle>>(`${this.apiBaseUrl}/articles/${slug}`);
  }

  /**
   * Get featured articles
   */
  getFeaturedArticles(limit: number = 5): Observable<ApiResponse<NewsArticle[]>> {
    const filters: ArticleFilters = { isFeatured: true };
    const pagination: PaginationParams = { page: 1, limit };

    return this.getArticles(filters, pagination);
  }

  /**
   * Get breaking news articles
   */
  getBreakingNews(limit: number = 3): Observable<ApiResponse<NewsArticle[]>> {
    const filters: ArticleFilters = { isBreaking: true };
    const pagination: PaginationParams = { page: 1, limit };

    return this.getArticles(filters, pagination);
  }

  /**
   * Get articles by category
   */
  getArticlesByCategory(
    categoryId: string,
    pagination?: PaginationParams
  ): Observable<ApiResponse<NewsArticle[]>> {
    const filters: ArticleFilters = { category: categoryId };
    return this.getArticles(filters, pagination);
  }

  /**
   * Get articles by author
   */
  getArticlesByAuthor(
    authorId: string,
    pagination?: PaginationParams
  ): Observable<ApiResponse<NewsArticle[]>> {
    const filters: ArticleFilters = { author: authorId };
    return this.getArticles(filters, pagination);
  }

  /**
   * Search articles
   */
  searchArticles(
    query: string,
    filters?: ArticleFilters,
    pagination?: PaginationParams
  ): Observable<ApiResponse<NewsArticle[]>> {
    const searchFilters: ArticleFilters = { ...filters, search: query };
    return this.getArticles(searchFilters, pagination);
  }

  /**
   * Get related articles
   */
  getRelatedArticles(articleId: string, limit: number = 5): Observable<ApiResponse<NewsArticle[]>> {
    if (this.useMockData) {
      return this.getMockRelatedArticles(articleId, limit);
    }

    return this.http.get<ApiResponse<NewsArticle[]>>(
      `${this.apiBaseUrl}/articles/${articleId}/related?limit=${limit}`
    );
  }

  // CATEGORIES API METHODS

  /**
   * Get all categories
   */
  getCategories(): Observable<ApiResponse<NewsCategory[]>> {
    if (this.useMockData) {
      // Use the cached observable stream to ensure data is loaded
      return this.categoriesCache$.pipe(
        // Take the first emission that has data or when loading is complete
        filter((categories: NewsCategory[]) => categories.length > 0 || !this.loadingSubject.value),
        take(1),
        map((categories: NewsCategory[]) => ({
          data: categories,
          message: 'Categories retrieved successfully',
          status: 'success' as const,
          meta: {
            timestamp: new Date().toISOString(),
            version: '1.0'
          }
        }))
      );
    }

    return this.http.get<ApiResponse<NewsCategory[]>>(`${this.apiBaseUrl}/categories`);
  }

  /**
   * Get category by slug
   */
  getCategoryBySlug(slug: string): Observable<ApiResponse<NewsCategory | null>> {
    return this.getCategories().pipe(
      map(response => ({
        ...response,
        data: response.data.find(cat => cat.slug === slug) || null
      }))
    );
  }

  // AUTHORS API METHODS

  /**
   * Get all authors
   */
  getAuthors(): Observable<ApiResponse<Author[]>> {
    if (this.useMockData) {
      return of({
        data: this.authorsCache$.value,
        message: 'Authors retrieved successfully',
        status: 'success' as const,
        meta: {
          timestamp: new Date().toISOString(),
          version: '1.0'
        }
      }).pipe(delay(200));
    }

    return this.http.get<ApiResponse<Author[]>>(`${this.apiBaseUrl}/authors`);
  }

  /**
   * Get author by ID
   */
  getAuthorById(id: string): Observable<ApiResponse<Author | null>> {
    return this.getAuthors().pipe(
      map(response => ({
        ...response,
        data: response.data.find(author => author.id === id) || null
      }))
    );
  }

  // CACHE MANAGEMENT

  /**
   * Refresh all cached data
   */
  refreshCache(): void {
    this.initializeData();
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.articlesCache$.next([]);
    this.categoriesCache$.next([]);
    this.authorsCache$.next([]);
  }

  // CONFIGURATION

  /**
   * Switch between mock data and real API
   */
  setDataSource(useMock: boolean): void {
    this.useMockData = useMock;
    if (!useMock) {
      this.refreshCache();
    }
  }

  // PRIVATE HELPER METHODS

  private loadArticlesObservable(): Observable<NewsArticle[]> {
    if (this.useMockData) {
      return this.http.get<any>(`${this.mockDataPath}/articles.json`).pipe(
        map(response => response.articles || []),
        delay(500) // Simulate network delay
      );
    }

    return this.http.get<ApiResponse<NewsArticle[]>>(`${this.apiBaseUrl}/articles`).pipe(
      map(response => response?.data || [])
    );
  }

  private loadCategoriesAndAuthorsObservable(): Observable<{ categories: NewsCategory[], authors: Author[] }> {
    if (this.useMockData) {
      return this.http.get<any>(`${this.mockDataPath}/categories-authors.json`).pipe(
        map(response => ({
          categories: response.categories || [],
          authors: response.authors || []
        })),
        delay(300) // Simulate network delay
      );
    }

    // For future API implementation
    return this.http.get<any>(`${this.apiBaseUrl}/categories-authors`).pipe(
      map(response => ({
        categories: response.categories || [],
        authors: response.authors || []
      }))
    );
  }

  private getMockArticles(
    filters?: ArticleFilters,
    pagination?: PaginationParams
  ): Observable<ApiResponse<NewsArticle[]>> {
    // Wait for articles to be loaded if cache is empty
    return this.articlesCache$.pipe(
      // Take the first emission that has data or when loading is complete
      filter((cachedArticles: NewsArticle[]) => cachedArticles.length > 0 || !this.loadingSubject.value),
      take(1),
      map((cachedArticles: NewsArticle[]) => {
        let articles = [...cachedArticles];

        // Apply filters
        if (filters) {
          articles = this.applyFilters(articles, filters);
        }

        // Apply sorting
        articles = this.applySorting(articles, filters?.sortBy, filters?.sortOrder);

        // Calculate total before pagination
        const total = articles.length;

        // Apply pagination
        if (pagination) {
          const startIndex = (pagination.page - 1) * pagination.limit;
          articles = articles.slice(startIndex, startIndex + pagination.limit);
        }

        return {
          data: articles,
          message: 'Articles retrieved successfully',
          status: 'success' as const,
          pagination: pagination ? {
            page: pagination.page || 1,
            limit: pagination.limit || 10,
            total,
            totalPages: Math.ceil(total / (pagination.limit || 10))
          } : undefined,
          meta: {
            timestamp: new Date().toISOString(),
            version: '1.0'
          }
        };
      }),
      delay(200) // Small delay to simulate network
    );
  }

  private getMockArticleBySlug(slug: string): Observable<ApiResponse<NewsArticle | null>> {
    const article = this.articlesCache$.value.find(a => a.slug === slug) || null;

    return of({
      data: article,
      message: article ? 'Article retrieved successfully' : 'Article not found',
      status: article ? ('success' as const) : ('error' as const),
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0'
      }
    }).pipe(delay(300));
  }

  private getMockRelatedArticles(articleId: string, limit: number): Observable<ApiResponse<NewsArticle[]>> {
    const article = this.articlesCache$.value.find(a => a.id === articleId);
    let relatedArticles: NewsArticle[] = [];

    if (article && article.relatedArticles) {
      relatedArticles = article.relatedArticles
        .map(id => this.articlesCache$.value.find(a => a.id === id))
        .filter(a => a !== undefined) as NewsArticle[];
    }

    // If no related articles specified, get articles from same category
    if (relatedArticles.length === 0 && article) {
      relatedArticles = this.articlesCache$.value
        .filter(a => a.id !== articleId && a.category === article.category)
        .slice(0, limit);
    }

    return of({
      data: relatedArticles.slice(0, limit),
      message: 'Related articles retrieved successfully',
      status: 'success' as const,
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0'
      }
    }).pipe(delay(200));
  }

  private applyFilters(articles: NewsArticle[], filters: ArticleFilters): NewsArticle[] {
    return articles.filter(article => {
      if (filters.category && article.category !== filters.category) return false;
      if (filters.author && article.author.id !== filters.author) return false;
      if (filters.isBreaking !== undefined && article.isBreaking !== filters.isBreaking) return false;
      if (filters.isFeatured !== undefined && article.isFeatured !== filters.isFeatured) return false;
      if (filters.tags?.length && !filters.tags.some(tag => article.tags.includes(tag))) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const titleMatch = article.title.toLowerCase().includes(searchLower);
        const excerptMatch = article.excerpt.toLowerCase().includes(searchLower);
        const contentMatch = article.content.toLowerCase().includes(searchLower);
        if (!titleMatch && !excerptMatch && !contentMatch) return false;
      }
      if (filters.dateFrom) {
        const articleDate = new Date(article.publishedDate);
        const fromDate = new Date(filters.dateFrom);
        if (articleDate < fromDate) return false;
      }
      if (filters.dateTo) {
        const articleDate = new Date(article.publishedDate);
        const toDate = new Date(filters.dateTo);
        if (articleDate > toDate) return false;
      }

      return true;
    });
  }

  private applySorting(
    articles: NewsArticle[],
    sortBy: string = 'date',
    sortOrder: string = 'desc'
  ): NewsArticle[] {
    return articles.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'date':
          comparison = new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
          break;
        case 'views':
          comparison = a.stats.views - b.stats.views;
          break;
        case 'likes':
          comparison = a.stats.likes - b.stats.likes;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  private buildApiParams(filters?: ArticleFilters, pagination?: PaginationParams): any {
    const params: any = {};

    if (filters) {
      if (filters.category) params.category = filters.category;
      if (filters.author) params.author = filters.author;
      if (filters.tags?.length) params.tags = filters.tags.join(',');
      if (filters.isBreaking !== undefined) params.isBreaking = filters.isBreaking;
      if (filters.isFeatured !== undefined) params.isFeatured = filters.isFeatured;
      if (filters.search) params.search = filters.search;
      if (filters.dateFrom) params.dateFrom = filters.dateFrom;
      if (filters.dateTo) params.dateTo = filters.dateTo;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.sortOrder) params.sortOrder = filters.sortOrder;
    }

    if (pagination) {
      params.page = pagination.page;
      params.limit = pagination.limit;
    }

    return params;
  }
}
