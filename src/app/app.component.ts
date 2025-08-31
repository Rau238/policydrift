import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { isDevMode } from '@angular/core';
import { SeoService } from './shared/services/seo.service';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'policydrift';
  isDevMode = isDevMode();

  constructor(
    private seoService: SeoService,
    private swUpdate: SwUpdate
  ) {}

  ngOnInit(): void {
    this.initializeGlobalSEO();
  }


  private initializeGlobalSEO(): void {
    this.seoService.updateSeoTags({
      title: 'PolicyDrift - AI-powered Geopolitical News & Policy Analysis',
      description: 'Stay informed with PolicyDrift\'s AI-powered geopolitical insights, latest political developments, policy changes, and trending news analysis. Easy-to-understand coverage of complex global issues.',
      keywords: 'geopolitical news, policy analysis, political developments, global politics, policy drift, international relations, political insights, AI-powered analysis, trending news, policy changes, governance trends',
      author: 'PolicyDrift Team',
      ogType: 'website',
      ogImage: 'https://policydrift.live/images/og-default.jpg',
      canonicalUrl: 'https://policydrift.live'
    });

    // Add website structured data
    this.seoService.addStructuredData(
      this.seoService.getWebsiteStructuredData()
    );

    // Add organization structured data
    this.seoService.addStructuredData(
      this.seoService.getOrganizationStructuredData()
    );
  }

 
}
