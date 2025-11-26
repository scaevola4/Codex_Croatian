import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, Button, FlatList, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { localCurriculum } from './src/data/curriculum';
import { dialogScenarios } from './src/services/dialogScenarios';
import { ModuleOverview } from './src/components/ModuleOverview';
import { QuizCard } from './src/components/QuizCard';
import { GrammarNoteCard } from './src/components/GrammarNoteCard';
import { DialogPanel } from './src/components/DialogPanel';
import { useProgress } from './src/hooks/useProgress';
import { Module, QuizMode, VocabEntry } from './src/types';

function LessonScreen({ module, onStartQuiz }: { module: Module; onStartQuiz: () => void }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.padded}>
      <Text style={styles.header}>{module.title}</Text>
      <Text style={styles.subheader}>Ciljevi: {module.objectives.join(', ')}</Text>
      <Text style={styles.section}>Rječnik</Text>
      {module.vocab.map((v) => (
        <View key={v.id} style={styles.listItem}>
          <Text style={styles.itemTitle}>{v.word}</Text>
          <Text style={styles.itemSubtitle}>{v.translation}</Text>
          <Text style={styles.example}>Primjer: {v.example}</Text>
        </View>
      ))}
      <Text style={styles.section}>Gramatika</Text>
      {module.grammar.map((note) => (
        <GrammarNoteCard key={note.id} note={note} />
      ))}
      <Button title="Počni kviz" onPress={onStartQuiz} />
    </ScrollView>
  );
}

function QuizScreen({
  module,
  mode,
  onDone,
  onAnswer
}: {
  module: Module;
  mode: QuizMode;
  onDone: () => void;
  onAnswer: (entry: VocabEntry, quality: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const entry = module.vocab[index];
  return (
    <View style={[styles.screen, styles.padded]}>
      <Text style={styles.header}>{mode === 'learn' ? 'Kviz učenja' : 'Brza obnova'}</Text>
      <QuizCard
        entry={entry}
        onAnswer={(quality) => {
          onAnswer(entry, quality);
          const nextIndex = (index + 1) % module.vocab.length;
          setIndex(nextIndex);
        }}
      />
      <Button title="Gotovo" onPress={onDone} />
    </View>
  );
}

function DialogScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.padded}>
      <Text style={styles.header}>Dijalog mod</Text>
      {dialogScenarios.map((scenario) => (
        <DialogPanel key={scenario.id} scenario={scenario} />
      ))}
    </ScrollView>
  );
}

export default function App() {
  const { profile, loading, currentModule, handleAnswer, jumpToModule, dueItems } = useProgress(localCurriculum);
  const [route, setRoute] = useState<'home' | 'lesson' | 'quiz' | 'dialog' | 'review'>('home');

  const moduleProgress = useMemo(() => {
    if (!profile || !currentModule) return null;
    return profile.modules[currentModule.id];
  }, [currentModule, profile]);

  if (loading || !profile || !currentModule || !moduleProgress) {
    return (
      <SafeAreaView style={[styles.screen, styles.centered]}>
        <ActivityIndicator size="large" />
        <Text>Loading curriculum...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      {route === 'home' && (
        <ScrollView contentContainerStyle={styles.padded}>
          <Text style={styles.header}>Dobrodošli!</Text>
          <Text style={styles.subheader}>Trenutni modul: {currentModule.title}</Text>
          <Text style={styles.meta}>Dospjelo za ponavljanje: {dueItems.length}</Text>
          <ModuleOverview
            module={currentModule}
            progress={moduleProgress}
            onStartLesson={() => setRoute('lesson')}
            onStartReview={() => setRoute('review')}
            onOpenDialog={() => setRoute('dialog')}
          />
          <Text style={styles.section}>Skok na modul</Text>
          <FlatList
            data={localCurriculum.modules}
            keyExtractor={(m) => m.id}
            renderItem={({ item }) => (
              <Button
                title={`${item.title}`}
                onPress={() => {
                  jumpToModule(item.id);
                  setRoute('home');
                }}
              />
            )}
          />
        </ScrollView>
      )}

      {route === 'lesson' && (
        <LessonScreen module={currentModule} onStartQuiz={() => setRoute('quiz')} />
      )}

      {route === 'quiz' && (
        <QuizScreen
          module={currentModule}
          mode="learn"
          onDone={() => setRoute('home')}
          onAnswer={(entry, quality) => handleAnswer({
            itemId: entry.id,
            moduleId: currentModule.id,
            kind: 'vocab',
            quality
          })}
        />
      )}

      {route === 'review' && (
        <QuizScreen
          module={currentModule}
          mode="review"
          onDone={() => setRoute('home')}
          onAnswer={(entry, quality) => handleAnswer({
            itemId: entry.id,
            moduleId: currentModule.id,
            kind: 'vocab',
            quality
          }, 'review')}
        />
      )}

      {route === 'dialog' && <DialogScreen />}

      <View style={styles.navbar}>
        <Button title="Početna" onPress={() => setRoute('home')} />
        <Button title="Uči" onPress={() => setRoute('lesson')} />
        <Button title="Kviz" onPress={() => setRoute('quiz')} />
        <Button title="Dijalog" onPress={() => setRoute('dialog')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f8fafc' },
  padded: { padding: 16, gap: 16 },
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subheader: { fontSize: 16, color: '#374151', marginBottom: 8 },
  meta: { color: '#6b7280', marginBottom: 12 },
  section: { fontWeight: '700', marginBottom: 6 },
  listItem: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 8 },
  itemTitle: { fontWeight: '700' },
  itemSubtitle: { color: '#4b5563' },
  example: { color: '#6b7280' },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff'
  }
});
