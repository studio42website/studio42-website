<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	// Product data - in real app, fetch from database
	const products = {
		'lighting-v1': {
			title: 'LIGHTING-V1',
			price: '€50',
			image: '/images/products/lighting-v1.jpg',
			category: 'Lighting',
			description: 'Handmade minimal lighting object with brushed aluminum finish.',
			details: [
				'Dimensions: 25cm H × 15cm W',
				'Materials: Brushed aluminum, matte black steel',
				'Hand-assembled in Ljubljana',
				'Limited edition — only 20 units',
				'Ships within 5-7 business days',
			],
			benefits: [
				'Unique, one-of-a-kind craftsmanship',
				'Celebrates material imperfections',
				'Minimal design aesthetic',
				'Durable construction',
			],
		},
		'pen-holder': {
			title: 'Pen Holder',
			price: '€35',
			image: '/images/products/pen-holder.jpg',
			category: 'Desk',
			description: 'Steel and wood desk organizer for minimal workspaces.',
			details: [
				'Dimensions: 12cm H × 8cm W',
				'Materials: Matte steel, oak wood',
				'Hand-finished',
				'Holds 6-8 pens/pencils',
				'Ships within 3-5 business days',
			],
			benefits: [
				'Keeps desk organized',
				'Natural material palette',
				'Perfect for minimal aesthetics',
				'Long-lasting quality',
			],
		},
		'candle-stand': {
			title: 'Candle Stand',
			price: '€45',
			image: '/images/products/candle-stand.jpg',
			category: 'Lighting',
			description: 'Minimalist metal candle holder for ambient lighting.',
			details: [
				'Dimensions: 30cm H × 10cm W',
				'Materials: Welded steel, powder coat',
				'Hand-welded',
				'Holds standard taper candles',
				'Ships within 5-7 business days',
			],
			benefits: [
				'Creates warm ambiance',
				'Industrial aesthetic',
				'Heavy-duty construction',
				'Unique design',
			],
		},
	};

	$: product = products[$page.params.slug] || null;
</script>

{#if product}
	<div class="container" transition:fade={{ duration: 800 }}>
		<div class="breadcrumb">
			<a href="/products">Products</a>
			<span>/</span>
			<span>{product.title}</span>
		</div>

		<div class="product-view">
			<div class="product-image">
				<img src={product.image} alt={product.title} />
			</div>

			<div class="product-info">
				<h1>{product.title}</h1>
				<p class="category">{product.category}</p>
				<p class="price">{product.price}</p>

				<p class="description">{product.description}</p>

				<div class="details">
					<h3>Details</h3>
					<ul>
						{#each product.details as detail}
							<li>{detail}</li>
						{/each}
					</ul>
				</div>

				<div class="benefits">
					<h3>Why You'll Love It</h3>
					<ul>
						{#each product.benefits as benefit}
							<li>{benefit}</li>
						{/each}
					</ul>
				</div>

				<button class="cta-button">Add to Cart</button>
				<button class="secondary-button">Save for Later</button>
			</div>
		</div>
	</div>
{:else}
	<div class="container">
		<p>Product not found.</p>
		<a href="/products">← Back to Products</a>
	</div>
{/if}

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 2rem;
	}

	.breadcrumb {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 2rem;
		font-size: 0.9rem;
		color: #aaa;
	}

	.breadcrumb a {
		color: #aaa;
		text-decoration: none;
		transition: color 0.3s;
	}

	.breadcrumb a:hover {
		color: #fff;
	}

	.product-view {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: start;
	}

	.product-image {
		position: sticky;
		top: 2rem;
	}

	.product-image img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		background: #1a1a1a;
	}

	.product-info h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.category {
		color: #aaa;
		font-size: 0.9rem;
		text-transform: uppercase;
		margin-bottom: 1rem;
	}

	.price {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 2rem;
	}

	.description {
		font-size: 1.1rem;
		margin-bottom: 2rem;
		line-height: 1.8;
	}

	.details,
	.benefits {
		margin-bottom: 2rem;
	}

	.details h3,
	.benefits h3 {
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 1rem;
	}

	.details ul,
	.benefits ul {
		list-style: none;
		padding: 0;
	}

	.details li,
	.benefits li {
		padding: 0.5rem 0;
		padding-left: 1.5rem;
		position: relative;
		color: #aaa;
	}

	.details li::before,
	.benefits li::before {
		content: '•';
		position: absolute;
		left: 0;
		color: #fff;
	}

	.cta-button,
	.secondary-button {
		display: inline-block;
		padding: 1rem 2rem;
		margin-right: 1rem;
		margin-top: 1rem;
		text-transform: uppercase;
		font-size: 0.85rem;
		letter-spacing: 0.05em;
		cursor: pointer;
		transition: all 0.3s ease;
		border: none;
	}

	.cta-button {
		background: #fff;
		color: #0a0a0a;
	}

	.cta-button:hover {
		opacity: 0.9;
		transform: translateY(-2px);
	}

	.secondary-button {
		background: transparent;
		border: 1px solid #333;
		color: #aaa;
	}

	.secondary-button:hover {
		border-color: #fff;
		color: #fff;
	}

	@media (max-width: 768px) {
		.product-view {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.product-image {
			position: static;
		}

		.product-info h1 {
			font-size: 1.5rem;
		}

		.cta-button,
		.secondary-button {
			display: block;
			width: 100%;
			margin-right: 0;
			margin-bottom: 1rem;
		}
	}
</style>
