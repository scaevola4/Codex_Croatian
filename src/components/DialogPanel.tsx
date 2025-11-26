import React, { useMemo, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { DialogScenario } from '../types';

interface Props {
  scenario: DialogScenario;
}

export function DialogPanel({ scenario }: Props) {
  const [turnIndex, setTurnIndex] = useState(0);
  const currentTurn = useMemo(() => scenario.turns[turnIndex], [scenario.turns, turnIndex]);

  function speakCurrent() {
    if (currentTurn?.speaker === 'bot') {
      Speech.speak(currentTurn.text, { language: 'hr-HR', pitch: 1.05 });
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{scenario.title}</Text>
      <Text style={styles.rubric}>{scenario.rubric}</Text>
      <View style={styles.turnBox}>
        <Text style={styles.turnLabel}>{currentTurn?.speaker === 'bot' ? 'Partner' : 'Vi'}</Text>
        <Text style={styles.turnText}>{currentTurn?.text || 'Recite svoj odgovor glasno.'}</Text>
      </View>
      {currentTurn?.speaker === 'bot' ? <Button title="Play prompt" onPress={speakCurrent} /> : null}
      <View style={styles.row}>
        <Button title="Back" disabled={turnIndex === 0} onPress={() => setTurnIndex((i) => Math.max(0, i - 1))} />
        <Button
          title={turnIndex === scenario.turns.length - 1 ? 'Restart' : 'Next'}
          onPress={() => {
            setTurnIndex((i) => (i === scenario.turns.length - 1 ? 0 : i + 1));
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#f5f3ff', padding: 16, borderRadius: 12, gap: 12 },
  title: { fontSize: 18, fontWeight: '700' },
  rubric: { color: '#4b5563' },
  turnBox: { backgroundColor: '#fff', padding: 12, borderRadius: 10 },
  turnLabel: { fontWeight: '600', color: '#6d28d9' },
  turnText: { fontSize: 16, marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between' }
});
