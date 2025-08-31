import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sitemap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <pre>{{ sitemapContent }}</pre>
  `,
  styles: [`
    pre {
      white-space: pre-wrap;
      font-family: monospace;
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 0.5rem;
      margin: 1rem;
    }
  `]
})
export class SitemapComponent implements OnInit {
  sitemapContent: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.sitemapContent = data['content'];
    });
  }
}
