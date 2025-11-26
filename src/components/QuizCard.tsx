import React, { useMemo, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { VocabEntry } from '../types';

interface Props {
  entry: VocabEntry;
  onAnswer: (quality: number) => void;
}

export function QuizCard({ entry, onAnswer }: Props) {
  const [mode] = useState<'multiple' | 'typing'>('typing');
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const suggestions = useMemo(() => {
    return [entry.translation, 'hello', 'please', 'goodbye'].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [entry.translation]);

  function handleSubmit() {
    if (mode === 'typing') {
      const correct = input.trim().toLowerCase() === entry.translation.toLowerCase();
      setFeedback(correct ? '✅ Correct' : `ℹ️ Expected: ${entry.translation}`);
      onAnswer(correct ? 5 : 2);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.prompt}>{entry.word}</Text>
      {mode === 'multiple' ? (
        <View style={styles.row}>
          {suggestions.map((option) => (
            <Button
              key={option}
              title={option}
              onPress={() => {
                const correct = option === entry.translation;
                setFeedback(correct ? '✅ Correct' : `ℹ️ Expected: ${entry.translation}`);
                onAnswer(correct ? 5 : 2);
              }}
            />
          ))}
        </View>
      ) : (
        <View>
          <TextInput
            placeholder="Type the English translation"
            style={styles.input}
            value={input}
            onChangeText={setInput}
          />
          <Button title="Check" onPress={handleSubmit} />
        </View>
      )}
      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
      <Text style={styles.example}>Primjer: {entry.example}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    elevation: 2
  },
  prompt: { fontSize: 20, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 8, justifyContent: 'space-around' },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8
  },
  feedback: { marginTop: 8, color: '#111827' },
  example: { color: '#6b7280' }
});
