import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { SeoService } from '../../services/seo.service';

interface NewsArticle {
  id: string;
  slug?: string;
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
}

@Component({
  selector: 'app-all-articles',
  standalone: true,
  imports: [CommonModule,  HeaderComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Use Common Header -->
      <app-header></app-header>

      <!-- Main Layout with Sidebar -->
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex gap-6">

          <!-- Left Sidebar - Sticky Categories Panel -->
          <aside class="w-72 flex-shrink-0">
            <div class="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Categories</h2>

              <!-- Category List -->
              <div class="space-y-2">
                <button
                  *ngFor="let category of categories; trackBy: trackByCategory"
                  (click)="setActiveCategory(category)"
                  class="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 group"
                  [class.bg-blue-50]="activeCategory() === category"
                  [class.border-blue-200]="activeCategory() === category"
                  [class.text-blue-700]="activeCategory() === category"
                  [class.hover:bg-gray-50]="activeCategory() !== category"
                  [class.text-gray-700]="activeCategory() !== category">

                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <!-- Category Icon -->
                      <div class="w-3 h-3 rounded-full"
                           [ngClass]="getCategoryIconColor(category)"></div>
                      <span class="font-medium">{{ category }}</span>
                    </div>
                    <span class="text-xs px-2 py-1 rounded-full"
                          [class.bg-blue-100]="activeCategory() === category"
                          [class.text-blue-600]="activeCategory() === category"
                          [class.bg-gray-100]="activeCategory() !== category"
                          [class.text-gray-500]="activeCategory() !== category">
                      {{ getCategoryCount(category) }}
                    </span>
                  </div>
                </button>
              </div>

              <!-- Sorting Options -->
              <div class="mt-6 pt-6 border-t border-gray-200">
                <h3 class="text-sm font-medium text-gray-900 mb-3">Sort by</h3>
                <div class="space-y-2">
                  <button
                    (click)="setSortBy('date')"
                    class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
                    [class.bg-blue-50]="sortBy() === 'date'"
                    [class.text-blue-700]="sortBy() === 'date'"
                    [class.text-gray-600]="sortBy() !== 'date'"
                    [class.hover:bg-gray-50]="sortBy() !== 'date'">
                    📅 Date
                  </button>
                  <button
                    (click)="setSortBy('category')"
                    class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
                    [class.bg-blue-50]="sortBy() === 'category'"
                    [class.text-blue-700]="sortBy() === 'category'"
                    [class.text-gray-600]="sortBy() !== 'category'"
                    [class.hover:bg-gray-50]="sortBy() !== 'category'">
                    🏷️ Category
                  </button>
                </div>

                <!-- Sort Order Toggle -->
                <button
                  (click)="toggleSortOrder()"
                  class="w-full mt-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <svg class="w-4 h-4 transform transition-transform"
                       [class.rotate-180]="sortOrder() === 'asc'"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                  <span>{{ sortOrder() === 'desc' ? 'Newest First' : 'Oldest First' }}</span>
                </button>
              </div>
            </div>
          </aside>

          <!-- Main Content Area -->
          <main class="flex-1">
            <!-- Content Header -->
            <div class="mb-6">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">
                {{ activeCategory() === 'All' ? 'All Articles' : activeCategory() + ' Articles' }}
              </h1>
              <p class="text-gray-600">
                {{ getTotalArticleCount() }} {{ getTotalArticleCount() === 1 ? 'article' : 'articles' }} found
              </p>
            </div>

            <!-- Articles Grid -->
            <section>
              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <article
                  *ngFor="let article of getFilteredAndSortedArticles(); trackBy: trackByArticle"
                  class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-full h-80 group cursor-pointer"
                  (click)="navigateToArticle(article.slug || article.id)">

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
                    <div *ngIf="article.isBreaking" class="mt-2">
                      <span class="animate-pulse bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                        🔴 Breaking
                      </span>
                    </div>
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
                    <p class="text-white/80 text-sm leading-relaxed line-clamp-2 mb-3">
                      {{ article.excerpt }}
                    </p>

                    <!-- Author info -->
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-2 text-white/70 text-xs">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                        </svg>
                        <span>{{ article.author || 'PolicyDrift Team' }}</span>
                      </div>

                      <div class="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <!-- No articles message -->
              <div class="text-center py-16" *ngIf="getFilteredAndSortedArticles().length === 0">
                <div class="text-gray-400 mb-4">
                  <svg class="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p class="text-gray-600">Try selecting a different category or check back later for new content.</p>
              </div>
            </section>

          </main>
        </div>
      </div>

    </div>
  `,
  styles: [`
    a {
      text-decoration: none !important;
    }

    a:hover {
      text-decoration: none !important;
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

    /* Custom scrollbar for sidebar */
    aside::-webkit-scrollbar {
      width: 4px;
    }

    aside::-webkit-scrollbar-track {
      background: #f1f5f9;
    }

    aside::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 2px;
    }

    aside::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    /* Enhanced card hover effects */
    article:hover {
      transform: translateY(-2px);
    }

    /* Smooth transitions for all interactive elements */
    * {
      transition-property: color, background-color, border-color, transform, opacity, box-shadow;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
  `]
})
export class AllArticlesComponent implements OnInit {
  activeCategory = signal('All');
  sortBy = signal<'date' | 'category'>('date');
  sortOrder = signal<'asc' | 'desc'>('desc');

  categories = ['All', 'Politics', 'Technology', 'Business', 'Economics', 'International', 'Environment', 'Education', 'Health', 'Sports'];

  allArticles = signal<NewsArticle[]>([
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
      tags: ['Climate', 'Environment', 'Policy']
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
      tags: ['Education', 'Policy', 'Digital Literacy']
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
      tags: ['Health', 'Medicine', 'Gene Therapy']
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
      tags: ['Economics', 'Federal Reserve', 'Interest Rates']
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
      tags: ['Quantum Computing', 'Technology', 'Research']
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
      tags: ['Trade', 'International', 'Commerce']
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
      tags: ['Environment', 'EPA', 'Regulations']
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
      tags: ['Politics', 'Reform', 'Ethics']
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
      tags: ['Sports', 'Safety', 'Athletes']
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
      tags: ['Renewable Energy', 'Investment', 'Sustainability']
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
      tags: ['Cryptocurrency', 'Regulation', 'Finance']
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
      tags: ['Healthcare', 'Innovation', 'Medical Research']
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
      tags: ['Merger', 'Technology', 'Business']
    }
  ]);

  ngOnInit(): void {
    this.initializeSEO();
  }

  private initializeSEO(): void {
    const seoData = {
      title: 'All Articles - PolicyDrift | Complete Policy & Political News Archive',
      description: 'Browse all PolicyDrift articles covering political news, policy analysis, government updates, and breaking developments. Comprehensive archive of AI-powered political insights and analysis.',
      keywords: 'all articles, political news archive, policy analysis, government news, political coverage, breaking news, policy updates, political articles',
      ogType: 'website',
      ogImage: 'https://policydrift.live/images/all-articles-og.jpg',
      canonicalUrl: 'https://policydrift.live/all-articles',
      structuredData: this.getAllArticlesStructuredData()
    };

    this.seoService.updateSeoTags(seoData);
  }

  private getAllArticlesStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "All Articles - PolicyDrift",
      "description": "Complete archive of political news and policy analysis articles",
      "url": "https://policydrift.live/all-articles",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://policydrift.live"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "All Articles",
            "item": "https://policydrift.live/all-articles"
          }
        ]
      },
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": this.allArticles().length,
        "itemListElement": this.allArticles().slice(0, 20).map((article: NewsArticle, index: number) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `https://policydrift.live/article/${article.slug}`,
          "name": article.title
        }))
      }
    };
  }

  setActiveCategory(category: string): void {
    this.activeCategory.set(category);
  }

  setSortBy(sortBy: 'date' | 'category'): void {
    this.sortBy.set(sortBy);
  }

  toggleSortOrder(): void {
    this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
  }

  getFilteredAndSortedArticles(): NewsArticle[] {
    let filtered = this.allArticles();

    // Filter by category
    if (this.activeCategory() !== 'All') {
      filtered = filtered.filter(article => article.category === this.activeCategory());
    }

    // Sort articles
    return filtered.sort((a, b) => {
      if (this.sortBy() === 'date') {
        const order = this.sortOrder() === 'desc' ? -1 : 1;
        return order * (b.publishedTimestamp - a.publishedTimestamp);
      } else {
        const order = this.sortOrder() === 'desc' ? -1 : 1;
        return order * a.category.localeCompare(b.category);
      }
    });
  }

  getCategoryCount(category: string): number {
    if (category === 'All') {
      return this.allArticles().length;
    }
    return this.allArticles().filter(article => article.category === category).length;
  }

  getTotalArticleCount(): number {
    return this.getFilteredAndSortedArticles().length;
  }

  getArticleImage(category: string): string {
    const images: { [key: string]: string } = {
      'Technology': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176',
      'Business': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
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

  getGradientClass(category: string): string {
    const gradients: { [key: string]: string } = {
      'Technology': 'from-blue-900 via-blue-900/40',
      'Business': 'from-green-900 via-green-900/40',
      'Sports': 'from-orange-900 via-orange-900/40',
      'International': 'from-purple-900 via-purple-900/40',
      'Health': 'from-emerald-900 via-emerald-900/40',
      'Entertainment': 'from-pink-900 via-pink-900/40',
      'Politics': 'from-gray-900 via-gray-900/40',
      'Environment': 'from-teal-900 via-teal-900/40',
      'Economics': 'from-yellow-900 via-yellow-900/40',
      'Education': 'from-violet-900 via-violet-900/40'
    };
    return gradients[category] || 'from-gray-900 via-gray-900/40';
  }

  getCategoryIconColor(category: string): string {
    const colors: { [key: string]: string } = {
      'All': 'bg-gray-500',
      'Technology': 'bg-blue-500',
      'Business': 'bg-green-500',
      'Sports': 'bg-orange-500',
      'International': 'bg-purple-500',
      'Health': 'bg-emerald-500',
      'Entertainment': 'bg-pink-500',
      'Politics': 'bg-gray-600',
      'Environment': 'bg-teal-500',
      'Economics': 'bg-yellow-500',
      'Education': 'bg-violet-500'
    };
    return colors[category] || 'bg-gray-500';
  }

  getRandomGradient(articleId: string): string {
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

    const numericId = parseInt(articleId) || 0;
    const colorIndex = numericId % gradients.length;
    return gradients[colorIndex];
  }

  trackByCategory(index: number, category: string): string {
    return category;
  }

  trackByArticle(index: number, article: NewsArticle): string {
    return article.id;
  }

  constructor(
    private router: Router,
    private seoService: SeoService
  ) {}

  // Navigate to article detail page using slug
  navigateToArticle(slug: string): void {
    this.router.navigate(['/article', slug]);
  }
}
