<script>
	import '../styles/global.css';
	import Header from '$lib/components/Header.svelte';
	import SoundManager from '$lib/components/SoundManager.svelte';
	import GlyphArtifact from '$lib/components/GlyphArtifact.svelte';
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

<footer>
	<GlyphArtifact cols={24} rows={3} color="#00E5A0" speed={1400} />
	<p class="footer-mark">◈ S42 — Ljubljana</p>
</footer>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background: #000;
		color: #fff;
		font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
	}

	main { min-height: 100vh; }

	footer {
		border-top: 1px solid #0d0d0d;
		padding: 1.5rem 2rem 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		overflow: hidden;
	}

	.footer-mark {
		font-size: 0.62rem;
		letter-spacing: 0.18em;
		color: #1e1e1e;
		margin: 0;
	}
</style>
