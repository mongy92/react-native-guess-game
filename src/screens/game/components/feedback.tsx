import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Strings } from '../../../constants';
import { Feedback as FeedbackType } from '../hooks/use-game';

interface FeedbackProps {
  feedback: FeedbackType;
  guessCount: number;
}

export function Feedback({ feedback, guessCount }: FeedbackProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (feedback) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.1,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [feedback, guessCount, scaleAnim]);

  const getMessage = () => {
    switch (feedback) {
      case 'higher':
        return { text: Strings.game.goHigher, color: Colors.primary };
      case 'lower':
        return { text: Strings.game.goLower, color: Colors.error };
      case 'correct':
        return { text: Strings.game.correct, color: Colors.success };
      default:
        return { text: Strings.game.makeGuess, color: Colors.textSecondary };
    }
  };

  const { text, color } = getMessage();

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.feedback, { color, transform: [{ scale: scaleAnim }] }]}
      >
        {text}
      </Animated.Text>
      {guessCount > 0 && (
        <Text style={styles.count}>
          {guessCount}{' '}
          {guessCount === 1 ? Strings.score.guess : Strings.score.guesses}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  feedback: {
    fontSize: 24,
    fontWeight: '700',
  },
  count: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
});
