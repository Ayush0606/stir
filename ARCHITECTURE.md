# AI Movie Insight Builder - Architecture Document

## System Architecture

### Overview
The AI Movie Insight Builder is a full-stack web application built with Next.js that combines movie data from multiple sources with AI-powered sentiment analysis to provide comprehensive movie insights.

## Technology Stack

### Frontend Layer
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Image Optimization**: Next.js Image Component

### Backend Layer
- **Runtime**: Node.js (Next.js API Routes)
- **API Architecture**: RESTful API
- **External APIs**:
  - OMDb API (Movie Data - Primary)
  - TMDb API (Movie Data & Reviews - Fallback)
  - OpenAI API (Sentiment Analysis)

### Testing Layer
- **Framework**: Jest 29
- **Component Testing**: React Testing Library
- **Coverage**: Unit tests for business logic

## Data Flow

### 1. User Input Flow
```
User enters IMDb ID → Validation → API Request
```

**Validation Rules**:
- Must start with "tt"
- Followed by 7+ digits
- Example: tt0133093

### 2. Movie Data Retrieval Flow
```
API Route
  ↓
Movie Client
  ↓
OMDb API (Primary)
  ↓
Success? → Return Data
  ↓
Failure? → TMDb API (Fallback)
  ↓
Success? → Return Data
  ↓
Failure? → Error Response
```

### 3. Review Retrieval Flow
```
TMDb API Request
  ↓
Success? → Return Reviews
  ↓
Failure? → Mock Reviews (Demo)
```

### 4. Sentiment Analysis Flow
```
Reviews → OpenAI API
  ↓
GPT-3.5-turbo Processing
  ↓
JSON Response (Summary + Classification)
  ↓
Success? → Return AI Analysis
  ↓
Failure? → Fallback Heuristic Analysis
```

## Component Architecture

### Page Components
- **`app/page.tsx`**: Main application page
  - State management for movie data
  - Error handling
  - Loading states
  - Component orchestration

### UI Components
1. **MovieSearch**: Input and validation
2. **MovieCard**: Display movie details
3. **SentimentCard**: Display AI insights
4. **LoadingSpinner**: Loading state
5. **ErrorMessage**: Error display

### API Routes
- **`/api/movie-insights`** (POST): Main endpoint
  - Input validation
  - Data orchestration
  - Error handling
  - Response formatting

### Service Layer
1. **`lib/omdb-api.ts`**: OMDb API client
2. **`lib/tmdb-api.ts`**: TMDb API client
3. **`lib/movie-client.ts`**: Unified data fetcher
4. **`services/sentiment-service.ts`**: AI analysis

## Error Handling Strategy

### Graceful Degradation
1. **Movie Data**: OMDb fails → TMDb fallback
2. **Reviews**: TMDb fails → Mock data
3. **Sentiment**: OpenAI fails → Heuristic analysis

### Error Types
- **400**: Invalid input (client error)
- **404**: Movie not found
- **500**: Server error
- **503**: External API unavailable (handled with fallback)

## Caching Strategy

### Next.js Built-in Caching
- **Static Data**: Cached at build time
- **API Responses**: 1 hour revalidation
- **Images**: Automatic optimization and caching

### Future Enhancements
- Redis for distributed caching
- User-specific cache (favorites, history)

## Security Measures

### API Key Protection
- All keys stored server-side only
- Never exposed to client bundle
- Environment variable validation

### Input Sanitization
- IMDb ID format validation
- Type checking with TypeScript
- Request body validation

### Rate Limiting
- Recommended for production
- Can be implemented via Vercel Edge Config
- Or using middleware with Upstash

## Performance Optimizations

### Bundle Size
- Minimal dependencies (only essentials)
- Tree-shaking enabled
- Code splitting by route

### Image Optimization
- Next.js automatic optimization
- Lazy loading
- Responsive images

### API Optimization
- Parallel requests where possible
- Response compression
- Efficient data structures

## Scalability Considerations

### Horizontal Scaling
- Stateless API design
- Vercel serverless auto-scaling
- No persistent connections

### Database (Future)
- User data: PostgreSQL or MongoDB
- Cache: Redis
- Analytics: ClickHouse or BigQuery

## Monitoring & Observability

### Recommended Tools
- **Error Tracking**: Sentry
- **Analytics**: Vercel Analytics
- **Logging**: Vercel Logs or Datadog
- **APM**: New Relic or Datadog

### Key Metrics
- API response time
- Error rate by endpoint
- External API failure rate
- User engagement metrics

## Deployment Architecture

### Vercel (Recommended)
```
GitHub Repository
  ↓
Automatic Deployment
  ↓
Edge Network (Global CDN)
  ↓
Serverless Functions (API Routes)
```

### Environment Variables
- Development: `.env.local`
- Production: Vercel Dashboard

## Testing Strategy

### Unit Tests
- API route handlers
- Sentiment analysis logic
- Validation functions
- Error scenarios

### Integration Tests (Future)
- Full user flow
- API integration tests
- E2E with Playwright

### Coverage Goals
- Critical paths: 90%+
- Overall: 70%+

## Future Architecture Enhancements

### Phase 2
- User authentication (NextAuth.js)
- Database integration
- Advanced caching
- Rate limiting

### Phase 3
- Real-time updates (WebSockets)
- Movie recommendations
- Social features
- Advanced analytics

## Assumptions

1. **Review Availability**: Not all movies have reviews on TMDb
2. **API Reliability**: External APIs may have downtime
3. **Cost Management**: OpenAI API usage kept under $10/month for typical usage
4. **Traffic**: Expected <10,000 requests/day initially

## Design Principles

1. **Fail Gracefully**: Always provide fallback
2. **Type Safety**: TypeScript everywhere
3. **Modularity**: Separate concerns cleanly
4. **Performance**: Optimize for Core Web Vitals
5. **User Experience**: Clear feedback for all states

---

**Document Version**: 1.0  
**Last Updated**: 2026-03-02  
**Author**: AI Movie Insight Builder Team
