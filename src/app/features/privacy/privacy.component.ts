import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="privacy-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-icon flex justify-center items-center mb-8">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-20 h-20 text-white">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <h1>Privacy Policy</h1>
          <p class="hero-subtitle">How PolicyDrift protects your privacy and handles your data</p>
        </div>
      </section>

      <!-- Content Section -->
      <section class="content-section">
        <div class="content-wrapper">
          <div class="last-updated">
            <svg class="update-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>Last updated: January 1, 2025</span>
          </div>

          <div class="policy-content">
            <div class="policy-section">
              <h2>Introduction</h2>
              <p>PolicyDrift ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
              <p>By using PolicyDrift, you consent to the data practices described in this policy.</p>
            </div>

            <div class="policy-section">
              <h2>Information We Collect</h2>
              
              <div class="info-type">
                <div class="info-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <h3>Personal Information</h3>
                  <p>We may collect personal information that you voluntarily provide, such as:</p>
                  <ul>
                    <li>Email address (when subscribing to newsletters)</li>
                    <li>Name and contact information (when contacting us)</li>
                    <li>Comments and feedback you provide</li>
                  </ul>
                </div>
              </div>

              <div class="info-type">
                <div class="info-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <h3>Automatically Collected Information</h3>
                  <p>We automatically collect certain information when you visit our website:</p>
                  <ul>
                    <li>IP address and browser type</li>
                    <li>Pages visited and time spent on site</li>
                    <li>Device information and operating system</li>
                    <li>Referral source and search terms</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="policy-section">
              <h2>How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              
              <div class="usage-grid">
                <div class="usage-item">
                  <div class="usage-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <h3>Content Delivery</h3>
                  <p>Provide and improve our geopolitical news and policy analysis content</p>
                </div>

                <div class="usage-item">
                  <div class="usage-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3>User Experience</h3>
                  <p>Enhance website functionality and personalize your experience</p>
                </div>

                <div class="usage-item">
                  <div class="usage-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h3>Analytics</h3>
                  <p>Analyze usage patterns to improve our services</p>
                </div>

                <div class="usage-item">
                  <div class="usage-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <h3>Communication</h3>
                  <p>Respond to your inquiries and send important updates</p>
                </div>
              </div>
            </div>

            <div class="policy-section">
              <h2>Data Sharing and Disclosure</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:</p>
              
              <div class="disclosure-list">
                <div class="disclosure-item">
                  <div class="disclosure-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Service Providers</h3>
                    <p>We may share data with trusted third-party service providers who assist us in operating our website and providing services.</p>
                  </div>
                </div>

                <div class="disclosure-item">
                  <div class="disclosure-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Legal Requirements</h3>
                    <p>We may disclose information when required by law or to protect our rights and safety.</p>
                  </div>
                </div>

                <div class="disclosure-item">
                  <div class="disclosure-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Consent</h3>
                    <p>We may share information with your explicit consent for specific purposes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="policy-section">
              <h2>Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information:</p>
              
              <div class="security-features">
                <div class="security-item">
                  <div class="security-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                    </svg>
                  </div>
                  <span>SSL Encryption</span>
                </div>

                <div class="security-item">
                  <div class="security-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Secure Data Storage</span>
                </div>

                <div class="security-item">
                  <div class="security-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Regular Security Audits</span>
                </div>

                <div class="security-item">
                  <div class="security-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Access Controls</span>
                </div>
              </div>
            </div>

            <div class="policy-section">
              <h2>Your Rights</h2>
              <p>You have the following rights regarding your personal information:</p>
              
              <div class="rights-list">
                <div class="right-item">
                  <div class="right-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Access your personal data</span>
                </div>

                <div class="right-item">
                  <div class="right-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Correct inaccurate data</span>
                </div>

                <div class="right-item">
                  <div class="right-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Request data deletion</span>
                </div>

                <div class="right-item">
                  <div class="right-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Object to data processing</span>
                </div>
              </div>
            </div>

            <div class="policy-section">
              <h2>Contact Us</h2>
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
              
              <div class="contact-info">
                <div class="contact-item">
                  <div class="contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Email</h3>
                    <p><a href="mailto:policy.drift.yt@gmail.com">policy.drift.yt&#64;gmail.com</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .privacy-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    }

    .hero-section {
      background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-icon {
      margin-bottom: 2rem;
    }

    .hero-icon svg {
      width: 80px;
      height: 80px;
      color: #FFFFFF;
    }

    .hero-section h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #FFFFFF 0%, #f59e0b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      color: #e5e7eb;
      line-height: 1.6;
    }

    .content-section {
      padding: 4rem 2rem;
    }

    .content-wrapper {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .last-updated {
      background: #f8fafc;
      padding: 1.5rem 2rem;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .update-icon {
      width: 20px;
      height: 20px;
      color: #3b82f6;
    }

    .policy-content {
      padding: 2rem;
    }

    .policy-section {
      margin-bottom: 3rem;
    }

    .policy-section:last-child {
      margin-bottom: 0;
    }

    .policy-section h2 {
      font-size: 1.875rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1rem;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 0.5rem;
    }

    .policy-section p {
      color: #4b5563;
      line-height: 1.7;
      margin-bottom: 1rem;
    }

    .policy-section ul {
      color: #4b5563;
      line-height: 1.7;
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }

    .policy-section li {
      margin-bottom: 0.5rem;
    }

    .info-type {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 0.75rem;
      border: 1px solid #e2e8f0;
    }

    .info-icon {
      flex-shrink: 0;
    }

    .info-icon svg {
      width: 40px;
      height: 40px;
      color: #3b82f6;
    }

    .info-content h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.75rem;
    }

    .usage-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .usage-item {
      background: #f8fafc;
      padding: 1.5rem;
      border-radius: 0.75rem;
      border: 1px solid #e2e8f0;
      text-align: center;
      transition: all 0.3s;
    }

    .usage-item:hover {
      background: white;
      border-color: #3b82f6;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .usage-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
    }

    .usage-icon svg {
      width: 40px;
      height: 40px;
      color: #10b981;
    }

    .usage-item h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.75rem;
    }

    .usage-item p {
      color: #6b7280;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .disclosure-list {
      margin-top: 1.5rem;
    }

    .disclosure-item {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 0.5rem;
    }

    .disclosure-icon {
      flex-shrink: 0;
    }

    .disclosure-icon svg {
      width: 24px;
      height: 24px;
      color: #3b82f6;
    }

    .disclosure-item h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .disclosure-item p {
      color: #6b7280;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .security-features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .security-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 0.5rem;
      color: #0369a1;
      font-weight: 500;
    }

    .security-icon svg {
      width: 20px;
      height: 20px;
      color: #0ea5e9;
    }

    .rights-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .right-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 0.5rem;
      color: #166534;
      font-weight: 500;
    }

    .right-icon svg {
      width: 20px;
      height: 20px;
      color: #22c55e;
    }

    .contact-info {
      margin-top: 1.5rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 0.75rem;
    }

    .contact-icon svg {
      width: 24px;
      height: 24px;
      color: #f59e0b;
    }

    .contact-item h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.25rem;
    }

    .contact-item a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
    }

    .contact-item a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 3rem 1rem;
      }

      .hero-section h1 {
        font-size: 2.5rem;
      }

      .content-section {
        padding: 2rem 1rem;
      }

      .policy-content {
        padding: 1.5rem;
      }

      .info-type {
        flex-direction: column;
        text-align: center;
      }

      .usage-grid {
        grid-template-columns: 1fr;
      }

      .security-features,
      .rights-list {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .hero-section h1 {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1.125rem;
      }

      .policy-section h2 {
        font-size: 1.5rem;
      }

      .policy-content {
        padding: 1rem;
      }
    }
  `]
})
export class PrivacyComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateSeoTags({
      title: 'Privacy Policy - PolicyDrift | Data Protection & Privacy',
      description: 'Learn how PolicyDrift protects your privacy and handles your data. Our comprehensive privacy policy explains data collection, usage, and your rights.',
      keywords: 'privacy policy, data protection, personal information, PolicyDrift privacy, GDPR compliance',
      author: 'PolicyDrift Team',
      ogType: 'website',
      ogImage: 'https://policydrift.live/images/privacy-og.jpg',
      canonicalUrl: 'https://policydrift.live/privacy'
    });
  }
}
