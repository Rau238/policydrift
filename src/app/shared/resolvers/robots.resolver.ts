import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { SeoFileService } from '../services/seo-file.service';

export const robotsResolver: ResolveFn<string> = () => {
  const seoFileService = inject(SeoFileService);
  return seoFileService.getRobotsTxt().content;
};
