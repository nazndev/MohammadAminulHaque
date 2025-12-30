# Mohammad Aminul Haque - Official Website

This is the official website for **Mohammad Aminul Haque** (mohammadaminulhaque.net), built with **Next.js** and **Ant Design** for a modern, professional, and SEO-optimized experience.

## 🎯 SEO Strategy

This website is specifically structured to outrank existing news articles and LinkedIn profiles in Google search results. Key SEO features include:

### 1. **Structured Data (Schema.org)**
- Person schema for identity
- NewsArticle schema for each news item
- WebSite schema for site-wide information
- CollectionPage schema for news listings

### 2. **News Section**
- Dedicated news section with multiple articles
- Each article has its own URL for better indexing
- News articles use proper NewsArticle schema markup
- Articles are optimized with target keywords
- All news links point to original sources

### 3. **Technical SEO**
- Server-side rendering (SSR) with Next.js
- Static site generation (SSG) for optimal performance
- Proper meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs
- XML sitemap (auto-generated)
- robots.txt (auto-generated)
- Mobile-responsive design
- Fast loading times

## 📁 Project Structure

```
WebSiteRank/
├── react-version/              # Next.js React application
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout
│   │   ├── news/[slug]/       # Dynamic news article pages
│   │   ├── sitemap.ts         # Auto-generated sitemap
│   │   └── robots.ts          # Auto-generated robots.txt
│   ├── components/            # React components
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Footer.tsx        # Footer component
│   │   ├── NewsCard.tsx      # News article card
│   │   └── SEO.tsx           # SEO metadata component
│   ├── data/                 # Data files
│   │   └── news-data.json    # News articles data
│   ├── lib/                  # Utility libraries
│   │   ├── config.ts         # Configuration
│   │   └── news.ts          # News data utilities
│   └── types/                # TypeScript types
│       └── index.ts
└── docs/                     # Documentation and source materials
    ├── biography.txt
    ├── news.txt
    └── OLD News links_v1.docx
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the React project:
   ```bash
   cd react-version
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
cd react-version
npm run build
npm start
```

## ⚙️ Configuration

The website uses environment variables for configuration. Edit `react-version/lib/config.ts` to set:

- Base URL for development vs production
- Site metadata
- SEO settings

## 📝 Adding New News Articles

1. **Add to `react-version/data/news-data.json`:**
```json
{
  "id": 16,
  "title": "Your News Title",
  "date": "2024-12-01",
  "excerpt": "Brief description",
  "content": "Full article content",
  "image": "image-url",
  "url": "https://external-link.com/article",
  "category": "Category"
}
```

2. **The news article page will be automatically generated** at `/news/[slug]`

3. **Sitemap and robots.txt are auto-generated** by Next.js

## 🎨 Features

- ✅ Modern, professional design with Ant Design
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ SEO optimized with structured data
- ✅ Fast loading with Next.js optimization
- ✅ Accessible and semantic HTML
- ✅ External news links properly handled
- ✅ Date formatting (month and year only, no fake days)

## 🔍 SEO Best Practices Implemented

✅ Server-side rendering (SSR)  
✅ Static site generation (SSG)  
✅ Semantic HTML5 structure  
✅ Mobile-responsive design  
✅ Fast page load times  
✅ Proper heading hierarchy  
✅ Meta descriptions and titles  
✅ Schema.org structured data  
✅ Auto-generated XML sitemap  
✅ Auto-generated robots.txt  
✅ Canonical URLs  
✅ Internal linking  
✅ News article schema  
✅ Open Graph and Twitter Cards  

## 📊 Monitoring & Analytics

1. **Google Search Console**
   - Submit sitemap: `https://mohammadaminulhaque.net/sitemap.xml`
   - Monitor search performance
   - Check indexing status

2. **Google Analytics**
   - Add tracking code to `app/layout.tsx`
   - Monitor traffic and user behavior

3. **Performance Monitoring**
   - Use Google PageSpeed Insights
   - Monitor Core Web Vitals
   - Next.js provides built-in optimizations

## 🚀 Deployment

### Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Traditional hosting with Node.js support

See `react-version/DEPLOYMENT.md` for detailed deployment instructions.

## 📞 Support

For questions or issues:
- Check Google Search Console for indexing issues
- Verify all URLs are accessible
- Test structured data with [Google's Rich Results Test](https://search.google.com/test/rich-results)

---

**Note:** SEO is a long-term strategy. It may take several weeks to months for Google to index and rank your website. Be patient and continue adding quality content regularly.
