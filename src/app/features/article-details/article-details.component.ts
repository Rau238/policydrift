import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  timeAgo: string;
  readTime: string;
  gradient: string;
  isBreaking?: boolean;
  author: string;
  publishedDate: string;
  tags: string[];
  imageUrl?: string;
  sourceUrl?: string;
}

interface RelatedArticle {
  id: string;
  title: string;
  category: string;
  timeAgo: string;
  readTime: string;
}

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white">

      <!-- Header Navigation -->
      <header class="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div class="max-w-6xl mx-auto px-4">
          <div class="flex items-center justify-between py-4">
            <div class="flex items-center space-x-8">
              <button
                routerLink="/"
                class="flex items-center space-x-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                <span>Policy Drift</span>
              </button>
              <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                AI-powered policy insights
              </span>
            </div>
            <div class="flex items-center space-x-4">
              <button class="text-sm text-gray-600 hover:text-gray-900">Download App</button>
              <button class="text-sm text-gray-600 hover:text-gray-900">Share</button>
            </div>
          </div>
        </div>
      </header>

      <!-- Article Content -->
      <main class="max-w-4xl mx-auto px-4 py-8" *ngIf="article()">

        <!-- Article Header -->
        <div class="mb-8">
          <!-- Category and Breaking Badge -->
          <div class="flex items-center space-x-3 mb-4">
            <span class="text-sm font-medium text-blue-600 uppercase tracking-wide">
              {{ article()?.category }}
            </span>
            <span *ngIf="article()?.isBreaking"
                  class="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium animate-pulse">
              🔴 BREAKING
            </span>
          </div>

          <!-- Article Title -->
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {{ article()?.title }}
          </h1>

          <!-- Article Meta -->
          <div class="flex items-center space-x-6 text-sm text-gray-500 mb-6">
            <div class="flex items-center space-x-2">
              <img
                [src]="getAuthorAvatar(article()?.author || '')"
                [alt]="article()?.author"
                class="w-8 h-8 rounded-full">
              <span class="font-medium">{{ article()?.author }}</span>
            </div>
            <span>{{ article()?.publishedDate }}</span>
            <span>{{ article()?.readTime }}</span>
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
              </svg>
              <span>{{ getViewCount() }} views</span>
            </div>
          </div>

          <!-- Article Excerpt -->
          <p class="text-xl text-gray-600 leading-relaxed mb-8 border-l-4 border-blue-500 pl-6 italic">
            {{ article()?.excerpt }}
          </p>
        </div>

        <!-- Article Image -->
        <div *ngIf="article()?.imageUrl" class="mb-8">
          <img
            [src]="article()?.imageUrl"
            [alt]="article()?.title"
            class="w-full h-96 object-cover rounded-lg shadow-lg">
        </div>

        <!-- Article Content -->
        <div class="prose prose-lg max-w-none mb-12">
          <div class="text-gray-800 leading-relaxed space-y-6" [innerHTML]="article()?.content">
          </div>
        </div>

        <!-- Tags -->
        <div class="mb-8" *ngIf="article()?.tags && article()!.tags.length > 0">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <span *ngFor="let tag of article()!.tags"
                  class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer">
              #{{ tag }}
            </span>
          </div>
        </div>

        <!-- Article Actions -->
        <div class="border-t border-b border-gray-200 py-6 mb-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <button class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span>Like</span>
              </button>
              <button class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                </svg>
                <span>Share</span>
              </button>
              <button class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
                <span>Save</span>
              </button>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-500">Source:</span>
              <a [href]="article()?.sourceUrl"
                 target="_blank"
                 class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                {{ getSourceName(article()?.category || '') }}
              </a>
            </div>
          </div>
        </div>

        <!-- Related Articles -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article *ngFor="let relatedArticle of relatedArticles(); trackBy: trackByArticle"
                     class="group cursor-pointer border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div class="flex items-start space-x-3">
                <img
                  [src]="getPublisherLogo(relatedArticle.category)"
                  [alt]="relatedArticle.category"
                  class="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                    <span class="font-medium uppercase">{{ relatedArticle.category }}</span>
                    <span>{{ relatedArticle.timeAgo }}</span>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-2">
                    {{ relatedArticle.title }}
                  </h3>
                  <div class="text-xs text-gray-500">
                    {{ relatedArticle.readTime }}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

      </main>

      <!-- Loading State -->
      <div *ngIf="!article()" class="flex items-center justify-center min-h-96">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Loading article...</p>
        </div>
      </div>

      <!-- Footer -->
      <footer class="border-t border-gray-200 mt-16">
        <div class="max-w-6xl mx-auto px-4 py-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-6">
              <span class="text-sm text-gray-900 font-medium">News Hub</span>
              <span class="text-sm text-gray-500">AI-powered news that helps you understand more, faster.</span>
            </div>
            <div class="flex items-center space-x-6 text-sm">
              <a href="#" class="text-gray-500 hover:text-gray-900">Terms of Service</a>
              <a href="#" class="text-gray-500 hover:text-gray-900">Privacy Policy</a>
              <a href="#" class="text-gray-500 hover:text-gray-900">About Us</a>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-100">
            <p class="text-xs text-gray-400">Copyright © 2025 News Hub Inc.</p>
          </div>
        </div>
      </footer>

    </div>
  `,
  styles: `
    /* Remove underlines from all anchor tags */
    a {
      text-decoration: none !important;
    }

    a:hover {
      text-decoration: none !important;
    }

    .prose {
      max-width: none;
    }

    .prose h2 {
      @apply text-2xl font-bold text-gray-900 mt-8 mb-4;
    }

    .prose h3 {
      @apply text-xl font-semibold text-gray-900 mt-6 mb-3;
    }

    .prose p {
      @apply text-gray-800 leading-relaxed mb-4;
    }

    .prose blockquote {
      @apply border-l-4 border-blue-500 pl-6 italic text-gray-700 my-6;
    }

    .prose ul, .prose ol {
      @apply ml-6 mb-4;
    }

    .prose li {
      @apply mb-2;
    }
  `
})
export class ArticleDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  article = signal<NewsArticle | null>(null);
  relatedArticles = signal<RelatedArticle[]>([]);

  // Sample articles data (in a real app, this would come from a service)
  private allArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'White House Blocks AP Reporter Over Refusal to Use Gulf of America',
      excerpt: 'The White House has restricted access for an Associated Press reporter following disagreements over the use of new geographical terminology in official communications.',
      content: `
        <p>In an unprecedented move, the White House has taken the extraordinary step of limiting press access for an Associated Press reporter who refused to comply with new guidelines regarding geographical terminology in official communications.</p>

        <p>The controversy centers around the administration's directive to use "Gulf of America" instead of the traditional "Gulf of Mexico" in all official correspondence and press briefings. The AP reporter, citing journalistic integrity and established geographical standards, declined to adopt the new terminology.</p>

        <h2>Background of the Dispute</h2>

        <p>The dispute began during a routine press briefing when the reporter questioned the administration's authority to unilaterally change established geographical names. The reporter argued that such changes should go through proper international channels and receive recognition from geographical naming authorities.</p>

        <blockquote>"As journalists, we have a responsibility to use accurate, internationally recognized terminology. We cannot simply adopt political language without proper justification," the reporter stated during the briefing.</blockquote>

        <p>The administration's response was swift and decisive. Press Secretary officials announced that reporters who refuse to comply with official terminology would face restricted access to White House briefings and official communications.</p>

        <h2>Industry Response</h2>

        <p>The journalism community has rallied behind the AP reporter, with major news organizations expressing concern about the precedent this sets for press freedom. The Society of Professional Journalists issued a statement condemning any attempt to control journalistic language through access restrictions.</p>

        <p>Legal experts suggest this case could set important precedents for the relationship between government and press, particularly regarding the extent to which administrations can influence news reporting through access controls.</p>

        <h3>International Implications</h3>

        <p>The geographical naming dispute has broader implications for international relations, as the Gulf of Mexico is recognized internationally under its current name. Mexico's government has already expressed concerns about unilateral changes to shared geographical features.</p>

        <p>This incident highlights the ongoing tension between political messaging and journalistic independence, raising important questions about press freedom in the modern era.</p>
      `,
      category: 'Politics',
      timeAgo: '2 hours ago',
      readTime: '8 min read',
      gradient: 'from-red-600 to-orange-600',
      isBreaking: true,
      author: 'Sarah Johnson',
      publishedDate: 'August 23, 2025',
      tags: ['Politics', 'Press Freedom', 'White House', 'Media'],
      imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=400&fit=crop',
      sourceUrl: 'https://example.com/ap-news'
    },
    {
      id: '2',
      title: 'Revolutionary AI Model Achieves Breakthrough in Medical Diagnosis',
      excerpt: 'Scientists have developed an AI system that can diagnose rare diseases with 95% accuracy, potentially transforming healthcare worldwide.',
      content: `
        <p>A groundbreaking artificial intelligence system has achieved a remarkable 95% accuracy rate in diagnosing rare diseases, marking a significant milestone in medical technology that could revolutionize healthcare delivery worldwide.</p>

        <p>The AI model, developed through a collaboration between leading tech companies and medical institutions, has been trained on millions of medical cases and can identify patterns that human doctors might miss, particularly in rare conditions that affect fewer than 200,000 people globally.</p>

        <h2>How the System Works</h2>

        <p>The AI diagnostic system uses advanced machine learning algorithms to analyze multiple data points including:</p>

        <ul>
          <li>Patient symptoms and medical history</li>
          <li>Laboratory test results</li>
          <li>Medical imaging data</li>
          <li>Genetic information when available</li>
          <li>Environmental and lifestyle factors</li>
        </ul>

        <p>By processing this information simultaneously, the system can identify subtle patterns and correlations that might take human specialists months or years to recognize.</p>

        <blockquote>"This technology doesn't replace doctors, but rather empowers them with tools that can dramatically improve diagnostic accuracy and speed," said Dr. Emily Chen, lead researcher on the project.</blockquote>

        <h2>Clinical Trial Results</h2>

        <p>During extensive clinical trials involving over 10,000 patients across 50 medical centers, the AI system demonstrated:</p>

        <ul>
          <li>95% accuracy in rare disease diagnosis</li>
          <li>Average diagnostic time reduced from 6 months to 2 weeks</li>
          <li>85% reduction in unnecessary tests and procedures</li>
          <li>Significant improvement in patient outcomes</li>
        </ul>

        <h3>Real-World Impact</h3>

        <p>The implications of this technology extend far beyond individual patient care. Healthcare systems worldwide struggle with the challenge of diagnosing rare diseases, which often require specialized knowledge and expensive testing procedures.</p>

        <p>With this AI system, smaller hospitals and clinics in underserved areas could potentially offer the same level of diagnostic expertise as major medical centers, democratizing access to high-quality healthcare.</p>

        <p>The technology is expected to begin rolling out to select medical institutions later this year, with broader availability planned for 2026.</p>
      `,
      category: 'Technology',
      timeAgo: '4 hours ago',
      readTime: '6 min read',
      gradient: 'from-blue-600 to-purple-600',
      isBreaking: false,
      author: 'Dr. Michael Rodriguez',
      publishedDate: 'August 23, 2025',
      tags: ['AI', 'Healthcare', 'Medical Technology', 'Innovation'],
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
      sourceUrl: 'https://example.com/tech-news'
    },
    {
      id: '3',
      title: 'Global Climate Summit Reaches Historic Agreement',
      excerpt: 'World leaders have agreed on unprecedented climate action measures, including massive investments in renewable energy infrastructure.',
      content: `
        <p>In a historic moment for global environmental policy, world leaders at the International Climate Summit have reached a comprehensive agreement on unprecedented climate action measures, marking the most significant international environmental commitment since the Paris Agreement.</p>

        <p>The agreement, signed by representatives from 195 countries, commits to massive investments in renewable energy infrastructure and establishes binding targets for carbon emission reductions that go far beyond previous international commitments.</p>

        <h2>Key Provisions of the Agreement</h2>

        <p>The landmark accord includes several groundbreaking provisions:</p>

        <ul>
          <li>$2 trillion global investment in renewable energy infrastructure over the next decade</li>
          <li>50% reduction in global carbon emissions by 2030</li>
          <li>Mandatory phase-out of coal-fired power plants by 2035</li>
          <li>Establishment of a global carbon trading system</li>
          <li>Technology sharing agreements for developing nations</li>
        </ul>

        <blockquote>"This agreement represents humanity's best chance to address the climate crisis with the urgency and scale it demands," stated UN Climate Chief Maria Santos.</blockquote>

        <h2>Implementation Timeline</h2>

        <p>The agreement establishes a clear timeline for implementation, with mandatory progress reviews every two years. Countries that fail to meet their commitments will face economic sanctions and loss of access to the global carbon trading system.</p>

        <p>Developing nations will receive substantial financial and technological support to help them transition to clean energy systems without compromising their economic development goals.</p>

        <h3>Industry Response</h3>

        <p>The renewable energy industry has welcomed the agreement, with major companies already announcing plans to accelerate their expansion in response to the guaranteed government commitments.</p>

        <p>Traditional energy companies have expressed cautious optimism, with many announcing new investment strategies focused on renewable energy and carbon capture technologies.</p>

        <p>Environmental groups have praised the agreement while emphasizing the critical importance of rigorous implementation and monitoring to ensure targets are met.</p>
      `,
      category: 'Environment',
      timeAgo: '6 hours ago',
      readTime: '7 min read',
      gradient: 'from-green-600 to-teal-600',
      isBreaking: true,
      author: 'Jennifer Liu',
      publishedDate: 'August 23, 2025',
      tags: ['Climate', 'Environment', 'Global Policy', 'Renewable Energy'],
      imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=800&h=400&fit=crop',
      sourceUrl: 'https://example.com/environment-news'
    }
  ];

  ngOnInit() {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.loadArticle(articleId);
      this.loadRelatedArticles(articleId);
    } else {
      this.router.navigate(['/']);
    }
  }

  private loadArticle(id: string) {
    const foundArticle = this.allArticles.find(article => article.id === id);
    if (foundArticle) {
      this.article.set(foundArticle);
    } else {
      this.router.navigate(['/']);
    }
  }

  private loadRelatedArticles(currentId: string) {
    const currentArticle = this.article();
    if (!currentArticle) return;

    const related = this.allArticles
      .filter(article => article.id !== currentId && article.category === currentArticle.category)
      .slice(0, 3)
      .map(article => ({
        id: article.id,
        title: article.title,
        category: article.category,
        timeAgo: article.timeAgo,
        readTime: article.readTime
      }));

    this.relatedArticles.set(related);
  }

  getAuthorAvatar(author: string): string {
    const avatars: { [key: string]: string } = {
      'Sarah Johnson': 'https://images.unsplash.com/photo-1494790108755-2616b612a77f?w=100&h=100&fit=crop&crop=face',
      'Dr. Michael Rodriguez': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      'Jennifer Liu': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    };
    return avatars[author] || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face';
  }

  getViewCount(): string {
    return Math.floor(Math.random() * 10000 + 1000).toLocaleString();
  }

  getSourceName(category: string): string {
    const sources: { [key: string]: string } = {
      'Politics': 'Associated Press',
      'Technology': 'Tech News Daily',
      'Environment': 'Global Environmental Report',
      'Science': 'Science Journal',
      'Business': 'Business Weekly',
      'Sports': 'Sports Network',
      'Health': 'Medical Times'
    };
    return sources[category] || 'News Source';
  }

  getPublisherLogo(category: string): string {
    const logos: { [key: string]: string } = {
      'Politics': 'https://via.placeholder.com/40x40/1f2937/ffffff?text=P',
      'Technology': 'https://via.placeholder.com/40x40/3b82f6/ffffff?text=T',
      'Environment': 'https://via.placeholder.com/40x40/10b981/ffffff?text=E',
      'Finance': 'https://via.placeholder.com/40x40/f59e0b/ffffff?text=F',
      'Science': 'https://via.placeholder.com/40x40/8b5cf6/ffffff?text=S',
      'Sports': 'https://via.placeholder.com/40x40/ef4444/ffffff?text=SP',
      'Business': 'https://via.placeholder.com/40x40/059669/ffffff?text=B',
      'Health': 'https://via.placeholder.com/40x40/dc2626/ffffff?text=H'
    };
    return logos[category] || 'https://via.placeholder.com/40x40/6b7280/ffffff?text=N';
  }

  trackByArticle(index: number, article: RelatedArticle): string {
    return article.id;
  }
}
