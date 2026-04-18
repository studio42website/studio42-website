# Chatwoot Setup Guide

## What is Chatwoot?
Chatwoot is a customer communication platform. It provides a chat widget that visitors can use to message you directly.

## Setup Steps

### 1. Create Chatwoot Account
1. Go to https://app.chatwoot.com
2. Sign up (free tier available)
3. Create a new account for Studio42

### 2. Create a Website Channel
1. In Chatwoot dashboard, go to **Settings** → **Inboxes**
2. Click **+ New**
3. Select **Website**
4. Name it "Studio42 Website"
5. Click **Create**

### 3. Get Your Website Token
1. Go to **Settings** → **Inboxes** → **Studio42 Website**
2. Copy the **Website Token** (long string like `abc123def456...`)

### 4. Add Token to Our Site
1. Open `/src/lib/components/ChatwootWidget.svelte`
2. Find: `websiteToken: 'YOUR_WEBSITE_TOKEN'`
3. Replace `YOUR_WEBSITE_TOKEN` with your actual token from step 3

Example:
```javascript
websiteToken: 'wDgqWTtK2oCyqK2h5pDKuaM7', // Your token here
```

### 5. Deploy or Test
- The chat widget will appear in the bottom-right corner of your site
- Visitors can click it to send messages
- You receive messages in the Chatwoot dashboard

## Optional: Customize Widget
Edit settings in `ChatwootWidget.svelte`:
```javascript
window.chatwootSettings = {
	position: 'right', // 'right' or 'left'
	headerTitle: 'Chat with STUDIO42',
	closedTitle: 'Chat with us',
	closedSubTitle: 'Questions? We usually reply within 24 hours.',
};
```

## Hosting Chatwoot (Self-Hosted Option)
If you want to self-host instead of using their cloud:
1. Use Docker to run Chatwoot
2. Point your `baseUrl` to your server
3. More control, costs extra for infrastructure

For now, the cloud version is simplest.

## Next Steps
1. Get your website token
2. Update the component
3. Refresh localhost to see the widget
4. Test sending a message
