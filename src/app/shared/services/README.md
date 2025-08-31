# Dynamic SEO Files System

This system provides dynamic generation of `robots.txt` and `sitemap.xml` files in your Angular application.

## Features

- ✅ **Dynamic Content**: Generates content based on your actual data
- ✅ **Real-time Updates**: Automatically includes new articles and pages
- ✅ **SEO Optimized**: Proper content types and headers
- ✅ **Error Handling**: Fallback content if data loading fails
- ✅ **Caching**: Configurable cache headers for performance
- ✅ **Validation**: XML validation for sitemaps

## How It Works

### 1. Route Configuration

The system uses Angular route resolvers to generate content before components load:

```typescript
// app.routes.ts
{
  path: 'robots.txt',
  loadComponent: () => import('./shared/components/robots/robots.component'),
  resolve: { content: robotsResolver }
},
{
  path: 'sitemap.xml',
  loadComponent: () => import('./shared/components/sitemap/sitemap.component'),
  resolve: { content: sitemapResolver }
}
```

### 2. Service Architecture

- **`SitemapService`**: Core service for generating sitemap content
- **`SeoFileService`**: Enhanced service with validation and error handling
- **Route Resolvers**: Handle data fetching before component initialization

### 3. Dynamic Content Generation

#### Robots.txt
```typescript
// Automatically generated with:
// - User-agent rules
// - Sitemap location
// - Disallow rules for admin areas
// - Crawl delay settings
```

#### Sitemap.xml
```typescript
// Dynamically includes:
// - Static pages (home, about, terms, privacy)
// - All articles from your data service
// - Proper priorities and change frequencies
// - Last modified dates
```

## Usage Examples

### Basic Usage

```typescript
import { SeoFileService } from './shared/services/seo-file.service';

constructor(private seoFileService: SeoFileService) {}

// Get robots.txt content
const robots = this.seoFileService.getRobotsTxt();
console.log(robots.content);

// Get sitemap.xml content
this.seoFileService.getSitemapXml().subscribe(response => {
  console.log(response.content);
  console.log('File size:', response.size);
  console.log('Last modified:', response.lastModified);
});
```

### Bulk Operations

```typescript
// Get all SEO files at once
this.seoFileService.getAllSeoFiles().subscribe(files => {
  files.forEach(file => {
    console.log(`${file.filename}: ${file.size} bytes`);
    console.log('Content-Type:', file.contentType);
  });
});
```

### Validation

```typescript
// Validate sitemap XML
const isValid = this.seoFileService.validateSitemap(sitemapContent);
if (isValid) {
  console.log('Sitemap is valid XML');
} else {
  console.log('Sitemap has XML errors');
}
```

### Custom Headers

```typescript
// Get appropriate headers for HTTP responses
const headers = this.seoFileService.getFileHeaders('sitemap.xml');
// Returns: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': '...' }
```

## Configuration

### Base URL
Update the base URL in `SitemapService`:

```typescript
private baseUrl = 'https://yourdomain.com';
```

### Cache Settings
Modify cache headers in `SeoFileService`:

```typescript
getFileHeaders(filename: string): { [key: string]: string } {
  return {
    'Cache-Control': 'public, max-age=7200', // 2 hours instead of 1
    // ... other headers
  };
}
```

### Error Handling
Customize fallback content in `SeoFileService`:

```typescript
private generateFallbackSitemap(): string {
  // Your custom fallback logic
  return '<?xml version="1.0" encoding="UTF-8"?><urlset>...</urlset>';
}
```

## SEO Benefits

1. **Search Engine Discovery**: Proper sitemap helps search engines find all your content
2. **Crawl Efficiency**: Robots.txt guides search engine crawlers
3. **Content Freshness**: Dynamic generation ensures up-to-date information
4. **Performance**: Caching reduces server load
5. **Compliance**: Follows sitemap protocol standards

## Testing

### Local Development
- Visit `/robots.txt` to see generated robots.txt
- Visit `/sitemap.xml` to see generated sitemap
- Check browser dev tools for proper content-type headers

### Production
- Verify files are accessible at your domain
- Test with Google Search Console
- Validate XML with online validators

## Troubleshooting

### Common Issues

1. **Content not updating**: Check if data service is returning fresh data
2. **XML errors**: Use `validateSitemap()` method to check XML validity
3. **Performance issues**: Adjust cache settings in `getFileHeaders()`
4. **Route conflicts**: Ensure routes don't conflict with static files

### Debug Mode

Enable console logging in components:

```typescript
ngOnInit(): void {
  this.route.data.subscribe(data => {
    console.log('Resolved data:', data);
    this.content = data['content'];
  });
}
```

## Future Enhancements

- [ ] Image sitemap support
- [ ] News sitemap for articles
- [ ] Video sitemap for multimedia content
- [ ] Automatic sitemap submission to search engines
- [ ] Analytics integration for crawl statistics
