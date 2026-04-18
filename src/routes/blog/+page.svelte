<script>
	import { fade } from 'svelte/transition';

	const posts = [
		{
			id: 'making-lighting-v1',
			title: 'Making LIGHTING-V1: Process & Materials',
			date: 'April 18, 2026',
			excerpt: 'A deep dive into how we design and hand-assemble our first lighting object.',
			category: 'Process',
			readTime: '8 min read',
		},
		{
			id: 'three-materials',
			title: 'Why Three Materials Only?',
			date: 'April 12, 2026',
			excerpt: 'Our philosophy on material constraints and why limitations drive better design.',
			category: 'Design',
			readTime: '5 min read',
		},
		{
			id: 'imperfection-intention',
			title: 'Celebrating Imperfection',
			date: 'April 5, 2026',
			excerpt: 'Handmade doesn\'t mean perfect. It means intentional. Here\'s why we love the flaws.',
			category: 'Philosophy',
			readTime: '6 min read',
		},
		{
			id: 'first-batch',
			title: 'From Sketch to Shelf: First Production Run',
			date: 'March 28, 2026',
			excerpt: 'Behind the scenes: how we went from concept to manufacturing 20 units of LIGHTING-V1.',
			category: 'Process',
			readTime: '10 min read',
		},
	];
</script>

<div class="container" transition:fade={{ duration: 800 }}>
	<section class="blog-header">
		<h1>Stories & Process</h1>
		<p>Documenting our approach to design, materials, and handmade production.</p>
	</section>

	<section class="blog-grid">
		{#each posts as post (post.id)}
			<article class="blog-post">
				<div class="post-meta">
					<span class="category">{post.category}</span>
					<span class="date">{post.date}</span>
				</div>
				<h2>{post.title}</h2>
				<p class="excerpt">{post.excerpt}</p>
				<div class="post-footer">
					<span class="read-time">{post.readTime}</span>
					<a href="/blog/{post.id}" class="read-link">Read →</a>
				</div>
			</article>
		{/each}
	</section>

	<section class="newsletter">
		<div class="newsletter-content">
			<h2>Get Updates</h2>
			<p>New posts, product launches, and studio updates delivered to your inbox.</p>
			<form on:submit|preventDefault>
				<input type="email" placeholder="your@email.com" required />
				<button type="submit">Subscribe</button>
			</form>
		</div>
	</section>
</div>

<style>
	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 4rem 2rem;
	}

	.blog-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.blog-header h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.blog-header p {
		font-size: 1.1rem;
		color: #aaa;
		max-width: 600px;
		margin: 0 auto;
	}

	.blog-grid {
		display: grid;
		gap: 2rem;
		margin-bottom: 4rem;
	}

	.blog-post {
		padding: 2rem;
		border: 1px solid #222;
		transition: all 0.3s ease;
	}

	.blog-post:hover {
		border-color: #444;
		background: #0f0f0f;
	}

	.post-meta {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		font-size: 0.85rem;
	}

	.category {
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #aaa;
		padding: 0.25rem 0.75rem;
		background: #1a1a1a;
		border-radius: 2px;
	}

	.date {
		color: #666;
		align-self: center;
	}

	.blog-post h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		transition: color 0.3s ease;
	}

	.blog-post:hover h2 {
		color: #bbb;
	}

	.excerpt {
		font-size: 1rem;
		color: #999;
		margin-bottom: 1.5rem;
		line-height: 1.6;
	}

	.post-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.9rem;
	}

	.read-time {
		color: #666;
	}

	.read-link {
		color: #fff;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.read-link:hover {
		color: #aaa;
	}

	.newsletter {
		background: #121212;
		border: 1px solid #222;
		padding: 3rem;
		text-align: center;
	}

	.newsletter h2 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.newsletter p {
		color: #aaa;
		margin-bottom: 2rem;
	}

	form {
		display: flex;
		gap: 1rem;
		max-width: 400px;
		margin: 0 auto;
	}

	input[type='email'] {
		flex: 1;
		padding: 0.75rem;
		background: #0a0a0a;
		border: 1px solid #333;
		color: #fff;
		font-size: 0.95rem;
	}

	input[type='email']::placeholder {
		color: #666;
	}

	input[type='email']:focus {
		outline: none;
		border-color: #555;
	}

	button[type='submit'] {
		padding: 0.75rem 1.5rem;
		background: #fff;
		color: #0a0a0a;
		border: none;
		cursor: pointer;
		text-transform: uppercase;
		font-size: 0.85rem;
		letter-spacing: 0.05em;
		transition: all 0.3s ease;
	}

	button[type='submit']:hover {
		opacity: 0.9;
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		.container {
			padding: 2rem 1rem;
		}

		.blog-header h1 {
			font-size: 2rem;
		}

		form {
			flex-direction: column;
		}
	}
</style>
