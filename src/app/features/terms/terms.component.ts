import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="terms-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-icon flex justify-center items-center mb-8">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-20 h-20 text-white">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
          </div>
          <h1>Terms of Service</h1>
          <p class="hero-subtitle">Terms and conditions for using PolicyDrift's services</p>
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

          <div class="terms-content">
            <div class="terms-section">
              <h2>Acceptance of Terms</h2>
              <p>By accessing and using PolicyDrift ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </div>

            <div class="terms-section">
              <h2>Description of Service</h2>
              <p>PolicyDrift is an AI-powered geopolitical news and policy analysis platform that provides:</p>
              
              <div class="service-features">
                <div class="service-item">
                  <div class="service-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <span>Geopolitical news analysis</span>
                </div>

                <div class="service-item">
                  <div class="service-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                    </svg>
                  </div>
                  <span>Policy development insights</span>
                </div>

                <div class="service-item">
                  <div class="service-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span>AI-powered analysis</span>
                </div>

                <div class="service-item">
                  <div class="service-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <span>Real-time updates</span>
                </div>
              </div>
            </div>

            <div class="terms-section">
              <h2>User Responsibilities</h2>
              <p>As a user of PolicyDrift, you agree to:</p>
              
              <div class="responsibilities-list">
                <div class="responsibility-item">
                  <div class="responsibility-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Use the service responsibly</h3>
                    <p>Access and use our content for informational and educational purposes only.</p>
                  </div>
                </div>

                <div class="responsibility-item">
                  <div class="responsibility-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Respect intellectual property</h3>
                    <p>Not copy, distribute, or modify our content without permission.</p>
                  </div>
                </div>

                <div class="responsibility-item">
                  <div class="responsibility-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Provide accurate information</h3>
                    <p>Ensure any information you provide to us is truthful and accurate.</p>
                  </div>
                </div>

                <div class="responsibility-item">
                  <div class="responsibility-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Comply with laws</h3>
                    <p>Use our service in accordance with applicable laws and regulations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="terms-section">
              <h2>Prohibited Activities</h2>
              <p>You may not use our service to:</p>
              
              <div class="prohibited-grid">
                <div class="prohibited-item">
                  <div class="prohibited-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"/>
                    </svg>
                  </div>
                  <h3>Illegal Activities</h3>
                  <p>Engage in any unlawful or fraudulent activities</p>
                </div>

                <div class="prohibited-item">
                  <div class="prohibited-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"/>
                    </svg>
                  </div>
                  <h3>Harmful Content</h3>
                  <p>Distribute malicious software or harmful content</p>
                </div>

                <div class="prohibited-item">
                  <div class="prohibited-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"/>
                    </svg>
                  </div>
                  <h3>Spam & Abuse</h3>
                  <p>Send spam or engage in harassment</p>
                </div>

                <div class="prohibited-item">
                  <div class="prohibited-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"/>
                    </svg>
                  </div>
                  <h3>Unauthorized Access</h3>
                  <p>Attempt to gain unauthorized access to our systems</p>
                </div>
              </div>
            </div>

            <div class="terms-section">
              <h2>Intellectual Property</h2>
              <p>All content on PolicyDrift, including but not limited to:</p>
              
              <div class="ip-content">
                <div class="ip-item">
                  <div class="ip-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <span>Articles and analysis</span>
                </div>

                <div class="ip-item">
                  <div class="ip-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <span>AI-generated insights</span>
                </div>

                <div class="ip-item">
                  <div class="ip-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <span>Graphics and design</span>
                </div>

                <div class="ip-item">
                  <div class="ip-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <span>Software and code</span>
                </div>
              </div>
              
              <p>Is protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, or distribute this content without our express written permission.</p>
            </div>

            <div class="terms-section">
              <h2>Disclaimers</h2>
              <p>PolicyDrift provides information for educational and informational purposes only. We make no representations or warranties about:</p>
              
              <div class="disclaimer-list">
                <div class="disclaimer-item">
                  <div class="disclaimer-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Accuracy of information</span>
                </div>

                <div class="disclaimer-item">
                  <div class="disclaimer-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Completeness of analysis</span>
                </div>

                <div class="disclaimer-item">
                  <div class="disclaimer-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Fitness for any purpose</span>
                </div>

                <div class="disclaimer-item">
                  <div class="disclaimer-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Non-infringement of rights</span>
                </div>
              </div>
            </div>

            <div class="terms-section">
              <h2>Limitation of Liability</h2>
              <p>PolicyDrift shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:</p>
              
              <div class="liability-list">
                <div class="liability-item">
                  <div class="liability-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Loss of profits or data</span>
                </div>

                <div class="liability-item">
                  <div class="liability-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Business interruption</span>
                </div>

                <div class="liability-item">
                  <div class="liability-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span>Personal injury or harm</span>
                </div>
              </div>
            </div>

            <div class="terms-section">
              <h2>Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us:</p>
              
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
    .terms-container {
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

    .terms-content {
      padding: 2rem;
    }

    .terms-section {
      margin-bottom: 3rem;
    }

    .terms-section:last-child {
      margin-bottom: 0;
    }

    .terms-section h2 {
      font-size: 1.875rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1rem;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 0.5rem;
    }

    .terms-section p {
      color: #4b5563;
      line-height: 1.7;
      margin-bottom: 1rem;
    }

    .service-features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .service-item {
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

    .service-icon svg {
      width: 20px;
      height: 20px;
      color: #0ea5e9;
    }

    .responsibilities-list {
      margin-top: 1.5rem;
    }

    .responsibility-item {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 0.5rem;
    }

    .responsibility-icon {
      flex-shrink: 0;
    }

    .responsibility-icon svg {
      width: 24px;
      height: 24px;
      color: #10b981;
    }

    .responsibility-item h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .responsibility-item p {
      color: #6b7280;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .prohibited-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .prohibited-item {
      background: #fef2f2;
      padding: 1.5rem;
      border-radius: 0.75rem;
      border: 1px solid #fecaca;
      text-align: center;
      transition: all 0.3s;
    }

    .prohibited-item:hover {
      background: white;
      border-color: #ef4444;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .prohibited-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
    }

    .prohibited-icon svg {
      width: 40px;
      height: 40px;
      color: #dc2626;
    }

    .prohibited-item h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #991b1b;
      margin-bottom: 0.75rem;
    }

    .prohibited-item p {
      color: #7f1d1d;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .ip-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0;
    }

    .ip-item {
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

    .ip-icon svg {
      width: 20px;
      height: 20px;
      color: #22c55e;
    }

    .disclaimer-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0;
    }

    .disclaimer-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: #fef3c7;
      border: 1px solid #fde68a;
      border-radius: 0.5rem;
      color: #92400e;
      font-weight: 500;
    }

    .disclaimer-icon svg {
      width: 20px;
      height: 20px;
      color: #f59e0b;
    }

    .liability-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0;
    }

    .liability-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 0.5rem;
      color: #991b1b;
      font-weight: 500;
    }

    .liability-icon svg {
      width: 20px;
      height: 20px;
      color: #ef4444;
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

      .terms-content {
        padding: 1.5rem;
      }

      .service-features,
      .ip-content,
      .disclaimer-list,
      .liability-list {
        grid-template-columns: 1fr;
      }

      .prohibited-grid {
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

      .terms-section h2 {
        font-size: 1.5rem;
      }

      .terms-content {
        padding: 1rem;
      }
    }
  `]
})
export class TermsComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateSeoTags({
      title: 'Terms of Service - PolicyDrift | Service Terms & Conditions',
      description: 'Read PolicyDrift\'s terms of service and conditions for using our AI-powered geopolitical news and policy analysis platform.',
      keywords: 'terms of service, terms and conditions, PolicyDrift terms, user agreement, service terms',
      author: 'PolicyDrift Team',
      ogType: 'website',
      ogImage: 'https://policydrift.live/images/terms-og.jpg',
      canonicalUrl: 'https://policydrift.live/terms'
    });
  }
}
