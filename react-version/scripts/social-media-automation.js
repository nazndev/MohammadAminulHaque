#!/usr/bin/env node

/**
 * Social Media Automation Script
 * 
 * Generates social media posts and provides automation instructions
 * for free platforms (LinkedIn, Twitter, Facebook, etc.)
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://www.mohammadaminulhaque.net',
  newsDataPath: path.join(__dirname, '../data/news-data.json'),
  outputPath: path.join(__dirname, '../social-media-posts.json'),
};

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Generate LinkedIn post
 */
function generateLinkedInPost(article) {
  const hashtags = ['#Fintech', '#IslamicFinance', '#Banking', '#DigitalTransformation', '#MohammadAminulHaque'];
  
  return {
    platform: 'LinkedIn',
    post: `📰 ${article.title}

${article.excerpt}

Read more: ${CONFIG.baseUrl}${article.url}

${hashtags.join(' ')}`,
    hashtags,
    characterCount: 0, // Will be calculated
  };
}

/**
 * Generate Twitter/X post
 */
function generateTwitterPost(article) {
  const maxLength = 280;
  const url = `${CONFIG.baseUrl}${article.url}`;
  const urlLength = url.length + 1; // +1 for space
  const hashtags = '#Fintech #IslamicFinance';
  const hashtagLength = hashtags.length + 1;
  
  const availableLength = maxLength - urlLength - hashtagLength - 10; // Buffer
  
  let post = article.title;
  if (post.length > availableLength) {
    post = post.substring(0, availableLength - 3) + '...';
  }
  
  return {
    platform: 'Twitter/X',
    post: `${post} ${url} ${hashtags}`,
    characterCount: post.length + urlLength + hashtagLength,
    hashtags: hashtags.split(' '),
  };
}

/**
 * Generate Facebook post
 */
function generateFacebookPost(article) {
  return {
    platform: 'Facebook',
    post: `${article.title}

${article.excerpt}

Read the full article: ${CONFIG.baseUrl}${article.url}`,
    characterCount: 0,
  };
}

/**
 * Generate all social media posts
 */
function generateAllPosts() {
  log('\n📱 Social Media Post Generator', 'green');
  log('='.repeat(60), 'cyan');
  
  // Read news data
  const newsData = JSON.parse(fs.readFileSync(CONFIG.newsDataPath, 'utf8'));
  
  log(`\n📊 Generating posts for ${newsData.length} articles...`, 'cyan');
  
  const allPosts = [];
  
  newsData.forEach((article, index) => {
    log(`\n${index + 1}. ${article.title.substring(0, 50)}...`, 'blue');
    
    const posts = {
      articleId: article.id,
      articleTitle: article.title,
      articleUrl: article.url,
      linkedIn: generateLinkedInPost(article),
      twitter: generateTwitterPost(article),
      facebook: generateFacebookPost(article),
    };
    
    // Calculate character counts
    posts.linkedIn.characterCount = posts.linkedIn.post.length;
    posts.facebook.characterCount = posts.facebook.post.length;
    
    allPosts.push(posts);
    
    log(`   ✓ Generated posts for ${article.title.substring(0, 40)}...`, 'green');
  });
  
  // Save posts
  fs.writeFileSync(CONFIG.outputPath, JSON.stringify(allPosts, null, 2));
  
  log(`\n✅ Generated ${allPosts.length * 3} social media posts!`, 'green');
  log(`📄 Saved to: ${CONFIG.outputPath}`, 'cyan');
  
  // Display summary
  log('\n📊 Summary:', 'green');
  log(`   Total Articles: ${allPosts.length}`, 'cyan');
  log(`   LinkedIn Posts: ${allPosts.length}`, 'cyan');
  log(`   Twitter Posts: ${allPosts.length}`, 'cyan');
  log(`   Facebook Posts: ${allPosts.length}`, 'cyan');
  
  // Display automation instructions
  log('\n' + '='.repeat(60), 'cyan');
  log('🤖 AUTOMATION INSTRUCTIONS (FREE):', 'green');
  log('='.repeat(60), 'cyan');
  
  const instructions = [
    {
      platform: 'LinkedIn',
      steps: [
        '1. Use LinkedIn Post Scheduler (free)',
        '2. Or use Buffer (free tier: 3 accounts)',
        '3. Or use Hootsuite (free tier available)',
        '4. Copy posts from social-media-posts.json',
        '5. Schedule posts weekly',
      ],
    },
    {
      platform: 'Twitter/X',
      steps: [
        '1. Use TweetDeck (free)',
        '2. Or use Buffer (free tier)',
        '3. Or use Hootsuite (free tier)',
        '4. Copy posts from social-media-posts.json',
        '5. Schedule posts daily',
      ],
    },
    {
      platform: 'Facebook',
      steps: [
        '1. Use Facebook Creator Studio (free)',
        '2. Or use Buffer (free tier)',
        '3. Or use Hootsuite (free tier)',
        '4. Copy posts from social-media-posts.json',
        '5. Schedule posts weekly',
      ],
    },
  ];
  
  instructions.forEach(instruction => {
    log(`\n${instruction.platform}:`, 'cyan');
    instruction.steps.forEach(step => {
      log(`   ${step}`, 'blue');
    });
  });
  
  log('\n' + '='.repeat(60), 'cyan');
  log('💡 TIP: Post 2-3 times per week for best engagement!', 'yellow');
  log('='.repeat(60), 'cyan');
  
  return allPosts;
}

// Run if executed directly
if (require.main === module) {
  generateAllPosts();
}

module.exports = { generateAllPosts };

