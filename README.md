# Croatian Learning App Concept

This repository outlines a concept for a mobile app that helps learners build Croatian proficiency through a structured curriculum, interactive drills, and speech-driven conversation practice. It focuses on progressive skill-building, flexible curriculum management, and persistent progress tracking across sessions.

## Goals
- Guide learners through vocabulary and grammar in a clear sequence (built-in or user-uploaded curriculum).
- Reinforce new items with adaptive quizzing until they are mastered.
- Provide a Dialog Mode that supports two-way spoken conversations for fluency practice.
- Persist progress across sessions and allow targeted review without losing overall advancement.

## Core Features
- **Curriculum options**: Start with an auto-generated curriculum (CEFR-aligned modules) or import a custom plan (CSV/JSON). Modules include objectives, vocabulary lists, grammar notes, and sample dialogs.
- **Lesson flow**: Introduce vocabulary and grammar with concise explanations, audio, and example sentences. Transition directly into drills.
- **Adaptive quizzing**: Mix multiple-choice, typing, and listen-and-repeat prompts. Spaced repetition scheduling promotes long-term retention; items recycle until accuracy thresholds are met.
- **Dialog Mode**: Turn on anytime to hold spoken conversations. The app voices one speaker, asks contextual questions, and listens for verbal replies. Feedback includes transcript, pronunciation hints, and suggested corrections.
- **Review tools**: On-demand review of any module, word, or grammar point without resetting mastery. Quick refresh sessions pull from recent weak items.
- **Progress tracking**: Per-item mastery scores, streaks, time-on-task, and dialog transcripts saved to the learner profile (cloud + local cache). Progress syncs across devices.

## Suggested Architecture
- **Client**: Cross-platform mobile app (Flutter or React Native) with offline cache for curriculum data and progress. Native audio pipeline for speech recognition (ASR) and text-to-speech (TTS).
- **Backend**: Stateless API for authentication, user profiles, curriculum storage, spaced repetition scheduling, and dialog scripts. Optional WebSocket channel for low-latency dialog turns.
- **Data storage**: Cloud database for user profiles, curriculum objects, mastery logs, and dialog histories; encrypted local storage for offline mode.
- **ML/AI services**: ASR (on-device where possible) for Croatian speech, TTS for prompts, and lightweight evaluation for pronunciation/fluency scoring.

## Data Model Sketch
- **User**: id, auth provider, preferences (level, voice, speed), timezone.
- **Curriculum**: id, title, CEFR level, modules[]. Each module: objectives, vocab entries (word, lemma, POS, audio, examples), grammar notes, dialogues.
- **Learning item state**: item id, interval, stability score, due date, ease factor, success history.
- **Dialog session**: session id, scenario id, transcript turns, feedback, timestamps.

## Learning & Dialog Flow
1. Select or import curriculum; app queues the first module.
2. Lesson presents vocab + grammar with audio and examples.
3. Quizzing loop repeats items until mastery thresholds are met; spaced repetition schedules reviews.
4. Learner can enter Dialog Mode anytime; app drives a scenario, listens, and provides corrective feedback.
5. Progress saves after each interaction; review requests pull targeted items without resetting other mastery.

## Security & Privacy Considerations
- Encrypt user data in transit and at rest; minimize personally identifiable information.
- Allow speech data opt-out and configurable retention for dialog transcripts.
- Provide transparent storage of imported curricula; respect copyright and licensing.

## Future Enhancements
- Custom scenario builder for Dialog Mode.
- Downloadable voice packs (standard vs. regional accents).
- Teacher dashboard to assign curricula and monitor cohorts.
- Gamification: badges, XP, streaks, and weekly challenges.

## Next Steps
- Finalize curriculum import/export schema (CSV and JSON examples).
- Prototype lesson and quiz flows with local persistence.
- Integrate ASR/TTS stack and evaluate on-device vs. cloud options.
- Implement spaced repetition engine and dialog feedback heuristics.

## How to Prototype It
1. **Pick a stack and scaffold fast**
   - Choose Flutter (single codebase, strong audio support) or React Native (ecosystem breadth). Create a new app with a single-tab home screen and two core routes: **Learn** (lessons + quizzes) and **Dialog** (speech mode).
2. **Mock curriculum locally**
   - Hardcode 2–3 starter modules in JSON/TypeScript/Dart models. Keep fields small: `id`, `title`, `vocab` (word, translation, example), and `grammar` notes. Store them locally (assets folder) to avoid backend work.
3. **Persistent progress with an on-device store**
   - Add a light repo/service around SQLite/Room/Drift (Flutter) or async-storage/WatermelonDB (React Native) to save: current module index, per-item accuracy %, and next-review timestamps. Seed with a default user profile.
4. **Lesson + quiz loop (offline first)**
   - Screen A: Lesson view shows vocab cards and grammar blurbs with basic text + audio playback (use platform TTS first). Screen B: Quiz view rotates item types (multiple choice + short text). Track attempts; advance when accuracy ≥ a threshold (e.g., 3 consecutive correct). Persist state after each answer.
5. **Spaced repetition stub**
   - Implement a simple scheduler (e.g., SM-2-lite): after each answer, update an `ease` score and set `dueAt`. Show a “Due now” counter on the home screen. Keep the algorithm pluggable so you can swap in a fuller SRS later.
6. **Dialog mode prototype**
   - Use the platform speech-to-text and TTS APIs. Script 2–3 short scenarios (greetings, ordering coffee). Flow: show the prompt, play TTS, capture speech, display transcript, and append a simple rubric (“Understood / Try again”). Store the transcript in local storage.
7. **Review and navigation**
   - Add a “Review” button that pulls any items with `dueAt <= now` and runs the quiz loop again without resetting mastery. Keep navigation simple: Home → Learn/Review, plus a toggle to jump into Dialog mode.
8. **Instrumentation and debugging**
   - Log answers and state transitions to console. Add a developer overlay showing the current module, item queue, and SRS fields to speed iteration.
9. **Prepare for backend later**
   - Encapsulate data access behind interfaces (CurriculumRepo, ProgressRepo). This makes it trivial to swap the local JSON/SQLite layer for an API client once you stand up a backend.
10. **Testing the prototype**
    - Manual happy-path test: complete one module, ensure progress persists after app restart. Dialog smoke test: verify STT → text and TTS playback. Add a couple of unit tests for the scheduler math and progress persistence.

### Fast Milestone Breakdown (1–2 days each)
- **M1**: App shell, navigation, and local curriculum loading.
- **M2**: Lesson view with audio playback and basic quiz cards.
- **M3**: Persistence + simple SRS scheduler + due counter.
- **M4**: Dialog mode with platform STT/TTS and transcript logging.
- **M5**: Polish: review button, developer overlay, and tests.
