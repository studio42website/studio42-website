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
    // UI sounds disabled for now — paths preserved in sound.js
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

