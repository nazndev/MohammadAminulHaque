#!/usr/bin/env node

/**
 * Master Automation Script - Runs All SEO Automation in Parallel
 * 
 * This script orchestrates all automated SEO tasks:
 * - Content optimization
 * - Sitemap submission
 * - Health checks
 * - Ranking monitoring
 * - Report generation
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const fs = require('fs');
const path = require('path');

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
 * Run a script and return result
 */
async function runScript(scriptName, description) {
  try {
    log(`\n🔄 ${description}...`, 'cyan');
    const { stdout, stderr } = await execAsync(`node scripts/${scriptName}`);
    
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.error(stderr);
    }
    
    return { success: true, script: scriptName };
  } catch (error) {
    log(`   ⚠️  ${description} failed: ${error.message}`, 'yellow');
    return { success: false, script: scriptName, error: error.message };
  }
}

/**
 * Main automation orchestrator
 */
async function runAllAutomation() {
  log('\n' + '='.repeat(70), 'magenta');
  log('🤖 MASTER SEO AUTOMATION - Free Parallel Services', 'green');
  log('='.repeat(70), 'magenta');
  
  const startTime = Date.now();
  
  // Define all automation tasks
  const tasks = [
    {
      script: 'ai-content-optimizer.js',
      description: 'AI Content Optimization',
      priority: 'high',
    },
    {
      script: 'automated-seo.js',
      description: 'Search Engine Submission',
      priority: 'high',
    },
    {
      script: 'ranking-monitor.js',
      description: 'Ranking Monitoring',
      priority: 'medium',
    },
  ];
  
  log('\n📋 Running Tasks in Parallel:', 'cyan');
  tasks.forEach((task, index) => {
    log(`   ${index + 1}. ${task.description} (${task.priority} priority)`, 'blue');
  });
  
  // Run all tasks in parallel
  log('\n🚀 Starting parallel execution...', 'green');
  
  const results = await Promise.allSettled(
    tasks.map(task => runScript(task.script, task.description))
  );
  
  // Process results
  const successful = [];
  const failed = [];
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value.success) {
      successful.push(tasks[index]);
    } else {
      failed.push(tasks[index]);
    }
  });
  
  // Display summary
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  log('\n' + '='.repeat(70), 'magenta');
  log('📊 AUTOMATION SUMMARY', 'green');
  log('='.repeat(70), 'magenta');
  
  log(`\n✅ Successful: ${successful.length}/${tasks.length}`, 'green');
  successful.forEach(task => {
    log(`   ✓ ${task.description}`, 'green');
  });
  
  if (failed.length > 0) {
    log(`\n❌ Failed: ${failed.length}/${tasks.length}`, 'red');
    failed.forEach(task => {
      log(`   ✗ ${task.description}`, 'red');
    });
  }
  
  log(`\n⏱️  Total Time: ${duration}s`, 'cyan');
  
  // Generate final report
  const report = {
    timestamp: new Date().toISOString(),
    duration: `${duration}s`,
    tasks: {
      total: tasks.length,
      successful: successful.length,
      failed: failed.length,
    },
    results: {
      successful: successful.map(t => t.description),
      failed: failed.map(t => t.description),
    },
  };
  
  const reportPath = path.join(__dirname, '../automation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  log(`\n📄 Full report saved to: ${reportPath}`, 'green');
  
  // Display next steps
  log('\n' + '='.repeat(70), 'magenta');
  log('🎯 NEXT STEPS (All FREE):', 'green');
  log('='.repeat(70), 'magenta');
  
  const nextSteps = [
    {
      step: '1. Review optimized content',
      file: 'data/optimized-content.json',
      action: 'Check SEO scores and recommendations',
    },
    {
      step: '2. Complete manual submissions',
      file: 'seo-report.json',
      action: 'Submit sitemaps to Google, Bing, etc.',
    },
    {
      step: '3. Monitor rankings',
      file: 'ranking-results.json',
      action: 'Check current rankings',
    },
    {
      step: '4. Set up scheduled runs',
      action: 'Run "npm run seo:all" weekly',
    },
  ];
  
  nextSteps.forEach(step => {
    log(`\n${step.step}`, 'cyan');
    if (step.file) {
      log(`   File: ${step.file}`, 'blue');
    }
    log(`   Action: ${step.action}`, 'blue');
  });
  
  log('\n' + '='.repeat(70), 'magenta');
  log('✅ Automation Complete!', 'green');
  log('='.repeat(70), 'magenta');
  
  return report;
}

// Run if executed directly
if (require.main === module) {
  runAllAutomation()
    .then(() => {
      process.exit(0);
    })
    .catch(error => {
      log(`\n❌ Fatal Error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = { runAllAutomation };

