#!/usr/bin/env node

/**
 * Ranking Analyzer & Recommendation Engine
 * 
 * Periodically checks Google rankings for "Mohammad Aminul Haque"
 * Analyzes what's ranking and recommends what to add to your website
 * to maintain top rankings
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Try to use axios if available (for APIs), otherwise use https
let axios;
try {
  axios = require('axios');
} catch (e) {
  axios = null;
}

// Try to use cheerio for HTML parsing (for direct scraping)
let cheerio;
try {
  cheerio = require('cheerio');
} catch (e) {
  cheerio = null;
}

// Try to use puppeteer for browser automation (better for bypassing detection)
let puppeteer;
try {
  puppeteer = require('puppeteer');
} catch (e) {
  puppeteer = null;
}

const CONFIG = {
  targetKeyword: 'Mohammad Aminul Haque',
  targetDomain: 'mohammadaminulhaque.net',
  outputPath: path.join(__dirname, '../ranking-analysis.json'),
  recommendationsPath: path.join(__dirname, '../seo-recommendations.json'),
  checkInterval: 24 * 60 * 60 * 1000, // 24 hours
  // API Configuration - Set your API key in environment variable
  serpApiKey: process.env.SERP_API_KEY || null,
  googleApiKey: process.env.GOOGLE_API_KEY || 'AIzaSyCC92IKMrPIgOWaXisRT2B1Oq-9ovdmsc8',
  googleCseId: process.env.GOOGLE_CSE_ID || '318fa69012c294360',
  scraperApiKey: process.env.SCRAPER_API_KEY || null,
  searchApiType: process.env.SEARCH_API_TYPE || 'google', // serpapi, google, scraperapi, direct
  useRealSearch: process.env.USE_REAL_SEARCH !== 'false', // Default to true (use real search)
  useDirectScraping: process.env.USE_DIRECT_SCRAPING === 'true', // Default to false (use API first)
};

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Real Google search using SerpAPI
 */
async function searchGoogleSerpAPI(keyword) {
  if (!axios) {
    throw new Error('axios not installed. Run: npm install axios');
  }
  
  if (!CONFIG.serpApiKey) {
    throw new Error('SERP_API_KEY not set. Set it in .env or environment variable');
  }
  
  try {
    const params = new URLSearchParams({
      q: keyword,
      api_key: CONFIG.serpApiKey,
      location: 'United States',
      num: 20, // Get top 20 results
      engine: 'google',
    });

    const response = await axios.get(`https://serpapi.com/search.json?${params}`);
    const organicResults = response.data.organic_results || [];
    
    return formatResults(organicResults, keyword, response.data.search_information?.total_results || 0);
  } catch (error) {
    log(`⚠️  Error with SerpAPI: ${error.message}`, 'yellow');
    throw error;
  }
}

/**
 * Real Google search using Google Custom Search API
 */
async function searchGoogleCustomSearch(keyword) {
  if (!axios) {
    throw new Error('axios not installed. Run: npm install axios');
  }
  
  if (!CONFIG.googleApiKey || !CONFIG.googleCseId) {
    throw new Error('GOOGLE_API_KEY and GOOGLE_CSE_ID must be set. See SEARCH_API_ALTERNATIVES.md');
  }
  
  try {
    const params = new URLSearchParams({
      q: keyword,
      key: CONFIG.googleApiKey,
      cx: CONFIG.googleCseId,
      num: 10, // Google Custom Search allows max 10 per request
    });

    log(`   Making API request to Google Custom Search...`, 'blue');
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1?${params}`);
    
    if (!response.data || !response.data.items) {
      log(`   ⚠️  No results returned from API`, 'yellow');
      log(`   Response: ${JSON.stringify(response.data).substring(0, 200)}`, 'yellow');
      throw new Error('No results returned from Google Custom Search API');
    }
    
    const items = response.data.items || [];
    log(`   ✅ Received ${items.length} results from Google API`, 'green');
    
    // Convert Google Custom Search format to our format
    const organicResults = items.map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet || item.htmlSnippet || '',
    }));
    
    return formatResults(organicResults, keyword, parseInt(response.data.searchInformation?.totalResults || 0));
  } catch (error) {
    if (error.response) {
      log(`⚠️  Error with Google Custom Search API:`, 'yellow');
      log(`   Status: ${error.response.status}`, 'yellow');
      log(`   Error: ${JSON.stringify(error.response.data)}`, 'yellow');
      
      if (error.response.status === 400) {
        log(`   💡 This usually means:`, 'blue');
        log(`      - API key is invalid`, 'blue');
        log(`      - CSE ID is incorrect`, 'blue');
        log(`      - API not enabled in Google Cloud Console`, 'blue');
        log(`      - Check: https://console.cloud.google.com/apis/library/customsearch.googleapis.com`, 'blue');
      } else if (error.response.status === 403) {
        log(`   💡 This usually means:`, 'blue');
        log(`      - API quota exceeded (100 free/day)`, 'blue');
        log(`      - API not enabled`, 'blue');
        log(`      - Billing not set up (if needed)`, 'blue');
      }
    } else {
      log(`⚠️  Error with Google Custom Search: ${error.message}`, 'yellow');
    }
    throw error;
  }
}

/**
 * Real Google search using ScraperAPI
 */
async function searchGoogleScraperAPI(keyword) {
  if (!axios) {
    throw new Error('axios not installed. Run: npm install axios');
  }
  
  if (!CONFIG.scraperApiKey) {
    throw new Error('SCRAPER_API_KEY not set. Set it in .env or environment variable');
  }
  
  try {
    // ScraperAPI can scrape Google directly
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}&num=20`;
    const scraperUrl = `http://api.scraperapi.com?api_key=${CONFIG.scraperApiKey}&url=${encodeURIComponent(googleUrl)}`;
    
    // Note: ScraperAPI returns HTML, you'd need to parse it
    // For now, this is a placeholder - you'd need HTML parsing (cheerio, jsdom, etc.)
    log(`⚠️  ScraperAPI requires HTML parsing. Consider using SerpAPI or Google Custom Search instead.`, 'yellow');
    throw new Error('ScraperAPI HTML parsing not implemented. Use SerpAPI or Google Custom Search.');
  } catch (error) {
    log(`⚠️  Error with ScraperAPI: ${error.message}`, 'yellow');
    throw error;
  }
}

/**
 * Format search results to common structure
 */
function formatResults(organicResults, keyword, totalResults) {
  const results = organicResults.map((result, index) => {
    // Determine type based on URL
    let type = 'website';
    const url = result.link || result.url || '';
    if (url.includes('linkedin.com')) type = 'profile';
    else if (url.includes('facebook.com')) type = 'profile';
    else if (url.includes('twitter.com') || url.includes('x.com')) type = 'profile';
    else if (url.includes('news') || url.includes('thedailystar') || url.includes('dhakatribune')) type = 'news';
    else if (url.includes('youtube.com')) type = 'video';
    
    return {
      position: index + 1,
      title: result.title || '',
      url: url,
      snippet: result.snippet || result.description || '',
      type: type,
      isYourSite: url.includes(CONFIG.targetDomain),
    };
  });
  
  return {
    keyword,
    timestamp: new Date().toISOString(),
    results: results,
    totalResults: totalResults,
  };
}

/**
 * Direct Google scraping using Puppeteer (browser automation - better success rate)
 * ⚠️ WARNING: This violates Google's Terms of Service
 * ⚠️ Google may block your IP
 * ⚠️ Use at your own risk - for educational purposes only
 */
async function searchGoogleDirectPuppeteer(keyword) {
  if (!puppeteer) {
    throw new Error('puppeteer not installed. Run: npm install puppeteer');
  }
  
  log('   Using Puppeteer (browser automation)...', 'green');
  
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
      ],
    });
    
    const page = await browser.newPage();
    
    // Set realistic viewport and user agent
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Navigate to Google search
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}&num=20`;
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait a bit to avoid detection
    await page.waitForTimeout(2000);
    
    // Check if we got CAPTCHA
    const pageContent = await page.content();
    if (pageContent.includes('sorry/index') || pageContent.includes('captcha') || pageContent.includes('unusual traffic')) {
      throw new Error('Google showed CAPTCHA. Try using an API instead.');
    }
    
    // Extract results using JavaScript in the page context
    const results = await page.evaluate(() => {
      const searchResults = [];
      const resultElements = document.querySelectorAll('div.g, div[data-ved]');
      
      resultElements.forEach((element, index) => {
        if (index >= 20) return;
        
        const titleEl = element.querySelector('h3');
        const linkEl = element.querySelector('a');
        const snippetEl = element.querySelector('.VwiC3b, span');
        
        if (titleEl && linkEl) {
          let link = linkEl.getAttribute('href') || '';
          
          // Clean up Google redirect URLs
          if (link.startsWith('/url?q=')) {
            const match = link.match(/\/url\?q=([^&]+)/);
            if (match) link = decodeURIComponent(match[1]);
          }
          
          if (link.startsWith('http')) {
            searchResults.push({
              position: index + 1,
              title: titleEl.textContent.trim(),
              url: link,
              snippet: snippetEl ? snippetEl.textContent.trim() : '',
            });
          }
        }
      });
      
      return searchResults;
    });
    
    await browser.close();
    
    if (results.length === 0) {
      throw new Error('No results found. Google may have blocked the request.');
    }
    
    // Format results
    const formattedResults = results.map((result, index) => {
      let type = 'website';
      if (result.url.includes('linkedin.com')) type = 'profile';
      else if (result.url.includes('facebook.com')) type = 'profile';
      else if (result.url.includes('twitter.com') || result.url.includes('x.com')) type = 'profile';
      else if (result.url.includes('news') || result.url.includes('thedailystar') || result.url.includes('dhakatribune')) type = 'news';
      else if (result.url.includes('youtube.com')) type = 'video';
      
      return {
        position: index + 1,
        title: result.title,
        url: result.url,
        snippet: result.snippet,
        type: type,
        isYourSite: result.url.includes(CONFIG.targetDomain),
      };
    });
    
    log(`   ✅ Successfully scraped ${formattedResults.length} results using Puppeteer!`, 'green');
    return formatResults(formattedResults, keyword, 0);
    
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

/**
 * Direct Google scraping using HTTP + cheerio (fallback method)
 * ⚠️ WARNING: This violates Google's Terms of Service
 * ⚠️ Google may block your IP
 * ⚠️ Use at your own risk - for educational purposes only
 */
async function searchGoogleDirect(keyword) {
  // Try Puppeteer first (better success rate)
  if (puppeteer) {
    try {
      return await searchGoogleDirectPuppeteer(keyword);
    } catch (error) {
      log(`   Puppeteer failed: ${error.message}`, 'yellow');
      log('   Trying HTTP method...', 'yellow');
      // Fall through to HTTP method
    }
  }
  
  if (!cheerio) {
    throw new Error('cheerio or puppeteer not installed. Run: npm install cheerio puppeteer');
  }
  
  log('   ⚠️  WARNING: Direct scraping violates Google ToS!', 'red');
  log('   ⚠️  Use only for personal/educational purposes', 'red');
  
  return new Promise((resolve, reject) => {
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `https://www.google.com/search?q=${encodedKeyword}&num=20`;
    
    // Use more realistic browser headers to avoid detection
    const userAgents = [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ];
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
    
    const options = {
      hostname: 'www.google.com',
      path: `/search?q=${encodedKeyword}&num=20&hl=en&gl=us`,
      method: 'GET',
      headers: {
        'User-Agent': randomUserAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
        'Referer': 'https://www.google.com/',
      },
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          // Parse HTML with cheerio
          const $ = cheerio.load(data);
          const results = [];
          
          // Google search results - try multiple selectors (Google changes HTML frequently)
          // Try different selectors that Google uses
          let foundResults = false;
          
          // Method 1: Try div.g (classic Google results)
          $('div.g').each((index, element) => {
            if (index >= 20) return false;
            
            const $el = $(element);
            const title = $el.find('h3').first().text() || $el.find('a h3').first().text();
            let link = $el.find('a').first().attr('href') || '';
            const snippet = $el.find('.VwiC3b').first().text() || $el.find('span').first().text() || '';
            
            // Clean up Google redirect URLs
            if (link.startsWith('/url?q=')) {
              const match = link.match(/\/url\?q=([^&]+)/);
              if (match) link = decodeURIComponent(match[1]);
            }
            
            if (title && link && link.startsWith('http')) {
              foundResults = true;
              let type = 'website';
              if (link.includes('linkedin.com')) type = 'profile';
              else if (link.includes('facebook.com')) type = 'profile';
              else if (link.includes('twitter.com') || link.includes('x.com')) type = 'profile';
              else if (link.includes('news') || link.includes('thedailystar') || link.includes('dhakatribune')) type = 'news';
              else if (link.includes('youtube.com')) type = 'video';
              
              results.push({
                position: results.length + 1,
                title: title.trim(),
                url: link,
                snippet: snippet.trim(),
                type: type,
                isYourSite: link.includes(CONFIG.targetDomain),
              });
            }
          });
          
          // Method 2: Try div[data-ved] (newer Google structure)
          if (!foundResults || results.length === 0) {
            $('div[data-ved]').each((index, element) => {
              if (index >= 20) return false;
              
              const $el = $(element);
              const title = $el.find('h3').first().text();
              let link = $el.find('a').first().attr('href') || '';
              const snippet = $el.find('.VwiC3b').first().text() || $el.find('span').first().text() || '';
              
              // Clean up Google redirect URLs
              if (link.startsWith('/url?q=')) {
                const match = link.match(/\/url\?q=([^&]+)/);
                if (match) link = decodeURIComponent(match[1]);
              }
              
              if (title && link && link.startsWith('http') && !results.find(r => r.url === link)) {
                foundResults = true;
                let type = 'website';
                if (link.includes('linkedin.com')) type = 'profile';
                else if (link.includes('facebook.com')) type = 'profile';
                else if (link.includes('twitter.com') || link.includes('x.com')) type = 'profile';
                else if (link.includes('news') || link.includes('thedailystar') || link.includes('dhakatribune')) type = 'news';
                else if (link.includes('youtube.com')) type = 'video';
                
                results.push({
                  position: results.length + 1,
                  title: title.trim(),
                  url: link,
                  snippet: snippet.trim(),
                  type: type,
                  isYourSite: link.includes(CONFIG.targetDomain),
                });
              }
            });
          }
          
          // Method 3: Try any div with h3 and link (fallback)
          if (!foundResults || results.length === 0) {
            $('div').has('h3').has('a').each((index, element) => {
              if (index >= 20 || results.length >= 20) return false;
              
              const $el = $(element);
              const title = $el.find('h3').first().text();
              let link = $el.find('a').first().attr('href') || '';
              const snippet = $el.find('span').first().text() || '';
              
              // Clean up Google redirect URLs
              if (link.startsWith('/url?q=')) {
                const match = link.match(/\/url\?q=([^&]+)/);
                if (match) link = decodeURIComponent(match[1]);
              }
              
              if (title && link && link.startsWith('http') && !results.find(r => r.url === link)) {
                let type = 'website';
                if (link.includes('linkedin.com')) type = 'profile';
                else if (link.includes('facebook.com')) type = 'profile';
                else if (link.includes('twitter.com') || link.includes('x.com')) type = 'profile';
                else if (link.includes('news') || link.includes('thedailystar') || link.includes('dhakatribune')) type = 'news';
                else if (link.includes('youtube.com')) type = 'video';
                
                results.push({
                  position: results.length + 1,
                  title: title.trim(),
                  url: link,
                  snippet: snippet.trim(),
                  type: type,
                  isYourSite: link.includes(CONFIG.targetDomain),
                });
              }
            });
          }
          
          if (results.length === 0) {
            // Debug: Save HTML to file for inspection
            const debugPath = path.join(__dirname, '../google-response-debug.html');
            fs.writeFileSync(debugPath, data.substring(0, 10000)); // First 10k chars
            log('   ⚠️  Could not parse results. Google may have changed their HTML structure.', 'yellow');
            log('   ⚠️  Or you may have been blocked. Try using an API instead.', 'yellow');
            log(`   📄 Debug: Saved HTML snippet to ${debugPath}`, 'blue');
            reject(new Error('Failed to parse Google results. Google may have blocked the request or changed their HTML structure.'));
            return;
          }
          
          log(`   ✅ Successfully scraped ${results.length} results!`, 'green');
          
          resolve(formatResults(results, keyword, 0));
        } catch (error) {
          reject(new Error(`Failed to parse HTML: ${error.message}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

/**
 * Real Google search - routes to appropriate API or direct scraping
 */
async function searchGoogleReal(keyword) {
  const apiType = CONFIG.searchApiType.toLowerCase();
  
  // API-based searches (preferred - more reliable)
  if (!axios) {
    throw new Error('axios not installed. Run: npm install axios');
  }
  
  try {
    // Priority 1: Google Custom Search API (if configured)
    if ((apiType === 'google' || CONFIG.googleApiKey) && CONFIG.googleApiKey && CONFIG.googleCseId) {
      log('   Using Google Custom Search API...', 'green');
      return await searchGoogleCustomSearch(keyword);
    } 
    // Priority 2: SerpAPI (if configured)
    else if (CONFIG.serpApiKey) {
      log('   Using SerpAPI...', 'green');
      return await searchGoogleSerpAPI(keyword);
    } 
    // Priority 3: ScraperAPI (if configured)
    else if (apiType === 'scraperapi' && CONFIG.scraperApiKey) {
      log('   Using ScraperAPI...', 'green');
      return await searchGoogleScraperAPI(keyword);
    } 
    // Priority 4: Direct scraping (fallback - risky!)
    else if ((apiType === 'direct' || CONFIG.useDirectScraping) && (cheerio || puppeteer)) {
      log('   Using DIRECT Google scraping (NO API needed)...', 'yellow');
      log('   ⚠️  WARNING: This may violate Google ToS!', 'yellow');
      return await searchGoogleDirect(keyword);
    } 
    else {
      throw new Error('No API key configured. See SEARCH_API_ALTERNATIVES.md for setup instructions.');
    }
  } catch (error) {
    log(`⚠️  Error with real search: ${error.message}`, 'yellow');
    throw error;
  }
}

/**
 * Mock Google search (fallback)
 */
async function searchGoogleMock(keyword) {
  return {
    keyword,
    timestamp: new Date().toISOString(),
    results: [
      {
        position: 1,
        title: 'Mohammad Aminul Haque - LinkedIn',
        url: 'https://www.linkedin.com/in/mohammad-aminul-haque-32989215',
        snippet: 'View Mohammad Aminul Haque\'s professional profile on LinkedIn...',
        type: 'profile',
      },
      {
        position: 2,
        title: 'Mohammad Aminul Haque - Senior Banker & Fintech Expert',
        url: `https://www.${CONFIG.targetDomain}`,
        snippet: 'Mohammad Aminul Haque, Senior Banker, Fintech, Product, Pricing...',
        type: 'website',
        isYourSite: true,
      },
      {
        position: 3,
        title: 'Mohammad Aminul Haque - The Daily Star',
        url: 'https://www.thedailystar.net/...',
        snippet: 'Mohammad Aminul Haque featured in The Daily Star...',
        type: 'news',
      },
    ],
  };
}

/**
 * Search Google - tries real search first, falls back to mock
 */
async function searchGoogle(keyword) {
  // Check if we have any API configured OR if direct scraping is enabled
  const hasApiKey = CONFIG.serpApiKey || (CONFIG.googleApiKey && CONFIG.googleCseId) || CONFIG.scraperApiKey;
  const canUseDirect = CONFIG.useDirectScraping && cheerio;
  
  // Try real search first (default behavior)
  if (CONFIG.useRealSearch && (hasApiKey || canUseDirect)) {
    try {
      return await searchGoogleReal(keyword);
    } catch (error) {
      log('   Real search failed, using mock data', 'yellow');
      log(`   Error: ${error.message}`, 'yellow');
      log('   💡 Tip: Install cheerio for direct scraping: npm install cheerio', 'blue');
      return await searchGoogleMock(keyword);
    }
  } else if (CONFIG.useRealSearch && !hasApiKey && !canUseDirect) {
    // User wants real search but nothing is configured
    log('   ⚠️  Real search requested but not configured', 'yellow');
    log('   Attempting direct scraping (install cheerio if it fails)...', 'yellow');
    
    // Try direct scraping even without cheerio check (will fail gracefully)
    if (cheerio) {
      try {
        return await searchGoogleReal(keyword);
      } catch (error) {
        log('   Direct scraping failed, using mock data', 'yellow');
        log(`   Error: ${error.message}`, 'yellow');
        return await searchGoogleMock(keyword);
      }
    } else {
      log('   ❌ cheerio not installed. Installing...', 'yellow');
      log('   Run: npm install cheerio', 'blue');
      log('   Then run this script again', 'blue');
      log('   Using mock data for now...', 'yellow');
      return await searchGoogleMock(keyword);
    }
  } else {
    // Explicitly disabled or fallback
    log('   Using MOCK data (USE_REAL_SEARCH=false or not configured)', 'yellow');
    return await searchGoogleMock(keyword);
  }
}

/**
 * Analyze search results and extract insights
 */
function analyzeResults(searchResults) {
  const analysis = {
    yourRanking: null,
    competitors: [],
    contentGaps: [],
    opportunities: [],
    recommendations: [],
  };

  // Find your ranking
  searchResults.results.forEach((result, index) => {
    if (result.url.includes(CONFIG.targetDomain)) {
      analysis.yourRanking = index + 1;
      analysis.isYourSite = true;
    } else {
      analysis.competitors.push({
        position: index + 1,
        title: result.title,
        url: result.url,
        snippet: result.snippet,
        type: result.type,
      });
    }
  });

  // Analyze competitors
  analysis.competitors.forEach(competitor => {
    // Extract keywords from competitor titles
    const competitorKeywords = extractKeywords(competitor.title + ' ' + competitor.snippet);
    
    // Check if you have similar content
    const hasSimilarContent = checkIfYouHaveContent(competitorKeywords);
    
    if (!hasSimilarContent) {
      analysis.contentGaps.push({
        competitor: competitor.title,
        competitorUrl: competitor.url,
        missingKeywords: competitorKeywords,
        recommendation: `Add content about: ${competitorKeywords.join(', ')}`,
      });
    }

    // Analyze what makes them rank
    if (competitor.position < (analysis.yourRanking || 10)) {
      analysis.opportunities.push({
        competitor: competitor.title,
        position: competitor.position,
        reason: analyzeWhyTheyRank(competitor),
        action: generateAction(competitor),
      });
    }
  });

  return analysis;
}

/**
 * Extract keywords from text
 */
function extractKeywords(text) {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  const stopWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'let', 'put', 'say', 'she', 'too', 'use', 'with', 'that', 'this', 'from', 'have', 'been', 'more', 'than', 'their', 'what', 'when', 'where', 'which', 'while', 'will', 'your', 'about', 'after', 'before', 'during', 'under', 'over', 'above', 'below', 'between', 'among', 'through', 'across', 'around', 'near', 'far', 'here', 'there', 'where', 'everywhere', 'nowhere', 'somewhere', 'anywhere'];
  
  return words
    .filter(word => !stopWords.includes(word))
    .filter(word => !word.includes('mohammad') && !word.includes('aminul') && !word.includes('haque'))
    .slice(0, 10);
}

/**
 * Check if you have similar content (mock - in production, check your content)
 */
function checkIfYouHaveContent(keywords) {
  // In production, check your actual content
  // For now, return false to generate recommendations
  return false;
}

/**
 * Analyze why a competitor ranks
 */
function analyzeWhyTheyRank(competitor) {
  const reasons = [];
  
  if (competitor.type === 'profile') {
    reasons.push('High domain authority (LinkedIn)');
    reasons.push('Regular updates');
    reasons.push('Many backlinks');
  } else if (competitor.type === 'news') {
    reasons.push('Fresh content');
    reasons.push('News site authority');
    reasons.push('Recent publication');
  } else {
    reasons.push('Relevant content');
    reasons.push('Good SEO optimization');
  }
  
  return reasons;
}

/**
 * Generate action based on competitor analysis
 */
function generateAction(competitor) {
  if (competitor.type === 'profile') {
    return {
      priority: 'high',
      action: 'Update LinkedIn profile with website link prominently',
      content: 'Add website link to LinkedIn profile header and about section',
    };
  } else if (competitor.type === 'news') {
    return {
      priority: 'high',
      action: 'Create similar news article on your website',
      content: `Create article about: ${competitor.title}`,
    };
  } else {
    return {
      priority: 'medium',
      action: 'Optimize existing content or create new page',
      content: `Add content about: ${extractKeywords(competitor.title + ' ' + competitor.snippet).join(', ')}`,
    };
  }
}

/**
 * Generate recommendations
 */
function generateRecommendations(analysis) {
  const recommendations = {
    timestamp: new Date().toISOString(),
    yourRanking: analysis.yourRanking,
    priority: analysis.yourRanking <= 3 ? 'maintain' : 'improve',
    immediateActions: [],
    contentSuggestions: [],
    optimizationSuggestions: [],
    backlinkSuggestions: [],
  };

  // Immediate actions
  if (analysis.yourRanking > 1) {
    recommendations.immediateActions.push({
      action: 'Outrank LinkedIn profile',
      reason: `LinkedIn is ranking at position ${analysis.competitors.find(c => c.type === 'profile')?.position || 'unknown'}`,
      steps: [
        'Update LinkedIn profile with website link prominently',
        'Get more backlinks than LinkedIn',
        'Create more content pages',
        'Build domain authority',
      ],
    });
  }

  // Content suggestions
  analysis.contentGaps.forEach(gap => {
    recommendations.contentSuggestions.push({
      title: `Add content about: ${gap.missingKeywords.slice(0, 3).join(', ')}`,
      reason: `Competitor "${gap.competitor}" ranks because of this content`,
      priority: 'high',
      suggestedContent: {
        title: `Mohammad Aminul Haque - ${gap.missingKeywords[0]}`,
        keywords: gap.missingKeywords,
        relatedTo: gap.competitor,
      },
    });
  });

  // Optimization suggestions
  analysis.opportunities.forEach(opp => {
    recommendations.optimizationSuggestions.push({
      action: opp.action.action,
      reason: `To outrank "${opp.competitor}" at position ${opp.position}`,
      priority: opp.action.priority,
      steps: [opp.action.content],
    });
  });

  // Backlink suggestions
  if (analysis.yourRanking > 1) {
    recommendations.backlinkSuggestions.push({
      action: 'Build more backlinks',
      reason: 'Competitors have more backlinks',
      sources: [
        'LinkedIn profile (update with website link)',
        'Social media profiles',
        'Professional directories',
        'News sites that mention you',
        'Academic directories',
      ],
    });
  }

  return recommendations;
}

/**
 * Check news section rankings specifically
 */
async function checkNewsRankings(keyword) {
  log('\n📰 Checking NEWS SECTION rankings...', 'cyan');
  
  try {
    // Search with "news" filter to get news results
    const newsKeyword = `${keyword} news`;
    const searchResults = await searchGoogle(newsKeyword);
    
    // Filter only news results
    const newsResults = searchResults.results.filter(result => 
      result.type === 'news' || 
      result.url.includes('news') ||
      result.url.includes(CONFIG.targetDomain)
    );
    
    const newsAnalysis = {
      keyword: newsKeyword,
      timestamp: new Date().toISOString(),
      yourNewsRanking: null,
      yourNewsArticles: [],
      competitorNews: [],
      totalNewsResults: newsResults.length,
    };
    
    // Find your news articles in results
    newsResults.forEach((result, index) => {
      if (result.url.includes(CONFIG.targetDomain)) {
        newsAnalysis.yourNewsRanking = index + 1;
        newsAnalysis.yourNewsArticles.push({
          position: index + 1,
          title: result.title,
          url: result.url,
        });
      } else {
        newsAnalysis.competitorNews.push({
          position: index + 1,
          title: result.title,
          url: result.url,
          snippet: result.snippet,
        });
      }
    });
    
    return newsAnalysis;
  } catch (error) {
    log(`⚠️  Error checking news rankings: ${error.message}`, 'yellow');
    return null;
  }
}

/**
 * Main analysis function
 */
async function analyzeRankings() {
  log('\n🔍 Ranking Analyzer & Recommendation Engine', 'green');
  log('='.repeat(70), 'cyan');
  
  try {
    log(`\n📊 Analyzing rankings for: "${CONFIG.targetKeyword}"`, 'cyan');
    
    // Get search results (in production, use actual API)
    const searchResults = await searchGoogle(CONFIG.targetKeyword);
    
    log(`\n✅ Found ${searchResults.results.length} results`, 'green');
    
    // Check news section rankings specifically
    const newsAnalysis = await checkNewsRankings(CONFIG.targetKeyword);
    
    // Analyze results
    log('\n🔬 Analyzing competitors and opportunities...', 'cyan');
    const analysis = analyzeResults(searchResults);
    
    // Add news-specific analysis
    if (newsAnalysis) {
      analysis.newsSection = newsAnalysis;
      log(`\n📰 News Section Analysis:`, 'cyan');
      if (newsAnalysis.yourNewsRanking) {
        log(`   ✅ Your news ranking: #${newsAnalysis.yourNewsRanking}`, 'green');
        log(`   📄 Your news articles found: ${newsAnalysis.yourNewsArticles.length}`, 'green');
      } else {
        log(`   ⚠️  Your news articles not found in news section`, 'yellow');
        log(`   💡 Focus: Optimize news articles for Google News`, 'blue');
      }
      log(`   📊 Competitor news articles: ${newsAnalysis.competitorNews.length}`, 'blue');
    }
    
    // Generate recommendations
    log('\n💡 Generating recommendations...', 'cyan');
    const recommendations = generateRecommendations(analysis);
    
    // Add news-specific recommendations
    if (newsAnalysis && !newsAnalysis.yourNewsRanking) {
      recommendations.immediateActions.push({
        action: 'Optimize news articles for Google News',
        reason: 'Your news articles are not appearing in Google News section',
        steps: [
          'Submit to Google News Publisher Center',
          'Ensure all news articles have proper NewsArticle schema',
          'Create Google News sitemap',
          'Add news-specific meta tags (article:published_time, etc.)',
          'Ensure articles are published within last 2 days for news sitemap',
        ],
      });
    }
    
    // Save results
    fs.writeFileSync(CONFIG.outputPath, JSON.stringify(analysis, null, 2));
    fs.writeFileSync(CONFIG.recommendationsPath, JSON.stringify(recommendations, null, 2));
    
    // Display summary
    log('\n' + '='.repeat(70), 'cyan');
    log('📊 ANALYSIS SUMMARY', 'green');
    log('='.repeat(70), 'cyan');
    
    log(`\n🎯 Your Current Ranking: ${analysis.yourRanking || 'Not in top 10'}`, 
        analysis.yourRanking <= 3 ? 'green' : analysis.yourRanking <= 5 ? 'yellow' : 'red');
    
    if (newsAnalysis && newsAnalysis.yourNewsRanking) {
      log(`\n📰 Your News Section Ranking: #${newsAnalysis.yourNewsRanking}`, 'green');
    } else if (newsAnalysis) {
      log(`\n📰 Your News Section Ranking: Not found`, 'yellow');
    }
    
    log(`\n📈 Competitors Found: ${analysis.competitors.length}`, 'cyan');
    analysis.competitors.slice(0, 5).forEach(comp => {
      log(`   ${comp.position}. ${comp.title.substring(0, 60)}...`, 'blue');
    });
    
    log(`\n💡 Recommendations Generated: ${recommendations.immediateActions.length + recommendations.contentSuggestions.length}`, 'green');
    
    // Display top recommendations
    log('\n' + '='.repeat(70), 'cyan');
    log('🚀 TOP RECOMMENDATIONS', 'green');
    log('='.repeat(70), 'cyan');
    
    if (recommendations.immediateActions.length > 0) {
      log('\n⚡ IMMEDIATE ACTIONS:', 'yellow');
      recommendations.immediateActions.forEach((action, index) => {
        log(`\n${index + 1}. ${action.action}`, 'cyan');
        log(`   Reason: ${action.reason}`, 'blue');
        action.steps.forEach(step => {
          log(`   - ${step}`, 'blue');
        });
      });
    }
    
    if (recommendations.contentSuggestions.length > 0) {
      log('\n📝 CONTENT SUGGESTIONS:', 'yellow');
      recommendations.contentSuggestions.slice(0, 5).forEach((suggestion, index) => {
        log(`\n${index + 1}. ${suggestion.title}`, 'cyan');
        log(`   Reason: ${suggestion.reason}`, 'blue');
        log(`   Priority: ${suggestion.priority}`, suggestion.priority === 'high' ? 'red' : 'yellow');
      });
    }
    
    log('\n' + '='.repeat(70), 'cyan');
    log(`✅ Analysis complete!`, 'green');
    log(`📄 Full analysis: ${CONFIG.outputPath}`, 'cyan');
    log(`📄 Recommendations: ${CONFIG.recommendationsPath}`, 'cyan');
    log('='.repeat(70), 'cyan');
    
    return { analysis, recommendations };
    
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  analyzeRankings()
    .then(() => {
      log('\n✅ Done!', 'green');
      process.exit(0);
    })
    .catch(error => {
      log(`\n❌ Fatal error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = { analyzeRankings, generateRecommendations };

