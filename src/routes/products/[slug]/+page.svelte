<script>
	import { fade } from 'svelte/transition';
	import PixelImage from '$lib/components/PixelImage.svelte';
	import WireframeTerrain from '$lib/components/WireframeTerrain.svelte';

	const PRODUCT = {
		id: 'LIGHTING-V1',
		title: 'spiky wireless moodlight',
		price: '€50',
		batch: '01',
		stock: '5/5',
		tagline: 'Handmade. 3D printed. Limited to 5.',
		description: 'Geometric lattice lamp printed in translucent PETG. Warm LED core, USB-C rechargeable. Each unit is assembled by hand in Ljubljana — no two are identical.',
		specs: [
			'250 × 140 mm',
			'USB-C rechargeable, 18650 battery',
			'~6h battery life',
			'3D printed PETG + resin diffuser',
			'5 units only',
		],
		gallery: [
			{ src: '/images/products/lighting-v1/img_0264.jpg', caption: 'Finished — warm glow' },
			{ src: '/images/products/lighting-v1/img_0265.jpg', caption: '' },
			{ src: '/images/products/lighting-v1/img_0266.jpg', caption: '' },
			{ src: '/images/products/lighting-v1/img_0267.jpg', caption: '' },
			{ src: '/images/products/lighting-v1/img_0260.jpg', caption: 'Making of' },
			{ src: '/images/products/lighting-v1/img_0261.jpg', caption: '' },
			{ src: '/images/products/lighting-v1/img_0262.jpg', caption: '' },
			{ src: '/images/products/lighting-v1/img_0263.jpg', caption: '' },
			{ src: '/images/products/lighting-v1/img_0259.jpg', caption: 'Components' },
			{ src: '/images/products/lighting-v1/img_0258.jpg', caption: '' },
			{ src: '/images/products/lighting-v1/img_0253.jpg', caption: 'LED module' },
		],
	};

	let photoMode = $state(false);
	let active = $state(0);
</script>

<div class="page" transition:fade={{ duration: 600 }}>

	<div class="viewer">
		{#if photoMode}
			<div class="photo-view">
				<PixelImage src={PRODUCT.gallery[active].src} alt={PRODUCT.title} pixelSize={4} />
				<button class="back-btn" onclick={() => photoMode = false}>← wireframe</button>
			</div>
		{:else}
			<WireframeTerrain />
		{/if}
	</div>

	<div class="sidebar">
		<p class="batch-line">batch {PRODUCT.batch} · stock: {PRODUCT.stock}</p>
		<h1>{PRODUCT.title}</h1>
		<p class="price">{PRODUCT.price}</p>
		<p class="desc">{PRODUCT.description}</p>

		<ul class="specs">
			{#each PRODUCT.specs as s}
				<li>{s}</li>
			{/each}
		</ul>

		<a href="mailto:s42contact@gmail.com?subject=LIGHTING-V1 Order" class="order-btn">
			Order — {PRODUCT.price}
		</a>
		<p class="note">Email to order. Ships from Ljubljana.</p>
	</div>

	<div class="thumbs">
		{#each PRODUCT.gallery as img, i}
			<button
				class="thumb"
				class:active={photoMode && active === i}
				onclick={() => { active = i; photoMode = true; }}
				aria-label="View photo {i + 1}"
			>
				<img src={img.src} alt="" />
			</button>
		{/each}
	</div>

</div>

<style>
	.page {
		min-height: 100vh;
		background: #000;
		padding: 5rem 1.5rem 4rem;
		display: grid;
		grid-template-columns: 1fr 340px;
		grid-template-rows: auto auto;
		gap: 2rem 3rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.viewer {
		grid-column: 1;
		grid-row: 1;
		height: 70vh;
		position: relative;
	}

	.photo-view {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.back-btn {
		position: absolute;
		top: 0.75rem;
		left: 0;
		background: none;
		border: none;
		color: #444;
		font-size: 0.68rem;
		letter-spacing: 0.1em;
		cursor: pointer;
		padding: 0;
		transition: color 0.15s;
	}

	.back-btn:hover { color: #888; }

	.thumbs {
		grid-column: 1;
		grid-row: 2;
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.thumb {
		width: 56px;
		height: 56px;
		padding: 0;
		border: 1px solid #111;
		background: none;
		cursor: pointer;
		overflow: hidden;
		transition: border-color 0.15s;
	}

	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		opacity: 0.4;
		transition: opacity 0.15s;
	}

	.thumb:hover img { opacity: 0.8; }
	.thumb.active img { opacity: 1; }
	.thumb.active { border-color: #fff; }

	.sidebar {
		grid-column: 2;
		grid-row: 1 / 3;
		padding-top: 0.5rem;
	}

	.batch-line {
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		color: #444;
		margin: 0 0 0.6rem;
	}

	h1 {
		font-size: 0.82rem;
		font-weight: 400;
		letter-spacing: 0.05em;
		color: #ccc;
		margin: 0 0 0.6rem;
	}

	.price {
		font-size: 1.3rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 1.5rem;
	}

	.desc {
		color: #666;
		font-size: 0.82rem;
		line-height: 1.7;
		margin: 0 0 1.5rem;
	}

	.specs {
		list-style: none;
		padding: 0;
		margin: 0 0 2rem;
		border-top: 1px solid #111;
	}

	.specs li {
		padding: 0.55rem 0;
		border-bottom: 1px solid #111;
		color: #444;
		font-size: 0.76rem;
		letter-spacing: 0.05em;
	}

	.order-btn {
		display: block;
		width: 100%;
		padding: 0.9rem;
		background: #fff;
		color: #000;
		text-decoration: none;
		text-align: center;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		transition: opacity 0.2s;
		margin-bottom: 0.75rem;
	}

	.order-btn:hover { opacity: 0.85; }

	.note {
		color: #2a2a2a;
		font-size: 0.68rem;
		text-align: center;
		margin: 0;
		letter-spacing: 0.05em;
	}

	@media (max-width: 768px) {
		.page {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto auto;
			padding: 5rem 1rem 3rem;
		}

		.sidebar { grid-column: 1; grid-row: 2; }
		.thumbs  { grid-column: 1; grid-row: 3; }
		.viewer  { height: 50vw; min-height: 280px; }
	}
</style>
