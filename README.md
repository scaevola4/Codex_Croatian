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
