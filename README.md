# JairoJobs - Modern Job Board Platform

A modern, responsive job board application built with **Next.js 15.3**, **React 19**, **TypeScript**, and **Tailwind CSS**. Features a comprehensive design system using shadcn/ui components.

## 🚀 Features

### Core Functionality
- **Job Listings & Search** - Browse and search thousands of job opportunities
- **Advanced Filtering** - Filter by location, job type, salary, and more
- **Featured Companies** - Showcase top employers and their opportunities
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **SEO Optimized** - Built-in SEO with meta tags and structured data

### Technical Features
- **Next.js 15.3** - Latest App Router with React Server Components
- **React 19** - Latest React features and improvements
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **shadcn/ui** - Beautiful, accessible UI components
- **API Client** - Type-safe API client generated from OpenAPI specification
- **PWA Ready** - Progressive Web App capabilities
- **Performance Optimized** - Image optimization, code splitting, and more

## 🛠 Tech Stack

- **Framework:** Next.js 15.3
- **Runtime:** React 19
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS 3.4
- **UI Components:** shadcn/ui with Radix UI primitives
- **Icons:** Lucide React
- **Fonts:** Inter (Google Fonts)
- **Development:** ESLint 9, Prettier

## 📋 Prerequisites

- **Node.js** 18.17.0 or higher
- **npm** 8.0.0 or higher
- **Git**

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/jairojobs.git
cd jairojobs
```

### 2. Install dependencies

```bash
# Install project dependencies
npm install

# Install Prism CLI for API mocking (if not installed globally)
npm install -g @stoplight/prism-cli
```

## 🚀 Development

### Running the Mock API Server

To start a mock API server based on the OpenAPI specification:

```bash
# Start the mock API server on port 4010
npm run mock:api

# Or run directly with Prism
npx prism mock "API Doc/openapi.yaml" --port 4010
```

The mock server will be available at `http://localhost:4010` and will provide mock responses based on your OpenAPI specification.

### Running the Development Server

```bash
# Start the Next.js development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4010
NEXT_PUBLIC_API_KEY=test-api-key-123
```

```bash
npm install
```

### 3. Set up environment variables

Copy the environment template and configure your variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=JairoJobs
# Add other environment variables as needed
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── header/           # Header components
│   ├── hero/             # Hero section components
│   ├── jobs/             # Job-related components
│   ├── companies/        # Company components
│   └── footer/           # Footer components
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Additional styles
└── types/                # TypeScript type definitions
```

## 🎨 Design System

The project uses a comprehensive design system built on top of Tailwind CSS and shadcn/ui:

- **Color Palette** - Custom color tokens for consistent branding
- **Typography** - Responsive typography scale
- **Components** - Reusable UI components with variants
- **Spacing** - Consistent spacing system
- **Animations** - Smooth transitions and animations

## 📱 Components

### UI Components (shadcn/ui)
- Buttons, Cards, Dialogs, Forms
- Navigation, Tabs, Tooltips
- Data Display, Feedback, Overlays

### Custom Components
- **Header** - Navigation with mobile menu
- **HeroSection** - Landing page hero with search
- **JobListings** - Job cards with filtering
- **FeaturedCompanies** - Company showcase
- **Footer** - Links, newsletter, social media

## 🔧 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking

# Analysis
npm run analyze      # Bundle analyzer
```

## 🏗 Building for Production

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm run start
   ```

3. **Deploy to your preferred platform:**
   - Vercel (recommended)
   - Netlify
   - AWS Amplify
   - Docker

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/jairojobs)

### Manual Deployment

1. Build the application
2. Configure environment variables on your hosting platform
3. Deploy the `.next` folder and `public` assets

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Base URL of your site | ✅ |
| `NEXT_PUBLIC_SITE_NAME` | Name of your site | ✅ |
| `DATABASE_URL` | Database connection string | ❌ |
| `NEXTAUTH_SECRET` | Authentication secret | ❌ |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Lucide](https://lucide.dev/) for the icon system
- [Unsplash](https://unsplash.com/) for the beautiful imagery

## 📞 Support

## 📂 Codebase Analysis

Below is a concise overview of the repository’s layout, tech, and configuration:

- **Framework & Language:** Next.js 15.3, React 19, TypeScript 5.7
- **Styling & Design System:** Tailwind CSS 3.4 with custom tokens; shadcn/ui components (see [design-system.md](design-system.md))
- **Project Layout:**
```text
├── app/           # Next.js App Router (globals.css, layout.tsx, page.tsx)
├── components/    # Reusable React components (ui, header, hero, jobs, companies, footer)
├── lib/           # Utility functions
├── public/        # Static assets
├── styles/        # Additional CSS
└── types/         # TypeScript type definitions
```
- **Configuration Files:**
  - `package.json`, `tsconfig.json`, `eslint.config.js`, `postcss.config.js`, `tailwind.config.js`, `next.config.js`
  - `next-env.d.ts`, `Guidelines.md`, `design-system.md`, `Attributions.md`
- **Development Scripts:**
  - `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run lint:fix`, `npm run type-check`, `npm run analyze`
- **Docs & Guidelines:**
  - Main documentation in this `README.md`
  - Design system in [design-system.md](design-system.md)
  - Internal guidelines template in [Guidelines.md](Guidelines.md)

If you have any questions or need help, please:

1. Check the [documentation](https://nextjs.org/docs)
2. Search [existing issues](https://github.com/your-username/jairojobs/issues)
3. Create a [new issue](https://github.com/your-username/jairojobs/issues/new)

---

**Made with ❤️ using Next.js 15.3 and React 19**
