# AI Movie Insight Builder - Development Notes

## Quick Start Commands

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Then edit .env with your API keys

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

## API Keys Required

1. **OMDb API** (Free)
   - Visit: https://www.omdbapi.com/apikey.aspx
   - Choose free tier (1,000 requests/day)
   - Add to `.env` as `OMDB_API_KEY`

2. **TMDb API** (Free)
   - Visit: https://www.themoviedb.org/settings/api
   - Create account and request API key
   - Add to `.env` as `TMDB_API_KEY`

3. **OpenAI API** (Pay-as-you-go)
   - Visit: https://platform.openai.com/api-keys
   - Create API key
   - Add to `.env` as `OPENAI_API_KEY`
   - Note: Uses GPT-3.5-turbo (~$0.002 per request)

## Code Quality Checklist

✅ TypeScript strict mode enabled
✅ All components typed
✅ API routes with proper error handling
✅ Unit tests for critical paths
✅ ESLint configuration
✅ Responsive design with Tailwind
✅ Loading and error states
✅ Input validation
✅ Environment variable management
✅ Production-ready folder structure

## Testing Coverage

- API route handlers (POST, GET)
- Sentiment analysis logic
- IMDb ID validation
- Error scenarios
- Fallback mechanisms

Run with coverage report:
```bash
npm test -- --coverage
```

## Production Deployment Checklist

- [ ] Set all environment variables in hosting platform
- [ ] Test with production build locally (`npm run build && npm start`)
- [ ] Verify all API keys are valid
- [ ] Test error scenarios
- [ ] Check mobile responsiveness
- [ ] Verify images load correctly
- [ ] Test with multiple IMDb IDs
- [ ] Monitor API rate limits
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure domain and SSL

## Common Issues & Solutions

**Issue**: "OMDB_API_KEY is not configured"
- Solution: Ensure `.env` file exists with valid API key

**Issue**: Movie not found
- Solution: Verify IMDb ID format (tt + 7+ digits)

**Issue**: Sentiment analysis using fallback
- Solution: Check OpenAI API key and quota

**Issue**: Build errors
- Solution: Delete `.next` and `node_modules`, run `npm install`

## Architecture Overview

```
User Input (IMDb ID)
    ↓
MovieSearch Component
    ↓
API Route (/api/movie-insights)
    ↓
Movie Client (OMDb → TMDb fallback)
    ↓
Sentiment Service (OpenAI → Fallback)
    ↓
Response with Movie + Sentiment
    ↓
Display (MovieCard + SentimentCard)
```

## Performance Optimizations

- Next.js automatic image optimization
- API response caching (1 hour)
- Component-level code splitting
- Minimal dependencies
- Tailwind CSS purging unused styles

## Security Measures

- API keys server-side only
- Input validation and sanitization
- Error messages don't expose internals
- Next.js security headers
- No sensitive data in client bundle

---

Happy coding! 🚀
