<script>
  import { onMount, onDestroy } from 'svelte';
  import { playSound, startAmbient, resolveSoundForTarget, toggleMute, isMuted } from '$lib/sound';

  let muted = $state(false);
  let started = $state(false);

  function handleClick(e) {
    // First click anywhere — start ambient
    if (!started) {
      started = true;
      startAmbient();
    }

    const role = resolveSoundForTarget(e.target);
    // Soft clicks are very quiet, don't play on every bare click
    const vol = role === 'soft' ? 0.12 : 0.28;
    playSound(role, vol);
  }

  function handleMuteToggle(e) {
    e.stopPropagation();
    muted = toggleMute();
  }

  onMount(() => {
    document.addEventListener('click', handleClick, { capture: true, passive: true });
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', handleClick, { capture: true });
    }
  });
</script>

<!-- Mute toggle — bottom right, unobtrusive -->
<button
  class="mute-btn"
  class:muted
  onclick={handleMuteToggle}
  aria-label={muted ? 'Unmute' : 'Mute'}
  title={muted ? 'Unmute' : 'Mute sound'}
>
  {muted ? '◻' : '◈'}
</button>

<style>
  .mute-btn {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 999;
    background: none;
    border: 1px solid #333;
    color: #555;
    font-size: 0.9rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s, border-color 0.2s;
    padding: 0;
  }

  .mute-btn:hover {
    color: #fff;
    border-color: #fff;
  }

  .mute-btn.muted {
    color: #333;
    border-color: #222;
  }
</style>
