<script>
	import { page } from '$app/stores';
	import SoundDeck from '$lib/components/SoundDeck.svelte';

	let menuOpen = $state(false);
</script>

<header>
	<a href="/" class="logo" aria-label="Studio42 home">
		<img src="/logo.svg" alt="S42" width="40" height="42" />
	</a>

	<div class="deck-wrap">
		<SoundDeck />
	</div>

	<nav class="nav">
		<a href="/blog"  class:active={$page.url.pathname.startsWith('/blog')}>Blog</a>
		<a href="/about" class:active={$page.url.pathname.startsWith('/about')}>About</a>
	</nav>

	<button class="burger" onclick={() => menuOpen = !menuOpen} aria-label="Menu">
		{menuOpen ? '✕' : '☰'}
	</button>

	{#if menuOpen}
		<nav class="mobile-nav">
			<a href="/"        onclick={() => menuOpen = false}>Home</a>
			<a href="/blog"    onclick={() => menuOpen = false}>Blog</a>
			<a href="/about"   onclick={() => menuOpen = false}>About</a>
			<div class="mobile-deck"><SoundDeck /></div>
		</nav>
	{/if}
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		background: #000;
		border-bottom: 1px solid #111;
	}

	.logo img {
		display: block;
		height: 38px;
		width: auto;
	}

	.deck-wrap {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.nav {
		display: flex;
		gap: 2rem;
	}

	.nav a {
		color: #555;
		text-decoration: none;
		font-size: 0.8rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		transition: color 0.2s;
	}

	.nav a:hover,
	.nav a.active { color: #fff; }

	.burger {
		display: none;
		background: none;
		border: none;
		color: #fff;
		font-size: 1.2rem;
		cursor: pointer;
		padding: 0.25rem;
	}

	.mobile-nav {
		position: fixed;
		top: 61px;
		left: 0; right: 0; bottom: 0;
		background: #000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		z-index: 99;
	}

	.mobile-nav a {
		color: #aaa;
		text-decoration: none;
		font-size: 1.2rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.mobile-deck { margin-top: 1rem; }

	@media (max-width: 768px) {
		.nav, .deck-wrap { display: none; }
		.burger { display: block; }
	}
</style>
