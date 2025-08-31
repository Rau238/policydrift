import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { seoFilesInterceptor } from './shared/interceptors/seo-files.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([seoFilesInterceptor])
    ),
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: true, // Enable service worker in both dev and prod modes
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
