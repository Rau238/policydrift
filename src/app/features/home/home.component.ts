import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { SeoService } from '../../shared/services/seo.service';
import { DataService } from '../../shared/services/data.service';
import { NewsArticle, NewsCategory } from '../../shared/models/article.model';
import { CardSkeletonComponent } from '../../shared/skeleton/card-skeleton.component';
import { GradientGenerators, generateRandomGradient, GradientManager } from '../../utils/gradient.utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CardSkeletonComponent
  ],
  template: `
    <div class="min-h-screen bg-white">

      <main class="max-w-7xl mx-auto px-4 py-8">

        <!-- Category Filter Section -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-gray-900">Browse Articles</h2>
            <div class="flex items-center gap-3">
              <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {{ getFilteredArticlesCount() }} of {{ getArticleCount() }} articles
              </span>
            </div>
          </div>

          <!-- Category Buttons -->
          <div class="flex flex-wrap gap-2 mb-6">
            <!-- Loading skeleton for categories -->
            <ng-container *ngIf="loading(); else categoriesLoaded">
              <app-card-skeleton
                *ngFor="let i of [1,2,3,4,5,6]"
                variant="category"
                height="60px"
                width="120px"
                [showLoadingIndicator]="false"
                theme="green"
                rounded="xl">
              </app-card-skeleton>
            </ng-container>

            <!-- Actual categories -->
            <ng-template #categoriesLoaded>
              <button
                *ngFor="let category of categories(); trackBy: trackByCategory"
                (click)="setActiveCategory(category.id)"
                class="category-pill"
                [class.active]="activeCategory() === category.id"
                [ngClass]="getCategoryButtonClasses(category)">
                <span class="pill-icon">{{ category.icon }}</span>
                <span class="pill-name">{{ category.name }}</span>
                <span class="pill-badge">{{ category.articleCount }}</span>
              </button>
            </ng-template>
          </div>
        </div>        <!-- Featured Story -->
        <div class="mb-12">
          <!-- Loading skeleton for featured article -->
          <ng-container *ngIf="loading(); else featuredLoaded">
            <app-card-skeleton
              variant="featured"
              height="400px"
              [showProgress]="true"
              [showLoadingIndicator]="true"
              theme="purple">
            </app-card-skeleton>
          </ng-container>

          <!-- Actual featured article -->
          <ng-template #featuredLoaded>
            <article class="bg-white" *ngIf="getDisplayedArticles().length > 0">
              <a [routerLink]="['/article', getDisplayedArticles()[0].slug]" class="block group">
                <div class="mb-6">
                  <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <span class="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">BREAKING</span>
                    <span>{{ getDisplayedArticles()[0].timeAgo }}</span>
                  </div>
                  <h1 class="text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                    {{ getDisplayedArticles()[0].title }}
                  </h1>
                  <p class="text-xl text-gray-600 leading-relaxed mb-6">
                    {{ getDisplayedArticles()[0].excerpt }}
                  </p>
                </div>
              </a>

              <!-- Article Stats -->
              <div class="flex items-center space-x-6 text-sm text-gray-500 mb-8">
              <span class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{{ getArticleCount() }} Articles</span>
              </span>
              <span class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
                </svg>
                <span>{{ getQuoteCount() }} Quotes</span>
              </span>
              <span class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                </svg>
                <span>{{ getQuestionCount() }} Questions</span>
              </span>
            </div>
          </article>
          </ng-template>
        </div>

        <!-- Content Sections -->
        <div class="space-y-12">

          <!-- Articles Section -->
          <section>
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">Articles {{ getArticleCount() }}</h2>
              <a [routerLink]="['/articles']" class="text-sm text-blue-600 hover:text-blue-700 font-medium">View all articles</a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Loading skeleton for articles -->
              <ng-container *ngIf="loading(); else articlesLoaded">
                <app-card-skeleton
                  *ngFor="let i of [1,2,3,4,5,6]"
                  variant="article"
                  height="320px"
                  [showProgress]="true"
                  [showLoadingIndicator]="true"
                  theme="blue">
                </app-card-skeleton>
              </ng-container>

              <!-- Actual articles -->
              <ng-template #articlesLoaded>
                <article
                  *ngFor="let article of getDisplayedArticles().slice(1); trackBy: trackByArticle; let i = index"
                  class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-full h-80 group cursor-pointer">

                <a [routerLink]="['/article', article.slug]" class="block h-full w-full">
                  <!-- Background image placeholder based on category -->
                  <img
                    [src]="getArticleImage(article.category)"
                    [alt]="article.category"
                    class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500">

                  <!-- Dynamic gradient overlay with enhanced variety -->
                  <div
                    class="absolute inset-0 bg-gradient-to-t gradient-overlay"
                    [ngClass]="getArticleGradientWithIntensity(article.id, i + 1)"></div>

                  <!-- Category badge -->
                  <div class="absolute top-4 left-4 z-10">
                    <span class="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                      {{ article.category }}
                    </span>
                  </div>

                  <!-- Time and read time -->
                  <div class="absolute top-4 right-4 z-10 text-white/80 text-xs">
                    {{ article.timeAgo }} • {{ article.readTime }}
                  </div>

                  <!-- Content -->
                  <div class="relative z-10">
                    <h3 class="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-white/90 transition-colors duration-200">
                      {{ article.title }}
                    </h3>
                    <p class="text-white/80 text-sm leading-relaxed line-clamp-2">
                      {{ article.excerpt }}
                    </p>
                  </div>
                </a>
              </article>
              </ng-template>
            </div>
          </section>

          <!-- More News Section -->
          <section>
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">All Articles</h2>
              <div class="flex items-center space-x-4">
                <!-- Sort Controls -->
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-500">Sort by:</span>
                  <button
                    (click)="setSortBy('date')"
                    [class.text-blue-600]="sortBy() === 'date'"
                    [class.font-medium]="sortBy() === 'date'"
                    class="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Date
                  </button>
                  <span class="text-gray-300">|</span>
                  <button
                    (click)="setSortBy('category')"
                    [class.text-blue-600]="sortBy() === 'category'"
                    [class.font-medium]="sortBy() === 'category'"
                    class="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Category
                  </button>
                  <button
                    (click)="toggleSortOrder()"
                    class="ml-2 p-1 text-gray-600 hover:text-blue-600 transition-colors">
                    <svg class="w-4 h-4 transform transition-transform"
                         [class.rotate-180]="sortOrder() === 'asc'"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                </div>
                <a
                  [routerLink]="['/articles']"
                  class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </a>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <article
                *ngFor="let article of getDisplayedArticles(); trackBy: trackByArticle; let i = index"
                class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-full h-80 group cursor-pointer">

                <a [routerLink]="['/article', article.slug]" class="block h-full w-full">
                  <!-- Background image based on category -->
                  <img
                    [src]="getArticleImage(article.category)"
                    [alt]="article.category"
                    class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500">

                  <!-- Dynamic gradient overlay with enhanced variety based on position -->
                  <div
                    class="absolute inset-0 bg-gradient-to-t gradient-overlay"
                    [ngClass]="getArticleGradientWithIntensity(article.id, i)"></div>

                  <!-- Category badge -->
                  <div class="absolute top-4 left-4 z-10">
                    <span class="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                      {{ article.category }}
                    </span>
                  </div>

                  <!-- Time and read time -->
                  <div class="absolute top-4 right-4 z-10 text-white/80 text-xs">
                    {{ article.timeAgo }} • {{ article.readTime }}
                  </div>

                  <!-- Content -->
                  <div class="relative z-10">
                    <h3 class="text-xl font-bold text-white mb-2 leading-tight group-hover:text-white/90 transition-colors duration-200">
                      {{ article.title }}
                    </h3>
                    <p class="text-white/80 text-sm leading-relaxed line-clamp-2">
                      {{ article.excerpt }}
                    </p>
                  </div>
                </a>
              </article>
            </div>

            <div class="text-center mt-8" *ngIf="hasMoreArticles()">
              <button
                (click)="loadMoreArticles()"
                [disabled]="isLoadingMore()"
                class="text-blue-600 hover:text-blue-700 font-medium text-sm border border-blue-200 hover:border-blue-300 px-6 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto">
                <span *ngIf="!isLoadingMore()">Load More Articles</span>
                <span *ngIf="isLoadingMore()">Loading...</span>
                <svg *ngIf="isLoadingMore()" class="animate-spin -ml-1 mr-3 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>

            <div class="text-center mt-8" *ngIf="!hasMoreArticles() && displayedArticlesCount() > 6">
              <p class="text-gray-500 text-sm">You've reached the end of all articles!</p>
            </div>
          </section>

        </div>
      </main>

    </div>
  `,
  styles: [`
    a {
      text-decoration: none !important;
    }

    a:hover {
      text-decoration: none !important;
    }

    /* Enhanced Styles */
    .category-card {
      @apply rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:scale-105;
      min-height: 320px;
    }

    .category-sidebar-card {
      @apply rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105;
    }

    .category-icon-small {
      @apply transform group-hover:scale-110 transition-transform duration-300;
    }

    .category-badge-small {
      @apply px-2 py-1 rounded-full font-bold text-xs;
    }

    .featured-news-card {
      @apply relative overflow-hidden bg-white rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1;
      min-height: 300px;
    }

    .category-content {
      @apply text-white h-full flex flex-col;
    }

    .category-icon {
      @apply mb-6 transform group-hover:scale-110 transition-transform duration-300;
    }

    .category-title {
      @apply text-2xl font-bold mb-3;
    }

    .category-desc {
      @apply text-white/90 text-base mb-6 leading-relaxed flex-grow;
    }

    .category-stats {
      @apply flex items-center justify-between text-sm mt-auto;
    }

    .category-badge {
      @apply px-3 py-1 rounded-full font-bold text-sm;
    }

    .category-btn {
      @apply px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105;
    }

    .news-card {
      @apply bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-105;
      min-height: 380px;
    }

    .news-image {
      @apply h-48 w-full flex items-center justify-center relative overflow-hidden;
    }

    .news-content {
      @apply p-5 flex flex-col h-full;
    }

    .news-category {
      @apply text-xs font-bold text-blue-600 uppercase tracking-wider mb-2;
    }

    .news-title {
      @apply text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight;
    }

    .news-excerpt {
      @apply text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow;
    }

    .news-meta {
      @apply flex items-center text-sm text-gray-500 mt-auto;
    }

    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .bg-tech { @apply bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600; }
    .bg-business { @apply bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600; }
    .bg-sports { @apply bg-gradient-to-br from-orange-500 via-red-500 to-pink-600; }
    .bg-world { @apply bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600; }
    .bg-health { @apply bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600; }
    .bg-entertainment { @apply bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600; }

    /* Category Filter Pills - Clean & Compact */
    .category-pill {
      @apply inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border transition-all duration-200;
      @apply bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300;
      @apply cursor-pointer select-none outline-none focus:ring-2 focus:ring-blue-500/20;
    }

    .category-pill.active {
      @apply bg-blue-600 border-blue-600 text-white shadow-sm;
    }

    .category-pill:hover:not(.active) {
      @apply transform scale-105;
    }

    .pill-icon {
      @apply text-sm leading-none;
    }

    .pill-name {
      @apply font-medium truncate;
    }

    .pill-badge {
      @apply text-xs px-1.5 py-0.5 rounded-full bg-gray-200 text-gray-600 font-medium;
      @apply min-w-[18px] text-center leading-none;
    }

    .category-pill.active .pill-badge {
      @apply bg-white/20 text-white;
    }

    /* Gradient Refresh Button */
    .gradient-refresh-btn {
      @apply text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded-full;
      @apply transition-all duration-200 cursor-pointer select-none;
      @apply hover:scale-105 active:scale-95;
    }

    /* Enhanced gradient transitions */
    .gradient-overlay {
      @apply transition-all duration-700 ease-in-out;
    }

    .gradient-overlay:hover {
      @apply opacity-90;
    }

    /* Legacy skeleton support (for other components) */
    .common-skeleton {
      @apply relative overflow-hidden rounded-2xl w-full h-80 bg-gray-200;
      animation: pulse 2s infinite;
    }

    .skeleton-shimmer {
      @apply absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent;
      animation: shimmer 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .badge-hot { @apply bg-red-500/90 text-white; }
    .badge-trending { @apply bg-orange-500/90 text-white; }
    .badge-live { @apply bg-green-500/90 text-white; }
    .badge-breaking { @apply bg-purple-500/90 text-white; }
    .badge-popular { @apply bg-blue-500/90 text-white; }
    .badge-new { @apply bg-pink-500/90 text-white; }

    /* Animation classes */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }

    .animate-fade-in-up:nth-child(1) { animation-delay: 0.1s; }
    .animate-fade-in-up:nth-child(2) { animation-delay: 0.2s; }
    .animate-fade-in-up:nth-child(3) { animation-delay: 0.3s; }
    .animate-fade-in-up:nth-child(4) { animation-delay: 0.4s; }
    .animate-fade-in-up:nth-child(5) { animation-delay: 0.5s; }
    .animate-fade-in-up:nth-child(6) { animation-delay: 0.6s; }
  `]
})
export class HomeComponent implements OnInit {
  currentTime = signal<string>('');

  // Pagination and sorting signals
  displayedArticlesCount = signal<number>(6);
  sortBy = signal<'date' | 'category'>('date');
  sortOrder = signal<'asc' | 'desc'>('desc');
  isLoadingMore = signal<boolean>(false);
  activeCategory = signal<string>('all');

  // Dynamic data signals
  categories = signal<NewsCategory[]>([]);
  allArticles = signal<NewsArticle[]>([]);
  loading = signal<boolean>(false);

  // Gradient manager for dynamic colors
  private gradientManager = new GradientManager({
    type: 'random',
    intensities: ['800', '900']
  });

  // Cache for article gradients to maintain consistency
  private articleGradientCache = new Map<string, string>();







  ngOnInit(): void {
    this.initializeSEO();
    this.loadData();
    this.updateCurrentTime();
    // Update time every minute
    setInterval(() => this.updateCurrentTime(), 60000);
  }

  private loadData(): void {
    this.loading.set(true);

    // Load categories and articles from the service
    this.dataService.getCategories().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          // Add 'All' category for filtering
          const allCategory: NewsCategory = {
            id: 'all',
            name: 'All',
            slug: 'all',
            description: 'All news categories',
            articleCount: 0, // Will be updated after articles load
            badge: 'Live',
            icon: '🏠',
            gradient: 'bg-gradient-to-br from-slate-500 to-gray-600',
            badgeColor: 'bg-blue-500',
            isActive: true
          };

          this.categories.set([allCategory, ...response.data]);
        }
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.loading.set(false);
      }
    });

    // Load articles
    this.dataService.getArticles().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.allArticles.set(response.data);
          this.updateCategoryArticleCounts();
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading articles:', error);
        this.loading.set(false);
      }
    });
  }

  private updateCategoryArticleCounts(): void {
    const articles = this.allArticles();
    const categories = this.categories();

    const updatedCategories = categories.map(category => {
      if (category.id === 'all') {
        return { ...category, articleCount: articles.length };
      }

      const count = articles.filter(article => article.category === category.id).length;
      return { ...category, articleCount: count };
    });

    this.categories.set(updatedCategories);
  }

  private updateCurrentTime(): void {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    this.currentTime.set(now.toLocaleDateString('en-US', options));
  }

  getArticleCount(): number {
    return this.allArticles().length;
  }

  getQuoteCount(): number {
    return 25; // Updated to match total articles
  }

  getQuestionCount(): number {
    return 8; // Reduced from previous value
  }

  getPublisherLogo(category: string): string {
    const logos: { [key: string]: string } = {
      'Politics': 'https://via.placeholder.com/32x32/1f2937/ffffff?text=P',
      'Technology': 'https://via.placeholder.com/32x32/3b82f6/ffffff?text=T',
      'Environment': 'https://via.placeholder.com/32x32/10b981/ffffff?text=E',
      'Finance': 'https://via.placeholder.com/32x32/f59e0b/ffffff?text=F',
      'Science': 'https://via.placeholder.com/32x32/8b5cf6/ffffff?text=S',
      'Sports': 'https://via.placeholder.com/32x32/ef4444/ffffff?text=SP',
      'Business': 'https://via.placeholder.com/32x32/059669/ffffff?text=B',
      'Health': 'https://via.placeholder.com/32x32/dc2626/ffffff?text=H',
      'Entertainment': 'https://via.placeholder.com/32x32/ec4899/ffffff?text=EN',
      'Education': 'https://via.placeholder.com/32x32/6366f1/ffffff?text=ED',
      'World News': 'https://via.placeholder.com/32x32/6b7280/ffffff?text=W'
    };
    return logos[category] || 'https://via.placeholder.com/32x32/6b7280/ffffff?text=N';
  }

  getArticleImage(category: string): string {
    const images: { [key: string]: string } = {
      'Technology': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176',
      'Business': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
      'World News': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
      'Health': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
      'Entertainment': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91',
      'Politics': 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620',
      'Environment': 'https://images.unsplash.com/photo-1569163139394-de44cb2c53ec',
      'Finance': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
      'Science': 'https://images.unsplash.com/photo-1507413245164-6160d8298b31',
      'Education': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644'
    };
    return images[category] || 'https://images.unsplash.com/photo-1495020689067-958852a7765e';
  }

  getGradientClass(category: string): string {
    const gradients: { [key: string]: string } = {
      'Technology': 'from-blue-900 via-blue-900/40',
      'Business': 'from-green-900 via-green-900/40',
      'Sports': 'from-orange-900 via-orange-900/40',
      'World News': 'from-purple-900 via-purple-900/40',
      'Health': 'from-emerald-900 via-emerald-900/40',
      'Entertainment': 'from-pink-900 via-pink-900/40',
      'Politics': 'from-gray-900 via-gray-900/40',
      'Environment': 'from-teal-900 via-teal-900/40',
      'Finance': 'from-yellow-900 via-yellow-900/40',
      'Science': 'from-indigo-900 via-indigo-900/40',
      'Education': 'from-violet-900 via-violet-900/40'
    };
    return gradients[category] || 'from-gray-900 via-gray-900/40';
  }

  getRandomGradient(articleId: string): string {
    // Check cache first to maintain consistency for the same article
    if (this.articleGradientCache.has(articleId)) {
      return this.articleGradientCache.get(articleId)!;
    }

    // Generate different gradient types based on article ID for variety
    const numericId = parseInt(articleId) || articleId.length;
    let gradient: string;

    // Use stable gradient generation based on article ID
    const gradientTypes = [
      { type: 'vibrant', colors: ['purple', 'violet', 'fuchsia', 'indigo'] },
      { type: 'cool', colors: ['blue', 'cyan', 'teal', 'sky'] },
      { type: 'warm', colors: ['red', 'orange', 'yellow', 'pink'] },
      { type: 'nature', colors: ['green', 'emerald', 'lime', 'teal'] },
      { type: 'royal', colors: ['purple', 'indigo', 'violet', 'blue'] }
    ];

    const typeIndex = numericId % gradientTypes.length;
    const selectedType = gradientTypes[typeIndex];
    const colorIndex = Math.floor(numericId / gradientTypes.length) % selectedType.colors.length;
    const selectedColor = selectedType.colors[colorIndex];

    // Generate stable gradient based on selection
    const intensity = ['800', '900'][numericId % 2];
    const opacity = [30, 40, 50][numericId % 3];

    gradient = `from-${selectedColor}-${intensity} via-${selectedColor}-${intensity}/${opacity}`;

    this.articleGradientCache.set(articleId, gradient);
    return gradient;
  }



  // Generate gradient for category cards with different themes
  getCategoryGradient(categoryId: string): string {
    const categoryGradients: { [key: string]: () => string } = {
      'all': () => GradientGenerators.monochrome(),
      'Politics': () => GradientGenerators.subtle(),
      'Technology': () => GradientGenerators.cool(),
      'Business': () => GradientGenerators.warm(),
      'Environment': () => generateRandomGradient({
        colors: ['green', 'emerald', 'teal'],
        type: 'dual-color'
      }),
      'Finance': () => generateRandomGradient({
        colors: ['amber', 'yellow', 'orange'],
        type: 'dual-color'
      }),
      'Science': () => generateRandomGradient({
        colors: ['purple', 'indigo', 'violet'],
        type: 'dual-color'
      }),
      'Sports': () => generateRandomGradient({
        colors: ['red', 'orange', 'pink'],
        type: 'dual-color'
      }),
      'Health': () => generateRandomGradient({
        colors: ['emerald', 'green', 'teal'],
        type: 'dual-color'
      }),
      'Entertainment': () => generateRandomGradient({
        colors: ['pink', 'fuchsia', 'purple'],
        type: 'dual-color'
      }),
      'Education': () => generateRandomGradient({
        colors: ['blue', 'indigo', 'sky'],
        type: 'dual-color'
      }),
      'World News': () => GradientGenerators.vibrant()
    };

    return categoryGradients[categoryId]?.() || GradientGenerators.subtle();
  }

  // Generate gradient with intensity based on article position/importance
  getArticleGradientWithIntensity(articleId: string, index: number): string {
    // Create a unique cache key combining article ID and index
    const cacheKey = `${articleId}-${index}`;

    // Check cache first to ensure stability
    if (this.articleGradientCache.has(cacheKey)) {
      return this.articleGradientCache.get(cacheKey)!;
    }

    let gradient: string;

    // First article (featured) gets more vibrant gradient
    if (index === 0) {
      gradient = this.getRandomGradient(articleId) || this.generateStableGradient('vibrant', articleId);
    } else {
      // Alternate between different gradient styles for visual variety
      const position = index % 4;
      switch (position) {
        case 0:
          gradient = this.getRandomGradient(articleId);
          break;
        case 1:
          gradient = this.generateStableGradient('cool', articleId);
          break;
        case 2:
          gradient = this.generateStableGradient('warm', articleId);
          break;
        default:
          gradient = this.generateStableGradient('vibrant', articleId);
          break;
      }
    }

    // Cache the result for stability
    this.articleGradientCache.set(cacheKey, gradient);
    return gradient;
  }

  // Generate a stable gradient based on type and seed
  private generateStableGradient(type: string, seed: string): string {
    const cacheKey = `${type}-${seed}`;

    if (this.articleGradientCache.has(cacheKey)) {
      return this.articleGradientCache.get(cacheKey)!;
    }

    // Generate stable gradients based on type and seed
    const numericSeed = parseInt(seed) || seed.length;
    let gradient: string;

    switch (type) {
      case 'cool':
        const coolColors = ['blue', 'indigo', 'cyan', 'teal', 'sky'];
        const coolIndex = numericSeed % coolColors.length;
        gradient = `from-${coolColors[coolIndex]}-800 via-${coolColors[coolIndex]}-800/40`;
        break;
      case 'warm':
        const warmColors = ['red', 'orange', 'yellow', 'pink', 'rose'];
        const warmIndex = numericSeed % warmColors.length;
        gradient = `from-${warmColors[warmIndex]}-800 via-${warmColors[warmIndex]}-800/40`;
        break;
      case 'vibrant':
        const vibrantColors = ['purple', 'violet', 'fuchsia', 'emerald', 'amber'];
        const vibrantIndex = numericSeed % vibrantColors.length;
        gradient = `from-${vibrantColors[vibrantIndex]}-900 via-${vibrantColors[vibrantIndex]}-900/50`;
        break;
      default:
        gradient = 'from-gray-800 via-gray-800/40';
        break;
    }

    this.articleGradientCache.set(cacheKey, gradient);
    return gradient;
  }

  // Generate theme-based gradients for special sections
  getThematicGradient(theme: 'breaking' | 'trending' | 'featured' | 'latest'): string {
    const themeGradients = {
      'breaking': () => generateRandomGradient({
        colors: ['red', 'orange', 'rose'],
        type: 'dual-color',
        intensities: ['800', '900']
      }),
      'trending': () => generateRandomGradient({
        colors: ['purple', 'fuchsia', 'pink'],
        type: 'triple-color',
        intensities: ['800', '900']
      }),
      'featured': () => GradientGenerators.vibrant(),
      'latest': () => generateRandomGradient({
        colors: ['blue', 'indigo', 'sky'],
        type: 'dual-color',
        intensities: ['800', '900']
      })
    };

    return themeGradients[theme]();
  }

  // Dynamic gradient that changes based on time of day or special themes
  getContextualGradient(articleId: string, category: string): string {
    const hour = new Date().getHours();

    // Morning gradients (6-12)
    if (hour >= 6 && hour < 12) {
      return generateRandomGradient({
        colors: ['yellow', 'orange', 'amber'],
        type: 'dual-color',
        opacityRange: { min: 20, max: 40 }
      });
    }

    // Afternoon gradients (12-18)
    if (hour >= 12 && hour < 18) {
      return generateRandomGradient({
        colors: ['blue', 'sky', 'cyan'],
        type: 'dual-color',
        opacityRange: { min: 30, max: 50 }
      });
    }

    // Evening/Night gradients (18-6)
    return generateRandomGradient({
      colors: ['purple', 'indigo', 'violet'],
      type: 'triple-color',
      opacityRange: { min: 40, max: 60 }
    });
  }

  // Get different gradient based on article importance and position
  getSmartGradient(article: NewsArticle, index: number): string {
    // Use time-based contextual gradients for featured articles
    if (index === 0) {
      return this.getContextualGradient(article.id, article.category);
    }

    // Use category-specific gradients for category-focused articles
    if (article.category && article.category !== 'General') {
      return this.getCategoryGradient(article.category);
    }

    // Use position-based variety for regular articles
    return this.getArticleGradientWithIntensity(article.id, index);
  }

  trackByCategory(index: number, category: NewsCategory): string {
    return category.id;
  }

  trackByArticle(index: number, article: NewsArticle): string {
    return article.id;
  }

  // Load more functionality
  loadMoreArticles(): void {
    this.isLoadingMore.set(true);

    // Simulate loading delay
    setTimeout(() => {
      const currentCount = this.displayedArticlesCount();
      const newCount = Math.min(currentCount + 6, this.getAllSortedArticles().length);
      this.displayedArticlesCount.set(newCount);
      this.isLoadingMore.set(false);
    }, 1000);
  }

  // Get all articles sorted by date
  getAllSortedArticles(): NewsArticle[] {
    const allArticles = this.allArticles();

    // Filter by category first
    let filteredArticles = allArticles;
    if (this.activeCategory() !== 'all') {
      filteredArticles = allArticles.filter(article => article.category === this.activeCategory());
    }

    // Then sort
    return filteredArticles.sort((a, b) => {
      if (this.sortBy() === 'date') {
        const order = this.sortOrder() === 'desc' ? -1 : 1;
        return order * (b.publishedTimestamp - a.publishedTimestamp);
      } else {
        // Sort by category
        const order = this.sortOrder() === 'desc' ? -1 : 1;
        return order * a.category.localeCompare(b.category);
      }
    });
  }

  // Get displayed articles based on current count
  getDisplayedArticles(): NewsArticle[] {
    return this.getAllSortedArticles().slice(0, this.displayedArticlesCount());
  }

  // Toggle sort order
  toggleSortOrder(): void {
    this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
  }

  // Set sort by option
  setSortBy(sortBy: 'date' | 'category'): void {
    this.sortBy.set(sortBy);
  }

  // Check if more articles are available
  hasMoreArticles(): boolean {
    return this.displayedArticlesCount() < this.getAllSortedArticles().length;
  }

  // View all articles (expand to show all)
  viewAllArticles(): void {
    this.displayedArticlesCount.set(this.getAllSortedArticles().length);
  }

  // Set active category for filtering
  setActiveCategory(categoryId: string): void {
    this.activeCategory.set(categoryId);
  }

  // Get active category name
  getActiveCategoryName(): string {
    const activeCat = this.categories().find(cat => cat.id === this.activeCategory());
    return activeCat ? activeCat.name : 'All Categories';
  }

  // Get filtered articles count
  getFilteredArticlesCount(): number {
    return this.getAllSortedArticles().length;
  }

  constructor(
    private router: Router,
    private seoService: SeoService,
    private dataService: DataService
  ) {}

  private initializeSEO(): void {
    const seoData = {
      title: 'PolicyDrift - AI-powered Policy Insights & Political Analysis',
      description: 'Stay informed with PolicyDrift\'s comprehensive coverage of political developments, policy changes, and governance trends. Get AI-powered insights on breaking news, economic policies, healthcare reforms, and more.',
      keywords: 'policy analysis, political news, governance, breaking news, AI insights, policy drift, political analysis, government policy, political trends, policy updates',
      ogType: 'website',
      ogImage: 'https://policydrift.live/images/home-og.jpg',
      canonicalUrl: 'https://policydrift.live',
      structuredData: [
        this.seoService.getWebsiteStructuredData(),
        this.seoService.getOrganizationStructuredData(),
        this.getHomepageStructuredData()
      ]
    };

    this.seoService.updateSeoTags(seoData);
  }

  private getHomepageStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "PolicyDrift - Latest Political News & Policy Analysis",
      "description": "Browse the latest political news, policy analysis, and breaking developments from PolicyDrift",
      "url": "https://policydrift.live",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": this.getArticleCount(),
        "itemListElement": this.getAllSortedArticles().slice(0, 10).map((article, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `https://policydrift.live/article/${article.slug}`,
          "name": article.title
        }))
      }
    };
  }

  // Navigate to article detail page using slug
  navigateToArticle(slug: string): void {
    this.router.navigate(['/article', slug]);
  }

  // Get dynamic classes for category buttons
  getCategoryButtonClasses(category: NewsCategory): string {
    // Return empty string since we use a single blue color for all active states
    return '';
  }
}
