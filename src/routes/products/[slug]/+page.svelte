<script>
	import { fade } from 'svelte/transition';

	const PRODUCT = {
		title: 'LIGHTING-V1',
		price: '€50',
		tagline: 'Handmade. 3D printed. Limited to 5.',
		description: 'Geometric lattice lamp printed in translucent PETG. Warm LED core, USB-C rechargeable. Each unit is assembled by hand in Ljubljana — no two are identical.',
		specs: [
			'250 × 140 mm',
			'USB-C rechargeable, 18650 battery',
			'~6h battery life',
			'3D printed PETG + resin diffuser',
			'5 units only',
		],
		hero: '/images/products/lighting-v1/img_0264.jpg',
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

	let active = $state(0);
</script>

<div class="page" transition:fade={{ duration: 600 }}>

	<div class="viewer">
		<img src={PRODUCT.gallery[active].src} alt={PRODUCT.title} class="main-img" />
	</div>

	<div class="sidebar">
		<h1>{PRODUCT.title}</h1>
		<p class="price">{PRODUCT.price}</p>
		<p class="tagline">{PRODUCT.tagline}</p>
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
				class:active={active === i}
				onclick={() => active = i}
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
		grid-template-columns: 1fr 380px;
		grid-template-rows: auto auto;
		gap: 2rem 3rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.viewer {
		grid-column: 1;
		grid-row: 1;
	}

	.main-img {
		width: 100%;
		height: 70vh;
		object-fit: contain;
		background: #050505;
		display: block;
	}

	.thumbs {
		grid-column: 1;
		grid-row: 2;
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.thumb {
		width: 60px;
		height: 60px;
		padding: 0;
		border: 1px solid #1a1a1a;
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
		opacity: 0.5;
		transition: opacity 0.15s;
	}

	.thumb:hover img, .thumb.active img { opacity: 1; }
	.thumb.active { border-color: #fff; }

	.sidebar {
		grid-column: 2;
		grid-row: 1 / 3;
		padding-top: 0.5rem;
	}

	h1 {
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: #fff;
		margin: 0 0 0.75rem;
	}

	.price {
		font-size: 1.4rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.5rem;
	}

	.tagline {
		color: #444;
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		margin: 0 0 1.5rem;
	}

	.desc {
		color: #888;
		font-size: 0.85rem;
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
		padding: 0.6rem 0;
		border-bottom: 1px solid #111;
		color: #555;
		font-size: 0.78rem;
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
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		transition: opacity 0.2s;
		margin-bottom: 0.75rem;
	}

	.order-btn:hover { opacity: 0.85; }

	.note {
		color: #333;
		font-size: 0.7rem;
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

		.main-img { height: 50vw; min-height: 280px; }
	}
</style>
