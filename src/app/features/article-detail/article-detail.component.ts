import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { HeaderComponent } from '../../shared/header/header.component';
import { SeoService } from '../../services/seo.service';

interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  timeAgo: string;
  readTime: string;
  gradient: string;
  isBreaking?: boolean;
  publishedDate: string;
  publishedTimestamp: number;
  author?: string;
  tags?: string[];
  content?: string;
}

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  template: `
    <!-- SEO Structured Data -->
    @if (article()) {
      <!-- JSON-LD Structured Data for Article -->
      <script type="application/ld+json" [innerHTML]="getStructuredData()"></script>

      <!-- Open Graph Meta Tags -->
      <meta property="og:title" [content]="article()?.title">
      <meta property="og:description" [content]="article()?.excerpt">
      <meta property="og:type" content="article">
      <meta property="og:url" [content]="getCanonicalUrl()">
      <meta property="og:image" [content]="getArticleImage(article()?.category!)">
      <meta property="og:site_name" content="PolicyDrift">
      <meta property="article:author" [content]="article()?.author || 'PolicyDrift Team'">
      <meta property="article:published_time" [content]="article()?.publishedDate">
      <meta property="article:section" [content]="article()?.category">
      @for (tag of article()?.tags; track tag) {
        <meta property="article:tag" [content]="tag">
      }

      <!-- Twitter Card Meta Tags -->
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" [content]="article()?.title">
      <meta name="twitter:description" [content]="article()?.excerpt">
      <meta name="twitter:image" [content]="getArticleImage(article()?.category!)">
      <meta name="twitter:site" content="@PolicyDrift">
      <meta name="twitter:creator" [content]="'@' + (article()?.author || 'PolicyDrift')">

      <!-- Additional SEO Meta Tags -->
      <meta name="description" [content]="article()?.excerpt">
      <meta name="keywords" [content]="getKeywords()">
      <meta name="author" [content]="article()?.author || 'PolicyDrift Team'">
      <meta name="robots" content="index, follow">
      <link rel="canonical" [href]="getCanonicalUrl()">
    }

    <div class="min-h-screen bg-gray-50">
      <!-- Use Common Header -->
      <app-header></app-header>

      <!-- Article Content -->
      <main class="pb-16">
        @if (article()) {
          <article itemscope itemtype="https://schema.org/NewsArticle">
            <!-- Microdata for SEO -->
            <meta itemprop="headline" [content]="article()?.title">
            <meta itemprop="description" [content]="article()?.excerpt">
            <meta itemprop="image" [content]="getArticleImage(article()?.category!)">
            <meta itemprop="datePublished" [content]="article()?.publishedDate">
            <meta itemprop="dateModified" [content]="article()?.publishedDate">
            <meta itemprop="author" [content]="article()?.author || 'PolicyDrift Team'">
            <meta itemprop="publisher" content="PolicyDrift">
            <meta itemprop="url" [content]="getCanonicalUrl()">
            @for (tag of article()?.tags; track tag) {
              <meta itemprop="keywords" [content]="tag">
            }

            <div class="max-w-7xl mx-auto px-4 py-8">

              <!-- Breadcrumb Navigation with Schema -->
              <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-6"
                   itemscope itemtype="https://schema.org/BreadcrumbList">
                <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                  <a routerLink="/" itemprop="item" class="hover:text-blue-600 transition-colors">
                    <span itemprop="name">Home</span>
                  </a>
                  <meta itemprop="position" content="1">
                </span>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                  <a routerLink="/all-articles" itemprop="item" class="hover:text-blue-600 transition-colors">
                    <span itemprop="name">All Articles</span>
                  </a>
                  <meta itemprop="position" content="2">
                </span>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                  <span itemprop="name" class="text-gray-900 truncate">{{ article()?.title?.slice(0, 50) }}...</span>
                  <meta itemprop="position" content="3">
                </span>
              </nav>

            <!-- Hero Article Card - Similar to other pages -->
            <div class="mb-12">
              <div class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-full h-96 shadow-xl">

                <!-- Background image -->
                <img
                  [src]="getArticleImage(article()?.category!)"
                  [alt]="article()?.title"
                  class="absolute inset-0 w-full h-full object-cover">

                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-t"
                     [ngClass]="getRandomGradient(article()?.id!)"></div>

                <!-- Breaking News Badge -->
                @if (article()?.isBreaking) {
                  <div class="absolute top-4 left-4 z-10">
                    <span class="animate-pulse bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold uppercase shadow-lg">
                      🔴 Breaking
                    </span>
                  </div>
                }

                <!-- Category badge -->
                <div class="absolute top-4 right-4 z-10">
                  <span class="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium uppercase tracking-wider">
                    {{ article()?.category }}
                  </span>
                </div>

                <!-- Article Meta Information -->
                <div class="relative z-10 mb-4">
                  <div class="flex flex-wrap items-center gap-4 text-sm text-white/90 mb-4">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                      </svg>
                      {{ article()?.timeAgo }}
                    </div>
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
                      </svg>
                      {{ article()?.readTime }}
                    </div>
                    @if (article()?.author) {
                      <div class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                        </svg>
                        {{ article()?.author }}
                      </div>
                    }
                  </div>

                  <!-- Article Title -->
                  <h1 class="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                    {{ article()?.title }}
                  </h1>

                  <!-- Article Excerpt -->
                  <p class="text-white/90 text-base leading-relaxed line-clamp-2">
                    {{ article()?.excerpt }}
                  </p>
                </div>
              </div>
            </div>            <!-- Article Content -->
            <div class="max-w-7xl mx-auto mb-12">
              <div class="prose prose-lg max-w-none text-gray-800 leading-relaxed bg-white p-8 rounded-lg" [innerHTML]="getFormattedContent()">
              </div>
            </div>

            <!-- Tags Section -->
            @if (hasTagsToShow()) {
              <div class="max-w-4xl mx-auto mb-8">
                <div class="text-center mb-6">
                  <h3 class="text-lg font-medium text-gray-700 mb-4">Related Topics</h3>
                  <div class="flex flex-wrap justify-center gap-2">
                    @for (tag of article()?.tags; track tag) {
                      <span class="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer">
                        #{{ tag }}
                      </span>
                    }
                  </div>
                </div>
              </div>
            }

            <!-- Share Section -->
            <div class="max-w-4xl mx-auto mb-12">
              <div class="text-center py-6 border-t border-b border-gray-200">
                <p class="text-gray-600 mb-4">Found this article helpful? Share it with others</p>
                <div class="flex justify-center gap-4">
                  <button class="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    <span class="font-medium">Twitter</span>
                  </button>
                  <button class="flex items-center gap-2 px-4 py-2 text-blue-800 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span class="font-medium">Facebook</span>
                  </button>
                  <button class="flex items-center gap-2 px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span class="font-medium">WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Related Articles Section -->
            <div class="mb-12">
              <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Related Articles</h2>
                <p class="text-gray-600">Discover more stories you might find interesting</p>
              </div>

              <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                @for (relatedArticle of relatedArticles(); track relatedArticle.id) {
                  <div class="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
                       (click)="navigateToArticle(relatedArticle.slug)">
                    <div class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-6 pb-6 pt-32 w-full h-72 shadow-lg hover:shadow-xl transition-all duration-300">

                      <!-- Background image -->
                      <img
                        [src]="getArticleImage(relatedArticle.category)"
                        [alt]="relatedArticle.category"
                        class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500">

                      <!-- Gradient overlay -->
                      <div class="absolute inset-0 bg-gradient-to-t"
                           [ngClass]="getRandomGradient(relatedArticle.id)"></div>

                      <!-- Category badge -->
                      <div class="absolute top-3 left-3 z-10">
                        <span class="bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                          {{ relatedArticle.category }}
                        </span>
                        @if (relatedArticle.isBreaking) {
                          <div class="mt-2">
                            <span class="animate-pulse bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                              🔴 Breaking
                            </span>
                          </div>
                        }
                      </div>

                      <!-- Time and read time -->
                      <div class="absolute top-3 right-3 z-10 text-white/80 text-xs">
                        {{ relatedArticle.timeAgo }} • {{ relatedArticle.readTime }}
                      </div>

                      <!-- Content -->
                      <div class="relative z-10">
                        <h3 class="text-lg font-bold text-white mb-2 leading-tight group-hover:text-white/90 transition-colors duration-200">
                          {{ relatedArticle.title }}
                        </h3>
                        <p class="text-white/80 text-sm leading-relaxed line-clamp-2 mb-3">
                          {{ relatedArticle.excerpt }}
                        </p>

                        <!-- Author and arrow -->
                        <div class="flex items-center justify-between">
                          <div class="flex items-center space-x-2 text-white/70 text-xs">
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                            </svg>
                            <span>{{ relatedArticle.author || 'PolicyDrift Team' }}</span>
                          </div>

                          <div class="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>

              <!-- More Articles Button -->
              <div class="text-center mt-8">
                <a routerLink="/all-articles"
                   class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0l-4-4m4 4l-4 4"/>
                  </svg>
                  View All Articles
                </a>
              </div>
            </div>

            <!-- Back to Home -->
            <div class="text-center">
              <a routerLink="/"
                 class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Back to Home
              </a>
            </div>

          </div>
          </article>
        } @else {
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
            <div class="bg-white rounded-2xl shadow-xl p-12">
              <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h1 class="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
              <p class="text-xl text-gray-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
              <a routerLink="/"
                 class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Back to Home
              </a>
            </div>
          </div>
        }
      </main>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .prose {
      line-height: 1.75;
    }

    .prose p {
      margin-bottom: 1.5rem;
    }

    .prose h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: #1f2937;
    }

    .prose h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      color: #374151;
    }

    .bg-tech { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .bg-business { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
    .bg-sports { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
    .bg-health { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
    .bg-world { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
    .bg-entertainment { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); }
    .bg-history { background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%); }
  `]
})
export class ArticleDetailComponent implements OnInit {
  article = signal<NewsArticle | null>(null);

  // Sample article content - in a real app, this would come from a service
  private allArticles = signal<NewsArticle[]>([
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
      publishedDate: '2025-08-25T14:00:00Z',
      publishedTimestamp: Date.now() - (2 * 60 * 60 * 1000),
      author: 'Dr. Sarah Chen',
      tags: ['AI', 'Technology', 'Innovation', 'Machine Learning', 'Research'],
      content: `The breakthrough represents a significant milestone in artificial intelligence development, with researchers successfully creating a system that can perform complex reasoning tasks previously thought to be exclusively human domains.

        The AI system, developed through a collaboration between leading tech companies and academic institutions, demonstrates remarkable capabilities in logical reasoning, creative problem-solving, and contextual understanding that surpasses previous AI achievements.

        Key features of the new system include advanced multi-step reasoning capabilities, contextual understanding across diverse domains, creative problem-solving approaches, and ethical decision-making frameworks.

        The implications for various industries are profound. In healthcare, the system could assist in complex diagnostic procedures and treatment planning. In finance, it could revolutionize risk assessment and investment strategies. In education, it could provide personalized learning experiences tailored to individual student needs.

        The research team behind this breakthrough emphasizes that the system is designed with safety and ethical considerations at its core, ensuring that as AI capabilities advance, they remain aligned with human values and beneficial to society.`
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
      tags: ['Finance', 'Economy', 'Markets', 'Policy', 'Investment'],
      content: `Global financial markets experienced their strongest single-day performance in months following the announcement of coordinated economic policy changes by major world economies.

        The policies focus on sustainable economic growth, green technology investments, and enhanced international trade cooperation. Market analysts report that investor confidence has been boosted by the comprehensive nature of the policy package and the unprecedented level of international coordination.

        Key policy changes include new incentives for renewable energy investments, streamlined international trade protocols, and enhanced support for emerging markets. These changes are expected to drive significant economic growth while addressing climate concerns.

        Financial experts predict that these policies will create new investment opportunities and strengthen global economic stability in the coming years.`
    },
    {
      id: '3',
      slug: 'historic-climate-agreement-195-countries',
      title: 'Historic Climate Agreement Signed by 195 Countries',
      excerpt: 'World leaders unite in an unprecedented commitment to combat climate change with binding targets and innovative green technology initiatives.',
      category: 'International',
      timeAgo: '8 hours ago',
      readTime: '6 min read',
      gradient: 'bg-world',
      isBreaking: true,
      publishedDate: '2024-12-15',
      publishedTimestamp: 1734260400000,
      author: 'Dr. Elena Vasquez',
      tags: ['Climate', 'Environment', 'Policy', 'International', 'Sustainability'],
      content: `The historic climate agreement represents the most comprehensive international environmental accord ever achieved, with 195 countries committing to aggressive emission reduction targets and substantial funding for green technology development.

        The agreement includes binding commitments for carbon neutrality, massive investments in renewable energy infrastructure, and innovative financing mechanisms to support developing nations in their transition to sustainable practices.

        This landmark agreement goes beyond previous climate accords by establishing enforceable targets and creating a global framework for monitoring and reporting progress on emission reductions.

        The international community has committed to unprecedented funding levels for climate action, with developed nations pledging substantial financial support to help developing countries meet their emission reduction goals.`
    },
    {
      id: '4',
      slug: 'education-reform-bill-passes-senate-committee',
      title: 'New Education Reform Bill Passes Senate Committee',
      excerpt: 'Landmark legislation addressing digital literacy and AI education in schools moves closer to becoming law after bipartisan support.',
      category: 'Education',
      timeAgo: '12 hours ago',
      readTime: '4 min read',
      gradient: 'bg-education',
      publishedDate: '2024-12-14',
      publishedTimestamp: 1734217200000,
      author: 'Prof. Janet Williams',
      tags: ['Education', 'Policy', 'Digital Literacy', 'AI', 'Technology'],
      content: `The landmark education reform bill has passed the Senate committee with overwhelming bipartisan support, marking a significant step toward modernizing the nation's education system for the digital age.

        The legislation focuses on integrating AI and digital literacy into core curriculum, providing teachers with necessary training and resources, and ensuring equitable access to technology across all schools.

        Key provisions include mandatory digital literacy courses, AI ethics education, enhanced teacher training programs, and substantial funding for technology infrastructure in underserved communities.`
    },
    {
      id: '5',
      slug: 'breakthrough-gene-therapy-rare-diseases',
      title: 'Breakthrough Gene Therapy Shows Promise for Rare Diseases',
      excerpt: 'Medical researchers announce successful trials of a revolutionary gene therapy that could treat previously incurable genetic disorders.',
      category: 'Health',
      timeAgo: '1 day ago',
      readTime: '4 min read',
      gradient: 'bg-health',
      publishedDate: '2024-12-14',
      publishedTimestamp: 1734195600000,
      author: 'Dr. Robert Kim',
      tags: ['Health', 'Medicine', 'Gene Therapy', 'Medical Research', 'Innovation'],
      content: `The breakthrough gene therapy has shown remarkable success in treating rare genetic disorders that were previously considered incurable, offering hope to thousands of patients worldwide.

        Clinical trials have demonstrated the therapy's ability to correct genetic defects at the cellular level, potentially providing permanent treatment for conditions that have plagued families for generations.

        The treatment works by using modified viruses to deliver corrected genetic material directly to affected cells, allowing the body to produce the proteins it was previously unable to make.

        Medical experts believe this breakthrough could pave the way for treatments of many other genetic disorders, representing a new era in personalized medicine.`
    },
    {
      id: '6',
      slug: 'federal-reserve-interest-rate-policy-review',
      title: 'Federal Reserve Announces Interest Rate Policy Review',
      excerpt: 'Central bank officials signal potential changes to monetary policy in response to shifting economic indicators and inflation trends.',
      category: 'Economics',
      timeAgo: '1 day ago',
      readTime: '5 min read',
      gradient: 'bg-economics',
      publishedDate: '2024-12-14',
      publishedTimestamp: 1734184800000,
      author: 'Lisa Martinez',
      tags: ['Economics', 'Federal Reserve', 'Interest Rates', 'Monetary Policy', 'Finance'],
      content: `The Federal Reserve has announced a comprehensive review of interest rate policies in response to changing economic conditions and evolving inflation patterns.

        Central bank officials indicate that future rate decisions will be based on a broader range of economic indicators, including employment data, consumer spending patterns, and global economic trends.

        This policy review represents a significant shift in the Fed's approach to monetary policy, with greater emphasis on long-term economic stability and sustainable growth.`
    },
    {
      id: '7',
      slug: 'quantum-computing-breakthrough-impossible-problems',
      title: 'Quantum Computing Breakthrough Solves Previously Impossible Problems',
      excerpt: 'Researchers demonstrate quantum supremacy with practical applications that could revolutionize cryptography and drug discovery.',
      category: 'Technology',
      timeAgo: '2 days ago',
      readTime: '4 min read',
      gradient: 'bg-tech',
      publishedDate: '2024-12-13',
      publishedTimestamp: 1734098400000,
      author: 'Prof. David Zhang',
      tags: ['Quantum Computing', 'Technology', 'Research', 'Cryptography', 'Innovation'],
      content: `Researchers have achieved a major breakthrough in quantum computing, successfully solving complex problems that were previously impossible for classical computers to handle.

        The quantum system demonstrates practical applications in drug discovery, financial modeling, and cryptography, marking a significant step toward commercial quantum computing.

        This achievement represents years of research and development, with potential applications that could transform multiple industries and scientific fields.`
    },
    {
      id: '8',
      slug: 'international-trade-agreement-global-commerce',
      title: 'International Trade Agreement Reshapes Global Commerce',
      excerpt: 'New multilateral trade pact promises to reduce barriers and enhance cooperation between major economic powers.',
      category: 'International',
      timeAgo: '2 days ago',
      readTime: '6 min read',
      gradient: 'bg-world',
      publishedDate: '2024-12-13',
      publishedTimestamp: 1734087600000,
      author: 'Ambassador Maria Santos',
      tags: ['Trade', 'International', 'Commerce', 'Economics', 'Policy'],
      content: `The new international trade agreement represents the most significant trade pact in decades, promising to reshape global commerce and strengthen economic ties between major world powers.

        The agreement reduces trade barriers, streamlines customs procedures, and establishes new frameworks for digital commerce and intellectual property protection.

        Economic analysts predict that this trade pact will boost global economic growth and create new opportunities for businesses of all sizes to participate in international markets.`
    },
    {
      id: '9',
      slug: 'epa-unveils-new-environmental-regulations',
      title: 'Environmental Protection Agency Unveils New Regulations',
      excerpt: 'Comprehensive environmental standards aim to reduce carbon emissions and protect natural resources for future generations.',
      category: 'Environment',
      timeAgo: '3 days ago',
      readTime: '5 min read',
      gradient: 'bg-environment',
      publishedDate: '2024-12-12',
      publishedTimestamp: 1734012000000,
      author: 'Dr. Green Thompson',
      tags: ['Environment', 'EPA', 'Regulations', 'Climate', 'Sustainability'],
      content: `The Environmental Protection Agency has unveiled comprehensive new regulations aimed at significantly reducing carbon emissions and protecting natural resources for future generations.

        These regulations establish stricter standards for industrial emissions, expand protected areas, and provide new incentives for renewable energy development.

        The new standards are expected to drive innovation in clean technology while ensuring environmental protection remains a priority in economic development.`
    },
    {
      id: '10',
      slug: 'political-reform-initiative-bipartisan-support',
      title: 'Political Reform Initiative Gains Bipartisan Support',
      excerpt: 'Congressional leaders from both parties unite behind ethics reform package aimed at increasing transparency in government.',
      category: 'Politics',
      timeAgo: '3 days ago',
      readTime: '4 min read',
      gradient: 'bg-politics',
      publishedDate: '2024-12-12',
      publishedTimestamp: 1733998800000,
      author: 'Political Correspondent',
      tags: ['Politics', 'Reform', 'Ethics', 'Government', 'Transparency'],
      content: `Congressional leaders from both major political parties have united behind a comprehensive ethics reform package designed to increase transparency and accountability in government.

        The reform initiative includes new disclosure requirements, enhanced oversight mechanisms, and stricter penalties for ethics violations.

        This bipartisan effort represents a rare moment of unity in an increasingly polarized political environment, with leaders emphasizing the importance of restoring public trust in government institutions.`
    },
    {
      id: '11',
      slug: 'sports-league-new-player-safety-protocols',
      title: 'Major Sports League Implements New Player Safety Protocols',
      excerpt: 'Professional sports organizations announce comprehensive safety measures following recent research on athlete health and performance.',
      category: 'Sports',
      timeAgo: '4 days ago',
      readTime: '3 min read',
      gradient: 'bg-sports',
      publishedDate: '2024-12-11',
      publishedTimestamp: 1733925600000,
      author: 'Sports Reporter',
      tags: ['Sports', 'Safety', 'Athletes', 'Health', 'Professional Sports'],
      content: `Major professional sports leagues have implemented comprehensive new safety protocols following extensive research on athlete health and performance.

        The new protocols include enhanced concussion screening, improved equipment standards, and mandatory rest periods to prevent overexertion.

        These changes represent the sports industry's commitment to player safety and long-term athlete health, with potential implications for sports at all levels.`
    },
    {
      id: '12',
      slug: 'renewable-energy-investment-record-high',
      title: 'Renewable Energy Investment Reaches Record High',
      excerpt: 'Global investment in clean energy technologies surpasses previous records as governments and corporations commit to sustainability goals.',
      category: 'Environment',
      timeAgo: '5 days ago',
      readTime: '5 min read',
      gradient: 'bg-environment',
      publishedDate: '2024-12-10',
      publishedTimestamp: 1733839200000,
      author: 'Environmental Analyst',
      tags: ['Renewable Energy', 'Investment', 'Sustainability', 'Climate', 'Green Technology'],
      content: `Global investment in renewable energy technologies has reached record-breaking levels, with governments and corporations committing unprecedented funding to sustainability initiatives.

        The investment surge is driven by advancing technology, decreasing costs, and growing recognition of the economic benefits of renewable energy.

        This historic level of investment is expected to accelerate the transition to clean energy and create millions of new jobs in the renewable energy sector.`
    },
    {
      id: '13',
      slug: 'digital-currency-regulation-framework-proposed',
      title: 'Digital Currency Regulation Framework Proposed',
      excerpt: 'Financial regulators unveil comprehensive guidelines for cryptocurrency and digital asset management in response to market growth.',
      category: 'Economics',
      timeAgo: '5 days ago',
      readTime: '4 min read',
      gradient: 'bg-economics',
      publishedDate: '2024-12-10',
      publishedTimestamp: 1733828400000,
      author: 'Crypto Specialist',
      tags: ['Cryptocurrency', 'Regulation', 'Finance', 'Digital Assets', 'Financial Technology'],
      content: `Financial regulators have proposed a comprehensive framework for regulating cryptocurrency and digital assets, addressing the rapid growth and evolution of the digital currency market.

        The proposed regulations aim to provide clarity for investors and businesses while protecting consumers and maintaining financial stability.

        This regulatory framework represents a balanced approach to digital asset oversight, encouraging innovation while ensuring appropriate safeguards are in place.`
    },
    {
      id: '14',
      slug: 'healthcare-innovation-hub-opens',
      title: 'Healthcare Innovation Hub Opens in Major Metropolitan Area',
      excerpt: 'New medical research facility promises to accelerate development of cutting-edge treatments and diagnostic technologies.',
      category: 'Health',
      timeAgo: '6 days ago',
      readTime: '3 min read',
      gradient: 'bg-health',
      publishedDate: '2024-12-09',
      publishedTimestamp: 1733752800000,
      author: 'Medical Correspondent',
      tags: ['Healthcare', 'Innovation', 'Medical Research', 'Technology', 'Health'],
      content: `A state-of-the-art healthcare innovation hub has opened in a major metropolitan area, bringing together leading researchers, clinicians, and technology companies to accelerate medical breakthroughs.

        The facility focuses on developing cutting-edge treatments and diagnostic technologies, with particular emphasis on personalized medicine and AI-driven healthcare solutions.

        This innovation hub is expected to become a major center for medical research and development, attracting top talent and investment in healthcare technology.`
    },
    {
      id: '15',
      slug: 'corporate-merger-technology-leader',
      title: 'Corporate Merger Creates Industry Technology Leader',
      excerpt: 'Two major technology companies announce strategic merger that will reshape the competitive landscape and drive innovation.',
      category: 'Business',
      timeAgo: '1 week ago',
      readTime: '6 min read',
      gradient: 'bg-business',
      publishedDate: '2024-12-08',
      publishedTimestamp: 1733666400000,
      author: 'Business Analyst',
      tags: ['Merger', 'Technology', 'Business', 'Innovation', 'Corporate Strategy'],
      content: `Two major technology companies have announced a strategic merger that will create a new industry leader and reshape the competitive landscape in the technology sector.

        The merger combines complementary technologies and expertise, positioning the new entity to drive innovation and compete more effectively in global markets.

        Industry analysts predict that this merger will accelerate technological development and create new opportunities for innovation across multiple sectors.`
    }
  ]);

  articleContent = computed(() => {
    const currentArticle = this.article();
    if (currentArticle?.content) {
      return currentArticle.content;
    }

    // Default content if no specific content is available
    return `
      This is a comprehensive article about ${currentArticle?.title}.

      ${currentArticle?.excerpt}

      In-depth analysis and reporting on this important topic will provide readers with detailed insights into the implications and broader context of these developments.

      Our expert analysis examines the key factors contributing to this story and explores the potential long-term impact on related industries and communities.

      Stay tuned for continued coverage as this story develops.
    `;
  });

  relatedArticles = computed(() => {
    const currentArticle = this.article();
    if (!currentArticle) return [];

    const allArticles = this.allArticles();

    // First, try to find articles in the same category
    let relatedByCategory = allArticles.filter(article =>
      article.id !== currentArticle.id &&
      article.category === currentArticle.category
    );

    // If we have enough articles in the same category, use them
    if (relatedByCategory.length >= 3) {
      return relatedByCategory.slice(0, 3);
    }

    // Otherwise, try to find articles with similar tags
    if (currentArticle.tags && currentArticle.tags.length > 0) {
      const relatedByTags = allArticles.filter(article =>
        article.id !== currentArticle.id &&
        article.tags &&
        article.tags.some(tag => currentArticle.tags!.includes(tag))
      );

      // Combine category and tag matches, prioritizing category matches
      const combined = [...relatedByCategory, ...relatedByTags.filter(article =>
        !relatedByCategory.find(rel => rel.id === article.id)
      )];

      if (combined.length >= 3) {
        return combined.slice(0, 3);
      }
    }

    // If still not enough, add recent articles from other categories
    const otherArticles = allArticles.filter(article =>
      article.id !== currentArticle.id &&
      !relatedByCategory.find(rel => rel.id === article.id)
    ).sort((a, b) => b.publishedTimestamp - a.publishedTimestamp);

    const final = [...relatedByCategory, ...otherArticles];
    return final.slice(0, 3);
  });  hasTagsToShow = computed(() => {
    const currentArticle = this.article();
    return currentArticle?.tags && currentArticle.tags.length > 0;
  });

  getArticleImage(category: string): string {
    const images: { [key: string]: string } = {
      'Technology': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176',
      'Business': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
      'World News': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
      'International': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
      'Health': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
      'Entertainment': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91',
      'Politics': 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620',
      'Environment': 'https://images.unsplash.com/photo-1569163139394-de44cb2c53ec',
      'Economics': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
      'Education': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644'
    };
    return images[category] || 'https://images.unsplash.com/photo-1495020689067-958852a7765e';
  }

  getCategoryGradient(category: string): string {
    const gradients: { [key: string]: string } = {
      'Technology': 'bg-gradient-to-r from-blue-600 to-indigo-600',
      'Business': 'bg-gradient-to-r from-green-600 to-emerald-600',
      'Sports': 'bg-gradient-to-r from-orange-600 to-red-600',
      'World News': 'bg-gradient-to-r from-purple-600 to-pink-600',
      'International': 'bg-gradient-to-r from-purple-600 to-pink-600',
      'Health': 'bg-gradient-to-r from-emerald-600 to-teal-600',
      'Entertainment': 'bg-gradient-to-r from-pink-600 to-rose-600',
      'Politics': 'bg-gradient-to-r from-gray-600 to-slate-600',
      'Environment': 'bg-gradient-to-r from-teal-600 to-cyan-600',
      'Economics': 'bg-gradient-to-r from-yellow-600 to-orange-600',
      'Education': 'bg-gradient-to-r from-violet-600 to-purple-600'
    };
    return gradients[category] || 'bg-gradient-to-r from-gray-600 to-slate-600';
  }

  getRandomGradient(articleId: string): string {
    // Create deterministic but unique gradients based on article ID
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
      'from-zinc-900 via-zinc-900/40'
    ];

    // Extract numeric ID from article ID
    const numericId = parseInt(articleId) || 0;
    const colorIndex = numericId % gradients.length;

    return gradients[colorIndex];
  }

  getFormattedContent(): string {
    const currentArticle = this.article();
    if (currentArticle?.content) {
      // Format content with proper HTML paragraphs
      return currentArticle.content
        .split('\n\n')
        .map(paragraph => `<p class="mb-6 text-lg leading-relaxed">${paragraph.trim()}</p>`)
        .join('');
    }

    // Default content if no specific content is available
    const defaultContent = `
      <p class="mb-6 text-lg leading-relaxed">This is a comprehensive article about <strong>${currentArticle?.title}</strong>.</p>

      <p class="mb-6 text-lg leading-relaxed">${currentArticle?.excerpt}</p>

      <p class="mb-6 text-lg leading-relaxed">In-depth analysis and reporting on this important topic provides readers with detailed insights into the implications and broader context of these developments.</p>

      <p class="mb-6 text-lg leading-relaxed">Our expert analysis examines the key factors contributing to this story and explores the potential long-term impact on related industries and communities.</p>

      <p class="mb-6 text-lg leading-relaxed">This story represents a significant development in the <em>${currentArticle?.category}</em> sector, with potential ramifications that extend beyond immediate stakeholders.</p>

      <blockquote class="border-l-4 border-blue-500 pl-6 my-8 text-xl italic text-gray-700">
        "Understanding the full scope of these developments requires careful analysis of both immediate and long-term implications."
      </blockquote>

      <p class="mb-6 text-lg leading-relaxed">As this story continues to develop, we will provide ongoing coverage and analysis to keep our readers informed of the latest developments and their significance.</p>

      <p class="mb-6 text-lg leading-relaxed">Stay tuned for continued coverage as this story develops.</p>
    `;

    return defaultContent;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private titleService: Title,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadArticle(slug);
      }
    });
  }

  private loadArticle(slug: string): void {
    const foundArticle = this.allArticles().find(article => article.slug === slug);
    this.article.set(foundArticle || null);

    if (foundArticle) {
      this.updateSEO(foundArticle);
      this.updateSEOWithService(foundArticle);
    }
  }

  private updateSEOWithService(article: NewsArticle): void {
    const seoData = {
      title: `${article.title} | PolicyDrift`,
      description: article.excerpt,
      keywords: this.getKeywords(),
      author: article.author || 'PolicyDrift Team',
      ogType: 'article',
      ogImage: this.getArticleImage(article.category),
      canonicalUrl: this.getCanonicalUrl(),
      publishedDate: article.publishedDate,
      structuredData: this.seoService.getNewsArticleStructuredData({
        ...article,
        image: this.getArticleImage(article.category),
        wordCount: this.getWordCount(),
        modifiedDate: article.publishedDate
      })
    };

    this.seoService.updateSeoTags(seoData);
  }

  private updateSEO(article: NewsArticle): void {
    // Update page title
    this.titleService.setTitle(`${article.title} | PolicyDrift`);

    // Update meta description
    this.meta.updateTag({ name: 'description', content: article.excerpt });

    // Update keywords
    this.meta.updateTag({ name: 'keywords', content: this.getKeywords() });

    // Update author
    this.meta.updateTag({ name: 'author', content: article.author || 'PolicyDrift Team' });

    // Update robots meta tag
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' });

    // Add canonical URL
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.setAttribute('href', this.getCanonicalUrl());
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = this.getCanonicalUrl();
      document.head.appendChild(link);
    }

    // Update Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: article.title });
    this.meta.updateTag({ property: 'og:description', content: article.excerpt });
    this.meta.updateTag({ property: 'og:url', content: this.getCanonicalUrl() });
    this.meta.updateTag({ property: 'og:image', content: this.getArticleImage(article.category) });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'PolicyDrift' });
    this.meta.updateTag({ property: 'article:author', content: article.author || 'PolicyDrift Team' });
    this.meta.updateTag({ property: 'article:published_time', content: article.publishedDate });
    this.meta.updateTag({ property: 'article:section', content: article.category });
    this.meta.updateTag({ property: 'article:tag', content: article.tags?.join(', ') || '' });

    // Update Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: '@PolicyDrift' });
    this.meta.updateTag({ name: 'twitter:title', content: article.title });
    this.meta.updateTag({ name: 'twitter:description', content: article.excerpt });
    this.meta.updateTag({ name: 'twitter:image', content: this.getArticleImage(article.category) });
    this.meta.updateTag({ name: 'twitter:creator', content: `@${article.author || 'PolicyDrift'}` });

    // Additional SEO meta tags
    this.meta.updateTag({ name: 'news_keywords', content: this.getKeywords() });
    this.meta.updateTag({ name: 'article:opinion', content: 'false' });
    this.meta.updateTag({ name: 'article:content_tier', content: 'free' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });
    this.meta.updateTag({ name: 'format-detection', content: 'telephone=no' });
  }

  getCanonicalUrl(): string {
    const currentArticle = this.article();
    if (!currentArticle) return '';
    return `https://policydrift.com/article/${currentArticle.slug}`;
  }

  getKeywords(): string {
    const currentArticle = this.article();
    if (!currentArticle) return '';
    const keywords = [
      ...(currentArticle.tags || []),
      currentArticle.category,
      'news',
      'policy',
      'politics',
      'breaking news'
    ];
    return keywords.join(', ');
  }

  getStructuredData(): string {
    const currentArticle = this.article();
    if (!currentArticle) return '';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": currentArticle.title,
      "description": currentArticle.excerpt,
      "image": {
        "@type": "ImageObject",
        "url": this.getArticleImage(currentArticle.category),
        "width": "1200",
        "height": "630"
      },
      "author": {
        "@type": "Person",
        "name": currentArticle.author || "PolicyDrift Team",
        "url": `https://policydrift.com/author/${(currentArticle.author || 'team').toLowerCase().replace(/\s+/g, '-')}`
      },
      "publisher": {
        "@type": "Organization",
        "name": "PolicyDrift",
        "logo": {
          "@type": "ImageObject",
          "url": "https://policydrift.com/logo.png",
          "width": "300",
          "height": "60"
        },
        "url": "https://policydrift.com",
        "sameAs": [
          "https://twitter.com/PolicyDrift",
          "https://facebook.com/PolicyDrift",
          "https://linkedin.com/company/policydrift"
        ]
      },
      "datePublished": currentArticle.publishedDate,
      "dateModified": currentArticle.publishedDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": this.getCanonicalUrl()
      },
      "url": this.getCanonicalUrl(),
      "articleSection": currentArticle.category,
      "keywords": currentArticle.tags?.join(', ') || '',
      "wordCount": this.getWordCount(),
      "timeRequired": `PT${currentArticle.readTime}M`,
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "genre": "news",
      "articleBody": this.getFormattedContent(),
      "about": {
        "@type": "Thing",
        "name": currentArticle.category,
        "description": `News and analysis about ${currentArticle.category.toLowerCase()}`
      },
      "potentialAction": {
        "@type": "ReadAction",
        "target": this.getCanonicalUrl()
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".article-title", ".article-excerpt", ".article-content"]
      }
    };

    return JSON.stringify(structuredData);
  }

  private getWordCount(): number {
    const currentArticle = this.article();
    if (!currentArticle?.content) return 0;
    return currentArticle.content.split(/\s+/).length;
  }

  shareOnFacebook(): void {
    const currentArticle = this.article();
    if (!currentArticle) return;

    const url = encodeURIComponent(this.getCanonicalUrl());
    const title = encodeURIComponent(currentArticle.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`, '_blank');
  }

  shareOnTwitter(): void {
    const currentArticle = this.article();
    if (!currentArticle) return;

    const url = encodeURIComponent(this.getCanonicalUrl());
    const text = encodeURIComponent(`${currentArticle.title} - ${currentArticle.excerpt.substring(0, 100)}...`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  shareOnLinkedIn(): void {
    const currentArticle = this.article();
    if (!currentArticle) return;

    const url = encodeURIComponent(this.getCanonicalUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  }

  shareOnWhatsApp(): void {
    const currentArticle = this.article();
    if (!currentArticle) return;

    const text = encodeURIComponent(`${currentArticle.title} ${this.getCanonicalUrl()}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  copyToClipboard(): void {
    const url = this.getCanonicalUrl();
    navigator.clipboard.writeText(url).then(() => {
      // You can add a toast notification here
      console.log('Article URL copied to clipboard');
    });
  }

  navigateToArticle(slug: string): void {
    this.router.navigate(['/article', slug]);
  }
}
