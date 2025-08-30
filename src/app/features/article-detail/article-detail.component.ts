import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { HeaderComponent } from '../../shared/header/header.component';
import { SeoService } from '../../services/seo.service';
import { DataService } from '../../services/data.service';
import { GradientService } from '../../services/gradient.service';
import { NewsArticle, Author } from '../../models/article.model';
import { CardSkeletonComponent } from '../../shared/skeleton/card-skeleton.component';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, CardSkeletonComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Use Common Header -->
      <app-header></app-header>

      <!-- Main Content -->
      <main class="pb-16">
        @if (isLoading()) {
          <!-- Article Detail Loading Skeleton -->
          <div class="max-w-7xl mx-auto px-4 py-8">
            <!-- Breadcrumb skeleton -->
            <div class="mb-6">
              <app-card-skeleton
                variant="simple"
                height="24px"
                width="300px"
                theme="default"
                rounded="md">
              </app-card-skeleton>
            </div>

            <!-- Hero Article Skeleton -->
            <div class="mb-12">
              <app-card-skeleton
                variant="featured"
                height="384px"
                [showProgress]="true"
                [showLoadingIndicator]="true"
                theme="purple">
              </app-card-skeleton>
            </div>

            <!-- Content Skeleton -->
            <div class="max-w-7xl mx-auto mb-12">
              <app-card-skeleton
                variant="simple"
                height="600px"
                theme="default"
                rounded="lg">
              </app-card-skeleton>
            </div>

            <!-- Tags Skeleton -->
            <div class="max-w-4xl mx-auto mb-8">
              <app-card-skeleton
                variant="simple"
                height="80px"
                theme="blue"
                rounded="xl">
              </app-card-skeleton>
            </div>

            <!-- Share Section Skeleton -->
            <div class="max-w-4xl mx-auto mb-12">
              <app-card-skeleton
                variant="simple"
                height="120px"
                theme="green"
                rounded="lg">
              </app-card-skeleton>
            </div>

            <!-- Related Articles Skeleton -->
            <div class="mb-12">
              <div class="text-center mb-8">
                <app-card-skeleton
                  variant="simple"
                  height="60px"
                  width="400px"
                  theme="default"
                  rounded="md">
                </app-card-skeleton>
              </div>

              <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <app-card-skeleton
                  *ngFor="let i of [1,2,3]"
                  variant="article"
                  height="288px"
                  [showLoadingIndicator]="true"
                  theme="blue">
                </app-card-skeleton>
              </div>
            </div>
          </div>
        } @else if (article()) {
          <article itemscope itemtype="https://schema.org/NewsArticle">
            <!-- Microdata for SEO -->
            <meta itemprop="headline" [content]="article()?.title">
            <meta itemprop="description" [content]="article()?.excerpt">
            <meta itemprop="image" [content]="getArticleImage(article()?.category!)">
            <meta itemprop="datePublished" [content]="article()?.publishedDate">
            <meta itemprop="dateModified" [content]="article()?.publishedDate">
            <meta itemprop="author" [content]="getAuthorName(article()?.author)">
            <meta itemprop="publisher" content="PolicyDrift">
            <meta itemprop="url" [content]="getCanonicalUrl()">

            <div class="max-w-7xl mx-auto px-4 py-8">

              <!-- Breadcrumb Navigation -->
              <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                <a routerLink="/" class="hover:text-blue-600 transition-colors">Home</a>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <a routerLink="/all-articles" class="hover:text-blue-600 transition-colors">Articles</a>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-gray-900 truncate">{{ article()?.title?.slice(0, 50) }}...</span>
              </nav>

              <!-- Hero Article Card -->
              <div class="mb-12">
                <div class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-full h-96 shadow-xl">

                  <!-- Background image -->
                  <img
                    [src]="getArticleImage(article()?.category!)"
                    [alt]="article()?.title"
                    class="absolute inset-0 w-full h-full object-cover">

                  <!-- Gradient overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t"
                       [ngClass]="getRandomGradient(article()?.id)"></div>

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
                      @if (getAuthorName(article()?.author)) {
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                          </svg>
                          {{ getAuthorName(article()?.author) }}
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
              </div>

              <!-- Article Content -->
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
                  <div class="flex justify-center gap-4 mb-4">
                    <button (click)="shareOnTwitter()" class="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                      <span class="font-medium">Twitter</span>
                    </button>
                    <button (click)="shareOnFacebook()" class="flex items-center gap-2 px-4 py-2 text-blue-800 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span class="font-medium">Facebook</span>
                    </button>
                    <button (click)="shareOnWhatsApp()" class="flex items-center gap-2 px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      <span class="font-medium">WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Related Articles Section -->
              @if (relatedArticles().length > 0) {
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
                                <span>{{ getAuthorName(relatedArticle.author) || 'PolicyDrift Team' }}</span>
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
              }

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
  private dataService = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private meta = inject(Meta);
  private titleService = inject(Title);
  private seoService = inject(SeoService);
  private gradientService = inject(GradientService);

  // Loading and data states
  isLoading = signal(true);
  article = signal<NewsArticle | null>(null);
  allArticles = signal<NewsArticle[]>([]);

  // Gradient cache for stable gradients
  private gradientCache = new Map<string, string>();

  // Computed values
  relatedArticles = computed(() => {
    const currentArticle = this.article();
    const allArticlesData = this.allArticles();

    if (!currentArticle || allArticlesData.length === 0) return [];

    // First, try to find articles in the same category
    let relatedByCategory = allArticlesData.filter(article =>
      article.id !== currentArticle.id &&
      article.category === currentArticle.category
    );

    // If we have enough articles in the same category, use them
    if (relatedByCategory.length >= 3) {
      return relatedByCategory.slice(0, 3);
    }

    // Otherwise, try to find articles with similar tags
    if (currentArticle.tags && currentArticle.tags.length > 0) {
      const relatedByTags = allArticlesData.filter(article =>
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
    const otherArticles = allArticlesData.filter(article =>
      article.id !== currentArticle.id &&
      !relatedByCategory.find(rel => rel.id === article.id)
    ).sort((a, b) => b.publishedTimestamp - a.publishedTimestamp);

    const final = [...relatedByCategory, ...otherArticles];
    return final.slice(0, 3);
  });

  hasTagsToShow = computed(() => {
    const currentArticle = this.article();
    return currentArticle?.tags && currentArticle.tags.length > 0;
  });

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    // Start loading
    this.isLoading.set(true);

    // Get the article slug from the route
    const articleSlug = this.activatedRoute.snapshot.paramMap.get('slug');

    if (!articleSlug) {
      this.router.navigate(['/']);
      return;
    }

    // Load all articles to find the current one and generate related articles
    this.dataService.getArticles().subscribe({
      next: (response) => {
        const articles = response.data;
        this.allArticles.set(articles);

        // Find the current article by slug
        const currentArticle = articles.find(article => article.slug === articleSlug);

        if (currentArticle) {
          this.article.set(currentArticle);
          this.updateSEO(currentArticle);
          this.refreshGradients(); // Refresh gradients when article loads
        } else {
          // Article not found, redirect to home
          this.router.navigate(['/']);
        }

        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading article:', error);
        this.isLoading.set(false);
        this.router.navigate(['/']);
      }
    });
  }

  private updateSEO(article: NewsArticle): void {
    // Update page title
    this.titleService.setTitle(`${article.title} | News Portal`);

    // Update meta description
    this.meta.updateTag({ name: 'description', content: article.excerpt });

    // Update social media meta tags
    this.meta.updateTag({ property: 'og:title', content: article.title });
    this.meta.updateTag({ property: 'og:description', content: article.excerpt });
    this.meta.updateTag({ property: 'og:type', content: 'article' });

    // Update Twitter meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: article.title });
    this.meta.updateTag({ name: 'twitter:description', content: article.excerpt });

    // Update keywords if tags are available
    if (article.tags && article.tags.length > 0) {
      this.meta.updateTag({ name: 'keywords', content: article.tags.join(', ') });
    }
  }

  getArticleImage(category: string): string {
    const images: { [key: string]: string } = {
      'Technology': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&h=630',
      'Business': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&h=630',
      'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&h=630',
      'World News': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&h=630',
      'International': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&h=630',
      'Health': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&h=630',
      'Entertainment': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&h=630',
      'Politics': 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&h=630',
      'Environment': 'https://images.unsplash.com/photo-1569163139394-de44cb2c53ec?auto=format&fit=crop&w=1200&h=630',
      'Economics': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&h=630',
      'Education': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&h=630'
    };
    return images[category] || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&h=630';
  }

  getRandomGradient(articleId?: string): string {
    // Use a default key if no articleId provided
    const key = articleId || 'default';

    // Check cache first for stability
    if (this.gradientCache.has(key)) {
      return this.gradientCache.get(key)!;
    }

    // Generate stable gradient based on articleId
    let gradient: string;

    if (articleId) {
      const numericId = parseInt(articleId) || articleId.length;
      const gradientOptions = [
        'from-purple-900 via-purple-900/50',
        'from-blue-900 via-blue-900/50',
        'from-emerald-900 via-emerald-900/50',
        'from-rose-900 via-rose-900/50',
        'from-indigo-900 via-indigo-900/50',
        'from-teal-900 via-teal-900/50',
        'from-orange-900 via-orange-900/50',
        'from-violet-900 via-violet-900/50'
      ];
      gradient = gradientOptions[numericId % gradientOptions.length];
    } else {
      // Fallback gradient
      gradient = 'from-gray-900 via-gray-900/50';
    }

    // Cache for future use
    this.gradientCache.set(key, gradient);
    return gradient;
  }

  /**
   * Gets a themed gradient based on article category
   * @param category - Article category
   * @returns Tailwind CSS gradient class string
   */
  getThemedGradient(category?: string): string {
    return this.gradientService.generateGradient(category);
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

  getCanonicalUrl(): string {
    const currentArticle = this.article();
    if (!currentArticle) return '';
    return `https://policydrift.live/article/${currentArticle.slug}`;
  }

  getAuthorName(author: Author | string | undefined): string {
    if (!author) return 'PolicyDrift Team';
    if (typeof author === 'string') return author;
    return author.name;
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

  shareOnWhatsApp(): void {
    const currentArticle = this.article();
    if (!currentArticle) return;

    const text = encodeURIComponent(`${currentArticle.title} ${this.getCanonicalUrl()}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  navigateToArticle(slug: string): void {
    this.router.navigate(['/article', slug]);
  }

  /**
   * Refreshes all gradients by updating the gradient refresh signal
   */
  refreshGradients(): void {
    this.gradientService.refresh();
  }

  /**
   * Updates gradient generation options
   * @param options - New gradient options
   */
  updateGradientOptions(options: Partial<any>): void {
    this.gradientService.updateOptions(options);
  }

  /**
   * Sets the current gradient theme
   * @param theme - Gradient theme to apply
   */
  setGradientTheme(theme: 'vibrant' | 'cool' | 'warm' | 'subtle' | 'themed' | 'random'): void {
    this.gradientService.setTheme(theme);
  }
}
