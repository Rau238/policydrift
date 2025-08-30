import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeoUtilsService {

  // Generate SEO-friendly slug from title
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  // Extract keywords from content
  extractKeywords(content: string, maxKeywords: number = 10): string[] {
    // Common stop words to exclude
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
      'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those'
    ]);

    // Extract words and count frequency
    const words = content
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.has(word));

    const wordCount = new Map<string, number>();
    words.forEach(word => {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    });

    // Sort by frequency and return top keywords
    return Array.from(wordCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxKeywords)
      .map(([word]) => word);
  }

  // Generate meta description from content
  generateMetaDescription(content: string, maxLength: number = 160): string {
    // Remove HTML tags and normalize whitespace
    const cleanContent = content
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (cleanContent.length <= maxLength) {
      return cleanContent;
    }

    // Truncate at the last complete sentence within the limit
    const truncated = cleanContent.substring(0, maxLength);
    const lastPeriod = truncated.lastIndexOf('.');
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastPeriod > maxLength * 0.8) {
      return truncated.substring(0, lastPeriod + 1);
    } else if (lastSpace > maxLength * 0.8) {
      return truncated.substring(0, lastSpace) + '...';
    }

    return truncated + '...';
  }

  // Calculate reading time
  calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
    const words = content
      .replace(/<[^>]*>/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 0);

    return Math.ceil(words.length / wordsPerMinute);
  }

  // Validate SEO requirements
  validateSEO(data: {
    title?: string;
    description?: string;
    keywords?: string;
    content?: string;
  }): { valid: boolean; issues: string[] } {
    const issues: string[] = [];

    // Title validation
    if (!data.title) {
      issues.push('Title is required');
    } else if (data.title.length < 30) {
      issues.push('Title is too short (minimum 30 characters)');
    } else if (data.title.length > 60) {
      issues.push('Title is too long (maximum 60 characters)');
    }

    // Description validation
    if (!data.description) {
      issues.push('Meta description is required');
    } else if (data.description.length < 120) {
      issues.push('Meta description is too short (minimum 120 characters)');
    } else if (data.description.length > 160) {
      issues.push('Meta description is too long (maximum 160 characters)');
    }

    // Keywords validation
    if (!data.keywords || data.keywords.trim().length === 0) {
      issues.push('Keywords are required');
    }

    // Content validation
    if (!data.content) {
      issues.push('Content is required');
    } else if (data.content.length < 300) {
      issues.push('Content is too short for good SEO (minimum 300 characters)');
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  // Generate breadcrumb structure
  generateBreadcrumbs(url: string): Array<{name: string, url: string}> {
    const segments = url.split('/').filter(segment => segment.length > 0);
    const breadcrumbs = [{ name: 'Home', url: 'https://policydrift.live' }];

    let currentPath = 'https://policydrift.live';

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      let name = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      // Custom naming for known routes
      if (segment === 'all-articles') name = 'All Articles';
      if (segment === 'about') name = 'About Us';
      if (segment === 'terms') name = 'Terms of Service';
      if (segment === 'privacy') name = 'Privacy Policy';

      breadcrumbs.push({ name, url: currentPath });
    });

    return breadcrumbs;
  }
}
