import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white">

      <!-- Header Navigation -->
      <header class="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div class="max-w-6xl mx-auto px-4">
          <!-- Top Header -->
          <div class="flex items-center justify-between py-4">
            <div class="flex items-center space-x-8">
              <a [routerLink]="['/']" class="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">PolicyDrift</a>
              <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                AI-powered policy insights
              </span>
            </div>
            <div class="flex items-center space-x-4">
              <a [routerLink]="['/']" class="text-sm text-blue-600 hover:text-blue-700 font-medium">← Back to Home</a>
            </div>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div class="max-w-6xl mx-auto px-4 text-center">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">About PolicyDrift</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering citizens with AI-powered policy insights to understand governance,
            make informed decisions, and participate meaningfully in democracy.
          </p>
        </div>
      </section>

      <!-- Main Content -->
      <main class="max-w-6xl mx-auto px-4 py-16">

        <!-- Mission Section -->
        <section class="mb-16">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p class="text-lg text-gray-700 leading-relaxed mb-6">
                PolicyDrift was founded on the belief that understanding government policy shouldn't require a law degree.
                We use cutting-edge artificial intelligence to break down complex policy documents, legislative proposals,
                and governmental decisions into clear, actionable insights.
              </p>
              <p class="text-lg text-gray-700 leading-relaxed">
                Our platform democratizes access to policy information, helping citizens, journalists, researchers,
                and organizations stay informed about the policies that shape our society.
              </p>
            </div>
            <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <div class="space-y-6">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold">Transparency</h3>
                    <p class="text-white/80">Making government more accessible</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold">Accuracy</h3>
                    <p class="text-white/80">AI-powered fact-based analysis</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="m22 21-3-3m0-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold">Accessibility</h3>
                    <p class="text-white/80">Complex policies made simple</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- What We Do Section -->
        <section class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              PolicyDrift transforms complex government documents into clear, understandable insights using advanced AI technology.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Policy Analysis</h3>
              <p class="text-gray-600 leading-relaxed">
                Our AI analyzes legislation, regulations, and policy documents to extract key insights and implications for citizens and businesses.
              </p>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Global Coverage</h3>
              <p class="text-gray-600 leading-relaxed">
                We monitor and analyze policy developments from governments around the world, providing comprehensive international coverage.
              </p>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Real-time Updates</h3>
              <p class="text-gray-600 leading-relaxed">
                Stay informed with real-time alerts and analysis of new policy developments, legislative changes, and regulatory updates.
              </p>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section>
          <div class="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white text-center">
            <h2 class="text-3xl font-bold mb-4">Get in Touch</h2>
            <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Have questions about PolicyDrift? Want to partner with us? We'd love to hear from you.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h3 class="font-semibold mb-1">Email</h3>
                <p class="text-blue-100">{{ emailAddress }}</p>
              </div>

              <div>
                <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <h3 class="font-semibold mb-1">Phone</h3>
                <p class="text-blue-100">+1 (555) 123-4567</p>
              </div>

              <div>
                <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h3 class="font-semibold mb-1">Address</h3>
                <p class="text-blue-100">123 Innovation Drive<br>Tech Valley, CA 94000</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer Navigation -->
        <div class="mt-16 pt-8 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <a [routerLink]="['/']" class="text-blue-600 hover:text-blue-700 font-medium">← Back to Home</a>
            <div class="flex items-center space-x-6">
              <a [routerLink]="['/terms']" class="text-gray-500 hover:text-gray-700">Terms of Service</a>
              <a [routerLink]="['/privacy']" class="text-gray-500 hover:text-gray-700">Privacy Policy</a>
            </div>
          </div>
        </div>

      </main>

    </div>
  `,
  styles: [`
    /* Remove underlines from all anchor tags */
    a {
      text-decoration: none !important;
    }

    a:hover {
      text-decoration: none !important;
    }
  `]
})
export class AboutComponent implements OnInit {
  emailAddress = 'hello@policy.drift.yt.com';

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.initializeSEO();
  }

  private initializeSEO(): void {
    const seoData = {
      title: 'About Us - PolicyDrift | AI-Powered Political Analysis Platform',
      description: 'Learn about PolicyDrift\'s mission to provide AI-powered political insights and policy analysis. Discover our team, vision, and commitment to transparent, data-driven political reporting.',
      keywords: 'about PolicyDrift, political analysis platform, AI political insights, policy research, political transparency, data-driven journalism',
      ogType: 'website',
      ogImage: 'https://policydrift.com/images/about-og.jpg',
      canonicalUrl: 'https://policydrift.com/about',
      structuredData: this.getAboutStructuredData()
    };

    this.seoService.updateSeoTags(seoData);
  }

  private getAboutStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About PolicyDrift",
      "description": "Learn about PolicyDrift's AI-powered political analysis platform",
      "url": "https://policydrift.com/about",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://policydrift.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About Us",
            "item": "https://policydrift.com/about"
          }
        ]
      },
      "mainEntity": {
        "@type": "Organization",
        "name": "PolicyDrift",
        "url": "https://policydrift.com",
        "description": "AI-powered political analysis and policy insights platform",
        "foundingDate": "2024",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "hello@policy.drift.yt.com"
        },
        "sameAs": [
          "https://twitter.com/PolicyDrift",
          "https://facebook.com/PolicyDrift",
          "https://linkedin.com/company/policydrift"
        ]
      }
    };
  }
}
