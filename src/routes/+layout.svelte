<script>
	import '../styles/global.css';
	import Header from '$lib/components/Header.svelte';
	import SoundManager from '$lib/components/SoundManager.svelte';
	import SEO from 'svelte-seo';
</script>

<SEO
	title="Studio42 — Handmade Lighting"
	description="Limited edition handmade lighting objects. 3D printed. Material-focused. Made in Ljubljana."
	openGraph={{
		url: 'https://studio42.si',
		type: 'website',
		locale: 'en_US',
		title: 'Studio42',
		description: 'Handmade lighting objects.',
	}}
/>

<SoundManager />
<Header />
<main>
	<slot />
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background: #000;
		color: #fff;
		font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
	}

	main { min-height: 100vh; }
</style>
