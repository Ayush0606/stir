# Project Folder Structure

```
stir/
│
├── app/                              # Next.js App Router
│   ├── api/                          # API Routes
│   │   └── movie-insights/
│   │       └── route.ts              # POST /api/movie-insights endpoint
│   ├── globals.css                   # Global styles and Tailwind
│   ├── layout.tsx                    # Root layout with metadata
│   └── page.tsx                      # Home page (main UI)
│
├── components/                       # React Components
│   ├── ErrorMessage.tsx              # Error display component
│   ├── LoadingSpinner.tsx            # Loading animation
│   ├── MovieCard.tsx                 # Movie details card
│   ├── MovieSearch.tsx               # Search input with validation
│   └── SentimentCard.tsx             # AI sentiment display card
│
├── lib/                              # API Clients & Utilities
│   ├── movie-client.ts               # Unified movie data fetcher
│   ├── omdb-api.ts                   # OMDb API client + validation
│   └── tmdb-api.ts                   # TMDb API client (fallback)
│
├── services/                         # Business Logic Services
│   └── sentiment-service.ts          # OpenAI sentiment analysis + fallback
│
├── types/                            # TypeScript Type Definitions
│   └── movie.ts                      # All interfaces and types
│
├── __tests__/                        # Jest Unit Tests
│   ├── api/
│   │   └── movie-insights.test.ts    # API route tests
│   ├── lib/
│   │   └── omdb-api.test.ts          # Validation tests
│   └── services/
│       └── sentiment-service.test.ts # Sentiment logic tests
│
├── public/                           # Static Assets
│   └── placeholder-poster.png        # Fallback poster image
│
├── .env.example                      # Example environment variables
├── .eslintrc.json                    # ESLint configuration
├── .gitignore                        # Git ignore rules
├── ARCHITECTURE.md                   # Architecture documentation
├── DEVELOPMENT.md                    # Development guide
├── README.md                         # Main documentation
├── jest.config.js                    # Jest configuration
├── jest.setup.js                     # Jest setup file
├── next.config.js                    # Next.js configuration
├── package.json                      # Dependencies and scripts
├── postcss.config.js                 # PostCSS configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── vercel.json                       # Vercel deployment config
```

## Key Files Explained

### Configuration Files
- **`tsconfig.json`**: TypeScript compiler options, strict mode enabled
- **`tailwind.config.ts`**: Custom colors for sentiment badges
- **`jest.config.js`**: Test configuration with path aliases
- **`next.config.js`**: Image domains for OMDb/TMDb posters

### Application Files
- **`app/page.tsx`**: Main application logic and state management
- **`app/api/movie-insights/route.ts`**: RESTful API endpoint with error handling
- **`lib/movie-client.ts`**: Smart fetcher with OMDb → TMDb fallback
- **`services/sentiment-service.ts`**: OpenAI integration + heuristic fallback

### Component Structure
All components are:
- ✅ Client-side ('use client')
- ✅ Fully typed with TypeScript
- ✅ Responsive with Tailwind CSS
- ✅ Accessible with semantic HTML

### Type Safety
- **`types/movie.ts`**: Central source of truth for all data structures
- Includes interfaces for: MovieData, Review, SentimentAnalysis, API responses
- Full type coverage across entire codebase

## Naming Conventions

### Files
- Components: PascalCase (e.g., `MovieCard.tsx`)
- Utilities: kebab-case (e.g., `movie-client.ts`)
- Types: kebab-case (e.g., `movie.ts`)
- Tests: `.test.ts` suffix

### Code
- Components: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE (env vars)
- Types/Interfaces: PascalCase

## Import Organization
```typescript
// 1. External imports
import { NextRequest } from 'next/server';

// 2. Type imports
import type { MovieInsights } from '@/types/movie';

// 3. Internal imports
import { fetchMovieData } from '@/lib/movie-client';
```

## Code Organization Principles

1. **Separation of Concerns**: API clients, services, and UI are independent
2. **Single Responsibility**: Each file has one clear purpose
3. **DRY (Don't Repeat Yourself)**: Shared logic in utilities
4. **Type Safety**: Everything is typed, no `any` types
5. **Testability**: Business logic separated for easy testing

## Development Workflow

```
Edit Code → Type Check → Lint → Test → Build → Deploy
   ↓           ↓          ↓       ↓       ↓        ↓
 VS Code   tsc --check  eslint   jest   next    Vercel
                                        build
```

---

This structure follows Next.js 14 App Router best practices and scales well for future enhancements.
