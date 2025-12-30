# Mohammad Aminul Haque - Professional Website

Professional website built with **Next.js 14**, **React**, and **Ant Design** - optimized for SEO to rank #1 for "Mohammad Aminul Haque" and outrank existing news articles and LinkedIn profiles.

## 🎯 Goal

Rank #1 in Google search results for "Mohammad Aminul Haque" and have your website's news links appear first in Google News section.

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## 📋 Environment Setup

Create `.env.local`:

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-8EF265JL7Z

# Environment
NEXT_PUBLIC_ENVIRONMENT=production
```

## 🎯 SEO Features

✅ **Server-Side Rendering (SSR)** - Better SEO than client-side  
✅ **Static Site Generation (SSG)** - Pre-rendered pages  
✅ **Structured Data (Schema.org)** - Person, WebSite, NewsArticle schemas  
✅ **15+ Individual News Pages** - Each article has its own URL  
✅ **Auto-generated Sitemap** - `/sitemap.xml`  
✅ **Robots.txt** - Proper crawler instructions  
✅ **Meta Tags** - Open Graph, Twitter Cards  
✅ **Mobile Responsive** - Google mobile-first indexing  

## 🤖 Free Automated SEO

### Run All Automation (One Command)

```bash
npm run seo:all
```

This runs:
- ✅ AI content optimization
- ✅ Search engine submission
- ✅ Ranking monitoring
- ✅ Report generation

### Individual Scripts

```bash
npm run seo:optimize    # AI content optimization
npm run seo:automate    # Search engine submission
npm run seo:social      # Social media posts
npm run monitor         # Ranking tracking
```

## 📊 After Deployment - Critical Steps

### 1. Google Search Console (REQUIRED)
1. Go to: https://search.google.com/search-console
2. Add property: `https://www.mohammadaminulhaque.net`
3. Verify ownership
4. Submit sitemap: `https://www.mohammadaminulhaque.net/sitemap.xml`

### 2. Google News Publisher Center (REQUIRED for News Rankings)
1. Go to: https://publishercenter.google.com
2. Add your website
3. Verify ownership
4. Submit sitemap

### 3. Social Media (IMPORTANT)
1. Update LinkedIn profile with website link
2. Share website on all social media
3. Use generated posts from `social-media-posts.json`

### 4. Weekly Automation
```bash
npm run seo:all
```

## 📁 Project Structure

```
react-version/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout with Ant Design
│   ├── page.tsx            # Homepage
│   ├── news/[slug]/        # Individual news pages
│   ├── about/              # About page
│   ├── experience/         # Experience page
│   ├── research/           # Research page
│   ├── publications/       # Publications page
│   ├── achievements/       # Achievements page
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # Robots.txt
├── components/             # React components
│   ├── Header.tsx          # Navigation
│   ├── Footer.tsx          # Footer
│   ├── NewsCard.tsx        # News card
│   └── SEO.tsx             # SEO utilities
├── lib/                    # Utilities
│   ├── config.ts           # Environment config
│   ├── news.ts             # News functions
│   └── breadcrumb-schema.ts
├── data/
│   └── news-data.json      # All news articles
├── scripts/                # Automation scripts
│   ├── ai-content-optimizer.js
│   ├── automated-seo.js
│   ├── social-media-automation.js
│   ├── ranking-monitor.js
│   └── master-automation.js
└── types/
    └── index.ts            # TypeScript types
```

## 🎨 Features

- **Ant Design** - Professional UI components
- **Responsive Design** - Works on all devices
- **Fast Performance** - Optimized images, code splitting
- **TypeScript** - Type-safe code
- **SEO Optimized** - All pages pre-rendered

## 📈 Expected Timeline

### With Automation:
- **Week 1-2**: Website indexed, initial rankings (page 2-5)
- **Week 3-4**: Page 1 rankings (positions 8-10)
- **Month 2-3**: Top 5 positions, regular news appearances

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Google Analytics ID
- `NEXT_PUBLIC_ENVIRONMENT`: `development` or `production`

### Base URL

Automatically switches:
- Development: `http://localhost:3000`
- Production: `https://www.mohammadaminulhaque.net`

## 📝 Adding News Articles

1. Edit `data/news-data.json`
2. Add new article with internal URL: `/news/article-slug`
3. Add `sourceUrl` for external links
4. Rebuild: `npm run build`

## 🚀 Deployment

### Digital Ocean / VPS

```bash
npm run build
npm start
```

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy .next folder
```

## 📊 SEO Checklist

After deployment:

- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Google News Publisher Center
- [ ] Update LinkedIn profile with website link
- [ ] Share website on social media
- [ ] Run automation: `npm run seo:all`
- [ ] Monitor rankings weekly: `npm run monitor`

## 💡 Pro Tips

1. **Run automation weekly**: `npm run seo:all`
2. **Complete manual steps**: Google Search Console, Google News
3. **Post on social media**: Use generated posts
4. **Monitor progress**: Check rankings weekly
5. **Be patient**: SEO takes 2-4 weeks minimum

## 🎯 Key Success Factors

1. ✅ **All news on your site** - Each article has its own page
2. ✅ **Google Search Console** - Submit sitemap
3. ✅ **Google News Publisher** - Submit for news rankings
4. ✅ **Backlinks** - LinkedIn, social media, directories
5. ✅ **Social signals** - Shares, engagement
6. ✅ **Consistency** - Regular updates, monitoring

---

**Built with Next.js 14, React, Ant Design, and TypeScript**
