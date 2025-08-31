import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { SeoService } from '../services/seo.service';
import { map } from 'rxjs/operators';

export const seoFilesInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const seoService = inject(SeoService);

  // Handle robots.txt requests
  if (request.url.includes('/robots.txt')) {
    return seoService.getRobotsTxt().pipe(
      map(file => {
        const response = new HttpResponse({
          body: file.content,
          status: 200,
          headers: request.headers.set('Content-Type', file.contentType)
        });
        return response;
      })
    );
  }

  // Handle sitemap.xml requests
  if (request.url.includes('/sitemap.xml')) {
    return seoService.getSitemapXml().pipe(
      map(file => {
        const response = new HttpResponse({
          body: file.content,
          status: 200,
          headers: request.headers.set('Content-Type', file.contentType)
        });
        return response;
      })
    );
  }

  // Continue with normal request handling
  return next(request);
};
