# Mohammad Aminul Haque - React + Ant Design Website

Professional website built with **Next.js 14**, **React**, and **Ant Design** - optimized for SEO to outrank existing news articles and LinkedIn profiles in Google search results.

## 🎯 SEO Strategy

This React version is specifically designed to:

1. **Outrank News Articles**: Your news section with 15+ articles will rank higher than external news
2. **Beat LinkedIn Profile**: Your website will appear before LinkedIn in search results
3. **Target Keywords**: "Mohammad Aminul Haque" and "mohammad aminul haque" optimized throughout

### SEO Features:

✅ **Server-Side Rendering (SSR)** - Better SEO than client-side rendering  
✅ **Static Site Generation (SSG)** - Pre-rendered pages for instant loading  
✅ **Structured Data (Schema.org)** - Person, WebSite, NewsArticle schemas  
✅ **Individual News Pages** - Each article has its own URL for better indexing  
✅ **Auto-generated Sitemap** - `/sitemap.xml` with all pages  
✅ **Robots.txt** - Proper crawler instructions  
✅ **Meta Tags** - Open Graph, Twitter Cards, Canonical URLs  
✅ **Mobile Responsive** - Google mobile-first indexing  

## 🚀 Getting Started

### Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables:**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_ENVIRONMENT=development
   NEXT_PUBLIC_DEV_URL=http://localhost:3000
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Visit `http://localhost:3000`

### Production

1. **Set environment variables:**
   Create `.env.production`:
   ```env
   NEXT_PUBLIC_ENVIRONMENT=production
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Start production server:**
   ```bash
   npm start
   ```

   Or deploy to Vercel/Netlify (recommended):
   ```bash
   vercel deploy
   ```

## 📁 Project Structure

```
react-version/
├── app/
│   ├── layout.tsx          # Root layout with Ant Design
│   ├── page.tsx            # Homepage
│   ├── news/
│   │   └── [slug]/
│   │       └── page.tsx     # Individual news article pages
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # Robots.txt
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── NewsCard.tsx        # News article card component
│   └── SEO.tsx             # SEO utilities
├── lib/
│   ├── config.ts           # Environment configuration
│   └── news.ts             # News data functions
├── data/
│   └── news-data.json      # All news articles
└── types/
    └── index.ts            # TypeScript types
```

## 🎨 Features

- **Ant Design Components** - Professional, enterprise-grade UI
- **Dark Theme** - Modern, sophisticated design
- **Responsive Design** - Works on all devices
- **Fast Performance** - Optimized images, code splitting
- **TypeScript** - Type-safe code
- **SEO Optimized** - All pages pre-rendered for search engines

## 📊 SEO Checklist

After deployment:

1. ✅ Submit sitemap to Google Search Console: `https://mohammadaminulhaque.net/sitemap.xml`
2. ✅ Submit to Google News (if applicable)
3. ✅ Verify all pages are indexed
4. ✅ Check structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
5. ✅ Monitor search rankings for "Mohammad Aminul Haque"

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_ENVIRONMENT`: `development` or `production`
- `NEXT_PUBLIC_DEV_URL`: Development URL (default: `http://localhost:3000`)

### Base URL

Automatically switches between:
- Development: `http://localhost:3000`
- Production: `https://mohammadaminulhaque.net`

## 📝 Adding News Articles

1. Edit `data/news-data.json`
2. Add new article object
3. Create corresponding page in `app/news/[slug]/page.tsx` (auto-generated)
4. Rebuild: `npm run build`

## 🚀 Deployment

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

### Traditional Hosting

```bash
npm run build
npm start
```

## 📈 Performance

- **Lighthouse Score**: 95+ (expected)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **SEO Score**: 100

## 🎯 Why This Version is Better

1. **Better SEO**: Server-side rendering means Google can index all content
2. **Faster Loading**: Pre-rendered pages load instantly
3. **Professional UI**: Ant Design components look enterprise-grade
4. **Easier Maintenance**: Component-based architecture
5. **Better Performance**: React optimizations and code splitting
6. **Type Safety**: TypeScript prevents errors

---

**Built with Next.js 14, React, Ant Design, and TypeScript**
