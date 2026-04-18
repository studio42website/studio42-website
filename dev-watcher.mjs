#!/usr/bin/env node
/**
 * Dev Watcher - Monitors file changes and manages dev server
 * Restarts Vite when needed, tests changes, reports status
 */

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = __dirname;

let devServer = null;
let isRestarting = false;
const watchedFiles = new Map();

console.log('🔍 Dev Watcher Started\n');

// Files that trigger dev server restart
const restartTriggers = [
  'package.json',
  'vite.config.js',
  'svelte.config.js',
  '.env',
];

// Monitor file changes
function watchFiles() {
  const srcDir = path.join(projectRoot, 'src');
  
  fs.watch(srcDir, { recursive: true }, (eventType, filename) => {
    if (filename && !filename.includes('node_modules')) {
      console.log(`📝 Changed: ${filename}`);
    }
  });

  // Watch config files
  restartTriggers.forEach(file => {
    const filePath = path.join(projectRoot, file);
    if (fs.existsSync(filePath)) {
      fs.watchFile(filePath, () => {
        console.log(`⚠️  ${file} changed - restart needed`);
        restartDevServer();
      });
    }
  });
}

// Start dev server
function startDevServer() {
  if (devServer || isRestarting) return;
  
  console.log('🚀 Starting dev server...');
  isRestarting = true;

  devServer = spawn('npm', ['run', 'dev', '--', '--host'], {
    cwd: projectRoot,
    stdio: 'pipe',
    shell: true,
  });

  let output = '';
  devServer.stdout.on('data', (data) => {
    output += data.toString();
    if (output.includes('ready in')) {
      console.log('✅ Dev server ready\n');
      isRestarting = false;
      testSite();
    }
  });

  devServer.stderr.on('data', (data) => {
    console.error('❌ Server error:', data.toString());
  });

  devServer.on('close', (code) => {
    console.log(`⚠️  Dev server stopped (code ${code})`);
    devServer = null;
    isRestarting = false;
  });
}

// Restart dev server
function restartDevServer() {
  if (isRestarting) return;
  
  console.log('\n🔄 Restarting dev server...\n');
  isRestarting = true;

  if (devServer) {
    devServer.kill();
    devServer = null;
  }

  setTimeout(startDevServer, 1000);
}

// Test site with Playwright
async function testSite() {
  try {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch({ 
      executablePath: '/usr/bin/chromium-browser',
      headless: true 
    });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    
    await page.goto('http://172.24.8.58:5173/', { waitUntil: 'networkidle', timeout: 10000 });
    
    const errors = await page.evaluate(() => {
      const logs = [];
      if (window.console) {
        const origError = window.console.error;
        window.console.error = (...args) => {
          logs.push(args.join(' '));
          origError(...args);
        };
      }
      return document.body.innerText.includes('Error') ? 'Page has errors' : 'OK';
    });

    await page.screenshot({ path: './screenshot-latest.png', fullPage: true });
    console.log('📸 Screenshot updated\n');
    
    await browser.close();
  } catch (err) {
    console.error('Test error:', err.message);
  }
}

// Start watching
startDevServer();
watchFiles();

// Keep process alive
process.on('SIGINT', () => {
  console.log('\n\n🛑 Stopping watcher...');
  if (devServer) devServer.kill();
  process.exit(0);
});
