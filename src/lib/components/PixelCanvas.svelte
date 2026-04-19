<script>
  import { onMount } from 'svelte';

  let { mode = 'cloud' } = $props();
  let canvas;

  const W = 120, H = 180;

  function rng(s) {
    let x = Math.sin(s + 1) * 73856;
    return x - Math.floor(x);
  }

  function drawCloud(ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < 3200; i++) {
      const r  = rng(i);
      const r2 = rng(i + 1000);
      const r3 = rng(i + 2000);
      const r4 = rng(i + 3000);

      const x = Math.floor(r * W);
      const y = Math.floor(r2 * H);

      const dx = (x / W - 0.5) * 2;
      const dy = (y / H - 0.5) * 2;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (r3 > dist * 0.55) {
        if (r4 > 0.82) {
          ctx.fillStyle = '#C87B3C'; // orange
        } else if (r4 > 0.04) {
          const bright = 0.4 + r3 * 0.6;
          const g = Math.floor(180 + bright * 49);
          const b = Math.floor(140 + bright * 48);
          ctx.fillStyle = `rgb(0,${g},${b})`; // cyan range
        }
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  function drawOcean(ctx) {
    // Sky — pale blue fading to white at horizon
    for (let y = 0; y < Math.floor(H * 0.38); y++) {
      const t = y / (H * 0.38);
      const r = Math.floor(185 + t * 55);
      const g = Math.floor(210 + t * 38);
      const b = Math.floor(235 + t * 20);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, y, W, 1);
    }

    // Water — perspective bands
    const waterStart = Math.floor(H * 0.38);
    for (let y = waterStart; y < H; y++) {
      const t = (y - waterStart) / (H - waterStart);
      const wave = Math.sin(y * 1.4) * 0.5 + Math.sin(y * 0.7 + 1.2) * 0.5;

      const r = Math.floor(28  + t * 55  + wave * 8);
      const g = Math.floor(75  + t * 60  + wave * 12);
      const b = Math.floor(140 + t * 75  + wave * 18);
      ctx.fillStyle = `rgb(${Math.min(r,255)},${Math.min(g,255)},${Math.min(b,255)})`;
      ctx.fillRect(0, y, W, 1);
    }

    // Foam / glint pixels
    for (let i = 0; i < 400; i++) {
      const r  = rng(i + 9000);
      const r2 = rng(i + 10000);
      const r3 = rng(i + 11000);
      if (r3 > 0.78) {
        const x = Math.floor(r * W);
        const y = waterStart + Math.floor(r2 * (H - waterStart));
        const alpha = 0.3 + r3 * 0.5;
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  onMount(() => {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    mode === 'cloud' ? drawCloud(ctx) : drawOcean(ctx);
  });
</script>

<canvas
  bind:this={canvas}
  width={W}
  height={H}
  style="width: 100%; height: 100%; display: block; image-rendering: pixelated;"
></canvas>
