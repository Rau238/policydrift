# BlogApp - Angular Blog & Information Website

A modern, responsive Angular frontend for a blog and information website with Strapi CMS integration.

## 🚀 Features

- **Modern UI**: Built with Angular Material and Tailwind CSS
- **Responsive Design**: Mobile-first approach, works on all devices
- **Authentication**: JWT-based authentication with login/register
- **Blog System**: Article listing, detail pages, categories
- **User Management**: Protected routes, user profiles
- **State Management**: Angular Services with RxJS
- **Lazy Loading**: Optimized performance with lazy-loaded modules
- **Mock API**: Built-in mock data for development

## 🛠️ Tech Stack

- **Frontend**: Angular 19
- **UI Library**: Angular Material
- **Styling**: Tailwind CSS
- **State Management**: Angular Services + RxJS
- **HTTP Client**: Angular HttpClient with Interceptors
- **Authentication**: JWT tokens with route guards
- **Backend**: Strapi CMS (configurable)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd signal-tutorial
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/                 # Core functionality
│   │   ├── guards/          # Route guards
│   │   ├── interceptors/    # HTTP interceptors
│   │   ├── models/          # TypeScript interfaces
│   │   └── services/        # Core services
│   ├── features/            # Feature modules
│   │   ├── auth/           # Authentication
│   │   ├── blog/           # Blog functionality
│   │   ├── home/           # Home page
│   │   ├── pricing/        # Pricing page
│   │   └── profile/        # User profile
│   ├── shared/             # Shared components
│   │   └── components/     # Reusable components
│   └── app.routes.ts       # Application routes
└── styles.scss             # Global styles
```

## 🔐 Authentication

The application includes a complete authentication system:

- **Login/Register**: Forms with validation
- **JWT Storage**: Secure token management
- **Route Guards**: Protected routes
- **Auto-Login**: Persistent sessions
- **HTTP Interceptor**: Automatic token attachment

## 📱 Pages & Features

### Public Pages
- **Home** (`/`): Hero section, featured articles, about section
- **Blog** (`/blog`): Article listing with pagination and categories
- **Article Detail** (`/blog/:slug`): Full article view
- **Login** (`/auth/login`): User authentication
- **Register** (`/auth/register`): User registration
- **Pricing** (`/pricing`): Subscription plans

### Protected Pages
- **Profile** (`/profile`): User dashboard and account management

## 🎨 UI Components

### Material Components Used
- `MatToolbar` - Navigation header
- `MatCard` - Content containers
- `MatButton` - Interactive buttons
- `MatFormField` - Form inputs
- `MatSnackBar` - Toast notifications
- `MatPaginator` - Content pagination
- `MatSpinner` - Loading indicators

### Custom Components
- `HeaderComponent` - Main navigation
- `FooterComponent` - Site footer
- `LoadingComponent` - Loading states

## 🔧 Configuration

### Strapi Integration

The application is configured to work with Strapi CMS. To connect to a real Strapi backend:

1. Set up your Strapi instance
2. Update the API URL in `strapi.service.ts`:
   ```typescript
   private readonly API_URL = 'http://localhost:1337/api';
   private readonly USE_MOCK_DATA = false; // Enable real API
   ```

### Required Strapi Content Types

#### User Collection (Built-in)
- Standard Strapi user authentication

#### Article Collection
```json
{
  "title": "string",
  "content": "richtext", 
  "description": "string",
  "slug": "string (unique)",
  "image": "media",
  "publishedAt": "datetime",
  "author": "relation to User",
  "category": "relation to Category"
}
```

#### Category Collection
```json
{
  "name": "string",
  "slug": "string (unique)"
}
```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   ng serve
   ```

3. **Visit the application**
   Open `http://localhost:4200` in your browser

## 🎯 Key Features Implementation

### Authentication Flow
1. User logs in via `/auth/login`
2. JWT token stored in localStorage
3. AuthInterceptor adds token to requests
4. AuthGuard protects private routes
5. AuthService manages auth state

### Article Management
1. Articles fetched from Strapi API (or mock data)
2. Pagination with MatPaginator
3. Category filtering
4. SEO-friendly URLs with slugs

### Responsive Design
- Mobile-first CSS approach
- Tailwind responsive utilities
- Angular Material responsive components

## 🔮 Future Enhancements

- [ ] Search functionality
- [ ] Article bookmarking
- [ ] Comment system
- [ ] Social sharing
- [ ] Dark mode toggle
- [ ] PWA capabilities

## 📄 License

This project is licensed under the MIT License.
