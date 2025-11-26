import { ProgressItemState } from '../types';

const MIN_INTERVAL = 5; // minutes
const MAX_INTERVAL = 7200; // 5 days in minutes for prototype

export function createInitialState(itemId: string): ProgressItemState {
  return {
    itemId,
    ease: 2.5,
    intervalMinutes: MIN_INTERVAL,
    dueAt: Date.now(),
    consecutiveCorrect: 0
  };
}

export function updateAfterAnswer(state: ProgressItemState, quality: number): ProgressItemState {
  const now = Date.now();
  const clampedQuality = Math.min(Math.max(quality, 0), 5);
  let ease = state.ease + (0.1 - (5 - clampedQuality) * (0.08 + (5 - clampedQuality) * 0.02));
  ease = Math.max(1.3, ease);

  let intervalMinutes = state.intervalMinutes;
  let consecutiveCorrect = state.consecutiveCorrect;

  if (clampedQuality < 3) {
    intervalMinutes = MIN_INTERVAL;
    consecutiveCorrect = 0;
  } else {
    consecutiveCorrect += 1;
    if (consecutiveCorrect === 1) {
      intervalMinutes = MIN_INTERVAL;
    } else if (consecutiveCorrect === 2) {
      intervalMinutes = MIN_INTERVAL * 6;
    } else {
      intervalMinutes = Math.min(intervalMinutes * ease, MAX_INTERVAL);
    }
  }

  const dueAt = now + intervalMinutes * 60 * 1000;
  return { ...state, ease, intervalMinutes, dueAt, consecutiveCorrect };
}

export function isDue(state: ProgressItemState, at: number = Date.now()): boolean {
  return state.dueAt <= at;
}
