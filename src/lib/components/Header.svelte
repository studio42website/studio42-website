<script>
	import { page } from '$app/stores';

	let { menuOpen = $bindable(false) } = $props();
</script>

<header class="header">
	<div class="container">
		<div class="logo">
			<a href="/">STUDIO42</a>
		</div>
		
		<nav class="nav">
			<a href="/" class:active={$page.url.pathname === '/'}>Home</a>
			<a href="/products" class:active={$page.url.pathname.startsWith('/products')}>Products</a>
			<a href="/blog" class:active={$page.url.pathname.startsWith('/blog')}>Blog</a>
			<a href="/community" class:active={$page.url.pathname.startsWith('/community')}>Community</a>
			<a href="/about" class:active={$page.url.pathname.startsWith('/about')}>About</a>
		</nav>

		<button class="menu-toggle" onclick={() => (menuOpen = !menuOpen)}>
			{#if menuOpen}
				✕
			{:else}
				☰
			{/if}
		</button>
	</div>

	{#if menuOpen}
		<nav class="mobile-nav">
			<a href="/" onclick={() => (menuOpen = false)}>Home</a>
			<a href="/products" onclick={() => (menuOpen = false)}>Products</a>
			<a href="/blog" onclick={() => (menuOpen = false)}>Blog</a>
			<a href="/community" onclick={() => (menuOpen = false)}>Community</a>
			<a href="/about" onclick={() => (menuOpen = false)}>About</a>
		</nav>
	{/if}
</header>

<style>
	.header {
		background: #0a0a0a;
		border-bottom: 1px solid #222;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1.5rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo a {
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
		text-decoration: none;
		letter-spacing: 0.05em;
	}

	.nav {
		display: flex;
		gap: 2rem;
	}

	.nav a {
		color: #aaa;
		text-decoration: none;
		font-size: 0.95rem;
		transition: color 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.nav a:hover,
	.nav a.active {
		color: #fff;
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		color: #fff;
		cursor: pointer;
		padding: 0.5rem;
		font-size: 1.5rem;
	}

	.mobile-nav {
		display: none;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem 2rem;
		background: #121212;
		border-bottom: 1px solid #222;
	}

	.mobile-nav a {
		color: #aaa;
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.3s ease;
		text-transform: uppercase;
	}

	.mobile-nav a:hover {
		color: #fff;
	}

	@media (max-width: 768px) {
		.nav {
			display: none;
		}

		.menu-toggle {
			display: block;
		}

		.mobile-nav {
			display: flex;
		}

		.container {
			gap: 1rem;
		}
	}
</style>
