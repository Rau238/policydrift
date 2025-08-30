import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './services/seo.service';
import { SeoInterceptorService } from './services/seo-interceptor.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit {
  title = 'PolicyDrift - AI-powered Policy Insights';

  constructor(
    private seoService: SeoService,
    private seoInterceptor: SeoInterceptorService
  ) {}

  ngOnInit(): void {
    this.initializeGlobalSEO();
  }

  private initializeGlobalSEO(): void {
    // Set global meta tags that apply to all pages
    this.seoService.updateSeoTags({
      title: 'PolicyDrift - AI-powered Policy Insights & Political Analysis',
      description: 'Stay informed with PolicyDrift\'s AI-powered political insights and comprehensive policy analysis.',
      keywords: 'policy analysis, political news, AI insights, governance, policy drift',
      author: 'PolicyDrift Team',
      ogType: 'website',
      ogImage: 'https://policydrift.live/images/og-default.jpg',
      canonicalUrl: 'https://policydrift.live'
    });
  }
}
