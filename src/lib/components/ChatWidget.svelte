<script>
	import { onMount } from 'svelte';

	onMount(() => {
		// Initialize Tawk.to Chat Widget
		var Tawk_API = Tawk_API || {},
			Tawk_LoadStart = new Date();
		(function () {
			var s1 = document.createElement('script'),
				s0 = document.getElementsByTagName('script')[0];
			s1.async = true;
			s1.src = 'https://embed.tawk.to/69e34e81a7ff261c327a9efc/1234567890';
			s1.charset = 'UTF-8';
			s1.setAttribute('crossorigin', '*');
			s0.parentNode.insertBefore(s1, s0);
		})();
	});
</script>

<!-- Tawk.to widget will load automatically -->
