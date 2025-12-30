/**
 * Ranking Monitor Script
 * 
 * This script monitors Google search rankings for target keywords
 * and tracks competitor positions.
 * 
 * Usage:
 *   node scripts/ranking-monitor.js
 * 
 * Requirements:
 *   - SerpAPI key (get from https://serpapi.com)
 *   - Set SERPAPI_KEY environment variable
 */

const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  targetDomain: 'mohammadaminulhaque.net',
  keywords: [
    'Mohammad Aminul Haque',
    'Mohammad Aminul Haque banker',
    'Mohammad Aminul Haque fintech',
    'Mohammad Aminul Haque Islamic finance',
    'Mohammad Aminul Haque researcher'
  ],
  competitors: [
    'linkedin.com/in/mohammad-aminul-haque',
    'thedailystar.net',
    'dhakatribune.com'
  ],
  dataFile: path.join(__dirname, '../data/ranking-history.json')
};

class RankingMonitor {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('SERPAPI_KEY environment variable is required');
    }
    this.apiKey = apiKey;
    this.baseUrl = 'https://serpapi.com/search.json';
  }

  async checkRanking(keyword, domain = CONFIG.targetDomain) {
    try {
      const params = new URLSearchParams({
        q: keyword,
        api_key: this.apiKey,
        location: 'United States',
        num: 100,
        engine: 'google'
      });

      const response = await axios.get(`${this.baseUrl}?${params}`);
      const results = response.data.organic_results || [];

      let position = -1;
      let foundUrl = null;

      results.forEach((result, index) => {
        if (result.link && result.link.includes(domain)) {
          position = index + 1;
          foundUrl = result.link;
        }
      });

      return {
        keyword,
        domain,
        position,
        url: foundUrl,
        totalResults: results.length,
        date: new Date().toISOString(),
        type: 'organic'
      };
    } catch (error) {
      console.error(`Error checking ranking for "${keyword}":`, error.message);
      return {
        keyword,
        domain,
        position: -1,
        error: error.message,
        date: new Date().toISOString(),
        type: 'organic'
      };
    }
  }

  async checkNewsRanking(keyword, domain = CONFIG.targetDomain) {
    try {
      const params = new URLSearchParams({
        q: keyword,
        api_key: this.apiKey,
        location: 'United States',
        tbm: 'nws',
        engine: 'google'
      });

      const response = await axios.get(`${this.baseUrl}?${params}`);
      const results = response.data.news_results || [];

      let position = -1;
      let foundUrl = null;

      results.forEach((result, index) => {
        if (result.link && result.link.includes(domain)) {
          position = index + 1;
          foundUrl = result.link;
        }
      });

      return {
        keyword,
        domain,
        position,
        url: foundUrl,
        totalResults: results.length,
        date: new Date().toISOString(),
        type: 'news'
      };
    } catch (error) {
      console.error(`Error checking news ranking for "${keyword}":`, error.message);
      return {
        keyword,
        domain,
        position: -1,
        error: error.message,
        date: new Date().toISOString(),
        type: 'news'
      };
    }
  }

  async analyzeCompetitors(keyword) {
    try {
      const params = new URLSearchParams({
        q: keyword,
        api_key: this.apiKey,
        location: 'United States',
        num: 20,
        engine: 'google'
      });

      const response = await axios.get(`${this.baseUrl}?${params}`);
      const results = response.data.organic_results || [];

      const competitorData = results.map((result, index) => ({
        position: index + 1,
        title: result.title,
        url: result.link,
        snippet: result.snippet,
        domain: this.extractDomain(result.link)
      }));

      return {
        keyword,
        date: new Date().toISOString(),
        competitors: competitorData
      };
    } catch (error) {
      console.error(`Error analyzing competitors for "${keyword}":`, error.message);
      return {
        keyword,
        date: new Date().toISOString(),
        error: error.message,
        competitors: []
      };
    }
  }

  extractDomain(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  }

  async loadHistory() {
    try {
      const data = await fs.readFile(CONFIG.dataFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return { rankings: [], newsRankings: [], competitors: [] };
    }
  }

  async saveHistory(data) {
    try {
      const dir = path.dirname(CONFIG.dataFile);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(CONFIG.dataFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error saving history:', error.message);
    }
  }

  async run() {
    console.log('🔍 Starting ranking monitor...\n');
    console.log(`Target Domain: ${CONFIG.targetDomain}`);
    console.log(`Keywords: ${CONFIG.keywords.join(', ')}\n`);

    const history = await this.loadHistory();
    const newRankings = [];
    const newNewsRankings = [];
    const competitorAnalysis = [];

    // Check organic rankings
    console.log('📊 Checking organic rankings...');
    for (const keyword of CONFIG.keywords) {
      const result = await this.checkRanking(keyword);
      newRankings.push(result);
      
      if (result.position > 0) {
        console.log(`  ✅ "${keyword}": Position ${result.position}`);
      } else {
        console.log(`  ❌ "${keyword}": Not found in top 100`);
      }
      
      // Wait between requests to avoid rate limiting
      await this.sleep(2000);
    }

    // Check news rankings
    console.log('\n📰 Checking news rankings...');
    for (const keyword of CONFIG.keywords.slice(0, 2)) { // Check first 2 keywords for news
      const result = await this.checkNewsRanking(keyword);
      newNewsRankings.push(result);
      
      if (result.position > 0) {
        console.log(`  ✅ "${keyword}": Position ${result.position} in news`);
      } else {
        console.log(`  ❌ "${keyword}": Not found in news`);
      }
      
      await this.sleep(2000);
    }

    // Analyze competitors
    console.log('\n🏆 Analyzing competitors...');
    const mainKeyword = CONFIG.keywords[0];
    const competitorData = await this.analyzeCompetitors(mainKeyword);
    competitorAnalysis.push(competitorData);
    
    console.log(`  Found ${competitorData.competitors.length} results for "${mainKeyword}"`);
    competitorData.competitors.slice(0, 5).forEach(comp => {
      console.log(`    ${comp.position}. ${comp.domain} - ${comp.title.substring(0, 50)}...`);
    });

    // Save history
    history.rankings.push(...newRankings);
    history.newsRankings.push(...newNewsRankings);
    history.competitors.push(...competitorAnalysis);
    
    // Keep only last 30 days of data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    history.rankings = history.rankings.filter(r => new Date(r.date) > thirtyDaysAgo);
    history.newsRankings = history.newsRankings.filter(r => new Date(r.date) > thirtyDaysAgo);
    history.competitors = history.competitors.filter(r => new Date(r.date) > thirtyDaysAgo);

    await this.saveHistory(history);

    // Generate summary
    console.log('\n📈 Summary:');
    const avgPosition = newRankings
      .filter(r => r.position > 0)
      .reduce((sum, r) => sum + r.position, 0) / newRankings.filter(r => r.position > 0).length;
    
    if (avgPosition > 0) {
      console.log(`  Average Position: ${avgPosition.toFixed(1)}`);
    }
    
    const bestPosition = Math.min(...newRankings.filter(r => r.position > 0).map(r => r.position));
    if (bestPosition < Infinity) {
      console.log(`  Best Position: ${bestPosition}`);
    }

    console.log('\n✅ Monitoring complete!');
    console.log(`📁 Data saved to: ${CONFIG.dataFile}`);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run if called directly
if (require.main === module) {
  const apiKey = process.env.SERPAPI_KEY;
  
  if (!apiKey) {
    console.error('❌ Error: SERPAPI_KEY environment variable is required');
    console.error('   Get your API key from: https://serpapi.com');
    process.exit(1);
  }

  const monitor = new RankingMonitor(apiKey);
  monitor.run().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

module.exports = RankingMonitor;

