/**
 * Gradient Utilities
 * Contains functions for generating random gradient colors and combinations
 */

export interface GradientOptions {
  type?: 'single-color' | 'dual-color' | 'triple-color' | 'random';
  colors?: string[];
  intensities?: string[];
  opacityRange?: { min: number; max: number };
}

/**
 * Default Tailwind color palette for gradients
 */
export const DEFAULT_COLORS = [
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
  'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink',
  'rose', 'slate', 'gray', 'zinc'
];

/**
 * Default gradient intensities for dark overlays
 */
export const DEFAULT_INTENSITIES = ['800', '900'];

/**
 * Available gradient types
 */
export const GRADIENT_TYPES = ['single-color', 'dual-color', 'triple-color'] as const;

/**
 * Generates a random number within a range
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Random number within the range
 */
export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Selects a random element from an array
 * @param array - Array to select from
 * @returns Random element from the array
 */
export function randomFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Selects multiple unique random elements from an array
 * @param array - Array to select from
 * @param count - Number of unique elements to select
 * @returns Array of unique random elements
 */
export function uniqueRandomFromArray<T>(array: T[], count: number): T[] {
  const result: T[] = [];
  const availableItems = [...array];

  for (let i = 0; i < count && availableItems.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    result.push(availableItems.splice(randomIndex, 1)[0]);
  }

  return result;
}

/**
 * Generates a single-color gradient with varying opacity
 * @param options - Gradient generation options
 * @returns Tailwind CSS gradient class string
 */
export function generateSingleColorGradient(options: GradientOptions = {}): string {
  const colors = options.colors || DEFAULT_COLORS;
  const intensities = options.intensities || DEFAULT_INTENSITIES;
  const opacityRange = options.opacityRange || { min: 30, max: 60 };

  const color = randomFromArray(colors);
  const intensity = randomFromArray(intensities);
  const viaOpacity = randomInRange(opacityRange.min, opacityRange.max);

  return `from-${color}-${intensity} via-${color}-${intensity}/${viaOpacity}`;
}

/**
 * Generates a dual-color gradient
 * @param options - Gradient generation options
 * @returns Tailwind CSS gradient class string
 */
export function generateDualColorGradient(options: GradientOptions = {}): string {
  const colors = options.colors || DEFAULT_COLORS;
  const intensities = options.intensities || DEFAULT_INTENSITIES;
  const opacityRange = options.opacityRange || { min: 30, max: 60 };

  const [color1, color2] = uniqueRandomFromArray(colors, 2);
  const intensity1 = randomFromArray(intensities);
  const intensity2 = randomFromArray(intensities);
  const viaOpacity = randomInRange(opacityRange.min, opacityRange.max);

  return `from-${color1}-${intensity1} via-${color1}-${intensity1}/${viaOpacity} to-${color2}-${intensity2}/20`;
}

/**
 * Generates a triple-color gradient for more complex effects
 * @param options - Gradient generation options
 * @returns Tailwind CSS gradient class string
 */
export function generateTripleColorGradient(options: GradientOptions = {}): string {
  const colors = options.colors || DEFAULT_COLORS;
  const intensities = options.intensities || DEFAULT_INTENSITIES;

  const [color1, color2, color3] = uniqueRandomFromArray(colors, 3);
  const intensity1 = randomFromArray(intensities);
  const intensity2 = randomFromArray(intensities);
  const intensity3 = randomFromArray(intensities);

  const viaOpacity = randomInRange(20, 40);
  const toOpacity = randomInRange(10, 30);

  return `from-${color1}-${intensity1} via-${color2}-${intensity2}/${viaOpacity} to-${color3}-${intensity3}/${toOpacity}`;
}

/**
 * Generates a random gradient with specified or random type
 * @param options - Gradient generation options
 * @returns Tailwind CSS gradient class string
 */
export function generateRandomGradient(options: GradientOptions = {}): string {
  const gradientType = options.type === 'random' || !options.type
    ? randomFromArray([...GRADIENT_TYPES])
    : options.type;

  switch (gradientType) {
    case 'single-color':
      return generateSingleColorGradient(options);

    case 'dual-color':
      return generateDualColorGradient(options);

    case 'triple-color':
      return generateTripleColorGradient(options);

    default:
      return 'from-gray-900 via-gray-900/40'; // Fallback
  }
}

/**
 * Creates a gradient generator function with predefined options
 * @param defaultOptions - Default options for gradient generation
 * @returns Function that generates gradients with the predefined options
 */
export function createGradientGenerator(defaultOptions: GradientOptions = {}) {
  return (overrideOptions: Partial<GradientOptions> = {}) => {
    return generateRandomGradient({ ...defaultOptions, ...overrideOptions });
  };
}

/**
 * Predefined gradient generators for common use cases
 */
export const GradientGenerators = {
  /**
   * Generates warm-toned gradients (reds, oranges, yellows)
   */
  warm: createGradientGenerator({
    colors: ['red', 'orange', 'amber', 'yellow', 'pink', 'rose'],
    type: 'random'
  }),

  /**
   * Generates cool-toned gradients (blues, greens, purples)
   */
  cool: createGradientGenerator({
    colors: ['blue', 'cyan', 'teal', 'green', 'emerald', 'purple', 'indigo', 'violet'],
    type: 'random'
  }),

  /**
   * Generates monochrome gradients (grays, blacks)
   */
  monochrome: createGradientGenerator({
    colors: ['slate', 'gray', 'zinc'],
    type: 'single-color'
  }),

  /**
   * Generates vibrant, high-contrast gradients
   */
  vibrant: createGradientGenerator({
    colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'fuchsia'],
    type: 'triple-color',
    intensities: ['800', '900']
  }),

  /**
   * Generates subtle, professional gradients
   */
  subtle: createGradientGenerator({
    colors: ['slate', 'gray', 'blue', 'indigo', 'teal'],
    type: 'dual-color',
    opacityRange: { min: 20, max: 40 }
  })
};

/**
 * Utility class for managing gradient state and generation
 */
export class GradientManager {
  private refreshCounter = 0;
  private defaultOptions: GradientOptions;

  constructor(options: GradientOptions = {}) {
    this.defaultOptions = options;
  }

  /**
   * Generates a new random gradient
   */
  generate(overrideOptions: Partial<GradientOptions> = {}): string {
    return generateRandomGradient({ ...this.defaultOptions, ...overrideOptions });
  }

  /**
   * Forces a refresh of all gradients by incrementing the counter
   */
  refresh(): number {
    return ++this.refreshCounter;
  }

  /**
   * Gets the current refresh counter value
   */
  getRefreshCounter(): number {
    return this.refreshCounter;
  }

  /**
   * Updates the default options
   */
  updateDefaultOptions(newOptions: Partial<GradientOptions>): void {
    this.defaultOptions = { ...this.defaultOptions, ...newOptions };
  }
}
