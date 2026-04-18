import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ 
    executablePath: '/usr/bin/chromium-browser',
    headless: true 
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  
  try {
    await page.goto('https://studio42-website.vercel.app/', { waitUntil: 'networkidle', timeout: 10000 });
    const title = await page.title();
    console.log(`✅ Vercel site loaded`);
    console.log(`📄 Title: ${title}`);
    
    await page.screenshot({ path: './vercel-screenshot.png', fullPage: true });
    console.log('📸 Screenshot saved');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
  
  await browser.close();
})();
