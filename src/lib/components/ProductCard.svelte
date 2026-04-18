<script>
	let { title = '', price = '', image = '', href = '#' } = $props();
</script>

<a {href} class="card">
	<div class="image-wrapper">
		{#if image}
			<img src={image} alt={title} />
		{:else}
			<div class="image-placeholder">No image</div>
		{/if}
	</div>
	<div class="content">
		<h3>{title}</h3>
		<p class="price">{price}</p>
	</div>
</a>

<style>
	.card {
		text-decoration: none;
		color: inherit;
		transition: all 0.3s ease;
		border: 1px solid #222;
		overflow: hidden;
	}

	.card:hover {
		border-color: #444;
		transform: translateY(-4px);
	}

	.image-wrapper {
		width: 100%;
		aspect-ratio: 1;
		overflow: hidden;
		background: #1a1a1a;
	}

	.image-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.card:hover .image-wrapper img {
		transform: scale(1.05);
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #666;
	}

	.content {
		padding: 1.5rem;
		background: #0a0a0a;
	}

	.content h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.1rem;
		letter-spacing: 0.05em;
	}

	.price {
		margin: 0;
		color: #aaa;
		font-size: 0.95rem;
	}
</style>
