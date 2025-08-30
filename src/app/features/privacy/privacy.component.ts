import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-privacy',
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
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p class="text-xl text-gray-600">Last updated: December 15, 2024</p>
          </div>

          <!-- Content -->
          <div class="space-y-8">

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p class="text-gray-700 leading-relaxed">
                PolicyDrift Inc. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you visit our website and use our AI-powered
                policy analysis platform.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 class="text-xl font-medium text-gray-800 mb-3 mt-6">Personal Information</h3>
              <p class="text-gray-700 leading-relaxed mb-4">We may collect personally identifiable information, such as:</p>
              <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Name and email address</li>
                <li>Account credentials</li>
                <li>Profile information</li>
                <li>Communication preferences</li>
              </ul>

              <h3 class="text-xl font-medium text-gray-800 mb-3 mt-6">Usage Data</h3>
              <p class="text-gray-700 leading-relaxed mb-4">We automatically collect certain information when you visit our platform:</p>
              <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Search queries and interaction data</li>
                <li>AI analysis requests and preferences</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p class="text-gray-700 leading-relaxed mb-4">We use the collected information for various purposes:</p>
              <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>To provide and maintain our AI-powered policy analysis service</li>
                <li>To personalize your experience and improve our algorithms</li>
                <li>To communicate with you about updates and new features</li>
                <li>To analyze usage patterns and improve our platform</li>
                <li>To detect and prevent fraudulent activities</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">4. AI and Machine Learning</h2>
              <p class="text-gray-700 leading-relaxed">
                PolicyDrift uses artificial intelligence and machine learning algorithms to analyze policy content.
                Your interactions with our AI system may be used to improve our models and provide better insights.
                We ensure that any data used for AI training is anonymized and aggregated to protect individual privacy.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">5. Information Sharing and Disclosure</h2>
              <p class="text-gray-700 leading-relaxed mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
              <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Service Providers:</strong> With trusted third-party companies that help us operate our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
              <p class="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. These measures include encryption,
                secure server environments, and regular security assessments.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p class="text-gray-700 leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this
                Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need
                your information, we will securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">8. Your Privacy Rights</h2>
              <p class="text-gray-700 leading-relaxed mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Erasure:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">9. Cookies and Tracking Technologies</h2>
              <p class="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our platform.
                Cookies help us remember your preferences, analyze site traffic, and improve our AI recommendations.
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">10. Third-Party Links</h2>
              <p class="text-gray-700 leading-relaxed">
                Our platform may contain links to third-party websites or services. We are not responsible for the
                privacy practices of these external sites. We encourage you to review the privacy policies of any
                third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">11. Children's Privacy</h2>
              <p class="text-gray-700 leading-relaxed">
                PolicyDrift is not intended for use by children under the age of 13. We do not knowingly collect
                personal information from children under 13. If we become aware that we have collected such information,
                we will take steps to delete it promptly.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">12. International Data Transfers</h2>
              <p class="text-gray-700 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own.
                We ensure appropriate safeguards are in place to protect your information in accordance with applicable
                data protection laws.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">13. Changes to This Privacy Policy</h2>
              <p class="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review
                this Privacy Policy periodically.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">14. Contact Us</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div class="bg-gray-50 p-6 rounded-lg mt-4">
                <p class="text-gray-700"><strong>Email:</strong> privacy&#64;policy.drift.yt.com</p>
                <p class="text-gray-700"><strong>Address:</strong> PolicyDrift Inc., 123 Innovation Drive, Tech Valley, CA 94000</p>
                <p class="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p class="text-gray-700"><strong>Data Protection Officer:</strong> dpo&#64;policy.drift.yt.com</p>
              </div>
            </section>

          </div>

          <!-- Footer Navigation -->
          <div class="mt-16 pt-8 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <a [routerLink]="['/']" class="text-blue-600 hover:text-blue-700 font-medium">← Back to Home</a>
              <div class="flex items-center space-x-6">
                <a [routerLink]="['/terms']" class="text-gray-500 hover:text-gray-700">Terms of Service</a>
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

    .prose h3 {
      color: #374151;
      font-weight: 500;
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
export class PrivacyComponent implements OnInit {

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.initializeSEO();
  }

  private initializeSEO(): void {
    const seoData = {
      title: 'Privacy Policy - PolicyDrift | Data Protection & User Privacy',
      description: 'Learn how PolicyDrift protects your privacy and handles your data. Read our comprehensive privacy policy covering data collection, usage, and your privacy rights.',
      keywords: 'privacy policy, data protection, user privacy, data collection, GDPR compliance, privacy rights, data security',
      ogType: 'website',
      ogImage: 'https://policydrift.live/images/privacy-og.jpg',
      canonicalUrl: 'https://policydrift.live/privacy',
      robots: 'index, follow',
      structuredData: this.getPrivacyStructuredData()
    };

    this.seoService.updateSeoTags(seoData);
  }

  private getPrivacyStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy",
      "description": "Privacy policy and data protection information for PolicyDrift platform",
      "url": "https://policydrift.live/privacy",
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
            "name": "Privacy Policy",
            "item": "https://policydrift.live/privacy"
          }
        ]
      }
    };
  }

}
