<script>
  import { onMount, onDestroy } from 'svelte';

  let { cols = 32, rows = 16, color = '#00E5A0', speed = 1200 } = $props();

  let container;
  let cells = $state([]);
  let frame;

  // Block characters — ordered light to heavy
  const BLOCKS = [' ', '·', '░', '▒', '▓', '█'];

  function rng(s) {
    const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  }

  function noise(x, y, t) {
    const tx = x / cols * 3.2;
    const ty = y / rows * 2.4;
    const tt = t * 0.0008;
    return (
      Math.sin(tx * 1.7 + tt * 1.1) * Math.cos(ty * 1.4 + tt * 0.8) * 0.5
    + Math.sin(tx * 3.3 + ty * 2.7 + tt * 1.6) * 0.3
    + Math.sin(tx * 6.1 + tt * 0.7) * 0.15
    + rng(x * 31 + y * 17) * 0.05
    );
  }

  function buildFrame(t) {
    const next = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const v = (noise(x, y, t) + 1) / 2; // 0–1
        const idx = Math.floor(v * (BLOCKS.length - 1));
        next.push(BLOCKS[idx]);
      }
    }
    return next;
  }

  let lastT = 0;
  let rafId;

  function tick(t) {
    if (t - lastT > speed) {
      cells = buildFrame(t);
      lastT = t;
    }
    rafId = requestAnimationFrame(tick);
  }

  onMount(() => {
    cells = buildFrame(0);
    rafId = requestAnimationFrame(tick);
  });

  onDestroy(() => {
    cancelAnimationFrame(rafId);
  });
</script>

<div
  class="glyph"
  bind:this={container}
  style="--cols: {cols}; --color: {color};"
  aria-hidden="true"
>
  {#each cells as cell, i}
    <span class:dim={cell === ' ' || cell === '·'}>{cell}</span>
  {/each}
</div>

<style>
  .glyph {
    display: grid;
    grid-template-columns: repeat(var(--cols), 1ch);
    font-family: monospace;
    font-size: 0.7rem;
    line-height: 1.15;
    color: var(--color);
    user-select: none;
    letter-spacing: 0;
  }

  span { display: inline-block; width: 1ch; text-align: center; }
  .dim { opacity: 0.15; }
</style>
