<div class="container section">
	<h1>Blog</h1>
	<p>Stories about design, materials, and making.</p>

	<div class="blog-grid">
		<article class="blog-card">
			<div class="blog-meta">
				<span class="date">Apr 18, 2026</span>
			</div>
			<h2><a href="/blog/welcome">Welcome to Studio42</a></h2>
			<p>
				We're excited to share our first collection of handmade lighting objects. 
				Each piece is designed with intention and built by hand.
			</p>
			<a href="/blog/welcome" class="read-more">Read more →</a>
		</article>
	</div>
</div>

<style>
	.blog-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.blog-card {
		padding: 2rem;
		border: 1px solid #222;
		background: #121212;
		transition: all 0.3s ease;
	}

	.blog-card:hover {
		border-color: #444;
		transform: translateY(-4px);
	}

	.blog-meta {
		margin-bottom: 1rem;
	}

	.date {
		font-size: 0.85rem;
		color: #666;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.blog-card h2 {
		margin: 1rem 0;
	}

	.blog-card h2 a {
		text-decoration: none;
		color: #fff;
	}

	.blog-card p {
		color: #aaa;
		margin-bottom: 1rem;
	}

	.read-more {
		color: #aaa;
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.3s ease;
	}

	.read-more:hover {
		color: #fff;
	}
</style>
