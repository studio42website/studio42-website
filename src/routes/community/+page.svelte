<script>
	import { fade } from 'svelte/transition';
	import ChatwootWidget from '$lib/components/ChatwootWidget.svelte';
</script>

<div class="container" transition:fade={{ duration: 800 }}>
	<section class="community-header">
		<h1>Community</h1>
		<p>Questions? Ideas? Let's talk.</p>
	</section>

	<section class="community-content">
		<div class="chat-section">
			<h2>Chat with Us</h2>
			<p>We read every message. Response time: usually within 24 hours.</p>
			<ChatwootWidget />
		</div>

		<div class="faq-section">
			<h2>Questions?</h2>
			<div class="faq-grid">
				<div class="faq-item">
					<h3>Shipping & Delivery</h3>
					<p>Orders ship within 5-7 business days. International shipping available.</p>
				</div>
				<div class="faq-item">
					<h3>Returns & Warranty</h3>
					<p>30-day returns policy. Each object comes with a care card and warranty.</p>
				</div>
				<div class="faq-item">
					<h3>Custom Orders</h3>
					<p>We take custom commissions. Email us to discuss your ideas.</p>
				</div>
				<div class="faq-item">
					<h3>Material Care</h3>
					<p>Each piece comes with detailed care instructions for longevity.</p>
				</div>
			</div>
		</div>

		<div class="contact-info">
			<h2>Direct Contact</h2>
			<div class="contact-grid">
				<div class="contact-item">
					<span class="label">Email</span>
					<a href="mailto:hello@studio42.art">hello@studio42.art</a>
				</div>
				<div class="contact-item">
					<span class="label">Location</span>
					<p>Ljubljana, Slovenia</p>
				</div>
				<div class="contact-item">
					<span class="label">Social</span>
					<div class="social-links">
						<a href="#">Instagram</a>
						<a href="#">Pinterest</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 4rem 2rem;
	}

	.community-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.community-header h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.community-header p {
		font-size: 1.1rem;
		color: #aaa;
	}

	.community-content {
		display: grid;
		gap: 4rem;
	}

	.chat-section h2,
	.faq-section h2,
	.contact-info h2 {
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.chat-section > p,
	.faq-section > p {
		color: #aaa;
		margin-bottom: 2rem;
	}

	.chat-placeholder {
		background: #121212;
		border: 2px dashed #333;
		padding: 4rem 2rem;
		text-align: center;
		border-radius: 4px;
		min-height: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.chat-placeholder p {
		margin: 0;
		color: #666;
	}

	.faq-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}

	.faq-item {
		padding: 1.5rem;
		background: #0f0f0f;
		border: 1px solid #222;
	}

	.faq-item h3 {
		font-size: 1rem;
		margin-bottom: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.faq-item p {
		color: #999;
		font-size: 0.95rem;
		line-height: 1.6;
		margin: 0;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}

	.contact-item {
		padding: 1.5rem;
		border: 1px solid #222;
	}

	.contact-item .label {
		display: block;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #666;
		margin-bottom: 0.75rem;
	}

	.contact-item a {
		color: #fff;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.contact-item a:hover {
		color: #aaa;
	}

	.contact-item p {
		color: #aaa;
		margin: 0;
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	.social-links a {
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.container {
			padding: 2rem 1rem;
		}

		.community-header h1 {
			font-size: 2rem;
		}

		.chat-placeholder {
			padding: 2rem 1rem;
			min-height: 250px;
		}
	}
</style>
