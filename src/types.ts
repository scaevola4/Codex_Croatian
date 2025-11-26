export type QuizMode = 'learn' | 'review';

export interface VocabEntry {
  id: string;
  word: string;
  translation: string;
  example: string;
  audioUri?: string;
}

export interface GrammarNote {
  id: string;
  title: string;
  content: string;
}

export interface Module {
  id: string;
  title: string;
  objectives: string[];
  vocab: VocabEntry[];
  grammar: GrammarNote[];
}

export interface Curriculum {
  id: string;
  title: string;
  level: string;
  modules: Module[];
}

export interface ProgressItemState {
  itemId: string;
  ease: number;
  intervalMinutes: number;
  dueAt: number;
  consecutiveCorrect: number;
}

export interface ModuleProgress {
  moduleId: string;
  vocabState: Record<string, ProgressItemState>;
  grammarState: Record<string, ProgressItemState>;
  completed: boolean;
}

export interface ProgressProfile {
  currentModuleIndex: number;
  modules: Record<string, ModuleProgress>;
  lastReview: number | null;
}

export interface DialogScenario {
  id: string;
  title: string;
  turns: { speaker: 'bot' | 'user'; text: string }[];
  rubric: string;
}
