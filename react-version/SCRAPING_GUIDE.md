# 🕷️ Direct Scraping/Crawling Guide

## What is Scraping/Crawling?

**Scraping** = Programmatically fetching and extracting data from websites (like Google search results)

**Crawling** = Automatically following links and indexing web pages

In our case, we're **scraping Google search results** directly without using any API.

## How It Works

1. **Make HTTP Request** → Send request to Google search URL
2. **Get HTML Response** → Receive the HTML page
3. **Parse HTML** → Extract search results using cheerio
4. **Format Data** → Convert to structured format

## Current Implementation

The code now supports **direct scraping** of Google search results:

```javascript
// Directly requests Google search page
const url = `https://www.google.com/search?q=${keyword}`;

// Parses HTML to extract:
// - Title
// - URL
// - Snippet
// - Position
```

## Setup

### 1. Install Required Package

```bash
npm install cheerio
```

### 2. Enable Direct Scraping

Set environment variables:

```env
USE_DIRECT_SCRAPING=true
USE_REAL_SEARCH=true
SEARCH_API_TYPE=direct
```

### 3. Run

```bash
npm run seo:analyze
```

## How It Works (Technical)

### Step 1: HTTP Request
```javascript
// Makes HTTPS request to Google
const options = {
  hostname: 'www.google.com',
  path: `/search?q=${keyword}`,
  headers: {
    'User-Agent': 'Mozilla/5.0...' // Pretend to be a browser
  }
};
```

### Step 2: Parse HTML
```javascript
// Uses cheerio to parse HTML (like jQuery for Node.js)
const $ = cheerio.load(html);

// Extracts search results
$('div.g').each((index, element) => {
  const title = $(element).find('h3').text();
  const link = $(element).find('a').attr('href');
  const snippet = $(element).find('span').text();
});
```

### Step 3: Format Results
```javascript
// Converts to structured format
{
  position: 1,
  title: "Mohammad Aminul Haque - LinkedIn",
  url: "https://www.linkedin.com/...",
  snippet: "View profile...",
  type: "profile"
}
```

## ⚠️ Challenges & Limitations

### 1. Google Blocks Scrapers
- Google detects automated requests
- May show CAPTCHA
- May block your IP

### 2. HTML Structure Changes
- Google changes HTML frequently
- Selectors may break
- Need to update code regularly

### 3. Rate Limiting
- Too many requests = blocked
- Need delays between requests
- May need proxies

### 4. Legal Issues
- Violates Google Terms of Service
- May have legal consequences
- Use at your own risk

## Improvements You Can Make

### 1. Add Delays
```javascript
// Wait between requests
await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds
```

### 2. Rotate User Agents
```javascript
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...',
  // More user agents
];
```

### 3. Use Proxies
```javascript
// Route requests through proxies
const proxy = 'http://proxy-server:port';
```

### 4. Handle CAPTCHAs
- Use services like 2Captcha
- Or switch to API when blocked

## Better Alternatives

### Option 1: Google Custom Search API (Recommended)
- ✅ Official Google API
- ✅ 100 free searches/day
- ✅ Reliable and legal
- ✅ No blocking issues

### Option 2: SerpAPI
- ✅ Easy to use
- ✅ 100 free searches/month
- ✅ Handles all complexity

### Option 3: ScraperAPI
- ✅ 1,000 free searches/month
- ✅ Handles proxies automatically

## When to Use Direct Scraping

✅ **Use when:**
- Personal/educational use
- Testing/development
- Low frequency (few searches)
- You accept the risks

❌ **Don't use when:**
- Production systems
- High frequency
- Need reliability
- Legal compliance required

## Code Example

```javascript
// Direct scraping function
async function searchGoogleDirect(keyword) {
  const url = `https://www.google.com/search?q=${encodeURIComponent(keyword)}`;
  
  // Make request
  const response = await https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0...'
    }
  });
  
  // Parse HTML
  const $ = cheerio.load(html);
  
  // Extract results
  const results = [];
  $('div.g').each((index, element) => {
    results.push({
      position: index + 1,
      title: $(element).find('h3').text(),
      url: $(element).find('a').attr('href'),
      snippet: $(element).find('span').text()
    });
  });
  
  return results;
}
```

## Current Status

✅ **Implemented**: Direct scraping is now available  
✅ **Uses**: cheerio for HTML parsing  
✅ **Works**: For low-frequency use  
⚠️ **Warning**: May break or get blocked  

## Recommendation

**For production**: Use Google Custom Search API (100 free/day)  
**For testing**: Direct scraping is fine  
**For reliability**: Use paid APIs (SerpAPI, etc.)  

---

**The code is ready to use direct scraping - just install cheerio and enable it!** 🚀

