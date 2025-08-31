import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="bg-gradient-to-br from-blue-800 to-blue-600 text-white shadow-lg sticky top-0 z-50 w-full">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
          <!-- Logo and Brand -->
          <div class="flex-shrink-0">
            <a routerLink="/" class="flex items-center space-x-3 text-white hover:text-gray-200 transition-colors">
              <img src="/icons/windows11/Square44x44Logo.scale-100.png" 
                   alt="PolicyDrift Logo" 
                   class="w-10 h-10 lg:w-12 lg:h-12 rounded-lg shadow-md object-cover">
              <span class="text-xl lg:text-2xl font-bold text-white bg-clip-text text-transparent">
                POLICYDRIFT
              </span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <a routerLink="/" class="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:scale-105">
              Home
            </a>
            <a routerLink="/all-articles" class="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:scale-105">
              Articles
            </a>
            <a routerLink="/about" class="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:scale-105">
              About
            </a>
            <a routerLink="/terms" class="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:scale-105">
              Terms
            </a>
            <a routerLink="/privacy" class="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:scale-105">
              Privacy
            </a>
          </nav>

          <!-- Right Section -->
          <div class="flex items-center space-x-4">
            <!-- Current Time - Hidden on mobile -->
            <div class="hidden lg:flex items-center space-x-2 text-gray-200 text-sm">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
              </svg>
              <span>{{ currentTime() }}</span>
            </div>

            <!-- Mobile Menu Button -->
            <button 
              (click)="toggleMobileMenu()" 
              class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200"
              aria-expanded="false"
              aria-label="Toggle mobile menu">
              <!-- Icon when menu is closed -->
              <svg 
                *ngIf="!isMobileMenuOpen()"
                class="block h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Icon when menu is open -->
              <svg 
                *ngIf="isMobileMenuOpen()"
                class="block h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div 
        class="md:hidden"
        [class.hidden]="!isMobileMenuOpen()">
        <div class="px-2 pt-2 pb-3 space-y-1 bg-blue-900/95 border-t border-white/10 shadow-xl">
          <a 
            routerLink="/" 
            (click)="closeMobileMenu()"
            class="block px-3 py-3 rounded-md text-base font-medium text-white hover:text-yellow-300 hover:bg-white/10 transition-all duration-200 transform hover:translate-x-1">
            Home
          </a>
          <a 
            routerLink="/all-articles" 
            (click)="closeMobileMenu()"
            class="block px-3 py-3 rounded-md text-base font-medium text-white hover:text-yellow-300 hover:bg-white/10 transition-all duration-200 transform hover:translate-x-1">
            Articles
          </a>
          <a 
            routerLink="/about" 
            (click)="closeMobileMenu()"
            class="block px-3 py-3 rounded-md text-base font-medium text-white hover:text-yellow-300 hover:bg-white/10 transition-all duration-200 transform hover:translate-x-1">
            About
          </a>
          <a 
            routerLink="/terms" 
            (click)="closeMobileMenu()"
            class="block px-3 py-3 rounded-md text-base font-medium text-white hover:text-yellow-300 hover:bg-white/10 transition-all duration-200 transform hover:translate-x-1">
            Terms
          </a>
          <a 
            routerLink="/privacy" 
            (click)="closeMobileMenu()"
            class="block px-3 py-3 rounded-md text-base font-medium text-white hover:text-yellow-300 hover:bg-white/10 transition-all duration-200 transform hover:translate-x-1">
            Privacy
          </a>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  isMobileMenuOpen = signal(false);
  currentTime = signal('');

  constructor() {
    this.updateCurrentTime();
    setInterval(() => this.updateCurrentTime(), 1000);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  private updateCurrentTime(): void {
    const now = new Date();
    this.currentTime.set(now.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: 'numeric', 
      minute: '2-digit',
      second: '2-digit'
    }));
  }
}
