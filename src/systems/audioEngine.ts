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
