#!/usr/bin/env node
/**
 * Quick Site Health Check (No Browser Dependencies)
 * Lightweight HTTP-based testing
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_DIR = path.join(__dirname, 'test-logs');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function getTimestamp() {
  return new Date().toISOString();
}

function log(msg, level = 'info') {
  const icons = { info: 'ℹ️ ', success: '✅', error: '❌', warn: '⚠️ ' };
  const icon = icons[level] || '';
  const fullMsg = `${icon} ${msg}`;
  console.log(fullMsg);

  const logFile = path.join(LOG_DIR, 'test.log');
  fs.appendFileSync(logFile, `[${getTimestamp()}] ${fullMsg}\n`);
}

function testSite() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5173,
      path: '/',
      method: 'GET',
      timeout: 5000
    };

    log('Testing localhost:5173...', 'info');

    const req = http.request(options, (res) => {
      log(`Server responded: ${res.statusCode}`, res.statusCode === 200 ? 'success' : 'warn');

      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        const checks = {
          'HTML loaded': data.length > 100,
          'Launch banner present': data.includes('Official Launch'),
          'Header present': data.includes('<header'),
          'Navigation present': data.includes('<nav'),
          'Footer present': data.includes('<footer'),
          'No SvelteKit errors': !data.includes('error') || data.includes('error') === false
        };

        log('\n📋 HEALTH CHECK RESULTS:', 'info');
        Object.entries(checks).forEach(([check, passed]) => {
          log(`  ${passed ? '✅' : '❌'} ${check}`, passed ? 'success' : 'warn');
        });

        const passed = Object.values(checks).filter(v => v).length;
        const total = Object.keys(checks).length;
        log(`\nScore: ${passed}/${total} checks passed`, passed === total ? 'success' : 'warn');

        log(`\nLog saved to: test-logs/test.log\n`, 'info');
        resolve(true);
      });
    });

    req.on('error', (err) => {
      log(`Connection failed: ${err.message}`, 'error');
      log(`Make sure "npm run dev" is running on port 5173`, 'warn');
      log(`\nLog saved to: test-logs/test.log\n`, 'info');
      resolve(false);
    });

    req.on('timeout', () => {
      log('Request timeout', 'error');
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

(async () => {
  log('Starting quick health check...', 'info');
  await testSite();
})();
