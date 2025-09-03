# Tailwind CSS Setup

This project has been configured with Tailwind CSS for styling.

## What was installed:

- `tailwindcss` - The core Tailwind CSS framework
- `postcss` - PostCSS for processing CSS
- `autoprefixer` - Automatically adds vendor prefixes

## Configuration files:

- `tailwind.config.js` - Tailwind configuration with content paths for React components
- `postcss.config.js` - PostCSS configuration for Tailwind and Autoprefixer
- `src/index.css` - Updated with Tailwind directives

## Tailwind directives added to index.css:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Usage:

You can now use Tailwind CSS classes directly in your React components. For example:

```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello Tailwind!
</div>
```

## Available commands:

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Content paths configured:

The Tailwind config is set to scan these files for classes:
- `./src/**/*.{js,jsx,ts,tsx}` - All React components
- `./public/index.html` - HTML template

Tailwind CSS is now ready to use in your project!
