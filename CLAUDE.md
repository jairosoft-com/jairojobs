# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm run dev` - Start Next.js development server on http://localhost:3000
- `npm run build` - Build production-ready application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run analyze` - Analyze bundle sizes (production build with bundle analyzer)

### Package Management
- Uses **Yarn 1.22.22** as the package manager (specified in packageManager field)
- Install dependencies: `yarn install` or `npm install`

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15.3 with App Router
- **Language**: TypeScript 5.8.3
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4 with custom design system
- **Components**: shadcn/ui components (Radix UI primitives)
- **Icons**: Lucide React

### Directory Structure
```
app/                 # Next.js App Router
├── layout.tsx      # Root layout with metadata, PWA config, Inter font
├── page.tsx        # Homepage
└── globals.css     # Global styles and Tailwind imports

components/         # React components organized by feature
├── ui/            # shadcn/ui base components (buttons, cards, forms, etc.)
├── header/        # Navigation components (Logo, MobileMenu, Navigation, UserActions)
├── hero/          # Hero section (HeroContent, SearchForm, StatsSection)
├── jobs/          # Job-related (JobCard, JobGrid, JobFilters, etc.)
├── companies/     # Company showcase (CompanyCard, CompanyGrid)
└── footer/        # Footer sections (Newsletter, SocialLinks, FooterLinks)

lib/               # Utility functions and helpers
styles/            # Additional CSS files
public/            # Static assets and PWA manifest
```

### Key Architectural Patterns

1. **Component Organization**: Components are organized by feature/domain with dedicated folders for complex features
2. **Design System**: Comprehensive Tailwind-based design system documented in `design-system.md`
3. **SEO & Metadata**: Extensive metadata configuration in `app/layout.tsx` including Open Graph and Twitter cards
4. **PWA Ready**: Progressive Web App configuration with manifest.json
5. **Type Safety**: Full TypeScript coverage throughout the application

### Important Configuration Files
- `tailwind.config.js` - Tailwind CSS configuration with custom theme extensions
- `eslint.config.js` - ESLint configuration for code quality
- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript compiler configuration

### Design System Highlights
- Utility-first approach with Tailwind CSS
- Custom color tokens and semantic colors (primary, secondary, destructive, etc.)
- Consistent spacing scale (4px increments)
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Dark mode support with dark: variants
- Accessibility focus with proper focus states and ARIA attributes

### Component Library (shadcn/ui)
The project uses shadcn/ui components which are:
- Fully customizable and owned by the codebase
- Built on Radix UI for accessibility
- Styled with Tailwind CSS classes
- Located in `components/ui/` directory

### Environment Variables
Required environment variables (create `.env.local`):
- `NEXT_PUBLIC_SITE_URL` - Base URL of the site
- `NEXT_PUBLIC_SITE_NAME` - Site name for metadata

### Performance Considerations
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Bundle analysis available via `npm run analyze`
- Critters for critical CSS inlining

### Testing Approach
No test framework is currently configured. When adding tests, check with the team for preferred testing approach.