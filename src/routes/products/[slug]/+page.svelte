<script>
	export let data;
</script>

<div class="container section">
	<div class="product-view">
		<div class="image-section">
			<img src="/images/products/lighting-v1.jpg" alt="Product" />
		</div>

		<div class="info-section">
			<h1>LIGHTING-V1</h1>
			<p class="price">€50</p>
			
			<div class="description">
				<h3>Description</h3>
				<p>
					Handmade lighting object. Minimal design, material-focused.
				</p>
			</div>

			<div class="specs">
				<h3>Specifications</h3>
				<ul>
					<li>Material: Steel, Wood, Aluminum</li>
					<li>Limited Edition: 5 units</li>
					<li>Handmade: Each one unique</li>
				</ul>
			</div>

			<button class="buy-button">Add to Cart</button>
		</div>
	</div>
</div>

<style>
	.product-view {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		margin-top: 2rem;
	}

	.image-section img {
		width: 100%;
		height: auto;
		aspect-ratio: 1;
		object-fit: cover;
	}

	.info-section h1 {
		margin-top: 0;
	}

	.price {
		font-size: 1.5rem;
		margin-bottom: 2rem;
		color: #fff;
	}

	.description,
	.specs {
		margin-bottom: 2rem;
	}

	.specs ul {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.specs li {
		padding: 0.5rem 0;
		border-bottom: 1px solid #222;
		color: #aaa;
	}

	.buy-button {
		background: #fff;
		color: #000;
		border: none;
		padding: 1rem 2rem;
		font-size: 1rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.buy-button:hover {
		background: #000;
		color: #fff;
		border: 1px solid #fff;
	}

	@media (max-width: 768px) {
		.product-view {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>
