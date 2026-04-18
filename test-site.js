#!/usr/bin/env node
/**
 * Simple site tester - checks if localhost:5173 is running
 */

const http = require('http');

function testSite() {
  const options = {
    hostname: 'localhost',
    port: 5173,
    path: '/',
    method: 'GET',
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    console.log(`✓ Site is LIVE (Status: ${res.statusCode})`);
    
    if (res.statusCode === 500) {
      console.log('⚠️  WARNING: Server returned 500 error');
      console.log('This means there\'s a syntax error in the code');
    } else if (res.statusCode === 200) {
      console.log('✓ Everything looks good!');
    }

    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      // Check for our banner
      if (data.includes('Official Launch')) {
        console.log('✓ Launch banner is present in HTML');
      } else {
        console.log('⚠️  Launch banner NOT found in HTML');
      }

      // Check for errors
      if (data.includes('SvelteKit error')) {
        console.log('⚠️  SvelteKit error detected in page');
      }
    });
  });

  req.on('error', (e) => {
    console.log('✗ Cannot connect to localhost:5173');
    console.log('Make sure "npm run dev" is running');
    console.log(`Error: ${e.message}`);
  });

  req.on('timeout', () => {
    console.log('✗ Request timeout - server may be slow');
    req.destroy();
  });

  req.end();
}

testSite();
