import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <img src="/icons/windows11/Square44x44Logo.scale-100.png" 
                 alt="PolicyDrift Logo" 
                 class="footer-logo"
                 width="48" 
                 height="48">
            <h3>PolicyDrift</h3>
          </div>
          <p>AI-powered geopolitical news and policy analysis platform. Making complex global issues easy to understand.</p>
          <div class="contact-info">
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <a href="mailto:policy.drift.yt@gmail.com">policy.drift.yt&#64;gmail.com</a>
            </div>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/all-articles">All Articles</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/terms">Terms</a></li>
            <li><a href="/privacy">Privacy</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><a href="/all-articles?category=politics">Politics</a></li>
            <li><a href="/all-articles?category=economy">Economy</a></li>
            <li><a href="/all-articles?category=international">International</a></li>
            <li><a href="/all-articles?category=technology">Technology</a></li>
            <li><a href="/all-articles?category=healthcare">Healthcare</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Follow Us</h4>
          <div class="social-links">
            <a href="https://www.youtube.com/@Policydrift-p1v" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="social-link youtube" 
               title="YouTube">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            
            <a href="https://www.instagram.com/policy_drift/" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="social-link instagram" 
               title="Instagram">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            
            <a href="https://x.com/policy_drift" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="social-link twitter" 
               title="X (Twitter)">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            
            <a href="https://linkedin.com/company/policydrift" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="social-link linkedin" 
               title="LinkedIn">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            
            <a href="https://www.facebook.com/profile.php?id=61575901066122" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="social-link facebook" 
               title="Facebook">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>&copy; 2025 PolicyDrift. All rights reserved. | AI-powered geopolitical insights and policy analysis.</p>
          <div class="footer-links">
            <a href="/terms">Terms</a>
            <span class="separator">•</span>
            <a href="/about">About</a>
            <span class="separator">•</span>
            <a href="/privacy">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
      color: white;
      padding: 3rem 0 1rem;
      margin-top: 4rem;
      border-top: 1px solid #374151;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2.5rem;
    }

    .footer-brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .footer-logo {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      object-fit: cover;
    }

    .footer-section h3 {
      color: #FFFFFF;
      margin-bottom: 0;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .footer-section h4 {
      color: #FFFFFF;
      margin-bottom: 1rem;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .footer-section p {
      color: #d1d5db;
      line-height: 1.7;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
    }

    .footer-section ul li {
      margin-bottom: 0.75rem;
    }

    .footer-section ul li a {
      color: #d1d5db;
      text-decoration: none;
      transition: all 0.2s;
      font-size: 0.95rem;
      display: inline-block;
    }

    .footer-section ul li a:hover {
      color: #FFFFFF;
      transform: translateX(5px);
    }

    .contact-info {
      margin-top: 1rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .contact-icon {
      width: 20px;
      height: 20px;
      color: #FFFFFF;
      flex-shrink: 0;
    }

    .contact-item a {
      color: #60a5fa;
      text-decoration: none;
      transition: color 0.2s;
      font-size: 0.95rem;
    }

    .contact-item a:hover {
      color: #FFFFFF;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      color: white;
      text-decoration: none;
      transition: all 0.3s;
      position: relative;
      overflow: hidden;
    }

    .social-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.1);
      transform: scale(0);
      transition: transform 0.3s;
      border-radius: 50%;
    }

    .social-link:hover::before {
      transform: scale(1);
    }

    .social-link:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    .social-icon {
      width: 24px;
      height: 24px;
      position: relative;
      z-index: 1;
    }

    .youtube {
      background: #ff0000;
    }

    .instagram {
      background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
    }

    .twitter {
      background: #000000;
    }

    .linkedin {
      background: #0077b5;
    }

    .facebook {
      background: #1877f2;
    }

    .footer-bottom {
      border-top: 1px solid #374151;
      margin-top: 2.5rem;
      padding-top: 1.5rem;
    }

    .footer-bottom-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .footer-bottom p {
      color: #9ca3af;
      font-size: 0.9rem;
      margin: 0;
    }

    .footer-links {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .footer-links a {
      color: #9ca3af;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s;
    }

    .footer-links a:hover {
      color: #FFFFFF;
    }

    .separator {
      color: #6b7280;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
      }
      
      .social-links {
        justify-content: center;
      }

      .footer-bottom-content {
        flex-direction: column;
        text-align: center;
      }

      .contact-item {
        justify-content: center;
      }

      .footer-brand {
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .footer {
        padding: 2rem 0 1rem;
      }

      .footer-content {
        padding: 0 1rem;
      }

      .footer-bottom-content {
        padding: 0 1rem;
      }

      .social-links {
        gap: 0.75rem;
      }

      .social-link {
        width: 40px;
        height: 40px;
      }

      .social-icon {
        width: 20px;
        height: 20px;
      }

      .footer-logo {
        width: 40px;
        height: 40px;
      }

      .footer-section h3 {
        font-size: 1.25rem;
      }
    }

    @media (max-width: 360px) {
      .footer-logo {
        width: 36px;
        height: 36px;
      }

      .footer-section h3 {
        font-size: 1.125rem;
      }

      .footer-brand {
        gap: 0.75rem;
      }
    }
  `]
})
export class FooterComponent {}
