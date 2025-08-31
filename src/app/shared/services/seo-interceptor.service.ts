import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { SitemapService } from './sitemap.service';

export const seoInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const sitemapService = inject(SitemapService);

  // Handle robots.txt requests
  if (request.url.includes('/robots.txt')) {
    const robotsContent = sitemapService.generateRobotsTxt();
    const response = new HttpResponse({
      body: robotsContent,
      status: 200,
      headers: request.headers.set('Content-Type', 'text/plain')
    });
    return of(response);
  }

  // Handle sitemap.xml requests
  if (request.url.includes('/sitemap.xml')) {
    return new Observable(observer => {
      sitemapService.generateSitemap().subscribe({
        next: (sitemapContent: string) => {
          const response = new HttpResponse({
            body: sitemapContent,
            status: 200,
            headers: request.headers.set('Content-Type', 'application/xml')
          });
          observer.next(response);
          observer.complete();
        },
        error: (error: any) => {
          const errorResponse = new HttpResponse({
            body: 'Error generating sitemap',
            status: 500,
            headers: request.headers.set('Content-Type', 'text/plain')
          });
          observer.next(errorResponse);
          observer.complete();
        }
      });
    });
  }

  // Continue with normal request handling
  return next(request);
};
