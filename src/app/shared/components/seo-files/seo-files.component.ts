import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-seo-files',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="seo-content">
      <pre>{{ content }}</pre>
    </div>
  `,
  styles: [`
    .seo-content {
      font-family: monospace;
      white-space: pre-wrap;
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 0.5rem;
      margin: 1rem;
      overflow-x: auto;
    }
    pre {
      margin: 0;
      font-size: 12px;
      line-height: 1.4;
    }
  `]
})
export class SeoFilesComponent implements OnInit {
  content: string = '';
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.loadContent();
  }

  private loadContent(): void {
    this.loading = true;
    const url = window.location.pathname;
    
    if (url.includes('robots.txt') || url.includes('robots')) {
      this.seoService.getRobotsTxt().subscribe({
        next: (file) => {
          this.content = file.content;
          this.loading = false;
          this.setContentType(file.contentType);
        },
        error: (error) => {
          console.error('Error loading robots.txt:', error);
          this.error = 'Error loading robots.txt';
          this.loading = false;
        }
      });
    } else if (url.includes('sitemap.xml') || url.includes('sitemap')) {
      this.seoService.getSitemapXml().subscribe({
        next: (file) => {
          this.content = file.content;
          this.loading = false;
          this.setContentType(file.contentType);
        },
        error: (error) => {
          console.error('Error loading sitemap.xml:', error);
          this.error = 'Error loading sitemap.xml';
          this.loading = false;
        }
      });
    }
  }

  private setContentType(contentType: string): void {
    // Set the content type in the document head
    const meta = document.createElement('meta');
    meta.setAttribute('http-equiv', 'Content-Type');
    meta.setAttribute('content', contentType);
    document.head.appendChild(meta);
  }

  private serveRawContent(content: string, contentType: string): void {
    // For sitemap.xml, replace the entire page content with raw XML
    if (contentType.includes('xml')) {
      // Clear the page and set raw XML content
      document.documentElement.innerHTML = '';
      document.body.innerHTML = '';
      
      // Write the raw XML content directly
      document.open();
      document.write(content);
      document.close();
    }
  }
}
