import { Injectable, signal } from '@angular/core';
import { GradientManager, GradientGenerators, GradientOptions } from '../utils';

export type GradientTheme = 'vibrant' | 'cool' | 'warm' | 'subtle' | 'themed' | 'random';

@Injectable({
  providedIn: 'root'
})
export class GradientService {
  private gradientManager = new GradientManager({
    type: 'random',
    opacityRange: { min: 30, max: 60 }
  });

  // Global gradient refresh signal
  private refreshSignal = signal(0);

  // Current theme
  private currentTheme = signal<GradientTheme>('random');

  /**
   * Gets the current refresh signal value
   */
  getRefreshSignal() {
    return this.refreshSignal.asReadonly();
  }

  /**
   * Gets the current theme signal
   */
  getCurrentTheme() {
    return this.currentTheme.asReadonly();
  }

  /**
   * Generates a random gradient based on current theme
   * @param categoryHint - Optional category for themed gradients
   * @returns Tailwind CSS gradient class string
   */
  generateGradient(categoryHint?: string): string {
    // Access refresh signal to ensure reactivity
    this.refreshSignal();

    const theme = this.currentTheme();

    if (theme === 'themed' && categoryHint) {
      return this.generateThemedGradient(categoryHint);
    }

    switch (theme) {
      case 'vibrant':
        return GradientGenerators.vibrant();
      case 'cool':
        return GradientGenerators.cool();
      case 'warm':
        return GradientGenerators.warm();
      case 'subtle':
        return GradientGenerators.subtle();
      default:
        return this.gradientManager.generate();
    }
  }

  /**
   * Generates a themed gradient based on category
   * @param category - Content category
   * @returns Tailwind CSS gradient class string
   */
  generateThemedGradient(category: string): string {
    switch (category.toLowerCase()) {
      case 'technology':
      case 'science':
        return GradientGenerators.cool({ type: 'dual-color' });

      case 'business':
      case 'economics':
        return GradientGenerators.subtle({ type: 'dual-color' });

      case 'sports':
      case 'entertainment':
        return GradientGenerators.vibrant({ type: 'triple-color' });

      case 'health':
      case 'environment':
        return GradientGenerators.cool({ type: 'single-color' });

      case 'politics':
      case 'international':
        return GradientGenerators.monochrome({ type: 'dual-color' });

      default:
        return this.gradientManager.generate();
    }
  }

  /**
   * Sets the current gradient theme
   * @param theme - New theme to apply
   */
  setTheme(theme: GradientTheme): void {
    this.currentTheme.set(theme);
    this.refresh();
  }

  /**
   * Refreshes all gradients globally
   */
  refresh(): void {
    this.gradientManager.refresh();
    this.refreshSignal.update(count => count + 1);
  }

  /**
   * Updates the default gradient options
   * @param options - New gradient options
   */
  updateOptions(options: Partial<GradientOptions>): void {
    this.gradientManager.updateDefaultOptions(options);
    this.refresh();
  }

  /**
   * Creates a gradient generator function for specific use cases
   * @param defaultOptions - Default options for the generator
   * @returns Function that generates gradients
   */
  createGenerator(defaultOptions: GradientOptions = {}) {
    return (overrideOptions: Partial<GradientOptions> = {}) => {
      this.refreshSignal(); // Ensure reactivity
      return this.gradientManager.generate({ ...defaultOptions, ...overrideOptions });
    };
  }

  /**
   * Gets predefined gradient generators
   */
  getGenerators() {
    return {
      vibrant: () => { this.refreshSignal(); return GradientGenerators.vibrant(); },
      cool: () => { this.refreshSignal(); return GradientGenerators.cool(); },
      warm: () => { this.refreshSignal(); return GradientGenerators.warm(); },
      subtle: () => { this.refreshSignal(); return GradientGenerators.subtle(); },
      monochrome: () => { this.refreshSignal(); return GradientGenerators.monochrome(); }
    };
  }
}
