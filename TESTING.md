# Testing the prototype locally

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Launch Expo**
   ```bash
   npm run start
   ```
   - Press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.
3. **Smoke tests**
   - On **Početna**, confirm the due counter shows a number and the module card loads.
   - Tap **Lesson** then **Počni kviz**; answer a few prompts and return Home to see the due counter update.
   - Tap **Review** on Home to re-run the quiz loop without advancing modules.
   - Open **Dijalog** and tap **Play prompt** to hear TTS for each scripted turn.
4. **Persistence check**
   - Close and reopen the app; the current module and mastered counts should persist (AsyncStorage). If running web, persistence may rely on IndexedDB.
