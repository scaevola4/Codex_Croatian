import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Module, ModuleProgress } from '../types';

interface Props {
  module: Module;
  progress: ModuleProgress;
  onStartLesson: () => void;
  onStartReview: () => void;
  onOpenDialog: () => void;
}

export function ModuleOverview({ module, progress, onStartLesson, onStartReview, onOpenDialog }: Props) {
  const masteredCount = Object.values(progress.vocabState).filter((v) => v.consecutiveCorrect >= 3).length;
  const total = Object.keys(progress.vocabState).length;
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{module.title}</Text>
      <Text style={styles.subtitle}>{module.objectives.join(' · ')}</Text>
      <Text style={styles.meta}>Vocab mastered: {masteredCount}/{total}</Text>
      <View style={styles.row}>
        <Button title="Lesson" onPress={onStartLesson} />
        <Button title="Review" onPress={onStartReview} />
        <Button title="Dialog" onPress={onOpenDialog} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f6f7fb',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8
  },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { color: '#3b3b3b' },
  meta: { color: '#6b7280' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }
});
