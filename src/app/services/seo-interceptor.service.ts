import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SeoService } from './seo.service';

@Injectable({
  providedIn: 'root'
})
export class SeoInterceptorService {

  constructor(
    private router: Router,
    private seoService: SeoService
  ) {
    this.initializeRouteListener();
  }

  private initializeRouteListener(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.handleRouteChange(event.url);
      });
  }

  private handleRouteChange(url: string): void {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Update canonical URL
    this.seoService.updateCanonicalUrl(`https://policydrift.live${url}`);

    // Add page-specific tracking if needed
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: url
      });
    }
  }
}
