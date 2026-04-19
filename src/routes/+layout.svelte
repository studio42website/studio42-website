<script>
	import '../styles/global.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SoundManager from '$lib/components/SoundManager.svelte';
	import SEO from 'svelte-seo';
</script>

<SEO
	title="Studio42 — Handmade Lighting Objects"
	description="Limited edition handmade lighting objects. Dark, minimal design. Material-focused craftsmanship."
	openGraph={{
		url: 'https://studio42.art',
		type: 'website',
		locale: 'en_US',
		title: 'Studio42 — Handmade Lighting',
		description: 'Limited edition handmade lighting objects. Dark, minimal design.',
	}}
	twitter={{
		handle: '@studio42',
		card: 'summary_large_image',
	}}
/>

<SoundManager />
<Header />
<main>
	<slot />
</main>
<Footer />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	main {
		min-height: 100vh;
	}
</style>
