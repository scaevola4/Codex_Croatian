import AsyncStorage from '@react-native-async-storage/async-storage';
import { Module, ProgressItemState, ProgressProfile } from '../types';
import { createInitialState } from '../services/scheduler';

const STORAGE_KEY = 'croatian-learning-progress';

const inMemory: { profile: ProgressProfile | null } = { profile: null };

function buildDefaultProfile(modules: Module[]): ProgressProfile {
  const moduleProgressEntries = modules.map((module) => {
    const vocabState: Record<string, ProgressItemState> = {};
    module.vocab.forEach((v) => {
      vocabState[v.id] = createInitialState(v.id);
    });
    const grammarState: Record<string, ProgressItemState> = {};
    module.grammar.forEach((g) => {
      grammarState[g.id] = createInitialState(g.id);
    });

    return [module.id, { moduleId: module.id, vocabState, grammarState, completed: false }];
  });

  return {
    currentModuleIndex: 0,
    modules: Object.fromEntries(moduleProgressEntries),
    lastReview: null
  };
}

export async function loadProgress(modules: Module[]): Promise<ProgressProfile> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: ProgressProfile = JSON.parse(raw);
      inMemory.profile = parsed;
      return parsed;
    }
  } catch (error) {
    console.warn('Falling back to in-memory progress', error);
  }

  const profile = buildDefaultProfile(modules);
  inMemory.profile = profile;
  return profile;
}

export async function saveProgress(profile: ProgressProfile): Promise<void> {
  inMemory.profile = profile;
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.warn('Failed to persist progress; continuing with in-memory state', error);
  }
}

export function getInMemoryProgress(): ProgressProfile | null {
  return inMemory.profile;
}
