# 📚 Quick Reference Guide

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development
npm run dev           # Runs on http://localhost:3001

# Production
npm run build         # Build for production
npm start             # Run production server

# Code Quality
npm run lint          # ESLint check
```

---

## 📁 Where Things Are

### Pages
| Page | File | Route |
|------|------|-------|
| Home | [app/page.tsx](app/page.tsx) | `/` |
| About | [app/about/page.tsx](app/about/page.tsx) | `/about` |
| Experience | [app/experience/page.tsx](app/experience/page.tsx) | `/experience` |
| Research | [app/research/page.tsx](app/research/page.tsx) | `/research` |
| Publications | [app/publications/page.tsx](app/publications/page.tsx) | `/publications` |
| Achievements | [app/achievements/page.tsx](app/achievements/page.tsx) | `/achievements` |
| News Articles | [app/news/[slug]/page.tsx](app/news/[slug]/page.tsx) | `/news/:slug` |

### Components
| Component | File | Purpose |
|-----------|------|---------|
| Header | [components/Header.tsx](components/Header.tsx) | Navigation |
| Footer | [components/Footer.tsx](components/Footer.tsx) | Footer |
| NewsCard | [components/NewsCard.tsx](components/NewsCard.tsx) | Article display |
| Breadcrumb | [components/Breadcrumb.tsx](components/Breadcrumb.tsx) | Navigation path |
| SEO | [components/SEO.tsx](components/SEO.tsx) | Metadata utils |

### Data
| File | Purpose |
|------|---------|
| [data/news-data.json](data/news-data.json) | All news articles |
| [lib/news.ts](lib/news.ts) | News utilities |
| [lib/config.ts](lib/config.ts) | Configuration |
| [lib/breadcrumb-schema.ts](lib/breadcrumb-schema.ts) | Breadcrumb schema |
| [types/index.ts](types/index.ts) | TypeScript types |

### Configuration
| File | Purpose |
|------|---------|
| [next.config.ts](next.config.ts) | Next.js config |
| [tsconfig.json](tsconfig.json) | TypeScript config |
| [package.json](package.json) | Dependencies |
| [tailwind.config.js](tailwind.config.js) | Tailwind config |
| [postcss.config.mjs](postcss.config.mjs) | PostCSS config |

---

## 🔧 Common Tasks

### Add a New News Article
1. Edit [data/news-data.json](data/news-data.json)
2. Add new article object:
```json
{
  "id": 16,
  "title": "Article Title",
  "date": "2025-12-30",
  "excerpt": "Brief description",
  "content": "Full content",
  "image": "https://via.placeholder.com/400x250",
  "url": "/news/article-slug",
  "category": "News"
}
```
3. Save and rebuild: `npm run build`

### Update Base URL
File: [lib/config.ts](lib/config.ts)
```typescript
// Change the domain in the config object
```

### Add New Page
1. Create folder: `app/new-page/`
2. Create: `app/new-page/page.tsx`
3. Add 'use client' directive if using Ant Design
4. Export default component

### Change Colors/Styling
- Tailwind classes: Use in `className`
- Ant Design theme: Configure in [app/layout.tsx](app/layout.tsx)
- Global styles: Edit [app/globals.css](app/globals.css)

### Update SEO Metadata
- Global: Edit [app/layout.tsx](app/layout.tsx) metadata export
- Per-page: Use `generateSEOMetadata()` from [components/SEO.tsx](components/SEO.tsx)

---

## 🐛 Troubleshooting

### Build fails
```bash
# Clean and rebuild
rm -rf .next
npm run build
```

### TypeScript errors
```bash
# Check errors
npm run lint

# Fix automatically
npm run lint -- --fix
```

### Dev server not starting
```bash
# Kill process on port 3000/3001
lsof -ti:3000,3001 | xargs kill -9

# Try again
npm run dev
```

### Images not loading
- Check [next.config.ts](next.config.ts) `remotePatterns`
- Add domain to whitelist

### Navigation not working
- Check links in [components/Header.tsx](components/Header.tsx)
- Verify routes exist in app folder

---

## 📊 Project Stats

- **Pages:** 7 static + 15 dynamic (news)
- **Components:** 5 reusable
- **Dependencies:** 8 production + 6 dev
- **Lines of Code:** ~2000 (TypeScript/TSX)
- **Build Time:** ~10 seconds
- **Bundle Size:** ~250-300KB (gzipped)

---

## 🎯 Top Priority Tasks

```
[ ] 1. Deploy to production
[ ] 2. Set up domain/HTTPS
[ ] 3. Add Google Analytics
[ ] 4. Monitor rankings
[ ] 5. Regular content updates
```

---

## 🔗 Important URLs

| Purpose | URL |
|---------|-----|
| Home | http://localhost:3001 |
| News | http://localhost:3001/news/[slug] |
| About | http://localhost:3001/about |
| Sitemap | http://localhost:3001/sitemap.xml |
| Robots | http://localhost:3001/robots.txt |

---

## 📞 Need Help?

### Common Issues

**Issue: Port 3000 already in use**
```bash
npm run dev
# Will automatically use port 3001
```

**Issue: Module not found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

**Issue: Build slow**
```bash
# Turbopack is enabled but can be faster with SSD
# Or check your internet speed for dependencies
```

---

## ✅ Verification Checklist

Run these to verify everything works:

```bash
# 1. Build succeeds
npm run build
# ✅ Should show: "Finished in X seconds"

# 2. Dev server works
npm run dev
# ✅ Should start on http://localhost:3001

# 3. No lint errors
npm run lint
# ✅ Should output: "No errors"

# 4. Visit all pages
http://localhost:3001      # ✅ Home loads
http://localhost:3001/about # ✅ About loads
http://localhost:3001/experience # ✅ Experience loads
```

---

## 🚀 Deployment Steps

### Option 1: Vercel (Easiest)
```bash
npm install -g vercel
vercel
# Follow prompts, auto-deploys on git push
```

### Option 2: Traditional Server
```bash
# Build
npm run build

# Start
npm start
# Runs on port 3000

# Or use PM2
npm install -g pm2
pm2 start "npm start" --name "portfolio"
```

### Option 3: Docker
```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 3000:3000 portfolio
```

---

## 📈 Monitoring Commands

```bash
# Watch for changes in development
npm run dev -- --turbo

# Analyze build size
npm run build -- --analyze

# Monitor file changes
npm run build -- --watch
```

---

## 🎨 Customization Guide

### Colors
- Primary Blue: `#1e3a8a`
- Secondary: `#64748b`
- Background: `#fafafa`
- Edit in styles or Ant Design ConfigProvider

### Fonts
- Current: Inter (Google Fonts)
- Change in [app/layout.tsx](app/layout.tsx)

### Logo/Branding
- Text-based in [components/Header.tsx](components/Header.tsx)
- Add logo image in public folder

### Layout Max Width
- Current: 1200px
- Change in page components inline styles

---

## 🔐 Environment Variables

### Development
```env
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_DEV_URL=http://localhost:3000
```

### Production
```env
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_DEV_URL=https://www.mohammadaminulhaque.net
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [PROJECT_REVIEW.md](PROJECT_REVIEW.md) | Detailed analysis |
| [IMPROVEMENTS.md](IMPROVEMENTS.md) | Implementation guide |
| [HEALTH_DASHBOARD.md](HEALTH_DASHBOARD.md) | Status report |
| [CURRENT_STATUS.md](CURRENT_STATUS.md) | Scraping setup |
| [README.md](README.md) | Original README |

---

## ⚡ Performance Tips

1. **Use static generation** (already enabled)
2. **Optimize images** with Next.js Image component
3. **Lazy load heavy components** with next/dynamic
4. **Monitor bundle size** with next/bundle-analyzer
5. **Enable Gzip compression** on server

---

## 🎓 Key Concepts

### Why Turbopack?
- 4-5x faster builds than Webpack
- Better for development experience
- Production-ready

### Why Static Generation?
- Fastest possible page loads
- No server resources needed
- Perfect for portfolios

### Why TypeScript?
- Catch errors before runtime
- Better IDE support
- Self-documenting code

### Why Ant Design?
- Professional UI components
- Built-in accessibility
- Responsive by default

---

## 📞 Support Resources

- **Next.js:** https://nextjs.org/docs
- **Ant Design:** https://ant.design/
- **TypeScript:** https://www.typescriptlang.org/
- **Tailwind CSS:** https://tailwindcss.com/
- **React:** https://react.dev/

---

## ✨ What's Next?

1. ✅ Review the three documentation files
2. ⏭️ Deploy to production
3. ⏭️ Set up monitoring
4. ⏭️ Plan content updates
5. ⏭️ Collect feedback

---

**Happy building! 🚀**

Last Updated: December 30, 2025
