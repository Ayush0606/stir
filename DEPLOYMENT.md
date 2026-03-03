# Deployment Guide - AI Movie Insight Builder

## 🚀 Deployment Options

This application can be deployed to multiple platforms. Choose the one that best fits your needs.

---

## 1. Vercel (Recommended) ⭐

**Best for**: Quick deployment, serverless, automatic scaling

### Prerequisites

- GitHub account
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Set Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add:
     - `OMDB_API_KEY` = your_key
     - `TMDB_API_KEY` = your_key
     - `OPENAI_API_KEY` = your_key

4. **Deploy**
   ```bash
   # Or use CLI
   npm install -g vercel
   vercel login
   npm run deploy:vercel
   ```

**Your app will be live at**: `https://your-app.vercel.app`

**Features**:

- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on push
- ✅ Preview deployments for PRs

---

## 2. Netlify

**Best for**: Alternative to Vercel, great UI

### Steps

1. **Push to GitHub** (if not done)

2. **Deploy to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import existing project"
   - Connect to GitHub and select repo
   - Build settings are auto-detected from `netlify.toml`

3. **Set Environment Variables**
   - In Netlify dashboard: Site settings → Environment variables
   - Add the three API keys

4. **Deploy**
   ```bash
   # Or use CLI
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

---

## 3. Docker + Any Cloud Provider

**Best for**: Full control, any hosting provider (AWS, GCP, Azure, DigitalOcean)

### Build Docker Image

```bash
# Build
docker build -t ai-movie-insights .

# Run locally to test
docker run -p 3000:3000 \
  -e OMDB_API_KEY=your_key \
  -e TMDB_API_KEY=your_key \
  -e OPENAI_API_KEY=your_key \
  ai-movie-insights

# Or use docker-compose
docker-compose up -d
```

### Deploy to Cloud Providers

**AWS ECS / Fargate**:

```bash
# Push to ECR
aws ecr create-repository --repository-name ai-movie-insights
docker tag ai-movie-insights:latest <account-id>.dkr.ecr.<region>.amazonaws.com/ai-movie-insights:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/ai-movie-insights:latest
```

**Google Cloud Run**:

```bash
gcloud builds submit --tag gcr.io/<project-id>/ai-movie-insights
gcloud run deploy ai-movie-insights --image gcr.io/<project-id>/ai-movie-insights --platform managed
```

**DigitalOcean App Platform**:

- Connect GitHub repo
- Select Docker as source
- Set environment variables
- Deploy

---

## 4. Railway

**Best for**: Simplicity, automatic deployments

### Steps

1. Visit [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select repository
4. Add environment variables
5. Deploy (automatic)

---

## 5. Self-Hosted (VPS)

**Best for**: Full control, custom domain, your own server

### Using PM2

```bash
# On your server
git clone <your-repo-url>
cd stir
npm install
npm run build

# Install PM2
npm install -g pm2

# Create .env file with your keys
nano .env

# Start with PM2
pm2 start npm --name "movie-insights" -- start
pm2 save
pm2 startup
```

### Using Nginx as Reverse Proxy

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📋 Pre-Deployment Checklist

Before deploying to production:

- [ ] All environment variables are set
- [ ] API keys are activated and working
- [ ] Run `npm run validate` (type-check, lint, test)
- [ ] Test locally with `npm run build && npm start`
- [ ] Review security headers in `next.config.js`
- [ ] Check `.env.example` is committed (not `.env`)
- [ ] Update README with your deployed URL
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Configure custom domain (optional)
- [ ] Set up analytics (Vercel Analytics, Google Analytics)

---

## 🔍 Health Check

After deployment, verify your app is healthy:

```bash
curl https://your-app-url.com/api/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2026-03-03T...",
  "environment": "production",
  "checks": {
    "omdbApiConfigured": true,
    "tmdbApiConfigured": true,
    "openaiApiConfigured": true
  },
  "version": "1.0.0"
}
```

---

## 🛠️ Deployment Commands

```bash
# Validate before deploy
npm run validate

# Clean build
npm run clean && npm run build

# Production build locally
npm run build && npm start

# Deploy to Vercel
npm run deploy:vercel

# Preview deployment
npm run deploy:vercel:preview

# Docker build
docker build -t ai-movie-insights .

# Docker run
docker-compose up -d
```

---

## 🔒 Security Best Practices

1. **Never commit `.env`** - Only `.env.example`
2. **Rotate API keys periodically**
3. **Use environment-specific keys** (dev/staging/prod)
4. **Enable rate limiting** (via Vercel Edge Config or Upstash)
5. **Monitor API usage** to prevent quota exhaustion
6. **Set up alerts** for errors and downtime

---

## 📊 Monitoring & Analytics

### Recommended Tools

**Error Tracking**:

- Sentry (free tier available)
- LogRocket

**Analytics**:

- Vercel Analytics (built-in)
- Google Analytics
- Plausible (privacy-focused)

**Uptime Monitoring**:

- UptimeRobot (free)
- Pingdom
- Better Uptime

---

## 🚨 Troubleshooting

**Build fails**:

- Check Node.js version (18+)
- Run `npm run validate` locally
- Check environment variables are set

**API not working**:

- Verify `/api/health` endpoint
- Check API keys in environment
- Review serverless function logs

**Images not loading**:

- Check `next.config.js` image domains
- Verify OMDb/TMDb poster URLs

---

## 💰 Cost Estimates (Monthly)

**Free Tier**:

- Vercel Free: $0 (100GB bandwidth)
- OMDb API: $0 (1,000 requests/day)
- TMDb API: $0 (unlimited)
- OpenAI: ~$5-10 (based on usage)

**Low Traffic** (1,000 users/month):

- Total: ~$5-15/month

**Medium Traffic** (10,000 users/month):

- Vercel Pro: $20/month
- OpenAI: ~$20-50/month
- Total: ~$40-70/month

---

**Questions?** Check [README.md](./README.md) for more details.
