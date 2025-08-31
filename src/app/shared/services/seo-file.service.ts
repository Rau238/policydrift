import { Injectable } from '@angular/core';
import { SitemapService } from './sitemap.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface SeoFileResponse {
  content: string;
  contentType: string;
  filename: string;
  lastModified: Date;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class SeoFileService {

  constructor(private sitemapService: SitemapService) {}

  /**
   * Get robots.txt content with proper content type
   */
  getRobotsTxt(): SeoFileResponse {
    const content = this.sitemapService.generateRobotsTxt();
    return {
      content,
      contentType: 'text/plain',
      filename: 'robots.txt',
      lastModified: new Date(),
      size: content.length
    };
  }

  /**
   * Get sitemap.xml content with proper content type
   */
  getSitemapXml(): Observable<SeoFileResponse> {
    return this.sitemapService.generateSitemap().pipe(
      map(content => ({
        content,
        contentType: 'application/xml',
        filename: 'sitemap.xml',
        lastModified: new Date(),
        size: content.length
      })),
      catchError(error => {
        console.error('Error generating sitemap:', error);
        // Return a fallback sitemap
        const fallbackContent = this.generateFallbackSitemap();
        return of({
          content: fallbackContent,
          contentType: 'application/xml',
          filename: 'sitemap.xml',
          lastModified: new Date(),
          size: fallbackContent.length
        });
      })
    );
  }

  /**
   * Get all SEO files for bulk operations
   */
  getAllSeoFiles(): Observable<SeoFileResponse[]> {
    return this.sitemapService.generateSitemap().pipe(
      map(sitemapContent => [
        {
          content: this.sitemapService.generateRobotsTxt(),
          contentType: 'text/plain',
          filename: 'robots.txt',
          lastModified: new Date(),
          size: this.sitemapService.generateRobotsTxt().length
        },
        {
          content: sitemapContent,
          contentType: 'application/xml',
          filename: 'sitemap.xml',
          lastModified: new Date(),
          size: sitemapContent.length
        }
      ]),
      catchError(error => {
        console.error('Error generating SEO files:', error);
        // Return fallback files
        return of([
          this.getRobotsTxt(),
          {
            content: this.generateFallbackSitemap(),
            contentType: 'application/xml',
            filename: 'sitemap.xml',
            lastModified: new Date(),
            size: this.generateFallbackSitemap().length
          }
        ]);
      })
    );
  }

  /**
   * Validate sitemap content
   */
  validateSitemap(content: string): boolean {
    try {
      // Basic XML validation
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(content, 'text/xml');
      const parseError = xmlDoc.getElementsByTagName('parsererror');
      return parseError.length === 0;
    } catch (error) {
      console.error('Sitemap validation error:', error);
      return false;
    }
  }

  /**
   * Generate a fallback sitemap if the main one fails
   */
  private generateFallbackSitemap(): string {
    const baseUrl = 'https://policydrift.live';
    const urls = [
      { loc: baseUrl, priority: '1.0', changefreq: 'daily' },
      { loc: `${baseUrl}/all-articles`, priority: '0.9', changefreq: 'daily' },
      { loc: `${baseUrl}/about`, priority: '0.7', changefreq: 'monthly' },
      { loc: `${baseUrl}/terms`, priority: '0.5', changefreq: 'yearly' },
      { loc: `${baseUrl}/privacy`, priority: '0.5', changefreq: 'yearly' }
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

  /**
   * Get file headers for HTTP responses
   */
  getFileHeaders(filename: string): { [key: string]: string } {
    const headers: { [key: string]: string } = {
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      'Last-Modified': new Date().toUTCString()
    };

    if (filename.endsWith('.txt')) {
      headers['Content-Type'] = 'text/plain; charset=utf-8';
    } else if (filename.endsWith('.xml')) {
      headers['Content-Type'] = 'application/xml; charset=utf-8';
    }

    return headers;
  }
}
