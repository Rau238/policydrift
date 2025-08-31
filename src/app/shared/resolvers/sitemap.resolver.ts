import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { SeoFileService } from '../services/seo-file.service';
import { map } from 'rxjs/operators';

export const sitemapResolver: ResolveFn<string> = () => {
  const seoFileService = inject(SeoFileService);
  return seoFileService.getSitemapXml().pipe(
    map(response => response.content)
  );
};
