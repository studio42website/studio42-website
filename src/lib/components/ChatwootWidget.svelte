<script>
	import { onMount } from 'svelte';

	onMount(() => {
		// Initialize Chatwoot Widget
		// Replace YOUR_ACCOUNT_ID and YOUR_WEBSITE_TOKEN with real values
		// Get these from your Chatwoot dashboard

		window.chatwootSettings = {
			position: 'right', // right | left
			headerTitle: 'Chat with STUDIO42',
			closedTitle: 'Chat with us',
			closedSubTitle: 'Questions? We usually reply within 24 hours.',
		};

		(function (d, t) {
			var BASE_URL = 'https://app.chatwoot.com';
			var g = d.createElement(t),
				s = d.getElementsByTagName(t)[0];
			g.src = BASE_URL + '/packs/js/sdk.js';
			g.defer = true;
			g.async = true;
			s.parentNode.insertBefore(g, s);
			g.onload = function () {
				window.chatwootSDK.run({
					websiteToken: 'YOUR_WEBSITE_TOKEN', // Replace with your token
					baseUrl: BASE_URL,
				});
			};
		})(document, 'script');
	});
</script>

<!-- Chatwoot will render here -->
