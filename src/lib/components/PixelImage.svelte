<script>
  import { onMount } from 'svelte';

  let { src, alt = '', pixelSize = 5 } = $props();
  let canvas;

  // Unified palette — maps image colors toward the site palette
  const PALETTE = [
    [0,   0,   0  ], // black
    [0,   229, 160], // cyan
    [200, 123, 60 ], // orange
    [74,  127, 168], // ocean blue
    [255, 255, 255], // white
    [255, 101, 139], // pink (logo)
    [20,  20,  20 ], // near-black
    [80,  80,  80 ], // dark grey
    [0,   150, 110], // dark cyan
    [140, 80,  30 ], // dark orange
    [192, 192, 192], // chrome / silver
    [155, 165, 175], // steel blue-grey
  ];

  function nearestColor(r, g, b) {
    let best = 0, bestDist = Infinity;
    for (let i = 0; i < PALETTE.length; i++) {
      const [pr, pg, pb] = PALETTE[i];
      const d = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
      if (d < bestDist) { bestDist = d; best = i; }
    }
    return PALETTE[best];
  }

  onMount(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const w = Math.max(4, Math.floor(img.naturalWidth  / pixelSize));
      const h = Math.max(4, Math.floor(img.naturalHeight / pixelSize));

      // Draw low-res
      const tmp = document.createElement('canvas');
      tmp.width = w; tmp.height = h;
      const tc = tmp.getContext('2d');
      tc.imageSmoothingEnabled = false;
      tc.drawImage(img, 0, 0, w, h);

      // Palette-map
      const id = tc.getImageData(0, 0, w, h);
      for (let i = 0; i < id.data.length; i += 4) {
        const [nr, ng, nb] = nearestColor(id.data[i], id.data[i+1], id.data[i+2]);
        id.data[i] = nr; id.data[i+1] = ng; id.data[i+2] = nb;
      }
      tc.putImageData(id, 0, 0);

      canvas.width  = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tmp, 0, 0);
    };
    img.src = src;
  });
</script>

<canvas
  bind:this={canvas}
  {alt}
  style="width: 100%; height: 100%; display: block; image-rendering: pixelated;"
></canvas>
