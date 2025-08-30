import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {
  private baseUrl = 'https://policydrift.live';

  generateSitemap(): string {
    const urls = [
      { loc: this.baseUrl, priority: '1.0', changefreq: 'daily' },
      { loc: `${this.baseUrl}/all-articles`, priority: '0.9', changefreq: 'daily' },
      { loc: `${this.baseUrl}/about`, priority: '0.7', changefreq: 'monthly' },
      { loc: `${this.baseUrl}/terms`, priority: '0.5', changefreq: 'yearly' },
      { loc: `${this.baseUrl}/privacy`, priority: '0.5', changefreq: 'yearly' }
    ];

    // Add article URLs (this would come from your data service)
    const articles = this.getArticleSlugs();
    articles.forEach(slug => {
      urls.push({
        loc: `${this.baseUrl}/article/${slug}`,
        priority: '0.8',
        changefreq: 'weekly'
      });
    });

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

  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${this.baseUrl}/sitemap.xml

# Block access to admin or private areas (if any)
Disallow: /admin/
Disallow: /private/

# Allow all search engines to crawl
Crawl-delay: 1`;
  }

  private getArticleSlugs(): string[] {
    // This would typically come from your data service
    // For now, return sample slugs
    return [
      'ai-policy-changes-2024',
      'healthcare-reform-update',
      'economic-policy-analysis',
      'education-system-overhaul',
      'climate-policy-developments'
    ];
  }
}
