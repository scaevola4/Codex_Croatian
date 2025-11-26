import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GrammarNote } from '../types';

interface Props {
  note: GrammarNote;
}

export function GrammarNoteCard({ note }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.body}>{note.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eef2ff',
    padding: 12,
    borderRadius: 10,
    gap: 6
  },
  title: { fontWeight: '700', fontSize: 16 },
  body: { color: '#111827' }
});
