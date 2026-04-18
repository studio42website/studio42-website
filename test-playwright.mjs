#!/usr/bin/env node
/**
 * Automated Site Tester with Playwright
 * Tests localhost:5173 with screenshots and validation
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, 'test-screenshots');
const LOGS_DIR = path.join(__dirname, 'test-logs');

// Create directories
[SCREENSHOTS_DIR, LOGS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const logFile = path.join(LOGS_DIR, 'test.log');

function log(msg, level = 'info') {
  const icons = { info: 'ℹ️', success: '✅', error: '❌', warn: '⚠️' };
  const icon = icons[level] || '';
  const timestamp = new Date().toISOString();
  const fullMsg = `[${timestamp}] ${icon} ${msg}`;
  
  console.log(fullMsg);
  fs.appendFileSync(logFile, fullMsg + '\n');
}

async function testSite() {
  let browser;
  try {
    log('🚀 Starting Playwright site tests...', 'info');

    // Launch browser
    browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });

    // Navigate
    log('📡 Connecting to localhost:5173...', 'info');
    await page.goto('http://localhost:5173/', { 
      waitUntil: 'networkidle',
      timeout: 15000 
    });
    log('✅ Connected successfully', 'success');

    // Collect errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
        log(`Console error: ${msg.text()}`, 'warn');
      }
    });

    page.on('pageerror', err => {
      errors.push(err.toString());
      log(`Page error: ${err.message}`, 'error');
    });

    // Wait a moment for full render
    await page.waitForTimeout(1000);

    // Page Analysis
    log('\n📋 PAGE ANALYSIS:', 'info');

    const title = await page.title();
    log(`Title: "${title}"`, 'info');

    const hasBanner = await page.evaluate(() => {
      return document.body.textContent.includes('Official Launch');
    });
    log(`Launch Banner: ${hasBanner ? '✅ Present' : '❌ Missing'}`, hasBanner ? 'success' : 'warn');

    const hasHeader = await page.evaluate(() => {
      return !!document.querySelector('header');
    });
    log(`Header: ${hasHeader ? '✅ Present' : '❌ Missing'}`, hasHeader ? 'success' : 'warn');

    const hasNav = await page.evaluate(() => {
      return !!document.querySelector('nav');
    });
    log(`Navigation: ${hasNav ? '✅ Present' : '❌ Missing'}`, hasNav ? 'success' : 'warn');

    const hasFooter = await page.evaluate(() => {
      return !!document.querySelector('footer');
    });
    log(`Footer: ${hasFooter ? '✅ Present' : '❌ Missing'}`, hasFooter ? 'success' : 'warn');

    const links = await page.evaluate(() => {
      return document.querySelectorAll('a[href]').length;
    });
    log(`Navigation Links: ${links} found`, 'info');

    const images = await page.evaluate(() => {
      return document.querySelectorAll('img').length;
    });
    log(`Images: ${images} found`, 'info');

    // Take screenshot
    const timestamp = new Date().toISOString()
      .replace(/[:.]/g, '-')
      .slice(0, -5);
    const screenshotPath = path.join(SCREENSHOTS_DIR, `screenshot-${timestamp}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    log(`📸 Screenshot: test-screenshots/screenshot-${timestamp}.png`, 'success');

    // Summary
    log('\n📊 TEST SUMMARY:', 'info');
    log(`Status: ${errors.length === 0 ? '✅ PASS' : '⚠️  WARNINGS'}`, errors.length === 0 ? 'success' : 'warn');
    log(`URL: http://localhost:5173/`, 'info');
    log(`Time: ${new Date().toISOString()}`, 'info');

    if (errors.length > 0) {
      log(`\n⚠️  Errors found (${errors.length}):`, 'warn');
      errors.slice(0, 3).forEach((err, i) => {
        log(`  ${i + 1}. ${err.substring(0, 100)}`, 'warn');
      });
    }

    log('\n✨ Test complete!\n', 'success');

    await browser.close();
    process.exit(0);

  } catch (error) {
    log(`\n❌ TEST FAILED: ${error.message}`, 'error');
    if (browser) await browser.close();
    process.exit(1);
  }
}

testSite();
