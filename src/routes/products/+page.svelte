<script>
	import ProductCard from '$lib/components/ProductCard.svelte';
</script>

<div class="container section">
	<h1>Products</h1>
	<p>Limited edition handmade lighting objects.</p>

	<div class="products-grid">
		<ProductCard 
			title="LIGHTING-V1"
			price="€50"
			image="/images/products/lighting-v1.jpg"
			href="/products/lighting-v1"
		/>
	</div>
</div>

<style>
	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}
</style>
