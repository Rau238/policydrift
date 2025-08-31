import { Injectable, Optional } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DataService } from './data.service';
import { Observable, of, timer, switchMap } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

export interface SeoData {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogType?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: any;
  robots?: string;
  twitterCard?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

export interface SeoFile {
  content: string;
  contentType: string;
  lastModified: Date;
  etag: string;
  size: number;
}

export interface SeoStats {
  lastUpdate: Date;
  robotsSize: number;
  sitemapSize: number;
  totalArticles: number;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private siteUrl = 'https://policydrift.live';
  private siteName = 'PolicyDrift';
  private defaultImage = 'https://policydrift.live/images/og-default.jpg';
  
  // SEO Files caching
  private robotsCache: SeoFile | null = null;
  private sitemapCache: SeoFile | null = null;
  private lastUpdate = new Date();
  
  // Cache duration in milliseconds (1 hour)
  private readonly CACHE_DURATION = 60 * 60 * 1000;

  constructor(
    private meta: Meta,
    private titleService: Title,
    @Optional() private dataService?: DataService
  ) {
    // Only setup auto-refresh if DataService is available
    if (this.dataService) {
      this.setupAutoRefresh();
    }
  }

  // ===== SEO TAGS MANAGEMENT =====

  updateSeoTags(seoData: SeoData): void {
    // Update page title
    this.titleService.setTitle(seoData.title);

    // Basic meta tags
    this.meta.updateTag({ name: 'description', content: seoData.description });
    this.meta.updateTag({ name: 'keywords', content: seoData.keywords || '' });
    this.meta.updateTag({ name: 'author', content: seoData.author || 'PolicyDrift Team' });
    this.meta.updateTag({ name: 'robots', content: seoData.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' });

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: seoData.title });
    this.meta.updateTag({ property: 'og:description', content: seoData.description });
    this.meta.updateTag({ property: 'og:type', content: seoData.ogType || 'website' });
    this.meta.updateTag({ property: 'og:url', content: seoData.canonicalUrl || this.getCurrentUrl() });
    this.meta.updateTag({ property: 'og:image', content: seoData.ogImage || this.defaultImage });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: seoData.twitterCard || 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: '@PolicyDrift' });
    this.meta.updateTag({ name: 'twitter:title', content: seoData.title });
    this.meta.updateTag({ name: 'twitter:description', content: seoData.description });
    this.meta.updateTag({ name: 'twitter:image', content: seoData.ogImage || this.defaultImage });

    // Additional SEO tags
    this.meta.updateTag({ name: 'format-detection', content: 'telephone=no' });
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1.0' });
    this.meta.updateTag({ name: 'theme-color', content: '#1f2937' });

    // Canonical URL
    this.updateCanonicalUrl(seoData.canonicalUrl || this.getCurrentUrl());

    // Structured data
    if (seoData.structuredData) {
      this.addStructuredData(seoData.structuredData);
    }
  }

  updateCanonicalUrl(url: string): void {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }

  addStructuredData(data: any): void {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  // ===== DYNAMIC SEO FILES =====

  /**
   * Get robots.txt content with caching and auto-refresh
   */
  getRobotsTxt(): Observable<SeoFile> {
    if (this.shouldUseCache(this.robotsCache)) {
      return of(this.robotsCache!);
    }

    return this.generateRobotsTxt().pipe(
      map(content => {
        const file: SeoFile = {
          content,
          contentType: 'text/plain; charset=utf-8',
          lastModified: new Date(),
          etag: this.generateEtag(content),
          size: content.length
        };
        this.robotsCache = file;
        return file;
      }),
      shareReplay(1)
    );
  }

  /**
   * Get sitemap.xml content with caching and auto-refresh
   */
  getSitemapXml(): Observable<SeoFile> {
    if (this.shouldUseCache(this.sitemapCache)) {
      return of(this.sitemapCache!);
    }

    return this.generateSitemap().pipe(
      map(content => {
        const file: SeoFile = {
          content,
          contentType: 'application/xml; charset=utf-8',
          lastModified: new Date(),
          etag: this.generateEtag(content),
          size: content.length
        };
        this.sitemapCache = file;
        return file;
      }),
      catchError(error => {
        console.error('Error generating sitemap:', error);
        // Return fallback sitemap
        const fallbackContent = this.generateFallbackSitemap();
        const file: SeoFile = {
          content: fallbackContent,
          contentType: 'application/xml; charset=utf-8',
          lastModified: new Date(),
          etag: this.generateEtag(fallbackContent),
          size: fallbackContent.length
        };
        this.sitemapCache = file;
        return of(file);
      }),
      shareReplay(1)
    );
  }

  /**
   * Force refresh of all SEO files
   */
  refreshAll(): Observable<{ robots: SeoFile; sitemap: SeoFile }> {
    this.clearCache();
    return this.getRobotsTxt().pipe(
      switchMap(robots => 
        this.getSitemapXml().pipe(
          map(sitemap => ({ robots, sitemap }))
        )
      )
    );
  }

  /**
   * Get HTTP headers for SEO files
   */
  getHeaders(file: SeoFile): { [key: string]: string } {
    return {
      'Content-Type': file.contentType,
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Last-Modified': file.lastModified.toUTCString(),
      'ETag': file.etag,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    };
  }

  /**
   * Get comprehensive SEO statistics
   */
  getStats(): SeoStats {
    return {
      lastUpdate: this.lastUpdate,
      robotsSize: this.robotsCache?.size || 0,
      sitemapSize: this.sitemapCache?.size || 0,
      totalArticles: this.getTotalArticles()
    };
  }

  // ===== STRUCTURED DATA =====

  getWebsiteStructuredData(): object {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "PolicyDrift",
      "alternateName": "Policy Drift",
      "url": this.siteUrl,
      "description": "AI-powered policy insights and analysis platform providing comprehensive coverage of political developments, policy changes, and governance trends.",
      "publisher": {
        "@type": "Organization",
        "name": "PolicyDrift",
        "url": this.siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${this.siteUrl}/logo.png`,
          "width": 300,
          "height": 60
        },
        "sameAs": [
          "https://www.youtube.com/@Policydrift-p1v",
          "https://www.instagram.com/policy_drift/",
          "https://x.com/policy_drift",
          "https://linkedin.com/company/policydrift",
          "https://www.facebook.com/profile.php?id=61575901066122"
        ]
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${this.siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  }

  getOrganizationStructuredData(): object {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PolicyDrift",
      "url": this.siteUrl,
      "logo": `${this.siteUrl}/logo.png`,
      "description": "AI-powered policy insights and analysis platform for geopolitical news and policy developments",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "policy.drift.yt@gmail.com"
      },
      "sameAs": [
        "https://www.youtube.com/@Policydrift-p1v",
        "https://www.instagram.com/policy_drift/",
        "https://x.com/policy_drift",
        "https://linkedin.com/company/policydrift",
        "https://www.facebook.com/profile.php?id=61575901066122"
      ]
    };
  }

  getBreadcrumbStructuredData(breadcrumbs: Array<{name: string, url: string}>): any {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  }

  getNewsArticleStructuredData(article: any): any {
    return {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": article.title,
      "description": article.excerpt,
      "image": {
        "@type": "ImageObject",
        "url": article.image || this.defaultImage,
        "width": "1200",
        "height": "630"
      },
      "author": {
        "@type": "Person",
        "name": article.author || "PolicyDrift Team",
        "url": `${this.siteUrl}/author/${(article.author || 'team').toLowerCase().replace(/\s+/g, '-')}`
      },
      "publisher": {
        "@type": "Organization",
        "name": this.siteName,
        "logo": {
          "@type": "ImageObject",
          "url": `${this.siteUrl}/logo.png`,
          "width": "300",
          "height": "60"
        }
      },
      "datePublished": article.publishedDate,
      "dateModified": article.modifiedDate || article.publishedDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${this.siteUrl}/article/${article.slug}`
      },
      "url": `${this.siteUrl}/article/${article.slug}`,
      "articleSection": article.category,
      "keywords": article.tags?.join(', ') || '',
      "wordCount": article.wordCount || 0,
      "timeRequired": `PT${article.readTime || 5}M`,
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "genre": "news"
    };
  }

  // ===== PRIVATE METHODS =====

  private getCurrentUrl(): string {
    return `${this.siteUrl}${window.location.pathname}`;
  }

  private generateRobotsTxt(): Observable<string> {
    const robotsContent = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${this.siteUrl}/sitemap.xml

# Block access to admin or private areas
Disallow: /admin/
Disallow: /private/

# Allow all search engines to crawl
Crawl-delay: 1

# Additional SEO-friendly settings
Allow: /article/
Allow: /all-articles/
Allow: /about/
Allow: /terms/
Allow: /privacy/`;

    return of(robotsContent);
  }

  private generateSitemap(): Observable<string> {
    // If DataService is not available, return fallback sitemap
    if (!this.dataService) {
      return of(this.generateFallbackSitemap());
    }

    return this.dataService.getArticles().pipe(
      map(response => {
        const urls = [
          { loc: this.siteUrl, priority: '1.0', changefreq: 'daily' },
          { loc: `${this.siteUrl}/all-articles`, priority: '0.9', changefreq: 'daily' },
          { loc: `${this.siteUrl}/about`, priority: '0.7', changefreq: 'monthly' },
          { loc: `${this.siteUrl}/terms`, priority: '0.5', changefreq: 'yearly' },
          { loc: `${this.siteUrl}/privacy`, priority: '0.5', changefreq: 'yearly' }
        ];

        // Add article URLs dynamically from data service
        if (response.data && response.data.length > 0) {
          response.data.forEach(article => {
            urls.push({
              loc: `${this.siteUrl}/article/${article.slug}`,
              priority: '0.8',
              changefreq: 'weekly'
            });
          });
        }

        let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        urls.forEach(url => {
          sitemap += '  <url>\n';
          sitemap += `    <loc>${url.loc}</loc>\n`;
          sitemap += `    <priority>${url.priority}</priority>\n`;
          sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`;
          sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
          sitemap += '  </url>\n';
        });

        sitemap += '</urlset>';
        return sitemap;
      }),
      catchError(error => {
        console.error('Error generating dynamic sitemap:', error);
        // Return fallback sitemap on error
        return of(this.generateFallbackSitemap());
      })
    );
  }

  private generateFallbackSitemap(): string {
    const urls = [
      { loc: this.siteUrl, priority: '1.0', changefreq: 'daily' },
      { loc: `${this.siteUrl}/all-articles`, priority: '0.9', changefreq: 'daily' },
      { loc: `${this.siteUrl}/about`, priority: '0.7', changefreq: 'monthly' },
      { loc: `${this.siteUrl}/terms`, priority: '0.5', changefreq: 'yearly' },
      { loc: `${this.siteUrl}/privacy`, priority: '0.5', changefreq: 'yearly' }
    ];

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach(url => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${url.loc}</loc>\n`;
      sitemap += `    <priority>${url.priority}</priority>\n`;
      sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`;
      sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      sitemap += '  </url>\n';
    });

    sitemap += '</urlset>';
    return sitemap;
  }

  private shouldUseCache(cache: SeoFile | null): boolean {
    if (!cache) return false;
    const now = new Date();
    return (now.getTime() - cache.lastModified.getTime()) < this.CACHE_DURATION;
  }

  private generateEtag(content: string): string {
    // Simple hash function for ETag generation
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return `"${Math.abs(hash).toString(16)}"`;
  }

  private clearCache(): void {
    this.robotsCache = null;
    this.sitemapCache = null;
    this.lastUpdate = new Date();
  }

  private setupAutoRefresh(): void {
    // Only setup if DataService is available
    if (this.dataService) {
      // Refresh cache every hour
      timer(this.CACHE_DURATION, this.CACHE_DURATION).subscribe(() => {
        console.log('Auto-refreshing SEO files cache...');
        this.clearCache();
      });
    }
  }

  private getTotalArticles(): number {
    // This would typically come from your data service
    // For now, return a reasonable estimate
    return this.sitemapCache ? 
      (this.sitemapCache.content.match(/<url>/g) || []).length - 5 : 0; // Subtract static pages
  }
}
