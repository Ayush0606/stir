# 🚀 Quick Deployment Checklist

Use this checklist before deploying to production.

## ✅ Pre-Deployment

- [ ] All tests pass: `npm test`
- [ ] Type checking passes: `npm run type-check`
- [ ] Linting passes: `npm run lint`
- [ ] Full validation: `npm run validate`
- [ ] Production build works: `npm run build && npm start`
- [ ] Health check works: Visit http://localhost:3000/api/health
- [ ] Test with sample IMDb ID: `tt0133093`

## ✅ Environment Setup

- [ ] `.env` file configured locally
- [ ] API keys tested and working:
  - [ ] OMDB_API_KEY activated
  - [ ] TMDB_API_KEY validated (optional)
  - [ ] OPENAI_API_KEY with credits (optional)
- [ ] `.env.example` updated with any new variables
- [ ] `.env` NOT committed to git

## ✅ Code Quality

- [ ] No console.log statements in production code
- [ ] No commented-out code blocks
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Code formatted: `npm run format` (if using Prettier)

## ✅ Git & Repository

- [ ] All changes committed
- [ ] Meaningful commit messages
- [ ] Branch up to date with main
- [ ] `.gitignore` properly configured
- [ ] README.md updated
- [ ] CHANGELOG.md updated (if applicable)

## ✅ Vercel Deployment

- [ ] GitHub repository created and pushed
- [ ] Vercel account connected to GitHub
- [ ] Project imported to Vercel
- [ ] Environment variables set in Vercel dashboard:
  - [ ] OMDB_API_KEY
  - [ ] TMDB_API_KEY (optional)
  - [ ] OPENAI_API_KEY (optional)
- [ ] Build settings verified (auto-detected for Next.js)
- [ ] Custom domain configured (if applicable)

## ✅ Post-Deployment

- [ ] Production URL accessible
- [ ] Health endpoint working: `https://your-app.vercel.app/api/health`
- [ ] Test search with IMDb ID works
- [ ] Images loading correctly
- [ ] API responses working
- [ ] No console errors in browser
- [ ] Mobile responsive design verified
- [ ] Performance acceptable (Core Web Vitals)

## ✅ Monitoring & Analytics

- [ ] Error tracking configured (Sentry, etc.)
- [ ] Analytics set up (Vercel Analytics, GA)
- [ ] Uptime monitoring configured
- [ ] Alert notifications configured

## ✅ Security

- [ ] API keys stored in environment variables only
- [ ] No sensitive data in client-side code
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Security headers configured (check next.config.js)
- [ ] CORS configured correctly

## ✅ Documentation

- [ ] README.md has deployment instructions
- [ ] DEPLOYMENT.md reviewed
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Known issues documented (if any)

## ✅ Performance

- [ ] Images optimized
- [ ] Bundle size acceptable (check Vercel deployment logs)
- [ ] API response times < 3s
- [ ] Time to First Byte (TTFB) < 600ms
- [ ] Lighthouse score > 90 (run in incognito)

## 🎯 Platform-Specific

### Vercel

- [ ] Function timeouts set (30s for API routes)
- [ ] Region configured (closest to users)
- [ ] Preview deployments enabled for PRs

### Docker

- [ ] Dockerfile tested locally
- [ ] Health check working
- [ ] Image size optimized
- [ ] Environment variables in docker-compose.yml

### Netlify

- [ ] netlify.toml configured
- [ ] Build command correct
- [ ] Environment variables set

---

## 🧪 Manual Testing Checklist

After deployment, manually test:

1. **Search Functionality**
   - [ ] Valid IMDb ID returns results
   - [ ] Invalid IMDb ID shows error
   - [ ] Empty input shows validation error

2. **Movie Display**
   - [ ] Poster image loads
   - [ ] All metadata visible
   - [ ] Cast list displays
   - [ ] IMDb rating shows

3. **Sentiment Analysis**
   - [ ] AI summary displays
   - [ ] Sentiment badge shows correct color
   - [ ] Fallback works if OpenAI unavailable

4. **Responsive Design**
   - [ ] Mobile (375px)
   - [ ] Tablet (768px)
   - [ ] Desktop (1920px)

5. **Error Handling**
   - [ ] Network errors handled gracefully
   - [ ] API errors show user-friendly messages
   - [ ] Loading states display

---

## 📊 Success Metrics

Your deployment is successful when:

- ✅ Health check returns status: "ok"
- ✅ Test search completes in < 5 seconds
- ✅ No 500 errors in logs
- ✅ Lighthouse Performance > 90
- ✅ Lighthouse Accessibility > 95
- ✅ Zero console errors

---

**Last Updated**: 2026-03-03
**Version**: 1.0.0

**Quick Test Command**:

```bash
curl https://your-app.vercel.app/api/health
```

Expected: `{"status":"ok",...}`
