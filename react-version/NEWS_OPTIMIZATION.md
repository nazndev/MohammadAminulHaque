# News Section Optimization for Google News

## 🎯 Goal
Make your website's news articles appear in Google's **News Section** when someone searches "Mohammad Aminul Haque".

## ✅ What's Been Implemented

### 1. **Google News Sitemap** (`/news-sitemap.ts`)
- Created dedicated sitemap for news articles
- Automatically includes all news articles
- Accessible at: `https://www.mohammadaminulhaque.net/news-sitemap.xml`

### 2. **Enhanced NewsArticle Schema**
- Full Google News-compliant structured data
- Includes: `headline`, `datePublished`, `author`, `publisher`, `image`, `articleBody`
- Proper `Organization` and `Person` schemas for publisher/author

### 3. **News-Specific Meta Tags**
- `article:published_time` - Publication date
- `article:author` - Author name
- `article:section` - News category
- `news_keywords` - Relevant keywords

### 4. **News Section Ranking Tracker**
- Automatically checks news section rankings
- Searches for "Mohammad Aminul Haque news"
- Tracks which of your news articles appear
- Identifies competitor news articles

## 📊 Current Status

Run the analyzer to see your news section rankings:
```bash
npm run seo:analyze
```

The analyzer will:
1. Check general search rankings
2. **Specifically check news section rankings** (NEW!)
3. Show which of your news articles are appearing
4. Identify competitor news articles
5. Generate recommendations

## 🚀 Next Steps to Get Your News in Google News

### 1. **Submit to Google News Publisher Center** (REQUIRED)
1. Go to: https://publishercenter.google.com/
2. Add your website: `https://www.mohammadaminulhaque.net`
3. Verify ownership
4. Submit your news sitemap: `https://www.mohammadaminulhaque.net/news-sitemap.xml`
5. Wait for approval (usually 1-2 weeks)

### 2. **Ensure All News Articles Have:**
- ✅ Proper NewsArticle schema (already done)
- ✅ Publication date within last 2 days (for news sitemap)
- ✅ Unique, descriptive headlines
- ✅ Full article content (not just excerpts)
- ✅ High-quality images (1200x630px recommended)
- ✅ Author information
- ✅ Publisher information

### 3. **Monitor News Rankings**
Run regularly:
```bash
npm run seo:analyze
```

This will show:
- Your news section ranking
- Which articles are appearing
- Competitor news articles
- Recommendations for improvement

### 4. **Publish Fresh Content Regularly**
- Google News favors recent content
- Publish at least 1-2 news articles per week
- Update existing articles with new information
- Keep content relevant and timely

## 📝 News Article Requirements

For Google News, each article must have:

1. **Headline** - Clear, descriptive title
2. **Publication Date** - Recent (within 2 days for news sitemap)
3. **Author** - Full name and profile
4. **Publisher** - Organization information
5. **Content** - Full article text (not just excerpt)
6. **Image** - High-quality, relevant image
7. **Schema Markup** - NewsArticle structured data
8. **Meta Tags** - article:published_time, article:author, etc.

## 🔍 How to Check if It's Working

1. **Run the analyzer:**
   ```bash
   npm run seo:analyze
   ```
   Look for: `📰 Your News Section Ranking: #X`

2. **Search Google:**
   - Search: "Mohammad Aminul Haque news"
   - Check if your articles appear in the "News" tab
   - Look for your domain in results

3. **Google Search Console:**
   - Check "Performance" > "News" section
   - See which articles are indexed
   - Monitor impressions and clicks

## 📈 Expected Timeline

- **Week 1-2**: Submit to Google News Publisher Center
- **Week 2-4**: Google reviews and approves your site
- **Week 4-6**: News articles start appearing in Google News
- **Week 6+**: Regular monitoring and optimization

## 🎯 Key Files

- `app/news-sitemap.ts` - Google News sitemap
- `components/SEO.tsx` - Enhanced NewsArticle schema
- `app/news/[slug]/page.tsx` - Individual news article pages
- `scripts/ranking-analyzer.js` - News section ranking tracker
- `data/news-data.json` - All news articles

## 💡 Tips for Better News Rankings

1. **Use News-Specific Keywords**
   - Include "news", "announcement", "update" in titles
   - Use current dates and timestamps
   - Reference recent events

2. **Optimize Headlines**
   - Clear, descriptive headlines
   - Include "Mohammad Aminul Haque" in title
   - Keep under 110 characters

3. **Fresh Content**
   - Publish regularly (weekly minimum)
   - Update old articles with new information
   - Remove outdated content

4. **Internal Linking**
   - Link between news articles
   - Link from homepage to news
   - Use descriptive anchor text

5. **Social Sharing**
   - Share news articles on social media
   - Get backlinks from news sites
   - Encourage sharing

## 🚨 Important Notes

- Google News only indexes articles published within the last 2 days (for news sitemap)
- Your site must be approved by Google News Publisher Center
- News articles must have full content (not just excerpts)
- Images must be high-quality and relevant
- All articles must have proper schema markup

## 📞 Support

If your news articles aren't appearing:
1. Check Google News Publisher Center status
2. Verify all articles have proper schema
3. Ensure sitemap is submitted correctly
4. Check Google Search Console for errors
5. Run `npm run seo:analyze` for recommendations

