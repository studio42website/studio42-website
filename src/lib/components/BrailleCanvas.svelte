<script>
  /**
   * BrailleCanvas — grayscale noise rendered as Braille Unicode characters.
   *
   * Each Braille char (U+2800–U+28FF) is a 2×4 dot grid = 8 bits.
   * Bit layout (standard Braille Unicode encoding):
   *   col 0, row 0 → bit 0   col 1, row 0 → bit 3
   *   col 0, row 1 → bit 1   col 1, row 1 → bit 4
   *   col 0, row 2 → bit 2   col 1, row 2 → bit 5
   *   col 0, row 3 → bit 6   col 1, row 3 → bit 7
   *
   * Each char represents a 2×4 pixel cell in the underlying field.
   * Effective resolution at 60×20 chars: 120×80 "pixels".
   */
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let { cols = 60, rows = 20, color = '#fff', threshold = 0.50, speed = 60 } = $props();

  // Bit index for dot at (dx, dy) within a Braille char
  function dotBit(dx, dy) {
    return dy < 3 ? dx * 3 + dy : 6 + dx;
  }

  let text = $state('');
  let rafId;
  let lastT = 0;

  function noise(px, py, t) {
    const x = px / (cols * 2) * 6.0;
    const y = py / (rows * 4) * 5.0;
    const s = t * 0.00055;
    return (
      Math.sin(x * 1.9 + s * 1.0) * Math.cos(y * 1.6 + s * 0.7) * 0.44
    + Math.sin(x * 3.7 + y * 2.9 + s * 1.5) * 0.28
    + Math.sin(x * 7.2 + s * 0.6) * Math.cos(y * 5.8 + s * 0.9) * 0.16
    + Math.sin(x * 13.4 + y * 10.9 + s * 2.1) * 0.08
    + Math.sin(x * 24.1 + s * 0.3) * 0.04
    );
  }

  function buildFrame(t) {
    const lines = [];
    for (let cy = 0; cy < rows; cy++) {
      let line = '';
      for (let cx = 0; cx < cols; cx++) {
        let bits = 0;
        for (let dy = 0; dy < 4; dy++) {
          for (let dx = 0; dx < 2; dx++) {
            const px = cx * 2 + dx;
            const py = cy * 4 + dy;
            const v = (noise(px, py, t) + 1) / 2; // 0–1
            if (v > threshold) bits |= (1 << dotBit(dx, dy));
          }
        }
        line += String.fromCodePoint(0x2800 + bits);
      }
      lines.push(line);
    }
    return lines.join('\n');
  }

  function tick(t) {
    if (t - lastT > speed) {
      text = buildFrame(t);
      lastT = t;
    }
    rafId = requestAnimationFrame(tick);
  }

  onMount(() => {
    text = buildFrame(0);
    rafId = requestAnimationFrame(tick);
  });

  onDestroy(() => { if (browser) cancelAnimationFrame(rafId); });
</script>

<pre
  class="braille"
  style="color: {color};"
  aria-hidden="true"
>{text}</pre>

<style>
  .braille {
    font-family: monospace;
    font-size: 0.78rem;
    line-height: 1.18;
    margin: 0;
    letter-spacing: 0.02em;
    user-select: none;
    white-space: pre;
  }
</style>
