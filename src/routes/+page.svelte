<script>
	import { fade } from 'svelte/transition';
</script>

<div class="hero" transition:fade={{ duration: 800 }}>
	<a href="/products/lighting-v1" class="product-link">
		<img src="/images/products/lighting-v1/img_0264.jpg" alt="LIGHTING-V1" />
	</a>
	<div class="info">
		<h1>LIGHTING-V1</h1>
		<p class="sub">Handmade. 3D printed. Limited to 5.</p>
		<a href="/products/lighting-v1" class="buy">€50 — Order</a>
	</div>
</div>

<style>
	.hero {
		min-height: 100vh;
		background: #000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 5rem 2rem 3rem;
		gap: 2.5rem;
	}

	.product-link {
		display: block;
		max-width: 400px;
		width: 100%;
	}

	.product-link img {
		width: 100%;
		height: auto;
		display: block;
	}

	.info { text-align: center; }

	h1 {
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		margin: 0 0 0.5rem;
		color: #fff;
	}

	.sub {
		color: #444;
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		margin: 0 0 1.5rem;
	}

	.buy {
		display: inline-block;
		padding: 0.6rem 1.8rem;
		border: 1px solid #2a2a2a;
		color: #888;
		text-decoration: none;
		font-size: 0.75rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		transition: border-color 0.2s, color 0.2s;
	}

	.buy:hover { border-color: #fff; color: #fff; }
</style>
