#!/usr/bin/env node

/**
 * Auto-Optimizer - Continuous SEO Optimization
 * 
 * Runs periodically to:
 * 1. Check current rankings
 * 2. Analyze what's ranking
 * 3. Generate recommendations
 * 4. Suggest content to add
 * 5. Track improvements
 */

const { analyzeRankings } = require('./ranking-analyzer');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  checkInterval: 24 * 60 * 60 * 1000, // 24 hours
  historyPath: path.join(__dirname, '../ranking-history.json'),
  recommendationsPath: path.join(__dirname, '../seo-recommendations.json'),
};

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Load ranking history
 */
function loadHistory() {
  if (fs.existsSync(CONFIG.historyPath)) {
    return JSON.parse(fs.readFileSync(CONFIG.historyPath, 'utf8'));
  }
  return { checks: [] };
}

/**
 * Save ranking history
 */
function saveHistory(history, currentRanking) {
  history.checks.push({
    timestamp: new Date().toISOString(),
    ranking: currentRanking,
  });
  
  // Keep last 30 checks
  if (history.checks.length > 30) {
    history.checks = history.checks.slice(-30);
  }
  
  fs.writeFileSync(CONFIG.historyPath, JSON.stringify(history, null, 2));
}

/**
 * Track ranking changes
 */
function trackChanges(history) {
  if (history.checks.length < 2) {
    return { changed: false, trend: 'no_data' };
  }
  
  const recent = history.checks.slice(-5);
  const older = history.checks.slice(-10, -5);
  
  const recentAvg = recent.reduce((sum, c) => sum + (c.ranking || 10), 0) / recent.length;
  const olderAvg = older.length > 0 
    ? older.reduce((sum, c) => sum + (c.ranking || 10), 0) / older.length 
    : 10;
  
  const change = olderAvg - recentAvg; // Positive = improved
  
  return {
    changed: Math.abs(change) > 0.5,
    trend: change > 0 ? 'improving' : change < 0 ? 'declining' : 'stable',
    change: change.toFixed(1),
  };
}

/**
 * Generate actionable recommendations
 */
function generateActionableRecommendations(recommendations, history) {
  const actionable = {
    timestamp: new Date().toISOString(),
    priority: 'high',
    actions: [],
    contentToAdd: [],
    optimizations: [],
  };
  
  // Immediate actions
  recommendations.immediateActions.forEach(action => {
    actionable.actions.push({
      type: 'action',
      title: action.action,
      reason: action.reason,
      steps: action.steps,
      priority: 'high',
      estimatedTime: '30 minutes',
    });
  });
  
  // Content to add
  recommendations.contentSuggestions.forEach(suggestion => {
    actionable.contentToAdd.push({
      type: 'content',
      title: suggestion.suggestedContent.title,
      keywords: suggestion.suggestedContent.keywords,
      reason: suggestion.reason,
      priority: suggestion.priority,
      estimatedTime: '2-4 hours',
    });
  });
  
  // Optimizations
  recommendations.optimizationSuggestions.forEach(opt => {
    actionable.optimizations.push({
      type: 'optimization',
      action: opt.action,
      reason: opt.reason,
      priority: opt.priority,
      steps: opt.steps,
      estimatedTime: '1-2 hours',
    });
  });
  
  return actionable;
}

/**
 * Main auto-optimizer function
 */
async function runAutoOptimizer() {
  log('\n🤖 Auto-Optimizer - Continuous SEO Optimization', 'green');
  log('='.repeat(70), 'cyan');
  
  try {
    // Load history
    const history = loadHistory();
    
    // Analyze current rankings
    log('\n📊 Step 1: Analyzing current rankings...', 'cyan');
    const { analysis, recommendations } = await analyzeRankings();
    
    // Track changes
    log('\n📈 Step 2: Tracking ranking changes...', 'cyan');
    const changes = trackChanges(history);
    saveHistory(history, analysis.yourRanking);
    
    if (changes.changed) {
      log(`   Trend: ${changes.trend} (${changes.change > 0 ? '+' : ''}${changes.change} positions)`, 
          changes.trend === 'improving' ? 'green' : changes.trend === 'declining' ? 'red' : 'yellow');
    } else {
      log('   Trend: Stable', 'yellow');
    }
    
    // Generate actionable recommendations
    log('\n💡 Step 3: Generating actionable recommendations...', 'cyan');
    const actionable = generateActionableRecommendations(recommendations, history);
    
    // Save actionable recommendations
    const actionablePath = path.join(__dirname, '../actionable-recommendations.json');
    fs.writeFileSync(actionablePath, JSON.stringify(actionable, null, 2));
    
    // Display summary
    log('\n' + '='.repeat(70), 'cyan');
    log('🎯 ACTIONABLE RECOMMENDATIONS', 'green');
    log('='.repeat(70), 'cyan');
    
    if (actionable.actions.length > 0) {
      log('\n⚡ IMMEDIATE ACTIONS:', 'yellow');
      actionable.actions.forEach((action, index) => {
        log(`\n${index + 1}. ${action.title}`, 'cyan');
        log(`   Reason: ${action.reason}`, 'blue');
        log(`   Time: ${action.estimatedTime}`, 'blue');
        action.steps.forEach(step => {
          log(`   - ${step}`, 'blue');
        });
      });
    }
    
    if (actionable.contentToAdd.length > 0) {
      log('\n📝 CONTENT TO ADD:', 'yellow');
      actionable.contentToAdd.slice(0, 5).forEach((content, index) => {
        log(`\n${index + 1}. ${content.title}`, 'cyan');
        log(`   Keywords: ${content.keywords.slice(0, 5).join(', ')}`, 'blue');
        log(`   Reason: ${content.reason}`, 'blue');
        log(`   Time: ${content.estimatedTime}`, 'blue');
      });
    }
    
    if (actionable.optimizations.length > 0) {
      log('\n🔧 OPTIMIZATIONS:', 'yellow');
      actionable.optimizations.slice(0, 3).forEach((opt, index) => {
        log(`\n${index + 1}. ${opt.action}`, 'cyan');
        log(`   Reason: ${opt.reason}`, 'blue');
        log(`   Time: ${opt.estimatedTime}`, 'blue');
      });
    }
    
    log('\n' + '='.repeat(70), 'cyan');
    log('✅ Auto-optimization complete!', 'green');
    log(`📄 Recommendations saved to: ${actionablePath}`, 'cyan');
    log('='.repeat(70), 'cyan');
    
    // Schedule next run
    log(`\n⏰ Next check in 24 hours`, 'blue');
    log(`   Run manually: npm run seo:auto-optimize`, 'blue');
    
    return { analysis, recommendations, actionable, changes };
    
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  runAutoOptimizer()
    .then(() => {
      process.exit(0);
    })
    .catch(error => {
      log(`\n❌ Fatal error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = { runAutoOptimizer };

