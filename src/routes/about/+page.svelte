<script>
	import { fade } from 'svelte/transition';
</script>

<div class="container" transition:fade={{ duration: 800 }}>
	<section class="about-hero">
		<h1>About Studio42</h1>
		<p class="tagline">Material-focused design. Intentional craftsmanship.</p>
	</section>

	<section class="about-content">
		<div class="text-block">
			<h2>Who We Are</h2>
			<p>
				Studio42 creates limited edition handmade objects focused on material excellence and minimal design.
				Every piece celebrates imperfections and the beauty of intentional craftsmanship.
			</p>
			<p>
				We believe that objects should be designed to last, treated with respect, and created with
				intention. Dark aesthetics. Precise execution. Material integrity.
			</p>
		</div>

		<div class="text-block">
			<h2>Our Philosophy</h2>
			<p>
				We work with three materials only: matte black steel, natural wood, and brushed aluminum. This
				constraint forces innovation and clarity. Each object is unique because handmade means imperfect,
				and imperfection is where authenticity lives.
			</p>
			<p>
				Production is intentionally small. We don't scale. We refine. Every batch teaches us something,
				and we document those lessons to improve the next one.
			</p>
		</div>

		<div class="text-block">
			<h2>Our Process</h2>
			<ol class="process-list">
				<li><strong>Design:</strong> Obsess over proportions and material relationships</li>
				<li><strong>Source:</strong> Find suppliers who share our values</li>
				<li><strong>Prototype:</strong> Build, test, refine until it feels right</li>
				<li><strong>Make:</strong> Hand-assemble and finish each piece</li>
				<li><strong>Document:</strong> Record the process and lessons learned</li>
				<li><strong>Ship:</strong> Carefully package and deliver with care</li>
			</ol>
		</div>

		<div class="text-block">
			<h2>The Team</h2>
			<p>
				Studio42 is built by Luka, a designer and maker in Ljubljana, Slovenia. We collaborate with
				specialists when needed — graphics, content, project management — but maintain tight creative
				control to preserve the vision.
			</p>
			<p>
				We're not trying to be a brand. We're trying to make things worth having, and document that
				journey along the way.
			</p>
		</div>
	</section>

	<section class="contact-section">
		<h2>Get in Touch</h2>
		<p>Questions about our work? Interested in collaboration?</p>
		<a href="/community" class="cta-button">Start a Conversation</a>
	</section>
</div>

<style>
	.container {
		max-width: 900px;
		margin: 0 auto;
		padding: 4rem 2rem;
	}

	.about-hero {
		text-align: center;
		margin-bottom: 4rem;
	}

	.about-hero h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.tagline {
		font-size: 1.2rem;
		color: #aaa;
		margin: 0;
	}

	.about-content {
		margin-bottom: 4rem;
	}

	.text-block {
		margin-bottom: 3rem;
	}

	.text-block h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.text-block p {
		font-size: 1rem;
		line-height: 1.9;
		color: #bbb;
		margin-bottom: 1rem;
	}

	.process-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.process-list li {
		padding: 1rem 0;
		padding-left: 2rem;
		position: relative;
		color: #aaa;
		line-height: 1.8;
	}

	.process-list li::before {
		content: counter(step);
		counter-increment: step;
		position: absolute;
		left: 0;
		width: 1.5rem;
		height: 1.5rem;
		background: #333;
		color: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		font-weight: 700;
	}

	.process-list {
		counter-reset: step;
	}

	.contact-section {
		text-align: center;
		padding: 3rem;
		background: #121212;
		border: 1px solid #222;
	}

	.contact-section h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		text-transform: uppercase;
	}

	.contact-section p {
		margin-bottom: 2rem;
		color: #aaa;
	}

	.cta-button {
		display: inline-block;
		padding: 1rem 2rem;
		background: #fff;
		color: #0a0a0a;
		text-decoration: none;
		text-transform: uppercase;
		font-size: 0.85rem;
		letter-spacing: 0.05em;
		transition: all 0.3s ease;
	}

	.cta-button:hover {
		opacity: 0.9;
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		.container {
			padding: 2rem 1rem;
		}

		.about-hero h1 {
			font-size: 2rem;
		}

		.text-block h2 {
			font-size: 1.2rem;
		}
	}
</style>
