#!/usr/bin/env node
/**
 * Automated Site Tester with Puppeteer
 * Tests localhost:5173 and reports visually
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = './test-screenshots';
const MAX_RETRIES = 5;
const RETRY_DELAY = 2000;

// Create screenshots directory if it doesn't exist
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR);
}

async function testSite() {
  let browser;
  try {
    console.log('🚀 Starting automated site tests...\n');

    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport for consistent screenshots
    await page.setViewport({ width: 1280, height: 800 });

    // Try to connect with retries
    let connected = false;
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        console.log(`📡 Attempt ${i + 1}/${MAX_RETRIES}: Connecting to localhost:5173...`);
        await page.goto('http://localhost:5173/', {
          waitUntil: 'networkidle0',
          timeout: 10000
        });
        connected = true;
        console.log('✅ Connected!\n');
        break;
      } catch (err) {
        if (i < MAX_RETRIES - 1) {
          console.log(`⏳ Retrying in ${RETRY_DELAY / 1000}s...\n`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        } else {
          throw err;
        }
      }
    }

    if (!connected) {
      throw new Error('Could not connect to localhost:5173');
    }

    // Check for errors
    console.log('🔍 Checking for errors...');
    const errors = await page.evaluate(() => {
      const errorElements = document.querySelectorAll('.svelte-error, [data-error], .error');
      return Array.from(errorElements).map(el => el.textContent).slice(0, 5);
    });

    if (errors.length > 0) {
      console.log('⚠️  ERRORS FOUND:');
      errors.forEach((err, i) => console.log(`   ${i + 1}. ${err.substring(0, 100)}`));
    } else {
      console.log('✅ No obvious errors\n');
    }

    // Check for console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Check page content
    console.log('📋 Page Analysis:');

    const title = await page.title();
    console.log(`   Title: "${title}"`);

    const hasBanner = await page.evaluate(() => {
      return document.body.textContent.includes('Official Launch');
    });
    console.log(`   Launch Banner: ${hasBanner ? '✅ Present' : '❌ Missing'}`);

    const hasHeader = await page.evaluate(() => {
      return document.querySelector('header') !== null;
    });
    console.log(`   Header: ${hasHeader ? '✅ Present' : '❌ Missing'}`);

    const hasNav = await page.evaluate(() => {
      return document.querySelector('nav') !== null;
    });
    console.log(`   Navigation: ${hasNav ? '✅ Present' : '❌ Missing'}`);

    const productCards = await page.evaluate(() => {
      return document.querySelectorAll('[class*="card"], [class*="product"]').length;
    });
    console.log(`   Product Elements: ${productCards} found`);

    // Take screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const screenshotPath = path.join(SCREENSHOTS_DIR, `screenshot-${timestamp}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`\n📸 Screenshot saved: ${screenshotPath}`);

    // Report
    console.log('\n📊 TEST SUMMARY:');
    console.log(`   Status: ${consoleErrors.length === 0 ? '✅ PASS' : '⚠️  WARNINGS'}`);
    console.log(`   URL: http://localhost:5173/`);
    console.log(`   Timestamp: ${new Date().toISOString()}`);

    if (consoleErrors.length > 0) {
      console.log(`\n⚠️  Console Errors (${consoleErrors.length}):`);
      consoleErrors.slice(0, 3).forEach((err, i) => {
        console.log(`   ${i + 1}. ${err.substring(0, 120)}`);
      });
    }

    console.log('\n✨ Test complete!\n');

    await browser.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ TEST FAILED:');
    console.error(`   ${error.message}`);
    if (browser) await browser.close();
    process.exit(1);
  }
}

testSite();
