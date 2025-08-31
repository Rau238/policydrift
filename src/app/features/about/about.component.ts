import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-icon flex justify-center items-center mb-8">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-20 h-20 text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1>About PolicyDrift</h1>
          <p class="hero-subtitle">AI-powered geopolitical insights that make complex global issues easy to understand</p>
        </div>
      </section>

      <!-- Mission Section -->
      <section class="mission-section">
        <div class="section-content">
          <h2>Our Mission</h2>
          <p>At PolicyDrift, we believe that understanding global politics and policy developments shouldn't be complicated. Our mission is to bridge the gap between complex geopolitical events and public understanding through AI-powered analysis and clear, accessible reporting.</p>
          
          <div class="mission-grid">
            <div class="mission-item">
              <div class="mission-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3>Democratize Knowledge</h3>
              <p>Make complex geopolitical issues accessible to everyone, not just policy experts.</p>
            </div>
            
            <div class="mission-item">
              <div class="mission-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3>AI-Powered Insights</h3>
              <p>Leverage artificial intelligence to analyze trends and provide deeper understanding of global events.</p>
            </div>
            
            <div class="mission-item">
              <div class="mission-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3>Real-Time Updates</h3>
              <p>Stay informed with the latest developments in global politics and policy changes.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What We Cover Section -->
      <section class="coverage-section">
        <div class="section-content">
          <h2>What We Cover</h2>
          <p>Our comprehensive coverage spans across all major geopolitical domains, providing insights into the forces that shape our world.</p>
          
          <div class="coverage-grid">
            <div class="coverage-item">
              <div class="coverage-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3>International Relations</h3>
              <p>Diplomatic developments, trade agreements, and global partnerships that influence world politics.</p>
            </div>
            
            <div class="coverage-item">
              <div class="coverage-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                </svg>
              </div>
              <h3>Economic Policy</h3>
              <p>Monetary policies, fiscal decisions, and economic reforms that impact global markets and societies.</p>
            </div>
            
            <div class="coverage-item">
              <div class="coverage-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3>Technology & Innovation</h3>
              <p>How technological advancements and digital policies are reshaping global governance and international relations.</p>
            </div>
            
            <div class="coverage-item">
              <div class="coverage-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                </svg>
              </div>
              <h3>Social Policy</h3>
              <p>Healthcare reforms, education policies, and social welfare programs that affect global populations.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Our Approach Section -->
      <section class="approach-section">
        <div class="section-content">
          <h2>Our Approach</h2>
          <p>We combine cutting-edge AI technology with human expertise to deliver accurate, insightful, and easy-to-understand policy analysis.</p>
          
          <div class="approach-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>Data Collection</h3>
                <p>Gather information from multiple reliable sources including government reports, international organizations, and expert analysis.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>AI Analysis</h3>
                <p>Use advanced AI algorithms to identify patterns, trends, and connections that might not be immediately apparent.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>Expert Review</h3>
                <p>Human policy experts review and validate AI-generated insights to ensure accuracy and relevance.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>Clear Presentation</h3>
                <p>Present complex information in an accessible format that anyone can understand and act upon.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact-section">
        <div class="section-content">
          <h2>Get in Touch</h2>
          <p>Have questions about our coverage or want to suggest topics? We'd love to hear from you.</p>
          
          <div class="contact-methods">
            <div class="contact-method">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div class="contact-details">
                <h3>Email Us</h3>
                <p><a href="mailto:policy.drift.yt@gmail.com">policy.drift.yt&#64;gmail.com</a></p>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div class="contact-details">
                <h3>Follow Us</h3>
                <p>Stay updated on social media for the latest insights and analysis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .about-container {
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

    .section-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem;
    }

    .section-content h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      text-align: center;
      margin-bottom: 1rem;
    }

    .section-content > p {
      font-size: 1.125rem;
      color: #6b7280;
      text-align: center;
      max-width: 800px;
      margin: 0 auto 3rem;
      line-height: 1.7;
    }

    .mission-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .mission-item {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .mission-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
    }

    .mission-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .mission-icon svg {
      width: 60px;
      height: 60px;
      color: #3b82f6;
    }

    .mission-item h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .mission-item p {
      color: #6b7280;
      line-height: 1.6;
    }

    .coverage-section {
      background: white;
    }

    .coverage-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .coverage-item {
      background: #f8fafc;
      padding: 2rem;
      border-radius: 1rem;
      border: 1px solid #e2e8f0;
      transition: all 0.3s;
    }

    .coverage-item:hover {
      background: white;
      border-color: #3b82f6;
      transform: translateY(-3px);
      box-shadow: 0 8px 25px -3px rgba(0, 0, 0, 0.1);
    }

    .coverage-icon {
      margin-bottom: 1.5rem;
    }

    .coverage-icon svg {
      width: 50px;
      height: 50px;
      color: #10b981;
    }

    .coverage-item h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .coverage-item p {
      color: #6b7280;
      line-height: 1.6;
    }

    .approach-section {
      background: #f8fafc;
    }

    .approach-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .step {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .step-number {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.125rem;
      flex-shrink: 0;
    }

    .step-content h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.75rem;
    }

    .step-content p {
      color: #6b7280;
      line-height: 1.6;
    }

    .contact-section {
      background: white;
    }

    .contact-methods {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .contact-method {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      background: #f8fafc;
      padding: 2rem;
      border-radius: 1rem;
      border: 1px solid #e2e8f0;
      transition: all 0.3s;
    }

    .contact-method:hover {
      background: white;
      border-color: #3b82f6;
      transform: translateY(-3px);
      box-shadow: 0 8px 25px -3px rgba(0, 0, 0, 0.1);
    }

    .contact-icon {
      flex-shrink: 0;
    }

    .contact-icon svg {
      width: 40px;
      height: 40px;
      color: #f59e0b;
    }

    .contact-details h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .contact-details p {
      color: #6b7280;
      line-height: 1.6;
    }

    .contact-details a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
    }

    .contact-details a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 3rem 1rem;
      }

      .hero-section h1 {
        font-size: 2.5rem;
      }

      .section-content {
        padding: 3rem 1rem;
      }

      .section-content h2 {
        font-size: 2rem;
      }

      .mission-grid,
      .coverage-grid,
      .approach-steps,
      .contact-methods {
        grid-template-columns: 1fr;
      }

      .step {
        flex-direction: column;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .hero-section h1 {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1.125rem;
      }

      .section-content h2 {
        font-size: 1.75rem;
      }

      .mission-item,
      .coverage-item,
      .step,
      .contact-method {
        padding: 1.5rem;
      }
    }
  `]
})
export class AboutComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateSeoTags({
      title: 'About PolicyDrift - AI-Powered Geopolitical News & Policy Analysis',
      description: 'Learn about PolicyDrift\'s mission to democratize geopolitical knowledge through AI-powered insights and clear, accessible policy analysis.',
      keywords: 'about PolicyDrift, geopolitical news, policy analysis, AI insights, global politics, mission statement',
      author: 'PolicyDrift Team',
      ogType: 'website',
      ogImage: 'https://policydrift.live/images/about-og.jpg',
      canonicalUrl: 'https://policydrift.live/about'
    });
  }
}
