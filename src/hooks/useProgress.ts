import { useEffect, useMemo, useState } from 'react';
import { Curriculum, Module, ModuleProgress, ProgressItemState, ProgressProfile, QuizMode } from '../types';
import { isDue, updateAfterAnswer } from '../services/scheduler';
import { loadProgress, saveProgress } from '../storage/progressStorage';

interface AnswerPayload {
  itemId: string;
  moduleId: string;
  kind: 'vocab' | 'grammar';
  quality: number;
}

export function useProgress(curriculum: Curriculum) {
  const [profile, setProfile] = useState<ProgressProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress(curriculum.modules).then((loaded) => {
      setProfile(loaded);
      setLoading(false);
    });
  }, [curriculum.modules]);

  const currentModule = useMemo(() => {
    if (!profile) return null;
    return curriculum.modules[profile.currentModuleIndex];
  }, [curriculum.modules, profile]);

  const dueItems = useMemo(() => {
    if (!profile || !currentModule) return [] as ProgressItemState[];
    const moduleState = profile.modules[currentModule.id];
    const now = Date.now();
    return [
      ...Object.values(moduleState.vocabState).filter((item) => isDue(item, now)),
      ...Object.values(moduleState.grammarState).filter((item) => isDue(item, now))
    ];
  }, [currentModule, profile]);

  function handleAnswer(payload: AnswerPayload, mode: QuizMode = 'learn') {
    if (!profile) return;
    const nextProfile: ProgressProfile = JSON.parse(JSON.stringify(profile));
    const moduleProgress = nextProfile.modules[payload.moduleId];
    const bucket = payload.kind === 'vocab' ? moduleProgress.vocabState : moduleProgress.grammarState;
    const existing = bucket[payload.itemId];
    const updated = updateAfterAnswer(existing, payload.quality);
    bucket[payload.itemId] = updated;

    moduleProgress.completed = Object.values(moduleProgress.vocabState).every((v) => v.consecutiveCorrect >= 3);
    nextProfile.modules[payload.moduleId] = moduleProgress;
    if (moduleProgress.completed && mode === 'learn') {
      const nextIndex = Math.min(curriculum.modules.length - 1, nextProfile.currentModuleIndex + 1);
      nextProfile.currentModuleIndex = nextIndex;
    }
    nextProfile.lastReview = Date.now();
    setProfile(nextProfile);
    saveProgress(nextProfile).catch((e) => console.warn('Save failed', e));
  }

  function resetProgress() {
    loadProgress(curriculum.modules).then(setProfile);
  }

  function jumpToModule(moduleId: string) {
    if (!profile) return;
    const index = curriculum.modules.findIndex((m) => m.id === moduleId);
    if (index >= 0) {
      const nextProfile = { ...profile, currentModuleIndex: index };
      setProfile(nextProfile);
      saveProgress(nextProfile).catch(() => undefined);
    }
  }

  return { profile, loading, currentModule, dueItems, handleAnswer, resetProgress, jumpToModule };
}
