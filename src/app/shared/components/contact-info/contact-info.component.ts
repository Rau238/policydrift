import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="contact-info">
      <div class="contact-section">
        <h3>Contact PolicyDrift</h3>
        <div class="contact-item">
          <i class="fas fa-envelope"></i>
          <a href="mailto:policy.drift.yt@gmail.com" class="contact-link">
            policy.drift.yt@gmail.com
          </a>
        </div>
      </div>

      <div class="social-section">
        <h3>Follow Us</h3>
        <div class="social-links">
          <a href="https://www.youtube.com/@Policydrift-p1v" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="social-link youtube">
            <i class="fab fa-youtube"></i>
            <span>YouTube</span>
          </a>
          
          <a href="https://www.instagram.com/policy_drift/" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="social-link instagram">
            <i class="fab fa-instagram"></i>
            <span>Instagram</span>
          </a>
          
          <a href="https://x.com/policy_drift" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="social-link twitter">
            <i class="fab fa-x-twitter"></i>
            <span>X (Twitter)</span>
          </a>
          
          <a href="https://linkedin.com/company/policydrift" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="social-link linkedin">
            <i class="fab fa-linkedin"></i>
            <span>LinkedIn</span>
          </a>
          
          <a href="https://www.facebook.com/profile.php?id=61575901066122" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="social-link facebook">
            <i class="fab fa-facebook"></i>
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-info {
      background: #f8f9fa;
      border-radius: 1rem;
      padding: 2rem;
      margin: 2rem 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h3 {
      color: #1f2937;
      margin-bottom: 1rem;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .contact-section {
      margin-bottom: 2rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
    }

    .contact-link {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
    }

    .contact-link:hover {
      text-decoration: underline;
    }

    .social-links {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: 500;
      transition: all 0.2s;
    }

    .social-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

    .social-link i {
      font-size: 1.25rem;
    }

    @media (max-width: 768px) {
      .social-links {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactInfoComponent {}
