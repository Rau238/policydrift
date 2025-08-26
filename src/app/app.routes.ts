import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'PolicyDrift - AI-powered policy insights'
  },
  {
    path: 'article/:slug',
    loadComponent: () => import('./features/article-detail/article-detail.component').then(m => m.ArticleDetailComponent),
    title: 'Article - PolicyDrift'
  },
  {
    path: 'all-articles',
    loadComponent: () => import('./features/all-articles/all-articles.component').then(m => m.AllArticlesComponent),
    title: 'All Articles - PolicyDrift'
  },
  {
    path: 'terms',
    loadComponent: () => import('./features/terms/terms.component').then(m => m.TermsComponent),
    title: 'Terms of Service - PolicyDrift'
  },
  {
    path: 'privacy',
    loadComponent: () => import('./features/privacy/privacy.component').then(m => m.PrivacyComponent),
    title: 'Privacy Policy - PolicyDrift'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'About Us - PolicyDrift'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
