import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-terms',
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

      <!-- Main Content -->
      <main class="max-w-4xl mx-auto px-4 py-12">
        <div class="prose prose-lg max-w-none">

          <!-- Header -->
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p class="text-xl text-gray-600">Last updated: December 15, 2024</p>
          </div>

          <!-- Content -->
          <div class="space-y-8">

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p class="text-gray-700 leading-relaxed">
                By accessing and using PolicyDrift, you accept and agree to be bound by the terms and provision of this agreement.
                PolicyDrift is an AI-powered platform that provides policy insights and analysis to help users understand governance better.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                Permission is granted to temporarily access PolicyDrift for personal, non-commercial transitory viewing only.
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on PolicyDrift</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">3. AI-Generated Content</h2>
              <p class="text-gray-700 leading-relaxed">
                PolicyDrift uses artificial intelligence to analyze and present policy information. While we strive for accuracy,
                AI-generated content should be used for informational purposes only and may contain errors or biases.
                Users should verify information through official sources before making important decisions.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">4. User Accounts</h2>
              <p class="text-gray-700 leading-relaxed">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times.
                You are responsible for safeguarding the password and for any activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">5. Privacy Policy</h2>
              <p class="text-gray-700 leading-relaxed">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information
                when you use our service. By using PolicyDrift, you agree to the collection and use of information in accordance
                with our <a [routerLink]="['/privacy']" class="text-blue-600 hover:text-blue-700 underline">Privacy Policy</a>.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">6. Prohibited Uses</h2>
              <p class="text-gray-700 leading-relaxed mb-4">You may not use PolicyDrift:</p>
              <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">7. Disclaimer</h2>
              <p class="text-gray-700 leading-relaxed">
                The information on PolicyDrift is provided on an 'as is' basis. To the fullest extent permitted by law,
                PolicyDrift excludes all representations, warranties, conditions and terms whether express, implied, statutory or otherwise.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">8. Limitations</h2>
              <p class="text-gray-700 leading-relaxed">
                In no event shall PolicyDrift or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use PolicyDrift, even if PolicyDrift or its authorized representative has been notified orally or in writing
                of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">9. Governing Law</h2>
              <p class="text-gray-700 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the United States
                and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p class="text-gray-700 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              <p class="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div class="bg-gray-50 p-6 rounded-lg mt-4">
                <p class="text-gray-700"><strong>Email:</strong> legal&#64;policy.drift.yt.com</p>
                <p class="text-gray-700"><strong>Address:</strong> PolicyDrift Inc., 123 Innovation Drive, Tech Valley, CA 94000</p>
                <p class="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </section>

          </div>

          <!-- Footer Navigation -->
          <div class="mt-16 pt-8 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <a [routerLink]="['/']" class="text-blue-600 hover:text-blue-700 font-medium">← Back to Home</a>
              <div class="flex items-center space-x-6">
                <a [routerLink]="['/privacy']" class="text-gray-500 hover:text-gray-700">Privacy Policy</a>
                <a [routerLink]="['/about']" class="text-gray-500 hover:text-gray-700">About Us</a>
              </div>
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
      ogImage: 'https://policydrift.com/images/terms-og.jpg',
      canonicalUrl: 'https://policydrift.com/terms',
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
      "url": "https://policydrift.com/terms",
      "dateModified": "2024-08-26",
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
            "name": "Terms of Service",
            "item": "https://policydrift.com/terms"
          }
        ]
      }
    };
  }

}
