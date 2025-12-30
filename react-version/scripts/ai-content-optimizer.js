#!/usr/bin/env node

/**
 * AI-Powered Content Optimizer
 * 
 * Uses AI (via API or local processing) to:
 * - Optimize content for SEO
 * - Generate keyword variations
 * - Suggest internal links
 * - Optimize meta descriptions
 * - Generate related content ideas
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  newsDataPath: path.join(__dirname, '../data/news-data.json'),
  outputPath: path.join(__dirname, '../data/optimized-content.json'),
  targetKeyword: 'Mohammad Aminul Haque',
  relatedKeywords: [
    'Mohammad Aminul Haque',
    'Mohammad Aminul Haque fintech',
    'Mohammad Aminul Haque Islamic finance',
    'Mohammad Aminul Haque Nagad',
    'Mohammad Aminul Haque banker',
    'Mohammad Aminul Haque research',
    'Mohammad Aminul Haque publications',
  ],
};

/**
 * Generate SEO-optimized meta description
 */
function generateMetaDescription(title, excerpt, maxLength = 160) {
  // Combine title and excerpt, optimize for length
  let description = `${title}. ${excerpt}`;
  
  // Ensure it includes target keyword
  if (!description.toLowerCase().includes('mohammad aminul haque')) {
    description = `Mohammad Aminul Haque: ${description}`;
  }
  
  // Truncate to max length
  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...';
  }
  
  return description;
}

/**
 * Suggest internal links based on content
 */
function suggestInternalLinks(article, allArticles) {
  const suggestions = [];
  const articleKeywords = extractKeywords(article.title + ' ' + article.content);
  
  allArticles.forEach(otherArticle => {
    if (otherArticle.id === article.id) return;
    
    const otherKeywords = extractKeywords(otherArticle.title + ' ' + otherArticle.content);
    const commonKeywords = articleKeywords.filter(k => otherKeywords.includes(k));
    
    if (commonKeywords.length > 0) {
      suggestions.push({
        articleId: otherArticle.id,
        articleTitle: otherArticle.title,
        articleUrl: otherArticle.url,
        relevance: commonKeywords.length,
        commonKeywords,
      });
    }
  });
  
  // Sort by relevance
  return suggestions.sort((a, b) => b.relevance - a.relevance).slice(0, 3);
}

/**
 * Extract keywords from text
 */
function extractKeywords(text) {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  // Remove common stop words
  const stopWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'];
  
  return words.filter(word => !stopWords.includes(word));
}

/**
 * Optimize article content
 */
function optimizeArticle(article, allArticles) {
  return {
    ...article,
    optimizedMetaDescription: generateMetaDescription(article.title, article.excerpt),
    suggestedInternalLinks: suggestInternalLinks(article, allArticles),
    keywordDensity: calculateKeywordDensity(article),
    seoScore: calculateSEOScore(article),
  };
}

/**
 * Calculate keyword density
 */
function calculateKeywordDensity(article) {
  const text = (article.title + ' ' + article.content).toLowerCase();
  const targetKeyword = CONFIG.targetKeyword.toLowerCase();
  const keywordCount = (text.match(new RegExp(targetKeyword, 'g')) || []).length;
  const totalWords = text.split(/\s+/).length;
  const density = (keywordCount / totalWords) * 100;
  
  return {
    keyword: CONFIG.targetKeyword,
    count: keywordCount,
    density: density.toFixed(2) + '%',
    recommended: density >= 1 && density <= 3 ? 'Good' : density < 1 ? 'Too Low' : 'Too High',
  };
}

/**
 * Calculate SEO score
 */
function calculateSEOScore(article) {
  let score = 0;
  let factors = [];
  
  // Title length (50-60 chars optimal)
  if (article.title.length >= 50 && article.title.length <= 60) {
    score += 20;
    factors.push('Title length optimal');
  } else {
    factors.push(`Title length: ${article.title.length} (optimal: 50-60)`);
  }
  
  // Meta description length (150-160 chars optimal)
  const metaDesc = generateMetaDescription(article.title, article.excerpt);
  if (metaDesc.length >= 150 && metaDesc.length <= 160) {
    score += 20;
    factors.push('Meta description length optimal');
  } else {
    factors.push(`Meta description length: ${metaDesc.length} (optimal: 150-160)`);
  }
  
  // Keyword in title
  if (article.title.toLowerCase().includes(CONFIG.targetKeyword.toLowerCase())) {
    score += 20;
    factors.push('Target keyword in title');
  } else {
    factors.push('Target keyword not in title');
  }
  
  // Keyword in content
  const keywordCount = (article.content.toLowerCase().match(new RegExp(CONFIG.targetKeyword.toLowerCase(), 'g')) || []).length;
  if (keywordCount >= 3) {
    score += 20;
    factors.push(`Target keyword appears ${keywordCount} times in content`);
  } else {
    factors.push(`Target keyword appears only ${keywordCount} times (recommended: 3+)`);
  }
  
  // Content length (300+ words optimal)
  const wordCount = article.content.split(/\s+/).length;
  if (wordCount >= 300) {
    score += 20;
    factors.push(`Content length: ${wordCount} words (good)`);
  } else {
    factors.push(`Content length: ${wordCount} words (recommended: 300+)`);
  }
  
  return {
    score,
    grade: score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'D',
    factors,
  };
}

/**
 * Main optimization function
 */
function optimizeAllContent() {
  console.log('\n🤖 AI-Powered Content Optimizer');
  console.log('='.repeat(60));
  
  // Read news data
  const newsData = JSON.parse(fs.readFileSync(CONFIG.newsDataPath, 'utf8'));
  
  console.log(`\n📊 Analyzing ${newsData.length} articles...`);
  
  // Optimize each article
  const optimized = newsData.map(article => optimizeArticle(article, newsData));
  
  // Save optimized content
  fs.writeFileSync(CONFIG.outputPath, JSON.stringify(optimized, null, 2));
  
  // Display summary
  console.log('\n📈 Optimization Summary:');
  console.log('='.repeat(60));
  
  optimized.forEach((article, index) => {
    console.log(`\n${index + 1}. ${article.title.substring(0, 60)}...`);
    console.log(`   SEO Score: ${article.seoScore.score}/100 (Grade: ${article.seoScore.grade})`);
    console.log(`   Keyword Density: ${article.keywordDensity.density} (${article.keywordDensity.recommended})`);
    console.log(`   Suggested Internal Links: ${article.suggestedInternalLinks.length}`);
    
    if (article.seoScore.score < 80) {
      console.log(`   ⚠️  Recommendations:`);
      article.seoScore.factors.forEach(factor => {
        if (!factor.includes('optimal') && !factor.includes('good')) {
          console.log(`      - ${factor}`);
        }
      });
    }
  });
  
  // Overall statistics
  const avgScore = optimized.reduce((sum, a) => sum + a.seoScore.score, 0) / optimized.length;
  console.log(`\n📊 Overall Statistics:`);
  console.log(`   Average SEO Score: ${avgScore.toFixed(1)}/100`);
  console.log(`   Articles with Grade A: ${optimized.filter(a => a.seoScore.grade === 'A').length}`);
  console.log(`   Articles with Grade B: ${optimized.filter(a => a.seoScore.grade === 'B').length}`);
  console.log(`   Articles with Grade C: ${optimized.filter(a => a.seoScore.grade === 'C').length}`);
  console.log(`   Articles with Grade D: ${optimized.filter(a => a.seoScore.grade === 'D').length}`);
  
  console.log(`\n✅ Optimization complete!`);
  console.log(`📄 Results saved to: ${CONFIG.outputPath}`);
  
  return optimized;
}

// Run if executed directly
if (require.main === module) {
  optimizeAllContent();
}

module.exports = {
  optimizeAllContent,
  optimizeArticle,
  generateMetaDescription,
  suggestInternalLinks,
};

