<script>
  import { onMount } from 'svelte';
  import {
    DECK, playTrack, stopAll, toggleShuffle, toggleMute,
    isMuted, getShuffle, getActive, onStateChange, initOnInteraction
  } from '$lib/sound';

  let activeIdx  = $state(-1);
  let shuffle    = $state(true);
  let muted      = $state(false);

  onMount(() => {
    onStateChange(
      (idx) => { activeIdx = idx; },
      (s)   => { shuffle = s; }
    );
    // Start shuffle on first click anywhere
    const handler = () => { initOnInteraction(); document.removeEventListener('click', handler); };
    document.addEventListener('click', handler);
  });

  function handleTrack(e, idx) {
    e.stopPropagation();
    if (activeIdx === idx) { stopAll(); } else { playTrack(idx); }
  }

  function handleShuffle(e) {
    e.stopPropagation();
    shuffle = toggleShuffle();
  }

  function handleMute(e) {
    e.stopPropagation();
    muted = toggleMute();
  }

  // ── Pixel art icon generator ──────────────────────────────────────────────
  // Each icon is an 8×8 grid encoded as 8 rows of 8 bits
  const PIXELS = {
    sc01: [ // diamond — red
      0b00011000,
      0b00111100,
      0b01111110,
      0b11111111,
      0b11111111,
      0b01111110,
      0b00111100,
      0b00011000,
    ],
    sc02: [ // equalizer bars — cyan
      0b10000001,
      0b10000101,
      0b10010101,
      0b10111101,
      0b10111101,
      0b11111101,
      0b11111111,
      0b11111111,
    ],
    sc03: [ // plus/cross — green
      0b00011000,
      0b00011000,
      0b00011000,
      0b11111111,
      0b11111111,
      0b00011000,
      0b00011000,
      0b00011000,
    ],
    sc04: [ // ring/circle — magenta
      0b00111100,
      0b01000010,
      0b10000001,
      0b10000001,
      0b10000001,
      0b10000001,
      0b01000010,
      0b00111100,
    ],
    sc05: [ // lightning bolt — yellow
      0b00011100,
      0b00011000,
      0b00110000,
      0b01111100,
      0b00111110,
      0b00001100,
      0b00001100,
      0b00000100,
    ],
    sc06: [ // sine wave — purple
      0b01100000,
      0b10010000,
      0b00001001,
      0b00000110,
      0b00000110,
      0b00001001,
      0b10010000,
      0b01100000,
    ],
    shuffle: [ // two crossing arrows — white
      0b00110001,
      0b01110011,
      0b11000110,
      0b10001100,
      0b00110001,
      0b01100011,
      0b11000110,
      0b10001100,
    ],
  };

  function pixelSVG(key, color, size = 24) {
    const grid = PIXELS[key];
    const px   = size / 8;
    let rects  = '';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if ((grid[r] >> (7 - c)) & 1) {
          rects += `<rect x="${c * px}" y="${r * px}" width="${px}" height="${px}" fill="${color}"/>`;
        }
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="image-rendering:pixelated">${rects}</svg>`;
  }
</script>

<div class="deck">
  {#each DECK as track, i}
    {@const active = activeIdx === i}
    <button
      class="sc-btn"
      class:active
      style="--c: {track.color}"
      onclick={(e) => handleTrack(e, i)}
      title={track.label}
      aria-label={track.label}
    >
      {@html pixelSVG(track.id, active ? track.color : '#444', 20)}
    </button>
  {/each}

  <!-- Shuffle toggle -->
  <button
    class="sc-btn shuffle-btn"
    class:active={shuffle}
    style="--c: #ffffff"
    onclick={handleShuffle}
    title="Shuffle loop"
    aria-label="Toggle shuffle"
  >
    {@html pixelSVG('shuffle', shuffle ? '#ffffff' : '#444', 20)}
  </button>

  <!-- Mute -->
  <button
    class="sc-btn mute-btn"
    class:muted
    onclick={handleMute}
    aria-label={muted ? 'Unmute' : 'Mute'}
    title={muted ? 'Unmute' : 'Mute'}
  >
    {muted ? '▣' : '◈'}
  </button>
</div>

<style>
  .deck {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .sc-btn {
    background: none;
    border: 1px solid #222;
    border-radius: 3px;
    width: 28px;
    height: 28px;
    padding: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.15s, background 0.15s;
    flex-shrink: 0;
  }

  .sc-btn:hover {
    border-color: var(--c, #fff);
    background: rgba(255,255,255,0.04);
  }

  .sc-btn.active {
    border-color: var(--c, #fff);
    background: rgba(255,255,255,0.07);
    box-shadow: 0 0 6px var(--c, #fff);
  }

  .mute-btn {
    color: #555;
    font-size: 0.8rem;
    --c: #fff;
  }

  .mute-btn:hover { color: #fff; }
  .mute-btn.muted { color: #333; border-color: #1a1a1a; }

  @media (max-width: 768px) {
    .deck { gap: 0.25rem; }
    .sc-btn { width: 24px; height: 24px; padding: 2px; }
  }
</style>
