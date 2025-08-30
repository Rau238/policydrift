import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-pulse" [ngClass]="getClasses()">
      <div class="bg-gray-300 rounded" [ngStyle]="getStyles()"></div>
    </div>
  `,
  styles: [`
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
  `]
})
export class SkeletonComponent {
  @Input() width: string = '100%';
  @Input() height: string = '20px';
  @Input() className: string = '';
  @Input() rounded: boolean = true;

  getClasses(): string {
    return this.className;
  }

  getStyles(): any {
    return {
      width: this.width,
      height: this.height,
      borderRadius: this.rounded ? '4px' : '0'
    };
  }
}
