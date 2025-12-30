const fs = require('fs');
const path = require('path');

// Read current news data
const newsDataPath = path.join(__dirname, '../data/news-data.json');
const newsData = JSON.parse(fs.readFileSync(newsDataPath, 'utf8'));

// Function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100); // Limit length
}

// Update each article
const updatedNews = newsData.map((article) => {
  const isExternal = article.url.startsWith('http://') || article.url.startsWith('https://');
  
  if (isExternal) {
    // Generate internal URL from title
    const slug = generateSlug(article.title);
    return {
      ...article,
      sourceUrl: article.url, // Store original external URL
      url: `/news/${slug}`, // Internal URL for your site
    };
  } else {
    // Already internal, keep as is
    return article;
  }
});

// Write updated data
fs.writeFileSync(newsDataPath, JSON.stringify(updatedNews, null, 2), 'utf8');

console.log(`✅ Updated ${updatedNews.length} news articles`);
console.log(`✅ Created internal URLs for all articles`);
console.log(`✅ Preserved ${updatedNews.filter(a => a.sourceUrl).length} external source URLs`);

