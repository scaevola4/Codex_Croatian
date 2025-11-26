# Croatian Learning App Prototype

This repository scaffolds a React Native (Expo) prototype for a Croatian-learning mobile app. It follows the previously outlined plan: local curriculum seed, lesson + quiz loop, lightweight spaced-repetition scheduler, Dialog mode with text-to-speech, and on-device progress persistence.

## What’s included
- **Local curriculum seed**: Three starter modules (greetings, coffee order, directions) with vocab + grammar notes stored in code.
- **Lesson + quiz loop**: Lesson view shows objectives, vocab cards, and grammar blurbs; quiz view rotates vocab prompts and records spaced-repetition scores.
- **Progress persistence**: AsyncStorage-backed profile for module progression and per-item states (in-memory fallback included).
- **Simple SRS**: SM-2-lite scheduler with due counter surfaced on the home screen.
- **Dialog mode prototype**: TTS-driven scripted scenarios with turn navigation and rubric hints.
- **Navigation shell**: Single-file routing across Home, Lesson, Quiz, Review, and Dialog screens with a bottom nav bar.

## Project structure
- `App.tsx`: Screen shell, navigation, and screen wiring.
- `src/data/curriculum.ts`: Seed curriculum modules.
- `src/services/scheduler.ts`: SM-2-lite spaced repetition helpers.
- `src/services/dialogScenarios.ts`: Scripted dialog flows.
- `src/storage/progressStorage.ts`: AsyncStorage + fallback persistence helpers.
- `src/hooks/useProgress.ts`: Progress loader, saver, and answer handler.
- `src/components/`: UI atoms for modules, quizzes, grammar notes, and dialog playback.

## Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`) or `npx expo` via local dev deps.
- iOS Simulator, Android Emulator, or Expo Go on a device for testing. Microphone permissions are required to extend STT; the current prototype focuses on TTS + scripted turns.

## Running the prototype
```bash
npm install
npm run start
```
Use Expo DevTools to launch on iOS, Android, or web. Navigation buttons are available at the bottom of the app:
- **Početna**: Home with due counter and module overview.
- **Uči**: Lesson content for the active module.
- **Kviz**: Learning quiz loop (updates SRS and module completion).
- **Dijalog**: TTS-driven dialog practice.
- **Review button on Home**: Runs the quiz loop in review mode (no module advancement).

## Extending
- Add more modules to `src/data/curriculum.ts` (vocab + grammar arrays).
- Wire a real ASR provider into `DialogPanel` to capture microphone input.
- Swap `progressStorage` implementation for a backend API client while keeping the hook stable.
- Insert unit tests around `scheduler.ts` and `progressStorage.ts` once the runtime environment is installed.
