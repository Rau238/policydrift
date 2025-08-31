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
  pwaStatus = 'Initializing...';

  constructor(
    private seoService: SeoService,
    private swUpdate: SwUpdate
  ) {}

  ngOnInit(): void {
    this.initializeGlobalSEO();
    this.checkForUpdates();
  }

  private initializeGlobalSEO(): void {
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

  private checkForUpdates() {
    if (this.swUpdate.isEnabled) {
      this.pwaStatus = 'Service Worker Enabled';
      this.swUpdate.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
          this.pwaStatus = 'Update Available';
          window.location.reload();
        }
      });
      this.swUpdate.checkForUpdate().then(() => {
        this.pwaStatus = 'Checking for Updates';
      }).catch(err => {
        this.pwaStatus = 'Update Check Failed';
      });
    } else {
      this.pwaStatus = 'Service Worker Disabled';
    }
  }
}
