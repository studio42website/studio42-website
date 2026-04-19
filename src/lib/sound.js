// Studio42 Sound System ◈
// Ambient: zorkow track loops site-wide at low volume
// UI sounds: triggered by click type via event delegation

const BASE = '/audio/';

// Sound roles — swap numbers here once you've listened to them
export const SOUNDS = {
  nav:     'sound-card-1.mp3',   // nav link clicks
  reveal:  'sound-card-2.mp3',   // image / product card clicks
  confirm: 'sound-card-3.mp3',   // button / CTA clicks
  home:    'sound-card-4.mp3',   // logo / home banner
  soft:    'sound-card-5.mp3',   // generic background click
};

const cache = {};
let muted = false;
let ambient = null;
let ambientStarted = false;

export function isMuted() { return muted; }
export function toggleMute() {
  muted = !muted;
  if (ambient) ambient.volume = muted ? 0 : 0.12;
  return muted;
}

export function playSound(role, volume = 0.3) {
  if (muted || typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const file = SOUNDS[role];
  if (!file) return;

  if (!cache[role]) cache[role] = new Audio(BASE + file);

  const clip = cache[role].cloneNode();
  clip.volume = volume;
  clip.play().catch(() => {});
}

export function startAmbient() {
  if (ambientStarted || typeof window === 'undefined') return;
  ambientStarted = true;

  ambient = new Audio(BASE + 'zorkow-parqur.mp3');
  ambient.loop = true;
  ambient.volume = 0;

  ambient.play().then(() => {
    // Fade in slowly
    let vol = 0;
    const fade = setInterval(() => {
      vol = Math.min(vol + 0.01, muted ? 0 : 0.12);
      ambient.volume = vol;
      if (vol >= 0.12) clearInterval(fade);
    }, 100);
  }).catch(() => { ambientStarted = false; });
}

// Called from SoundManager — resolves what sound to play based on what was clicked
export function resolveSoundForTarget(el) {
  // Walk up the DOM a few levels to catch wrapped elements
  let node = el;
  for (let i = 0; i < 5; i++) {
    if (!node || node === document.body) break;

    const tag  = node.tagName?.toLowerCase();
    const cls  = node.className || '';
    const href = node.getAttribute?.('href') || '';

    // Logo / home banner
    if ((tag === 'a' && href === '/') || cls.includes('logo')) return 'home';

    // Buttons and CTAs
    if (tag === 'button' || node.getAttribute?.('role') === 'button') return 'confirm';
    if (tag === 'a' && node.closest?.('.btn, .cta, [class*="button"]')) return 'confirm';

    // Product cards / images
    if (tag === 'img' || cls.includes('product') || cls.includes('card') || tag === 'picture') return 'reveal';

    // Nav links
    if (tag === 'a' && node.closest?.('nav, header')) return 'nav';

    // Any other link
    if (tag === 'a') return 'nav';

    node = node.parentElement;
  }

  return 'soft';
}
