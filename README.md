# AI Movie Insight Builder

A production-ready web application that provides AI-powered sentiment analysis for movies using IMDb IDs. Built with Next.js 14 (App Router), TypeScript, and OpenAI.

![AI Movie Insight Builder](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## 🎯 Features

- **IMDb ID Search**: Enter any valid IMDb ID (e.g., `tt0133093`) to fetch movie details
- **Movie Information Display**:
  - Title and release year
  - Movie poster
  - IMDb rating with star icon
  - Plot synopsis
  - Top 5 cast members
- **AI-Powered Sentiment Analysis**:
  - OpenAI-generated summary of audience sentiment
  - Classification: Positive, Mixed, or Negative
  - Fallback to heuristic analysis if AI service unavailable
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Loading States**: Smooth loading animations and error handling
- **Production-Ready**: Proper error handling, TypeScript types, and testing

## 🏗️ Tech Stack

### Frontend

- **Next.js 14** (App Router) - React framework with server-side rendering
- **React 18** - UI component library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

### Backend

- **Next.js API Routes** (Node.js runtime) - Serverless API endpoints
- **OpenAI API** - AI-powered sentiment analysis
- **OMDb API** - Primary movie data source
- **TMDb API** - Fallback for movie data and reviews

### Testing

- **Jest** - Unit testing framework
- **React Testing Library** - Component testing

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- API Keys (free):
  - [OMDb API Key](https://www.omdbapi.com/apikey.aspx)
  - [TMDb API Key](https://www.themoviedb.org/settings/api)
  - [OpenAI API Key](https://platform.openai.com/api-keys)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd stir
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# OMDb API Key (get from https://www.omdbapi.com/apikey.aspx)
OMDB_API_KEY=your_omdb_api_key_here

# TMDb API Key (get from https://www.themoviedb.org/settings/api)
TMDB_API_KEY=your_tmdb_api_key_here

# OpenAI API Key (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run tests

```bash
npm test
```

## 📁 Project Structure

```
stir/
├── app/
│   ├── api/
│   │   └── movie-insights/
│   │       └── route.ts          # Main API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── ErrorMessage.tsx          # Error display component
│   ├── LoadingSpinner.tsx        # Loading state component
│   ├── MovieCard.tsx             # Movie details card
│   ├── MovieSearch.tsx           # Search input component
│   └── SentimentCard.tsx         # AI sentiment display
├── lib/
│   ├── movie-client.ts           # Unified movie data fetcher
│   ├── omdb-api.ts               # OMDb API client
│   └── tmdb-api.ts               # TMDb API client
├── services/
│   └── sentiment-service.ts      # OpenAI sentiment analysis
├── types/
│   └── movie.ts                  # TypeScript type definitions
├── __tests__/
│   ├── api/
│   │   └── movie-insights.test.ts
│   ├── lib/
│   │   └── omdb-api.test.ts
│   └── services/
│       └── sentiment-service.test.ts
├── .env.example                  # Example environment variables
├── .gitignore
├── jest.config.js                # Jest configuration
├── jest.setup.js                 # Jest setup
├── next.config.js                # Next.js configuration
├── package.json
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🔧 API Endpoints

### POST `/api/movie-insights`

Fetches movie data and generates AI-powered sentiment analysis.

**Request Body:**

```json
{
  "imdbId": "tt0133093"
}
```

**Success Response (200):**

```json
{
  "movie": {
    "title": "The Matrix",
    "poster": "https://...",
    "cast": ["Keanu Reeves", "Laurence Fishburne", ...],
    "year": "1999",
    "imdbRating": "8.7",
    "plot": "A computer hacker learns...",
    "imdbId": "tt0133093"
  },
  "sentiment": {
    "summary": "Audiences overwhelmingly praise...",
    "classification": "Positive"
  }
}
```

**Error Responses:**

- `400` - Invalid IMDb ID format
- `404` - Movie not found
- `500` - Internal server error

## 🧪 Testing

The project includes comprehensive unit tests for:

- API route handlers
- Sentiment analysis logic
- IMDb ID validation
- Error handling scenarios

Run tests with coverage:

```bash
npm test -- --coverage
```

## 🎨 Design Decisions

### Architecture

1. **Hybrid API Approach**: Uses OMDb as primary data source (more reliable IMDb ratings) with TMDb as fallback and for reviews
2. **Graceful Degradation**: Falls back to heuristic sentiment analysis if OpenAI API fails
3. **Type Safety**: Full TypeScript coverage for compile-time error detection
4. **Modular Structure**: Separated concerns (API clients, services, components)

### Tech Stack Rationale

- **Next.js 14 App Router**: Modern React framework with built-in API routes, server components, and excellent performance
- **TypeScript**: Catch errors early, improve code maintainability
- **Tailwind CSS**: Rapid UI development with utility classes, no CSS conflicts
- **OpenAI GPT-3.5-turbo**: Cost-effective AI model with JSON output support for structured responses
- **Jest**: Industry-standard testing framework with great TypeScript support

### Assumptions

1. **Review Availability**: TMDb may not have reviews for all movies. The app uses mock reviews as fallback for demonstration purposes.
2. **API Rate Limits**: In production, implement rate limiting and caching (Next.js already provides basic caching).
3. **OpenAI Costs**: Using GPT-3.5-turbo to balance cost and quality. Fallback ensures app works even if quota exceeded.
4. **IMDb ID Format**: Assumes standard IMDb ID format (tt followed by 7+ digits).

## 🌐 Deployment

**📚 Full deployment guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on all platforms.

### Quick Deploy to Vercel (Recommended) ⚡

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project" → Select your repo
   - Add environment variables:
     - `OMDB_API_KEY`
     - `TMDB_API_KEY` (optional)
     - `OPENAI_API_KEY` (optional)
   - Click "Deploy"

   **Or use CLI**:

   ```bash
   npm install -g vercel
   vercel login
   npm run deploy:vercel
   ```

3. **Verify deployment**
   ```bash
   curl https://your-app.vercel.app/api/health
   ```

### Other Deployment Options

- **Netlify**: Uses `netlify.toml` configuration
- **Docker**: Uses `Dockerfile` and `docker-compose.yml`
- **Railway**: One-click deploy from GitHub
- **AWS/GCP/Azure**: Deploy using Docker container

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete instructions.

### Health Check Endpoint

Test your deployment health:

```bash
GET /api/health
```

Response:

```json
{
  "status": "ok",
  "checks": {
    "omdbApiConfigured": true,
    "tmdbApiConfigured": true,
    "openaiApiConfigured": true
  }
}
```

### Build for Production

```bash
# Validate before build
npm run validate

# Build
npm run build

# Start production server
npm start

# or run everything
npm run clean && npm run build && npm start
```

### Deployment Checklist

Use [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) before deploying to production.

## 🔒 Security Considerations

- API keys are server-side only (never exposed to client)
- Input validation on all user inputs
- Rate limiting recommended for production (implement via middleware)
- CORS configured appropriately in Next.js

## 🐛 Troubleshooting

### Movie not found

- Verify IMDb ID is correct (format: `tt` + 7+ digits)
- Check that OMDb/TMDb APIs are accessible
- Verify API keys are valid

### Sentiment analysis fails

- Check OpenAI API key is valid
- Verify API quota is not exceeded
- App will automatically fall back to heuristic analysis

### Build errors

- Ensure Node.js version is 18.x or higher
- Delete `node_modules` and `.next`, then reinstall: `npm install`
- Check all environment variables are set

## 📝 Future Enhancements

- [ ] User authentication and favorite movies
- [ ] Multiple review sources (Rotten Tomatoes, Metacritic)
- [ ] Advanced caching with Redis
- [ ] Rate limiting with Upstash
- [ ] Movie comparison feature
- [ ] Export insights as PDF
- [ ] Dark mode support
- [ ] Internationalization (i18n)

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

Built with ❤️ using Next.js, TypeScript, and OpenAI

---

**Example IMDb IDs to try:**

- `tt0133093` - The Matrix
- `tt0111161` - The Shawshank Redemption
- `tt0468569` - The Dark Knight
- `tt0137523` - Fight Club
- `tt1375666` - Inception
