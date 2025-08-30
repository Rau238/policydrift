import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Main Content -->
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div class="prose prose-lg max-w-none">
          <!-- Header -->
          <div class="text-center mb-8 sm:mb-12">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p class="text-lg sm:text-xl text-gray-600">Last updated: December 15, 2024</p>
          </div>

          <!-- Content -->
          <div class="space-y-6 sm:space-y-8">
            <section>
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">1. Acceptance of Terms</h2>
              <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
                By accessing and using PolicyDrift, you accept and agree to be bound by the terms and provision of this agreement.
                PolicyDrift is an AI-powered platform that provides policy insights and analysis to help users understand governance better.
              </p>
            </section>

            <section>
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">2. Use License</h2>
              <p class="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                Permission is granted to temporarily access PolicyDrift for personal, non-commercial transitory viewing only.
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 text-sm sm:text-base">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on PolicyDrift</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">3. AI-Generated Content</h2>
              <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
                PolicyDrift uses artificial intelligence to analyze and present policy information. While we strive for accuracy,
                AI-generated content should be used for informational purposes only and may contain errors or biases.
                Users should verify information through official sources before making important decisions.
              </p>
            </section>

            <section>
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">4. User Accounts</h2>
              <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times.
                You are responsible for safeguarding the password and for any activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">5. Privacy Policy</h2>
              <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information
                when you use our service. By using PolicyDrift, you agree to the collection and use of information in accordance
                with our <a [routerLink]="['/privacy']" class="text-blue-600 hover:text-blue-700 underline">Privacy Policy</a>.
              </p>
            </section>

            <section>
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">6. Prohibited Uses</h2>
              <p class="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">You may not use PolicyDrift:</p>
              <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 text-sm sm:text-base">
                <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </section>

            <section>
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">7. Disclaimer</h2>
              <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
                The information on PolicyDrift is provided on an 'as is' basis. To the fullest extent permitted by law,
                PolicyDrift excludes all representations, warranties, conditions and terms whether express, implied, statutory or otherwise.
              </p>
            </section>

            <section>
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">8. Limitations</h2>
              <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
                In no event shall PolicyDrift or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use PolicyDrift, even if PolicyDrift or its authorized representative has been notified orally or in writing
                of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">9. Governing Law</h2>
              <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
                These terms and conditions are governed by and construed in accordance with the laws of the United States
                and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section>
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">10. Changes to Terms</h2>
              <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">11. Contact Information</h2>
              <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div class="bg-gray-50 p-4 sm:p-6 rounded-lg mt-3 sm:mt-4">
                <div class="space-y-2 sm:space-y-3">
                  <div class="flex items-center space-x-3">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p class="text-gray-700 text-sm sm:text-base"><strong>Email:</strong> legal&#64;policy.drift.yt.com</p>
                  </div>
                  <div class="flex items-center space-x-3">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <p class="text-gray-700 text-sm sm:text-base"><strong>Address:</strong> PolicyDrift Inc., 123 Innovation Drive, Tech Valley, CA 94000</p>
                  </div>
                  <div class="flex items-center space-x-3">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <p class="text-gray-700 text-sm sm:text-base"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Footer Navigation -->
          <div class="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200">
            <div class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <a [routerLink]="['/']" class="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">← Back to Home</a>
              <div class="flex items-center space-x-4 sm:space-x-6">
                <a [routerLink]="['/privacy']" class="text-gray-500 hover:text-gray-700 text-sm sm:text-base">Privacy Policy</a>
                <a [routerLink]="['/about']" class="text-gray-500 hover:text-gray-700 text-sm sm:text-base">About Us</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .prose {
      max-width: none;
    }

    .prose h1 {
      color: #111827;
      font-weight: 700;
    }

    .prose h2 {
      color: #1f2937;
      font-weight: 600;
    }

    .prose p {
      color: #374151;
      line-height: 1.75;
    }

    .prose ul li {
      color: #374151;
    }
  `]
})
export class TermsComponent implements OnInit {

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.initializeSEO();
  }

  private initializeSEO(): void {
    const seoData = {
      title: 'Terms of Service - PolicyDrift | Legal Terms & Conditions',
      description: 'Read PolicyDrift\'s terms of service, user agreements, and legal conditions. Understand your rights and responsibilities when using our AI-powered political analysis platform.',
      keywords: 'terms of service, legal terms, user agreement, conditions, PolicyDrift legal, platform terms',
      ogType: 'website',
      ogImage: 'https://policydrift.live/images/terms-og.jpg',
      canonicalUrl: 'https://policydrift.live/terms',
      robots: 'index, follow',
      structuredData: this.getTermsStructuredData()
    };

    this.seoService.updateSeoTags(seoData);
  }

  private getTermsStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms of Service",
      "description": "Terms of service and legal conditions for PolicyDrift platform",
      "url": "https://policydrift.live/terms",
      "dateModified": "2024-08-26",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://policydrift.live"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Terms of Service",
            "item": "https://policydrift.live/terms"
          }
        ]
      }
    };
  }
}
