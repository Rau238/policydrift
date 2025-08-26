import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- Common Header Navigation -->
    <header class="border-b border-gray-200 sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Top Header -->
        <div class="flex items-center justify-between py-4">
          <div class="flex items-center space-x-8">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">P</span>
              </div>
              <a routerLink="/" class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
                PolicyDrift
              </a>
            </div>
            <span class="text-sm text-gray-500 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 px-3 py-1.5 rounded-full font-medium">
              🤖 AI-powered policy insights
            </span>
          </div>
          <div class="flex items-center space-x-6">
            <nav class="hidden md:flex items-center space-x-6">
              <a routerLink="/"
                 routerLinkActive="text-blue-600 font-semibold"
                 [routerLinkActiveOptions]="{exact: true}"
                 class="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a routerLink="/all-articles"
                 routerLinkActive="text-blue-600 font-semibold"
                 class="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                All Articles
              </a>
              <a routerLink="/about"
                 routerLinkActive="text-blue-600 font-semibold"
                 class="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                About
              </a>

            </nav>
            <button class="text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-all duration-200 font-medium">
              📱 Download App
            </button>
            <div class="text-sm text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded border">
              {{ currentTime() }}
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HeaderComponent implements OnInit {
  currentTime = signal<string>('');

  ngOnInit(): void {
    this.updateCurrentTime();
    setInterval(() => this.updateCurrentTime(), 60000);
  }

  private updateCurrentTime(): void {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    this.currentTime.set(now.toLocaleDateString('en-US', options));
  }
}
