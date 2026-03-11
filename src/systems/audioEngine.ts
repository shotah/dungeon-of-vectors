let audioCtx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'square', volume = 0.1) {
  try {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio not available
  }
}

export function playFootstep() {
  playTone(80 + Math.random() * 40, 0.08, 'triangle', 0.05);
}

export function playDoorOpen() {
  playTone(150, 0.15, 'square', 0.06);
  setTimeout(() => playTone(200, 0.1, 'square', 0.04), 100);
}

export function playAttack() {
  playTone(200, 0.05, 'sawtooth', 0.08);
  setTimeout(() => playTone(100, 0.08, 'sawtooth', 0.06), 50);
}

/** Blade swipe / whoosh for physical attacks. */
export function playSwipe() {
  try {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = 0.2;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(380, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio not available
  }
}

/** Low boom for spell casting. */
export function playMagicBoom() {
  try {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = 0.45;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(90, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio not available
  }
}

export function playHit() {
  playTone(80, 0.1, 'square', 0.08);
}

export function playMagic() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => playTone(300 + i * 100, 0.1, 'sine', 0.04), i * 60);
  }
}

export function playHeal() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => playTone(400 + i * 150, 0.15, 'sine', 0.05), i * 100);
  }
}

export function playVictory() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((n, i) => {
    setTimeout(() => playTone(n, 0.2, 'square', 0.06), i * 150);
  });
}

export function playDefeat() {
  const notes = [400, 350, 300, 200];
  notes.forEach((n, i) => {
    setTimeout(() => playTone(n, 0.3, 'sawtooth', 0.05), i * 200);
  });
}

export function playChest() {
  playTone(400, 0.1, 'sine', 0.06);
  setTimeout(() => playTone(600, 0.15, 'sine', 0.06), 100);
  setTimeout(() => playTone(800, 0.2, 'sine', 0.06), 200);
}

export function playLevelUp() {
  const notes = [523, 659, 784, 1047, 784, 1047];
  notes.forEach((n, i) => {
    setTimeout(() => playTone(n, 0.15, 'sine', 0.07), i * 100);
  });
}

export function playCombatStart() {
  playTone(200, 0.1, 'square', 0.07);
  setTimeout(() => playTone(300, 0.1, 'square', 0.07), 100);
  setTimeout(() => playTone(250, 0.15, 'square', 0.07), 200);
}

// --- Simple repeating MIDI-style floor music (3 tracks, random per floor) ---
const MUSIC_VOLUME = 0.06;
const MUSIC_NOTE_TYPE: OscillatorType = 'triangle';

/** [freq, durationSeconds] – expanded melodies, ~50–65 sec each. A minor / D minor / E minor. */
const FLOOR_MUSIC_PATTERNS: [number, number][][] = [
  // Track 0: A minor – full melody: intro, climb, peak, middle, return, repeat with variation, close. (~58s)
  [
    [220, 0.5], [261.63, 0.35], [220, 0.45], [196, 0.5], [220, 0.4], [261.63, 0.5], [329.63, 0.45], [261.63, 0.5],
    [220, 0.5], [246.94, 0.35], [261.63, 0.4], [220, 0.5], [196, 0.45], [220, 0.55], [261.63, 0.4], [329.63, 0.5], [293.66, 0.45], [261.63, 0.55],
    [220, 0.45], [261.63, 0.4], [329.63, 0.5], [261.63, 0.4], [293.66, 0.5], [329.63, 0.45], [349.23, 0.5], [329.63, 0.5],
    [261.63, 0.5], [293.66, 0.45], [261.63, 0.5], [220, 0.55], [246.94, 0.4], [261.63, 0.5], [220, 0.6],
    [196, 0.5], [220, 0.45], [261.63, 0.5], [220, 0.45], [196, 0.55], [220, 0.5], [261.63, 0.45], [329.63, 0.5], [261.63, 0.5],
    [220, 0.5], [329.63, 0.4], [293.66, 0.45], [261.63, 0.5], [220, 0.55], [196, 0.5], [220, 0.6],
    [261.63, 0.4], [329.63, 0.5], [261.63, 0.45], [220, 0.6], [246.94, 0.4], [261.63, 0.5], [220, 0.55], [196, 0.5], [220, 0.65],
    [220, 0.5], [261.63, 0.35], [220, 0.45], [196, 0.5], [220, 0.4], [261.63, 0.5], [329.63, 0.45], [261.63, 0.5],
    [293.66, 0.4], [329.63, 0.5], [261.63, 0.45], [220, 0.55], [196, 0.5], [220, 0.5], [261.63, 0.45], [329.63, 0.5], [261.63, 0.5],
    [220, 0.55], [196, 0.5], [220, 0.6], [261.63, 0.4], [329.63, 0.5], [261.63, 0.45], [220, 0.65],
  ],
  // Track 1: D minor – deeper, solemn. Two full passes with second pass variation. (~62s)
  [
    [146.83, 0.6], [174.61, 0.45], [196, 0.55], [174.61, 0.5], [146.83, 0.75],
    [164.81, 0.45], [174.61, 0.55], [220, 0.5], [196, 0.55], [174.61, 0.6], [146.83, 0.7],
    [174.61, 0.5], [196, 0.55], [220, 0.5], [233.08, 0.45], [220, 0.55], [196, 0.6], [174.61, 0.65],
    [146.83, 0.6], [164.81, 0.5], [174.61, 0.55], [196, 0.5], [174.61, 0.6], [146.83, 0.8],
    [164.81, 0.5], [174.61, 0.55], [220, 0.5], [196, 0.55], [174.61, 0.6], [146.83, 0.7],
    [196, 0.5], [174.61, 0.55], [146.83, 0.65], [164.81, 0.5], [174.61, 0.6], [196, 0.5], [220, 0.55], [196, 0.6],
    [174.61, 0.55], [146.83, 0.7], [174.61, 0.5], [196, 0.55], [174.61, 0.6], [146.83, 0.85],
    [146.83, 0.6], [174.61, 0.45], [196, 0.55], [220, 0.5], [196, 0.55], [174.61, 0.65],
    [164.81, 0.5], [174.61, 0.55], [146.83, 0.7], [174.61, 0.5], [196, 0.55], [174.61, 0.6], [146.83, 0.8],
    [196, 0.5], [220, 0.5], [196, 0.55], [174.61, 0.6], [146.83, 0.85],
  ],
  // Track 2: E minor – tenser, more motion. Extended with extra phrase and closing. (~55s)
  [
    [164.81, 0.35], [196, 0.35], [246.94, 0.35], [220, 0.4], [196, 0.35], [164.81, 0.5],
    [185, 0.35], [220, 0.35], [246.94, 0.4], [261.63, 0.35], [246.94, 0.4], [220, 0.5],
    [164.81, 0.4], [220, 0.35], [196, 0.4], [185, 0.35], [164.81, 0.55],
    [246.94, 0.35], [220, 0.4], [196, 0.35], [220, 0.5], [164.81, 0.55],
    [196, 0.35], [220, 0.35], [246.94, 0.4], [261.63, 0.35], [293.66, 0.4], [261.63, 0.45], [246.94, 0.5],
    [220, 0.4], [196, 0.35], [220, 0.45], [246.94, 0.35], [220, 0.4], [196, 0.5],
    [164.81, 0.35], [185, 0.35], [196, 0.4], [220, 0.35], [246.94, 0.45], [220, 0.4], [196, 0.5],
    [164.81, 0.4], [220, 0.35], [246.94, 0.4], [220, 0.45], [196, 0.35], [220, 0.5], [164.81, 0.6],
    [246.94, 0.35], [261.63, 0.4], [246.94, 0.35], [220, 0.5], [196, 0.4], [220, 0.45], [164.81, 0.6],
    [185, 0.35], [220, 0.35], [246.94, 0.4], [220, 0.4], [196, 0.5], [164.81, 0.4], [220, 0.5], [164.81, 0.6],
  ],
];

const MUSIC_ROTATE_SECONDS = 90;

/** Floors 1–2: track 0 (A minor), 3–4: track 1 (D minor), 5+: track 2 (E minor). */
function trackIndexForFloor(floor: number): number {
  if (floor <= 2) return 0;
  if (floor <= 4) return 1;
  return 2;
}

let musicTimeoutId: ReturnType<typeof setTimeout> | null = null;
let musicRotationTimeoutId: ReturnType<typeof setTimeout> | null = null;
let musicGetCurrentFloor: (() => number) | null = null;
let musicNoteIndex = 0;
let musicTrackIndex = 0;

function playMusicNote(freq: number, duration: number) {
  try {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = MUSIC_NOTE_TYPE;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(MUSIC_VOLUME, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // ignore
  }
}

function scheduleNextMusicNote() {
  const pattern = FLOOR_MUSIC_PATTERNS[musicTrackIndex];
  if (!pattern?.length) return;
  const [freq, duration] = pattern[musicNoteIndex];
  playMusicNote(freq, duration);
  musicNoteIndex = (musicNoteIndex + 1) % pattern.length;
  musicTimeoutId = setTimeout(scheduleNextMusicNote, duration * 1000);
}

/**
 * Start floor music. Uses floor to pick track by depth: 1–2 = A minor, 3–4 = D minor, 5+ = E minor.
 * Pass getCurrentFloor so the 90s rotation restarts with the correct track for the current floor.
 */
export function startFloorMusic(floor?: number, getCurrentFloor?: () => number) {
  stopFloorMusic();
  try {
    getContext();
    musicGetCurrentFloor = getCurrentFloor ?? null;
    if (floor !== undefined && floor >= 1) {
      musicTrackIndex = trackIndexForFloor(floor);
    } else if (musicGetCurrentFloor) {
      musicTrackIndex = trackIndexForFloor(musicGetCurrentFloor());
    } else {
      musicTrackIndex = Math.floor(Math.random() * 3);
    }
    musicNoteIndex = 0;
    const pattern = FLOOR_MUSIC_PATTERNS[musicTrackIndex];
    if (pattern?.length) {
      const [freq, duration] = pattern[0];
      playMusicNote(freq, duration);
      musicNoteIndex = 1;
      musicTimeoutId = setTimeout(scheduleNextMusicNote, duration * 1000);
      musicRotationTimeoutId = setTimeout(() => {
        const nextFloor = musicGetCurrentFloor?.();
        startFloorMusic(nextFloor !== undefined && nextFloor >= 1 ? nextFloor : undefined, musicGetCurrentFloor ?? undefined);
      }, MUSIC_ROTATE_SECONDS * 1000);
    }
  } catch {
    // Audio not available
  }
}

/** Stop the floor music loop and rotation timer. */
export function stopFloorMusic() {
  if (musicTimeoutId != null) {
    clearTimeout(musicTimeoutId);
    musicTimeoutId = null;
  }
  if (musicRotationTimeoutId != null) {
    clearTimeout(musicRotationTimeoutId);
    musicRotationTimeoutId = null;
  }
  musicGetCurrentFloor = null;
}
