<script>
	import { fade, scale } from 'svelte/transition';
	import ProductCard from '$lib/components/ProductCard.svelte';

	const products = [
		{
			id: 'lighting-v1',
			title: 'LIGHTING-V1',
			price: '€50',
			image: '/images/products/lighting-v1.jpg',
			category: 'Lighting',
			description: 'Handmade minimal lighting object.',
		},
		{
			id: 'pen-holder',
			title: 'Pen Holder',
			price: '€35',
			image: '/images/products/pen-holder.jpg',
			category: 'Desk',
			description: 'Steel and wood desk organizer.',
		},
		{
			id: 'candle-stand',
			title: 'Candle Stand',
			price: '€45',
			image: '/images/products/candle-stand.jpg',
			category: 'Lighting',
			description: 'Minimalist metal candle holder.',
		},
	];
</script>

<div class="container" transition:fade={{ duration: 800 }}>
	<section class="products-header">
		<h1>Products</h1>
		<p>Limited edition handmade objects. Each piece is unique.</p>
	</section>

	<section class="filters">
		<button class="filter-btn active">All</button>
		<button class="filter-btn">Lighting</button>
		<button class="filter-btn">Desk</button>
		<button class="filter-btn">Furniture</button>
	</section>

	<div class="products-grid">
		{#each products as product (product.id)}
			<div transition:scale={{ duration: 600 }}>
				<ProductCard
					title={product.title}
					price={product.price}
					image={product.image}
					href="/products/{product.id}"
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 2rem 6rem;
	}

	.products-header {
		margin-bottom: 3rem;
		text-align: center;
	}

	.products-header h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.products-header p {
		font-size: 1.1rem;
		color: #aaa;
		max-width: 600px;
		margin: 0 auto;
	}

	.filters {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}

	.filter-btn {
		padding: 0.75rem 1.5rem;
		background: transparent;
		border: 1px solid #333;
		color: #aaa;
		cursor: pointer;
		text-transform: uppercase;
		font-size: 0.85rem;
		letter-spacing: 0.05em;
		transition: all 0.3s ease;
	}

	.filter-btn:hover {
		border-color: #fff;
		color: #fff;
	}

	.filter-btn.active {
		background: #fff;
		color: #0a0a0a;
		border-color: #fff;
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 2rem;
	}

	@media (max-width: 768px) {
		.container {
			padding: 2rem 1rem 4rem;
		}

		.products-header h1 {
			font-size: 2rem;
		}

		.products-grid {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
			gap: 1.5rem;
		}
	}
</style>
