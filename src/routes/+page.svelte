<script>
  import PixelCanvas from '$lib/components/PixelCanvas.svelte';
</script>

<div class="panels">
  <a href="/products/lighting-v1" class="panel" aria-label="View LIGHTING-V1">
    <PixelCanvas mode="cloud" />
  </a>
  <a href="/products/lighting-v1" class="panel" aria-label="View LIGHTING-V1">
    <PixelCanvas mode="ocean" />
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
    overflow: hidden;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .panel:hover { opacity: 0.85; }
</style>
