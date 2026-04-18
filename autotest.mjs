#!/usr/bin/env node
/**
 * Automated Site Tester with Puppeteer (ES Module)
 * Tests localhost:5173 and reports with screenshots
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, 'test-screenshots');
const MAX_RETRIES = 5;
const RETRY_DELAY = 2000;

// Create screenshots directory
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function testSite() {
  let browser;
  try {
    console.log('🚀 Starting automated site tests...\n');

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Connect with retries
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

    // Collect console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Page analysis
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

    const links = await page.evaluate(() => {
      return document.querySelectorAll('a[href]').length;
    });
    console.log(`   Links: ${links} found`);

    const images = await page.evaluate(() => {
      return document.querySelectorAll('img').length;
    });
    console.log(`   Images: ${images} found`);

    // Take screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const screenshotPath = path.join(SCREENSHOTS_DIR, `screenshot-${timestamp}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`\n📸 Screenshot saved: test-screenshots/screenshot-${timestamp}.png`);

    // Summary
    console.log('\n📊 TEST SUMMARY:');
    console.log(`   Status: ${consoleErrors.length === 0 ? '✅ PASS' : '⚠️  WARNING'}`);
    console.log(`   URL: http://localhost:5173/`);
    console.log(`   Time: ${new Date().toISOString()}`);

    if (consoleErrors.length > 0) {
      console.log(`\n⚠️  Console Errors (${consoleErrors.length}):`);
      consoleErrors.slice(0, 3).forEach((err, i) => {
        console.log(`   ${i + 1}. ${err.substring(0, 100)}`);
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
