import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

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

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private siteUrl = 'https://policydrift.com';
  private siteName = 'PolicyDrift';
  private defaultImage = 'https://policydrift.com/images/og-default.jpg';

  constructor(
    private meta: Meta,
    private titleService: Title
  ) {}

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

  private getCurrentUrl(): string {
    return `${this.siteUrl}${window.location.pathname}`;
  }

  // Website-level structured data
  getWebsiteStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": this.siteName,
      "alternateName": "Policy Drift",
      "url": this.siteUrl,
      "description": "AI-powered policy insights and analysis platform providing comprehensive coverage of political developments, policy changes, and governance trends.",
      "publisher": {
        "@type": "Organization",
        "name": this.siteName,
        "url": this.siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${this.siteUrl}/logo.png`,
          "width": 300,
          "height": 60
        },
        "sameAs": [
          "https://twitter.com/PolicyDrift",
          "https://facebook.com/PolicyDrift",
          "https://linkedin.com/company/policydrift"
        ]
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${this.siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  }

  // Organization structured data
  getOrganizationStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": this.siteName,
      "url": this.siteUrl,
      "logo": `${this.siteUrl}/logo.png`,
      "description": "AI-powered policy insights and analysis platform",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "contact@policydrift.com"
      },
      "sameAs": [
        "https://twitter.com/PolicyDrift",
        "https://facebook.com/PolicyDrift",
        "https://linkedin.com/company/policydrift"
      ]
    };
  }

  // Breadcrumb structured data
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

  // News article structured data
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
}
