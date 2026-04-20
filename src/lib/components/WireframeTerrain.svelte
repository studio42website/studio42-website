<script>
  import { onMount } from 'svelte';

  let canvas;
  const W = 700, H = 520;

  function rng(s) {
    const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  }

  function terrainH(col, row, COLS, ROWS) {
    const x = (col / COLS) * 4.2;
    const y = (row / ROWS) * 3.1;
    let v = Math.sin(x * 1.9 + 0.8) * Math.cos(y * 1.5 + 0.4) * 0.42
          + Math.sin(x * 3.8 + y * 2.9 + 1.2) * 0.28
          + Math.sin(x * 7.3 + 2.1) * Math.cos(y * 6.1 + 1.6) * 0.14
          + Math.sin(x * 13.7 + y * 11.5 + 3.1) * 0.07
          + Math.sin(x * 23.4 + 0.5) * 0.04;
    v = (v + 1) / 2;
    const cx = (col / (COLS - 1) - 0.5) * 2;
    const cy = (row / (ROWS - 1) - 0.5) * 2;
    const fade = Math.max(0, 1 - (Math.abs(cx) * 0.45 + Math.abs(cy) * 0.35));
    return v * fade * 0.9;
  }

  onMount(() => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    const COLS = 50, ROWS = 38;
    const MAX_H = 148;
    const BOX_H = 0.10;

    const OX = W * 0.50;
    const OY = H * 0.76;

    function project(col, row, h) {
      const px = OX + (col - COLS / 2) * 11.2 - (row - ROWS / 2) * 6.8;
      const py = OY + (col - COLS / 2) * 3.1 + (row - ROWS / 2) * 8.6 - h * MAX_H;
      return [px, py];
    }

    const corners = [[0, 0], [COLS - 1, 0], [COLS - 1, ROWS - 1], [0, ROWS - 1]];

    // Box outline
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 0.8;

    ctx.beginPath();
    corners.forEach(([c, r], i) => {
      const [x, y] = project(c, r, 0);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();

    corners.forEach(([c, r]) => {
      const [x0, y0] = project(c, r, 0);
      const [x1, y1] = project(c, r, BOX_H);
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    });

    ctx.beginPath();
    corners.forEach(([c, r], i) => {
      const [x, y] = project(c, r, BOX_H);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();

    // Terrain rows — back to front
    for (let row = ROWS - 1; row >= 0; row--) {
      const depth = 1 - row / ROWS;
      ctx.strokeStyle = `rgba(255,255,255,${0.42 + depth * 0.46})`;
      ctx.lineWidth = 0.55;
      ctx.beginPath();
      for (let col = 0; col < COLS; col++) {
        const h = Math.max(BOX_H, terrainH(col, row, COLS, ROWS));
        const [x, y] = project(col, row, h);
        col === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Terrain columns — faint
    for (let col = 0; col < COLS; col++) {
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 0.4;
      ctx.beginPath();
      for (let row = ROWS - 1; row >= 0; row--) {
        const h = Math.max(BOX_H, terrainH(col, row, COLS, ROWS));
        const [x, y] = project(col, row, h);
        row === ROWS - 1 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Scatter dots
    for (let i = 0; i < 380; i++) {
      const r1 = rng(i * 7.3);
      const r2 = rng(i * 13.7 + 999);
      const r3 = rng(i * 19.1 + 1998);
      if (r3 < 0.52) continue;
      const col = r1 * COLS;
      const row = r2 * ROWS;
      const h = terrainH(Math.floor(col), Math.floor(row), COLS, ROWS) + r3 * 0.09;
      const [x, y] = project(col, row, Math.max(BOX_H, h));
      ctx.fillStyle = `rgba(255,255,255,${0.22 + r3 * 0.58})`;
      ctx.fillRect(x, y, 1, 1);
    }
  });
</script>

<canvas
  bind:this={canvas}
  width={W}
  height={H}
  style="width: 100%; height: 100%; display: block;"
></canvas>
