# Card Skeleton Component Usage Guide

The `CardSkeletonComponent` is a versatile, reusable skeleton loader that provides an attractive loading experience for users across different card types in the application.

## Features

✨ **Multiple Variants**: Article, Featured, Category, and Simple layouts
🎨 **Theme Support**: Default, Blue, Green, and Purple color schemes  
📱 **Responsive Design**: Adapts to different screen sizes
🔄 **Smooth Animations**: Gradient shifts, shimmer effects, and pulsing
📊 **Progress Indicators**: Optional loading dots and progress bars
⚙️ **Highly Customizable**: Height, width, rounded corners, and more

## Basic Usage

```html
<!-- Simple skeleton -->
<app-card-skeleton></app-card-skeleton>

<!-- Article card skeleton -->
<app-card-skeleton 
  variant="article"
  height="320px"
  theme="blue"
  [showProgress]="true">
</app-card-skeleton>

<!-- Featured article skeleton -->
<app-card-skeleton 
  variant="featured"
  height="400px"
  theme="purple"
  [showLoadingIndicator]="true">
</app-card-skeleton>

<!-- Category skeleton -->
<app-card-skeleton 
  variant="category"
  height="60px"
  width="120px"
  theme="green"
  rounded="xl">
</app-card-skeleton>
```

## Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'article' \| 'featured' \| 'category' \| 'simple'` | `'simple'` | Layout type for skeleton |
| `height` | `string` | `'320px'` | Height of skeleton container |
| `width` | `string` | `'100%'` | Width of skeleton container |
| `theme` | `'default' \| 'blue' \| 'green' \| 'purple'` | `'default'` | Color theme |
| `showLoadingIndicator` | `boolean` | `false` | Show animated dots |
| `showProgress` | `boolean` | `false` | Show progress bar |
| `rounded` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'2xl'` | Border radius |

## Variants

### Article Variant
Perfect for article cards with category badge, timestamp, title, and excerpt placeholders.

```html
<app-card-skeleton variant="article" height="320px" theme="blue"></app-card-skeleton>
```

### Featured Variant  
Ideal for featured articles with larger title and description areas.

```html
<app-card-skeleton variant="featured" height="400px" theme="purple"></app-card-skeleton>
```

### Category Variant
Optimized for category cards with icon, title, and count placeholders.

```html
<app-card-skeleton variant="category" height="60px" width="120px" theme="green"></app-card-skeleton>
```

### Simple Variant (Default)
General purpose skeleton with basic line placeholders.

```html
<app-card-skeleton variant="simple" height="200px"></app-card-skeleton>
```

## Themes

- **Default**: Gray gradient (neutral)
- **Blue**: Blue-tinted gradient (technology, business)
- **Green**: Green-tinted gradient (environment, health)  
- **Purple**: Purple-tinted gradient (entertainment, featured)

## Animation Effects

1. **Gradient Shift**: Subtle background color animation
2. **Shimmer**: Moving highlight effect across the skeleton
3. **Pulse**: Gentle opacity animation on content elements
4. **Loading Dots**: Bouncing dots indicator (optional)
5. **Progress Bar**: Animated progress fill (optional)

## Best Practices

1. **Match skeleton to content**: Use appropriate variant for each card type
2. **Consistent theming**: Use themes that match your content categories
3. **Loading indicators**: Show progress for longer loading operations
4. **Responsive design**: Test skeletons across different screen sizes
5. **Performance**: Don't overuse animated indicators on the same page

## Examples in Context

```html
<!-- Loading article list -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <ng-container *ngIf="loading; else contentLoaded">
    <app-card-skeleton 
      *ngFor="let i of [1,2,3,4,5,6]" 
      variant="article"
      height="320px"
      [showProgress]="true"
      theme="blue">
    </app-card-skeleton>
  </ng-container>
  
  <ng-template #contentLoaded>
    <!-- Your actual article cards here -->
  </ng-template>
</div>
```

This skeleton component provides a professional, engaging loading experience that keeps users interested while content loads.
