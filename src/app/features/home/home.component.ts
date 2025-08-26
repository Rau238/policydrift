import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { SeoService } from '../../services/seo.service';

interface NewsCategory {
  id: string;
  name: string;
  articleCount: string;
  badge: string;
  icon: string;
  gradient: string;
  badgeColor: string;
}

interface NewsArticle {
  id: string;
  slug: string; // Add slug for SEO-friendly URLs
  title: string;
  excerpt: string;
  category: string;
  timeAgo: string;
  readTime: string;
  gradient: string;
  isBreaking?: boolean;
  publishedDate: string; // ISO date string for sorting
  publishedTimestamp: number; // Timestamp for easy sorting
  author?: string;
  tags?: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Use Common Header -->
      <app-header></app-header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 py-8">

        <!-- Category Filter Section -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-gray-900">Browse Articles</h2>
            <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {{ getFilteredArticlesCount() }} of {{ getArticleCount() }} articles
            </span>
          </div>

          <!-- Category Buttons -->
          <div class="flex flex-wrap gap-3 mb-6">
            <button
              *ngFor="let category of newsCategories(); trackBy: trackByCategory"
              (click)="setActiveCategory(category.id)"
              class="flex items-center space-x-2 px-4 py-2 rounded-xl border-2 transition-all duration-300 transform hover:scale-105"
              [class.text-white]="activeCategory() === category.id"
              [class.border-transparent]="activeCategory() === category.id"
              [class.shadow-lg]="activeCategory() === category.id"
              [class.text-gray-700]="activeCategory() !== category.id"
              [class.border-gray-200]="activeCategory() !== category.id"
              [class.bg-white]="activeCategory() !== category.id"
              [class.hover:border-gray-300]="activeCategory() !== category.id"
              [class.hover:bg-gray-50]="activeCategory() !== category.id"
              [ngClass]="activeCategory() === category.id ? category.gradient : ''">
              <span class="text-lg">{{ category.icon }}</span>
              <span class="font-medium">{{ category.name }}</span>
              <span class="text-xs px-2 py-1 rounded-full"
                    [class]="activeCategory() === category.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'">
                {{ category.articleCount }}
              </span>
            </button>
          </div>
        </div>        <!-- Featured Story -->
        <div class="mb-12" *ngIf="latestNews().length > 0">
          <article class="bg-white">
            <a [routerLink]="['/article', latestNews()[0].id]" class="block group">
              <div class="mb-6">
                <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                  <span class="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">BREAKING</span>
                  <span>{{ latestNews()[0].timeAgo }}</span>
                </div>
                <h1 class="text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                  {{ latestNews()[0].title }}
                </h1>
                <p class="text-xl text-gray-600 leading-relaxed mb-6">
                  {{ latestNews()[0].excerpt }}
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
              <article
                *ngFor="let article of latestNews().slice(1); trackBy: trackByArticle"
                class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-full h-80 group cursor-pointer">

                <a [routerLink]="['/article', article.slug]" class="block h-full w-full">
                  <!-- Background image placeholder based on category -->
                  <img
                    [src]="getArticleImage(article.category)"
                    [alt]="article.category"
                    class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500">

                  <!-- Dynamic gradient overlay based on article ID for random colors -->
                  <div
                    class="absolute inset-0 bg-gradient-to-t"
                    [ngClass]="getRandomGradient(article.id)"></div>

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
                *ngFor="let article of getDisplayedArticles(); trackBy: trackByArticle"
                class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-full h-80 group cursor-pointer">

                <a [routerLink]="['/article', article.slug]" class="block h-full w-full">
                  <!-- Background image based on category -->
                  <img
                    [src]="getArticleImage(article.category)"
                    [alt]="article.category"
                    class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500">

                  <!-- Dynamic gradient overlay based on article ID for random colors -->
                  <div
                    class="absolute inset-0 bg-gradient-to-t"
                    [ngClass]="getRandomGradient(article.id)"></div>

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

      <!-- Footer -->
      <footer class="border-t border-gray-200 mt-16">
        <div class="max-w-6xl mx-auto px-4 py-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-6">
              <span class="text-sm text-gray-900 font-medium">PolicyDrift</span>
              <span class="text-sm text-gray-500">AI-powered policy insights that help you understand governance better.</span>
            </div>
            <div class="flex items-center space-x-6 text-sm">
              <a [routerLink]="['/terms']" class="text-gray-500 hover:text-gray-900">Terms of Service</a>
              <a [routerLink]="['/privacy']" class="text-gray-500 hover:text-gray-900">Privacy Policy</a>
              <a [routerLink]="['/about']" class="text-gray-500 hover:text-gray-900">About Us</a>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-100">
            <p class="text-xs text-gray-400">Copyright © 2025 PolicyDrift Inc.</p>
          </div>
        </div>
      </footer>

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

    /* Custom gradient classes */
    .bg-tech { @apply bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600; }
    .bg-business { @apply bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600; }
    .bg-sports { @apply bg-gradient-to-br from-orange-500 via-red-500 to-pink-600; }
    .bg-world { @apply bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600; }
    .bg-health { @apply bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600; }
    .bg-entertainment { @apply bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600; }

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

  newsCategories = signal<NewsCategory[]>([
    {
      id: 'all',
      name: 'All',
      articleCount: '25',
      badge: 'Live',
      icon: '🏠',
      gradient: 'bg-gradient-to-br from-slate-500 to-gray-600',
      badgeColor: 'badge-live'
    },
    {
      id: 'politics',
      name: 'Politics',
      articleCount: '8',
      badge: 'Hot',
      icon: '🏛️',
      gradient: 'bg-gradient-to-br from-red-500 to-pink-600',
      badgeColor: 'badge-hot'
    },
    {
      id: 'tech',
      name: 'Tech',
      articleCount: '6',
      badge: 'New',
      icon: '💻',
      gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      badgeColor: 'badge-new'
    },
    {
      id: 'business',
      name: 'Business',
      articleCount: '5',
      badge: 'Trend',
      icon: '📈',
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
      badgeColor: 'badge-trending'
    },
    {
      id: 'world',
      name: 'Global',
      articleCount: '4',
      badge: 'Breaking',
      icon: '🌍',
      gradient: 'bg-gradient-to-br from-purple-500 to-violet-600',
      badgeColor: 'badge-breaking'
    },
    {
      id: 'health',
      name: 'Health',
      articleCount: '2',
      badge: 'Popular',
      icon: '🏥',
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      badgeColor: 'badge-popular'
    }
  ]);

  latestNews = signal<NewsArticle[]>([
    {
      id: '1',
      slug: 'revolutionary-ai-system-achieves-human-level-reasoning',
      title: 'Revolutionary AI System Achieves Human-Level Reasoning in Complex Tasks',
      excerpt: 'Scientists at leading tech companies have developed an AI system that demonstrates unprecedented reasoning capabilities, potentially transforming multiple industries.',
      category: 'Technology',
      timeAgo: '2 hours ago',
      readTime: '5 min read',
      gradient: 'bg-tech',
      isBreaking: true,
      publishedDate: '2025-08-23T14:00:00Z',
      publishedTimestamp: Date.now() - (2 * 60 * 60 * 1000),
      author: 'Dr. Sarah Chen',
      tags: ['AI', 'Technology', 'Innovation']
    },
    {
      id: '2',
      slug: 'global-markets-surge-economic-policy-changes',
      title: 'Global Markets Surge Following Unexpected Economic Policy Changes',
      excerpt: 'Financial markets worldwide experienced significant gains after major economies announced coordinated policy adjustments aimed at sustainable growth.',
      category: 'Business',
      timeAgo: '4 hours ago',
      readTime: '3 min read',
      gradient: 'bg-business',
      publishedDate: '2024-12-15',
      publishedTimestamp: 1734278400000,
      author: 'Michael Rodriguez',
      tags: ['Finance', 'Economy', 'Markets']
    },
    {
      id: '3',
      slug: 'championship-finals-break-viewership-records',
      title: 'Championship Finals Break All-Time Viewership Records Globally',
      excerpt: 'The most-watched sporting event in history captivated audiences across continents, setting new standards for sports entertainment and broadcasting.',
      category: 'Sports',
      timeAgo: '6 hours ago',
      readTime: '4 min read',
      gradient: 'bg-sports',
      publishedDate: '2024-12-15',
      publishedTimestamp: 1734271200000,
      author: 'Jessica Thompson',
      tags: ['Sports', 'Championship', 'Broadcasting']
    },
    {
      id: '4',
      slug: 'historic-climate-agreement-195-countries',
      title: 'Historic Climate Agreement Signed by 195 Countries',
      excerpt: 'World leaders unite in an unprecedented commitment to combat climate change with binding targets and innovative green technology initiatives.',
      category: 'World News',
      timeAgo: '8 hours ago',
      readTime: '6 min read',
      gradient: 'bg-world',
      isBreaking: true,
      publishedDate: '2024-12-15',
      publishedTimestamp: 1734260400000,
      author: 'Dr. Elena Vasquez',
      tags: ['Climate', 'Environment', 'Policy']
    },
    {
      id: '5',
      slug: 'breakthrough-gene-therapy-rare-diseases',
      title: 'Breakthrough Gene Therapy Shows Promise for Rare Diseases',
      excerpt: 'Medical researchers announce successful trials of a revolutionary gene therapy that could treat previously incurable genetic disorders.',
      category: 'Health',
      timeAgo: '12 hours ago',
      readTime: '4 min read',
      gradient: 'bg-health',
      publishedDate: '2024-12-14',
      publishedTimestamp: 1734217200000,
      author: 'Dr. Robert Kim',
      tags: ['Health', 'Medicine', 'Gene Therapy']
    },
    {
      id: '6',
      slug: 'streaming-platform-largest-content-investment',
      title: 'Streaming Platform Announces Largest Content Investment in History',
      excerpt: 'Major entertainment company commits unprecedented funding to original programming, signaling a new era in digital entertainment.',
      category: 'Entertainment',
      timeAgo: '1 day ago',
      readTime: '3 min read',
      gradient: 'bg-entertainment',
      publishedDate: '2024-12-14',
      publishedTimestamp: 1734206400000,
      author: 'Amanda Lee',
      tags: ['Entertainment', 'Streaming', 'Media']
    }
  ]);

  moreNews = signal<NewsArticle[]>([
    {
      id: '7',
      slug: 'quantum-computing-breakthrough-impossible-problems',
      title: 'Quantum Computing Breakthrough Solves Previously Impossible Problems',
      excerpt: 'Researchers demonstrate quantum supremacy with practical applications that could revolutionize cryptography and drug discovery.',
      category: 'Technology',
      timeAgo: '1 day ago',
      readTime: '4 min read',
      gradient: 'bg-tech',
      publishedDate: '2024-12-14',
      publishedTimestamp: 1734195600000,
      author: 'Prof. David Zhang',
      tags: ['Quantum Computing', 'Technology', 'Research']
    },
    {
      id: '8',
      slug: 'startup-unicorn-carbon-negative-operations',
      title: 'Startup Unicorn Achieves Carbon Negative Operations',
      excerpt: 'Innovative clean-tech company becomes first unicorn startup to achieve net-negative carbon emissions across all operations.',
      category: 'Business',
      timeAgo: '1 day ago',
      readTime: '3 min read',
      gradient: 'bg-business',
      publishedDate: '2024-12-14',
      publishedTimestamp: 1734184800000,
      author: 'Lisa Martinez',
      tags: ['Sustainability', 'Business', 'Startup']
    },
    {
      id: '9',
      slug: 'olympic-record-shattered-dramatic-final',
      title: 'Olympic Record Shattered in Dramatic Final Performance',
      excerpt: 'Athlete breaks 20-year-old world record in stunning final that had spectators on their feet worldwide.',
      category: 'Sports',
      timeAgo: '2 days ago',
      readTime: '3 min read',
      gradient: 'bg-sports',
      publishedDate: '2024-12-13',
      publishedTimestamp: 1734098400000,
      author: 'Mark Johnson',
      tags: ['Olympics', 'Sports', 'Records']
    },
    {
      id: '10',
      slug: 'archaeological-discovery-rewrites-ancient-history',
      title: 'New Archaeological Discovery Rewrites Ancient History',
      excerpt: 'Ancient civilization found with advanced technology that predates known historical timeline by thousands of years.',
      category: 'World News',
      timeAgo: '2 days ago',
      readTime: '5 min read',
      gradient: 'bg-world',
      publishedDate: '2024-12-13',
      publishedTimestamp: 1734087600000,
      author: 'Dr. Rachel Adams',
      tags: ['Archaeology', 'History', 'Discovery']
    },
    {
      id: '11',
      slug: 'revolutionary-treatment-cures-type1-diabetes',
      title: 'Revolutionary Treatment Cures Type 1 Diabetes in Clinical Trial',
      excerpt: 'Groundbreaking stem cell therapy shows 100% success rate in phase 2 trials, offering hope to millions of patients.',
      category: 'Health',
      timeAgo: '2 days ago',
      readTime: '4 min read',
      gradient: 'bg-health',
      publishedDate: '2024-12-13',
      publishedTimestamp: 1734076800000,
      author: 'Dr. Jennifer Liu',
      tags: ['Health', 'Diabetes', 'Medical Breakthrough']
    },
    {
      id: '12',
      slug: 'virtual-reality-concert-global-venues',
      title: 'Virtual Reality Concert Sells Out Global Venues Simultaneously',
      excerpt: 'First-ever synchronized VR concert experience brings together 10 million attendees across multiple virtual venues worldwide.',
      category: 'Entertainment',
      timeAgo: '3 days ago',
      readTime: '3 min read',
      gradient: 'bg-entertainment',
      publishedDate: '2024-12-12',
      publishedTimestamp: 1734012000000,
      author: 'Chris Walker',
      tags: ['VR', 'Entertainment', 'Technology']
    },
    {
      id: '13',
      slug: 'space-mining-mission-rare-earth-elements',
      title: 'Space Mining Mission Returns with Rare Earth Elements',
      excerpt: 'First commercial asteroid mining operation successfully delivers precious metals back to Earth, opening new economic frontiers.',
      category: 'Technology',
      timeAgo: '3 days ago',
      readTime: '5 min read',
      gradient: 'bg-tech',
      publishedDate: '2024-12-12',
      publishedTimestamp: 1733998800000,
      author: 'Captain Alex Rivera',
      tags: ['Space', 'Mining', 'Technology']
    },
    {
      id: '14',
      slug: 'renewable-energy-grid-powers-entire-nation',
      title: 'Renewable Energy Grid Powers Entire Nation for First Time',
      excerpt: 'Small European country becomes first to run exclusively on renewable energy for 30 consecutive days.',
      category: 'World News',
      timeAgo: '3 days ago',
      readTime: '4 min read',
      gradient: 'bg-world',
      publishedDate: '2024-12-12',
      publishedTimestamp: 1733985600000,
      author: 'Dr. Klaus Schmidt',
      tags: ['Renewable Energy', 'Environment', 'Sustainability']
    },
    {
      id: '15',
      slug: 'mental-health-app-reduces-depression',
      title: 'Mental Health App Reduces Depression by 80% in Studies',
      excerpt: 'AI-powered mental health platform shows remarkable success rates in treating depression and anxiety disorders.',
      category: 'Health',
      timeAgo: '4 days ago',
      readTime: '4 min read',
      gradient: 'bg-health',
      publishedDate: '2024-12-11',
      publishedTimestamp: 1733908800000,
      author: 'Dr. Priya Patel',
      tags: ['Mental Health', 'Technology', 'Healthcare']
    }
  ]);

  ngOnInit(): void {
    this.initializeSEO();
    this.updateCurrentTime();
    // Update time every minute
    setInterval(() => this.updateCurrentTime(), 60000);
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
    return this.latestNews().length + this.moreNews().length;
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
    // Create deterministic but unique gradients based on article ID
    // Ensures no color repeats until at least 20 posts
    const gradients = [
      'from-purple-900 via-purple-900/40',
      'from-pink-900 via-pink-900/40',
      'from-red-900 via-red-900/40',
      'from-orange-900 via-orange-900/40',
      'from-amber-900 via-amber-900/40',
      'from-yellow-900 via-yellow-900/40',
      'from-lime-900 via-lime-900/40',
      'from-green-900 via-green-900/40',
      'from-emerald-900 via-emerald-900/40',
      'from-teal-900 via-teal-900/40',
      'from-cyan-900 via-cyan-900/40',
      'from-sky-900 via-sky-900/40',
      'from-blue-900 via-blue-900/40',
      'from-indigo-900 via-indigo-900/40',
      'from-violet-900 via-violet-900/40',
      'from-fuchsia-900 via-fuchsia-900/40',
      'from-rose-900 via-rose-900/40',
      'from-slate-900 via-slate-900/40',
      'from-gray-900 via-gray-900/40',
      'from-zinc-900 via-zinc-900/40',
      // Additional 20 unique gradients for better distribution
      'from-red-800 via-red-800/40',
      'from-orange-800 via-orange-800/40',
      'from-amber-800 via-amber-800/40',
      'from-yellow-800 via-yellow-800/40',
      'from-lime-800 via-lime-800/40',
      'from-green-800 via-green-800/40',
      'from-emerald-800 via-emerald-800/40',
      'from-teal-800 via-teal-800/40',
      'from-cyan-800 via-cyan-800/40',
      'from-sky-800 via-sky-800/40',
      'from-blue-800 via-blue-800/40',
      'from-indigo-800 via-indigo-800/40',
      'from-violet-800 via-violet-800/40',
      'from-purple-800 via-purple-800/40',
      'from-fuchsia-800 via-fuchsia-800/40',
      'from-pink-800 via-pink-800/40',
      'from-rose-800 via-rose-800/40',
      'from-slate-800 via-slate-800/40',
      'from-gray-800 via-gray-800/40',
      'from-zinc-800 via-zinc-800/40'
    ];

    // Extract numeric ID from article ID (assuming format like '1', '2', etc.)
    const numericId = parseInt(articleId) || 0;

    // Use modulo to ensure unique colors for first 40 articles, then repeat
    const colorIndex = numericId % gradients.length;

    return gradients[colorIndex];
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
    const allArticles = [...this.latestNews(), ...this.moreNews()];

    // Filter by category first
    let filteredArticles = allArticles;
    if (this.activeCategory() !== 'all') {
      const activeCategoryName = this.getActiveCategoryName();
      filteredArticles = allArticles.filter(article => article.category === activeCategoryName);
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
    const activeCat = this.newsCategories().find(cat => cat.id === this.activeCategory());
    return activeCat ? activeCat.name : 'All Categories';
  }

  // Get filtered articles count
  getFilteredArticlesCount(): number {
    return this.getAllSortedArticles().length;
  }

  constructor(
    private router: Router,
    private seoService: SeoService
  ) {}

  private initializeSEO(): void {
    const seoData = {
      title: 'PolicyDrift - AI-powered Policy Insights & Political Analysis',
      description: 'Stay informed with PolicyDrift\'s comprehensive coverage of political developments, policy changes, and governance trends. Get AI-powered insights on breaking news, economic policies, healthcare reforms, and more.',
      keywords: 'policy analysis, political news, governance, breaking news, AI insights, policy drift, political analysis, government policy, political trends, policy updates',
      ogType: 'website',
      ogImage: 'https://policydrift.com/images/home-og.jpg',
      canonicalUrl: 'https://policydrift.com',
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
      "url": "https://policydrift.com",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": this.getArticleCount(),
        "itemListElement": this.getAllSortedArticles().slice(0, 10).map((article, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `https://policydrift.com/article/${article.slug}`,
          "name": article.title
        }))
      }
    };
  }

  // Navigate to article detail page using slug
  navigateToArticle(slug: string): void {
    this.router.navigate(['/article', slug]);
  }
}
