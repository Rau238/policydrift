import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="card-skeleton"
      [ngClass]="getSkeletonClasses()"
      [style.height]="height"
      [style.width]="width">

      <!-- Animated gradient background -->
      <div class="skeleton-gradient-bg"></div>

      <!-- Shimmer effect overlay -->
      <div class="skeleton-shimmer"></div>

      <!-- Content placeholders based on variant -->
      <div class="skeleton-content" [ngSwitch]="variant">

        <!-- Article Card Layout -->
        <div *ngSwitchCase="'article'" class="article-skeleton-layout">
          <!-- Category badge placeholder -->
          <div class="skeleton-badge"></div>

          <!-- Time placeholder -->
          <div class="skeleton-time"></div>

          <!-- Content area -->
          <div class="skeleton-content-area">
            <!-- Title placeholder -->
            <div class="skeleton-title">
              <div class="skeleton-line skeleton-line-primary"></div>
              <div class="skeleton-line skeleton-line-secondary"></div>
            </div>

            <!-- Excerpt placeholder -->
            <div class="skeleton-excerpt">
              <div class="skeleton-line skeleton-line-tertiary"></div>
            </div>
          </div>
        </div>

        <!-- Featured Article Layout -->
        <div *ngSwitchCase="'featured'" class="featured-skeleton-layout">
          <div class="skeleton-featured-badge"></div>
          <div class="skeleton-featured-title">
            <div class="skeleton-line skeleton-line-featured-1"></div>
            <div class="skeleton-line skeleton-line-featured-2"></div>
            <div class="skeleton-line skeleton-line-featured-3"></div>
          </div>
          <div class="skeleton-featured-excerpt">
            <div class="skeleton-line skeleton-line-featured-desc"></div>
          </div>
        </div>

        <!-- Category Card Layout -->
        <div *ngSwitchCase="'category'" class="category-skeleton-layout">
          <div class="skeleton-category-icon"></div>
          <div class="skeleton-category-title">
            <div class="skeleton-line skeleton-line-category"></div>
          </div>
          <div class="skeleton-category-count">
            <div class="skeleton-line skeleton-line-count"></div>
          </div>
        </div>

        <!-- Simple Card Layout (Default) -->
        <div *ngSwitchDefault class="simple-skeleton-layout">
          <div class="skeleton-simple-content">
            <div class="skeleton-line skeleton-line-simple-1"></div>
            <div class="skeleton-line skeleton-line-simple-2"></div>
            <div class="skeleton-line skeleton-line-simple-3"></div>
          </div>
        </div>

      </div>

      <!-- Loading indicator -->
      <div class="skeleton-loading-indicator" *ngIf="showLoadingIndicator">
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="skeleton-progress-bar" *ngIf="showProgress">
        <div class="progress-fill"></div>
      </div>
    </div>
  `,
  styles: [`
    /* Base Skeleton Container */
    .card-skeleton {
      @apply relative overflow-hidden rounded-2xl bg-gray-100 border border-gray-200;
      position: relative;
      isolation: isolate;
    }

    /* Gradient Background */
    .skeleton-gradient-bg {
      @apply absolute inset-0 opacity-90;
      background: linear-gradient(135deg,
        rgb(248, 250, 252) 0%,
        rgb(241, 245, 249) 25%,
        rgb(248, 250, 252) 50%,
        rgb(241, 245, 249) 75%,
        rgb(248, 250, 252) 100%);
      background-size: 200% 200%;
      animation: gradientShift 4s ease-in-out infinite;
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    /* Enhanced Shimmer Effect */
    .skeleton-shimmer {
      @apply absolute inset-0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.4) 20%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(255, 255, 255, 0.4) 80%,
        transparent 100%
      );
      transform: translateX(-100%);
      animation: shimmer 2.5s ease-in-out infinite;
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    /* Content Container */
    .skeleton-content {
      @apply relative z-10 h-full p-6;
    }

    /* Article Layout */
    .article-skeleton-layout {
      @apply h-full flex flex-col justify-end;
    }

    .skeleton-badge {
      @apply absolute top-4 left-4 w-16 h-6 bg-white/30 rounded-full;
      backdrop-filter: blur(4px);
      animation: pulse 2s ease-in-out infinite;
    }

    .skeleton-time {
      @apply absolute top-4 right-4 w-20 h-4 bg-white/20 rounded;
      backdrop-filter: blur(4px);
      animation: pulse 2s ease-in-out infinite 0.3s;
    }

    .skeleton-content-area {
      @apply mt-auto space-y-3;
    }

    .skeleton-title {
      @apply space-y-2;
    }

    .skeleton-excerpt {
      @apply mt-2;
    }

    /* Featured Layout */
    .featured-skeleton-layout {
      @apply p-8 space-y-4;
    }

    .skeleton-featured-badge {
      @apply w-20 h-6 bg-gray-300 rounded-full;
      animation: pulse 2s ease-in-out infinite;
    }

    .skeleton-featured-title {
      @apply space-y-3;
    }

    .skeleton-featured-excerpt {
      @apply mt-4;
    }

    /* Category Layout */
    .category-skeleton-layout {
      @apply p-6 flex flex-col items-center text-center space-y-4;
    }

    .skeleton-category-icon {
      @apply w-12 h-12 bg-gray-300 rounded-full;
      animation: pulse 2s ease-in-out infinite;
    }

    .skeleton-category-title {
      @apply w-full;
    }

    .skeleton-category-count {
      @apply w-16;
    }

    /* Simple Layout */
    .simple-skeleton-layout {
      @apply p-6;
    }

    .skeleton-simple-content {
      @apply space-y-4;
    }

    /* Skeleton Lines */
    .skeleton-line {
      @apply bg-gray-300 rounded;
      animation: pulse 2s ease-in-out infinite;
    }

    /* Specific line styles */
    .skeleton-line-primary {
      @apply h-6 w-4/5;
      animation-delay: 0.1s;
    }

    .skeleton-line-secondary {
      @apply h-6 w-3/5;
      animation-delay: 0.2s;
    }

    .skeleton-line-tertiary {
      @apply h-4 w-2/3;
      animation-delay: 0.3s;
    }

    .skeleton-line-featured-1 {
      @apply h-8 w-5/6;
      animation-delay: 0.1s;
    }

    .skeleton-line-featured-2 {
      @apply h-8 w-4/5;
      animation-delay: 0.2s;
    }

    .skeleton-line-featured-3 {
      @apply h-8 w-3/4;
      animation-delay: 0.3s;
    }

    .skeleton-line-featured-desc {
      @apply h-5 w-4/5;
      animation-delay: 0.4s;
    }

    .skeleton-line-category {
      @apply h-5 w-full;
      animation-delay: 0.1s;
    }

    .skeleton-line-count {
      @apply h-4 w-full;
      animation-delay: 0.2s;
    }

    .skeleton-line-simple-1 {
      @apply h-4 w-full;
      animation-delay: 0.1s;
    }

    .skeleton-line-simple-2 {
      @apply h-4 w-4/5;
      animation-delay: 0.2s;
    }

    .skeleton-line-simple-3 {
      @apply h-4 w-3/5;
      animation-delay: 0.3s;
    }

    /* Pulse Animation */
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    /* Loading Indicator */
    .skeleton-loading-indicator {
      @apply absolute bottom-4 left-1/2 transform -translate-x-1/2;
    }

    .loading-dots {
      @apply flex space-x-1;
    }

    .loading-dots span {
      @apply w-2 h-2 bg-gray-400 rounded-full;
      animation: bounce 1.4s ease-in-out infinite both;
    }

    .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
    .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
    .loading-dots span:nth-child(3) { animation-delay: 0s; }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0);
      }
      40% {
        transform: scale(1);
      }
    }

    /* Progress Bar */
    .skeleton-progress-bar {
      @apply absolute bottom-0 left-0 w-full h-1 bg-gray-200 overflow-hidden;
    }

    .progress-fill {
      @apply h-full bg-blue-400;
      width: 0%;
      animation: progressFill 3s ease-in-out infinite;
    }

    @keyframes progressFill {
      0% { width: 0%; }
      50% { width: 70%; }
      100% { width: 100%; }
    }

    /* Responsive Adjustments */
    @media (max-width: 768px) {
      .skeleton-content {
        @apply p-4;
      }

      .skeleton-line-primary,
      .skeleton-line-secondary {
        @apply h-5;
      }

      .skeleton-line-featured-1,
      .skeleton-line-featured-2,
      .skeleton-line-featured-3 {
        @apply h-6;
      }
    }

    /* Theme Variants */
    .skeleton-theme-blue .skeleton-gradient-bg {
      background: linear-gradient(135deg,
        rgb(239, 246, 255) 0%,
        rgb(219, 234, 254) 50%,
        rgb(239, 246, 255) 100%);
    }

    .skeleton-theme-green .skeleton-gradient-bg {
      background: linear-gradient(135deg,
        rgb(240, 253, 244) 0%,
        rgb(220, 252, 231) 50%,
        rgb(240, 253, 244) 100%);
    }

    .skeleton-theme-purple .skeleton-gradient-bg {
      background: linear-gradient(135deg,
        rgb(250, 245, 255) 0%,
        rgb(243, 232, 255) 50%,
        rgb(250, 245, 255) 100%);
    }
  `]
})
export class CardSkeletonComponent {
  @Input() variant: 'article' | 'featured' | 'category' | 'simple' = 'simple';
  @Input() height: string = '320px';
  @Input() width: string = '100%';
  @Input() theme: 'default' | 'blue' | 'green' | 'purple' = 'default';
  @Input() showLoadingIndicator: boolean = false;
  @Input() showProgress: boolean = false;
  @Input() rounded: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = '2xl';

  getSkeletonClasses(): string {
    const classes = [];

    // Add theme class
    if (this.theme !== 'default') {
      classes.push(`skeleton-theme-${this.theme}`);
    }

    // Add rounded class
    if (this.rounded !== '2xl') {
      classes.push(`rounded-${this.rounded}`);
    }

    return classes.join(' ');
  }
}
