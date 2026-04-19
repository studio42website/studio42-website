// Studio42 Sound System ◈

const BASE = '/audio/';

export const DECK = [
  { id: 'sc01', label: 'SOUNDCARD01', file: 'sound-card-1.mp3', color: '#FF3B3B' },
  { id: 'sc02', label: 'SOUNDCARD02', file: 'sound-card-2.mp3', color: '#00D9FF' },
  { id: 'sc03', label: 'SOUNDCARD03', file: 'sound-card-3.mp3', color: '#39FF14' },
  { id: 'sc04', label: 'SOUNDCARD04', file: 'sound-card-4.mp3', color: '#FF006E' },
  { id: 'sc05', label: 'SOUNDCARD05', file: 'sound-card-5.mp3', color: '#FFD700' },
  { id: 'sc06', label: 'SOUNDCARD06', file: 'zorkow-parqur.mp3', color: '#A855F7' },
];

let current     = null;   // active Audio element
let currentIdx  = -1;     // index in DECK
let shuffleOn   = true;   // default ON
let muted       = false;
let started     = false;  // browser interaction gate

// callbacks for reactive UI updates
let onTrackChange = () => {};
let onShuffleChange = () => {};

export function onStateChange(trackCb, shuffleCb) {
  onTrackChange  = trackCb;
  onShuffleChange = shuffleCb;
}

export function isMuted()    { return muted; }
export function isStarted()  { return started; }
export function getActive()  { return currentIdx; }
export function getShuffle() { return shuffleOn; }

export function toggleMute() {
  muted = !muted;
  if (current) current.volume = muted ? 0 : 0.45;
  return muted;
}

function nextRandom(exclude) {
  const opts = DECK.map((_, i) => i).filter(i => i !== exclude);
  return opts[Math.floor(Math.random() * opts.length)];
}

function playIdx(idx) {
  if (current) {
    current.pause();
    current.onended = null;
  }

  currentIdx = idx;
  current = new Audio(BASE + DECK[idx].file);
  current.volume = muted ? 0 : 0.45;

  current.onended = () => {
    if (shuffleOn) {
      const next = nextRandom(currentIdx);
      playIdx(next);
    } else {
      currentIdx = -1;
      onTrackChange(-1);
    }
  };

  current.play().catch(() => {});
  onTrackChange(idx);
}

export function playTrack(idx) {
  started = true;
  playIdx(idx);
}

export function stopAll() {
  if (current) {
    current.pause();
    current.onended = null;
    current = null;
  }
  currentIdx = -1;
  onTrackChange(-1);
}

export function toggleShuffle() {
  shuffleOn = !shuffleOn;
  if (shuffleOn && currentIdx === -1 && started) {
    playIdx(nextRandom(-1));
  }
  onShuffleChange(shuffleOn);
  return shuffleOn;
}

// Called on first user interaction — starts shuffle if still default ON
export function initOnInteraction() {
  if (started) return;
  started = true;
  if (shuffleOn) playIdx(nextRandom(-1));
}
