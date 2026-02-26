import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Strings } from '../../../constants';

interface ScoreDisplayProps {
  lowestGuesses: number | null;
}

export function ScoreDisplay({ lowestGuesses }: ScoreDisplayProps) {
  return (
    <View style={styles.container}>
      {lowestGuesses !== null ? (
        <Text style={styles.text}>
          🏆 {Strings.score.best}:{' '}
          <Text style={styles.score}>{lowestGuesses}</Text>{' '}
          {lowestGuesses === 1 ? Strings.score.guess : Strings.score.guesses}
        </Text>
      ) : (
        <Text style={styles.noScore}>{Strings.score.noBestScore}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
    alignSelf: 'center',
  },
  text: {
    fontSize: 14,
    color: Colors.text,
  },
  score: {
    fontWeight: '700',
    color: Colors.primary,
  },
  noScore: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});
