import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../../components/button';
import { Spacer } from '../../../components/spacer';
import { Colors, Spacing, Strings } from '../../../constants';

interface GuessInputProps {
  onGuess: (guess: number) => void;
  disabled?: boolean;
}

export function GuessInput({ onGuess, disabled }: GuessInputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string>();

  const handleGuess = () => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 1 || num > 43) {
      setError(Strings.game.invalidRange);
      return;
    }
    setError(undefined);
    onGuess(num);
    setValue('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={setValue}
        keyboardType="number-pad"
        placeholder={Strings.game.inputPlaceholder}
        placeholderTextColor={Colors.textSecondary}
        editable={!disabled}
        maxLength={2}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Spacer size="md" />
      <Button
        title={Strings.game.guess}
        onPress={handleGuess}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    width: 120,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  inputError: {
    borderColor: Colors.error,
  },
  error: {
    fontSize: 12,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
});
