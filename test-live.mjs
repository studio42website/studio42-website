#!/usr/bin/env node
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const url = 'http://172.24.8.58:5173/';

(async () => {
  let browser;
  try {
    console.log('🚀 Launching browser...');
    browser = await chromium.launch({ executablePath: '/usr/bin/chromium-browser' });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });

    console.log(`📡 Loading ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });

    // Take screenshot
    const screenshotPath = './screenshot-latest.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`✅ Screenshot saved: ${screenshotPath}`);

    // Get page content
    const title = await page.title();
    console.log(`📄 Title: ${title}`);

    const hasLaunchBanner = await page.evaluate(() => 
      document.body.textContent.includes('Official Launch')
    );
    console.log(`🎯 Launch Banner: ${hasLaunchBanner ? '✅' : '❌'}`);

    const hasHeader = await page.evaluate(() => !!document.querySelector('header'));
    console.log(`📍 Header: ${hasHeader ? '✅' : '❌'}`);

    await browser.close();
    console.log('\n✨ Done!\n');
  } catch (err) {
    console.error('❌ Error:', err.message);
    if (browser) await browser.close();
    process.exit(1);
  }
})();
