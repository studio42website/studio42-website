<script>
	import { onMount } from 'svelte';
	import AOS from 'aos';
	import 'aos/dist/aos.css';
	import { Rune, Scale, Fade, Slide } from 'rune-scroller';
	import ProductCard from '$lib/components/ProductCard.svelte';

	onMount(() => {
		AOS.init({ duration: 1000, once: true });
	});
</script>

<div class="launch-banner">
	<p>🚀 Official Launch: <strong>May 15, 2026</strong></p>
</div>

<section class="hero">
	<Fade duration={1000} delay={200}>
		<div class="hero-content">
			<h1>Studio42</h1>
			<p class="tagline">Handmade lighting objects. Material matters.</p>
			<p class="description">
				Minimal design. Celebrated imperfections. Limited editions.
			</p>
			<a href="/products" class="cta-button">Explore Products</a>
		</div>
	</Fade>
</section>

<section class="featured section">
	<div class="container">
		<h2>Featured Collection</h2>
		<div class="products-grid">
			<Scale duration={800} delay={400}>
				<ProductCard 
					title="LIGHTING-V1"
					price="€50"
					image="/images/products/lighting-v1.jpg"
					href="/products/lighting-v1"
				/>
			</Scale>
		</div>
	</div>
</section>

<section class="about section">
	<div class="container">
		<h2>About Studio42</h2>
		<p>
			We design and build handmade lighting objects for people who care about craftsmanship and materials.
			Each piece is intentional. Each piece is unique.
		</p>
		<p>
			Founded in 2026. Based in Ljubljana. Shipping worldwide.
		</p>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
		background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
	}

	.hero-content h1 {
		font-size: 4rem;
		margin-bottom: 1rem;
		letter-spacing: 0.1em;
	}

	.tagline {
		font-size: 1.5rem;
		color: #aaa;
		margin-bottom: 1rem;
	}

	.description {
		font-size: 1.1rem;
		color: #888;
		margin-bottom: 2rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.cta-button {
		display: inline-block;
		padding: 1rem 2.5rem;
		background: #fff;
		color: #000;
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 700;
		font-size: 0.9rem;
		transition: all 0.3s ease;
		border: 2px solid #fff;
	}

	.cta-button:hover {
		background: transparent;
		color: #fff;
	}

	.featured {
		background: #0a0a0a;
	}

	.featured h2 {
		text-align: center;
		margin-bottom: 3rem;
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
	}

	.about {
		background: #0a0a0a;
	}

	.about h2 {
		margin-bottom: 2rem;
	}

	.about p {
		max-width: 700px;
		font-size: 1.1rem;
		line-height: 1.8;
	}

	@media (max-width: 768px) {
		.hero-content h1 {
			font-size: 2.5rem;
		}

		.tagline {
			font-size: 1.2rem;
		}
	}

	.launch-banner {
		background: #1a1a1a;
		border-bottom: 1px solid #333;
		padding: 1rem;
		text-align: center;
		font-size: 1.1rem;
		position: sticky;
		top: 0;
		z-index: 99;
	}

	.launch-banner p {
		margin: 0;
		color: #fff;
	}

	.launch-banner strong {
		color: #fff;
		font-weight: 700;
	}
</style>

