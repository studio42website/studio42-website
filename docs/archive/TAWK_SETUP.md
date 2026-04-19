# Tawk.to Setup Guide

## What is Tawk.to?
A free chat widget for your website. Visitors can click a button and message you instantly. You receive messages in your inbox or browser.

## Setup (Super Simple - 5 Minutes)

### 1. Create Account
1. Go to https://www.tawk.to
2. Click **Sign Up**
3. Use your Gmail (s42contact@gmail.com)
4. Verify email

### 2. Create Your Chat Widget
1. After login, click **Create New Project**
2. Name: "Studio42"
3. Website: studio42.art (or leave blank for now)
4. Click **Create**

### 3. Get Your Embed Code
1. You'll see a page with your **Widget ID** and **Property ID**
2. Look for a code that looks like: `https://embed.tawk.to/XXXXX/YYYY`
3. Copy the `XXXXX` part (Widget ID)

### 4. Add to Our Site
1. Open `src/lib/components/ChatWidget.svelte`
2. Find this line:
   ```javascript
   s1.src = 'https://embed.tawk.to/YOUR_TAWK_ID/1234567890';
   ```
3. Replace `YOUR_TAWK_ID` with your Widget ID from step 3
4. Keep the `/1234567890` part as is

Example:
```javascript
s1.src = 'https://embed.tawk.to/65a1b2c3d4e5f6g7h8i9j0k1/1234567890';
```

### 5. Test
1. Refresh localhost:5173
2. Go to /community page
3. Look for chat icon in bottom-right corner
4. Click it to test

### 6. You're Done!
Visitors can now message you. Check Tawk.to dashboard for incoming chats.

## Customization (Optional)
In Tawk.to dashboard:
- Change greeting message
- Set online/offline status
- Customize colors to match your site
- Set hours when you're available

## No Credit Card Needed
Tawk.to is free forever. No payment required.
