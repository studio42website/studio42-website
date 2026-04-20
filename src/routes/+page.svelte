<script>
  import PixelCanvas from '$lib/components/PixelCanvas.svelte';
  import BrailleCanvas from '$lib/components/BrailleCanvas.svelte';
</script>

<div class="panels">
  <a href="/products/lighting-v1" class="panel" aria-label="View LIGHTING-V1">
    <PixelCanvas mode="cloud" />
    <div class="panel-label">
      <span class="label-name">LIGHTING — V1</span>
      <span class="label-sub">Limited to 5 · Ljubljana</span>
    </div>
  </a>
  <a href="/products/lighting-v1" class="panel" aria-label="View LIGHTING-V1">
    <PixelCanvas mode="ocean" />
    <div class="braille-layer" aria-hidden="true">
      <BrailleCanvas cols={72} rows={48} color="#4A7FA8" threshold={0.7} speed={900} />
    </div>
    <div class="panel-label panel-label--right">
      <span class="label-name">SHOP →</span>
      <span class="label-sub">€50 · Handmade</span>
    </div>
  </a>
</div>

<style>
  .panels {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
    background: #000;
    padding-top: 61px; /* header height */
    box-sizing: border-box;
    gap: 2px;
  }

  .panel {
    display: block;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .panel::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  .panel-label {
    position: absolute;
    bottom: 1.75rem;
    left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    pointer-events: none;
  }

  .panel-label--right {
    left: auto;
    right: 1.5rem;
    align-items: flex-end;
  }

  .label-name {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #fff;
    opacity: 0.9;
  }

  .label-sub {
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    color: #555;
    transition: color 0.2s;
  }

  .panel:hover .label-sub { color: #888; }

  .braille-layer {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    opacity: 0.5;
    pointer-events: none;
    mix-blend-mode: screen;
  }
</style>
