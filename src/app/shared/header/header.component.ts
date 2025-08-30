import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">

          <!-- Left Section: Logo and Badge -->
          <div class="flex items-center space-x-4 lg:space-x-6">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm lg:text-base">P</span>
              </div>
              <a routerLink="/" class="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
                PolicyDrift
              </a>
            </div>

            <!-- Badge - Hidden on mobile -->
            <span class="hidden md:inline-flex text-xs lg:text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 px-3 py-1.5 rounded-full font-medium">
              🤖 AI-powered insights
            </span>
          </div>

          <!-- Center Section: Desktop Navigation -->
          <nav class="hidden lg:flex items-center justify-center flex-1 px-8">
            <div class="flex items-center space-x-8">
              <a routerLink="/"
                 routerLinkActive="text-blue-600 font-semibold"
                 [routerLinkActiveOptions]="{exact: true}"
                 class="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group">
                Home
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a routerLink="/all-articles"
                 routerLinkActive="text-blue-600 font-semibold"
                 class="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group">
                Articles
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a routerLink="/about"
                 routerLinkActive="text-blue-600 font-semibold"
                 class="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group">
                About
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a routerLink="/privacy"
                 routerLinkActive="text-blue-600 font-semibold"
                 class="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group">
                Privacy
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            </div>
          </nav>

          <!-- Right Section: Search, Time, Mobile Menu -->
          <div class="flex items-center space-x-3 lg:space-x-4">

            <!-- Search - Hidden on mobile -->
            <div class="hidden md:flex items-center">
              <div class="relative">
                <input type="text"
                       placeholder="Search articles..."
                       class="w-56 lg:w-72 xl:w-80 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 hover:bg-white focus:bg-white">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

       
            <!-- Mobile Menu Button - Only on small screens -->
            <button (click)="toggleMobileMenu()"
                    class="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200">
              <svg *ngIf="!isMobileMenuOpen()" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg *ngIf="isMobileMenuOpen()" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Search Bar -->
        <div class="lg:hidden pb-4" *ngIf="isMobileMenuOpen()">
          <div class="relative">
            <input type="text"
                   placeholder="Search articles..."
                   class="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 hover:bg-white focus:bg-white">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu - Only on small screens -->
      <div class="lg:hidden border-t border-gray-200 bg-white" *ngIf="isMobileMenuOpen()">
        <div class="px-4 py-6 space-y-4">
          <nav class="space-y-4">
            <a routerLink="/"
               routerLinkActive="text-blue-600 font-semibold bg-blue-50"
               [routerLinkActiveOptions]="{exact: true}"
               (click)="closeMobileMenu()"
               class="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Home
            </a>
            <a routerLink="/all-articles"
               routerLinkActive="text-blue-600 font-semibold bg-blue-50"
               (click)="closeMobileMenu()"
               class="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
              Articles
            </a>
            <a routerLink="/about"
               routerLinkActive="text-blue-600 font-semibold bg-blue-50"
               (click)="closeMobileMenu()"
               class="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              About
            </a>
            <a routerLink="/privacy"
               routerLinkActive="text-blue-600 font-semibold bg-blue-50"
               (click)="closeMobileMenu()"
               class="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              Privacy
            </a>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Ensure proper alignment on larger screens */
    @media (min-width: 1024px) {
      header nav {
        flex: 1;
        display: flex;
        justify-content: center;
      }
      
      header nav > div {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    /* Improve spacing on extra large screens */
    @media (min-width: 1280px) {
      header .max-w-7xl {
        max-width: 80rem;
      }
    }

    /* Ensure proper button alignment */
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* Smooth transitions for all interactive elements */
    a, button, input {
      transition: all 0.2s ease-in-out;
    }

    /* Improve search input styling */
    input[type="text"] {
      transition: all 0.2s ease-in-out;
    }

    input[type="text"]:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    /* Better hover effects for navigation */
    nav a:hover {
      transform: translateY(-1px);
    }

    /* Ensure proper spacing between elements */
    .space-x-3 > * + * {
      margin-left: 0.75rem;
    }

    .space-x-4 > * + * {
      margin-left: 1rem;
    }

    .space-x-6 > * + * {
      margin-left: 1.5rem;
    }

    .space-x-8 > * + * {
      margin-left: 2rem;
    }

    /* Mobile optimizations */
    @media (max-width: 1023px) {
      header nav {
        display: none;
      }
    }

    /* Ensure proper alignment on medium screens */
    @media (min-width: 768px) and (max-width: 1023px) {
      header .flex {
        justify-content: space-between;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  currentTime = signal<string>('');
  isMobileMenuOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.updateCurrentTime();
    setInterval(() => this.updateCurrentTime(), 60000);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  private updateCurrentTime(): void {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    this.currentTime.set(now.toLocaleDateString('en-US', options));
  }
}
