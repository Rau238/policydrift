import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="!isConsentGiven()"
      class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex-1">
          <p class="text-sm">
            We use cookies and similar technologies to provide, protect, and improve our services. 
            This includes personalized content and advertising. By clicking "Accept", you consent to our use of cookies.
            <a href="/privacy" class="underline hover:text-yellow-300 transition-colors">Learn more</a>
          </p>
        </div>
        <div class="flex gap-3 flex-shrink-0">
          <button 
            (click)="declineCookies()"
            class="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800 transition-colors">
            Decline
          </button>
          <button 
            (click)="acceptCookies()"
            class="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded transition-colors">
            Accept
          </button>
        </div>
      </div>
    </div>
  `
})
export class CookieConsentComponent {
  isConsentGiven = signal(false);

  ngOnInit() {
    // Check if consent was already given
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      this.isConsentGiven.set(true);
    }
  }

  acceptCookies() {
    localStorage.setItem('cookie-consent', 'accepted');
    this.isConsentGiven.set(true);
    // Enable AdSense ads
    this.loadAdSense();
  }

  declineCookies() {
    localStorage.setItem('cookie-consent', 'declined');
    this.isConsentGiven.set(true);
    // Don't load AdSense ads
  }

  private loadAdSense() {
    // Load AdSense script if consent is given
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1508845535613236';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }
}
