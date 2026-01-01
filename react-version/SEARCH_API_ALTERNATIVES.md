# 🔍 Search API Alternatives - Complete Guide

## Free Options

### 1. **Google Custom Search API** (Recommended Free Option)
**Best for**: Free tier with good limits

**Setup:**
1. Go to: https://console.cloud.google.com
2. Create a project
3. Enable "Custom Search API"
4. Create API key
5. Create Custom Search Engine: https://programmablesearchengine.google.com

**Pricing:**
- ✅ **Free**: 100 searches/day
- 💰 **Paid**: $5 per 1,000 searches

**Pros:**
- Official Google API
- Free tier is generous (100/day = 3,000/month)
- Reliable and fast

**Cons:**
- Requires Google Cloud account
- Setup is slightly more complex

---

### 2. **ScraperAPI** (Free Tier Available)
**Best for**: Web scraping with free tier

**Setup:**
1. Sign up: https://www.scraperapi.com
2. Get API key
3. Use their Google search endpoint

**Pricing:**
- ✅ **Free**: 1,000 requests/month
- 💰 **Paid**: $29/month for 10,000 requests

**Pros:**
- Good free tier
- Handles proxies automatically
- Can scrape Google directly

**Cons:**
- Not specifically for search
- Requires more setup

---

### 3. **RapidAPI - Google Search** (Free Tier)
**Best for**: Quick setup with free tier

**Setup:**
1. Sign up: https://rapidapi.com
2. Subscribe to "Google Search" API
3. Get API key

**Pricing:**
- ✅ **Free**: Varies by provider (usually 100-500/month)
- 💰 **Paid**: $10-50/month

**Pros:**
- Multiple providers available
- Easy to switch
- Free tier available

**Cons:**
- Quality varies by provider
- Some providers have rate limits

---

## Paid Options (Better for Production)

### 4. **SerpAPI** (What we currently support)
**Best for**: Easiest setup, reliable

**Pricing:**
- ✅ **Free**: 100 searches/month
- 💰 **Hobby**: $50/month - 5,000 searches
- 💰 **Pro**: $250/month - 25,000 searches

**Pros:**
- Very easy to use
- Good documentation
- Reliable results

**Cons:**
- Free tier is limited
- Can be expensive at scale

---

### 5. **DataForSEO** (Enterprise)
**Best for**: High volume, enterprise

**Pricing:**
- 💰 **Starts at**: $99/month
- 💰 **Enterprise**: Custom pricing

**Pros:**
- High volume support
- Multiple search engines
- Advanced features

**Cons:**
- Expensive
- Overkill for small projects

---

### 6. **Bright Data** (Enterprise)
**Best for**: Large scale operations

**Pricing:**
- 💰 **Starts at**: $500/month
- 💰 **Enterprise**: Custom pricing

**Pros:**
- Very reliable
- High volume
- Enterprise support

**Cons:**
- Very expensive
- Not for small projects

---

## Free DIY Options (Advanced)

### 7. **Direct Scraping** (Free but Risky) ⚠️
**Best for**: Personal/educational use only

**Setup:**
1. **Install cheerio**:
   ```bash
   npm install cheerio
   ```

2. **Set environment variables**:
   ```env
   USE_DIRECT_SCRAPING=true
   USE_REAL_SEARCH=true
   SEARCH_API_TYPE=direct
   ```

3. **Run**:
   ```bash
   npm run seo:analyze
   ```

**Pricing:**
- ✅ **Free**: Unlimited (but risky)

**Pros:**
- ✅ Completely free
- ✅ No API keys needed
- ✅ No rate limits (theoretical)
- ✅ Full control

**Cons:**
- ⚠️ **Violates Google Terms of Service**
- ⚠️ **Google may block your IP**
- ⚠️ **Unreliable** - Google changes HTML frequently
- ⚠️ **Legal risks** - May violate terms
- ⚠️ **Can break anytime** - No guarantee it will work
- ⚠️ **May trigger CAPTCHAs**

**⚠️ WARNING: Use at your own risk!**

**Not recommended for production!**

### 8. **Puppeteer/Playwright** (Free but Risky)
**Best for**: Developers who want full control

**Setup:**
- Use Puppeteer or Playwright to scrape Google
- Requires handling CAPTCHAs, proxies, etc.

**Pricing:**
- ✅ **Free**: Unlimited (but risky)

**Pros:**
- Completely free
- Full control
- No API limits

**Cons:**
- ⚠️ Violates Google ToS
- Can get blocked
- Requires proxies
- Complex setup
- Legal risks

**Not recommended for production!**

---

## Comparison Table

| API | Free Tier | Paid Starts | Ease of Use | Reliability |
|-----|-----------|-------------|-------------|-------------|
| **Google Custom Search** | 100/day | $5/1k | Medium | ⭐⭐⭐⭐⭐ |
| **SerpAPI** | 100/month | $50/month | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **ScraperAPI** | 1k/month | $29/month | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **RapidAPI** | 100-500/month | $10/month | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Puppeteer** | Unlimited | Free | ⭐⭐ | ⭐⭐ |

---

## Recommendation

### For Free Tier:
1. **Google Custom Search API** - Best free option (100/day = 3,000/month)
2. **ScraperAPI** - Good alternative (1,000/month)

### For Paid:
1. **SerpAPI** - Easiest to use
2. **Google Custom Search** - Most cost-effective ($5/1k searches)

---

## Quick Setup Guides

### Google Custom Search API (Recommended Free Option)

1. **Create Google Cloud Project**:
   - Go to: https://console.cloud.google.com
   - Create new project

2. **Enable Custom Search API**:
   - Go to "APIs & Services" > "Library"
   - Search "Custom Search API"
   - Click "Enable"

3. **Create API Key**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

4. **Create Custom Search Engine**:
   - Go to: https://programmablesearchengine.google.com
   - Click "Add"
   - Enter any name
   - Set "Sites to search" to: `*` (search entire web)
   - Click "Create"
   - Copy your Search Engine ID

5. **Set Environment Variables**:
   ```env
   GOOGLE_API_KEY=your_api_key_here
   GOOGLE_CSE_ID=your_search_engine_id
   USE_REAL_SEARCH=true
   SEARCH_API_TYPE=google
   ```

6. **Update Code**:
   The code will automatically use Google Custom Search if these variables are set.

---

### ScraperAPI Setup

1. **Sign up**: https://www.scraperapi.com
2. **Get API key** from dashboard
3. **Set environment variables**:
   ```env
   SCRAPER_API_KEY=your_api_key_here
   USE_REAL_SEARCH=true
   SEARCH_API_TYPE=scraperapi
   ```

---

## Code Support

The ranking analyzer now supports multiple APIs:
- ✅ SerpAPI (current)
- ✅ Google Custom Search (coming)
- ✅ ScraperAPI (coming)
- ✅ RapidAPI (coming)

Just set the `SEARCH_API_TYPE` environment variable!

---

**Recommendation: Start with Google Custom Search API (100 free searches/day = 3,000/month)!** 🚀

