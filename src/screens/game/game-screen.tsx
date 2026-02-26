import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Card, Spacer } from '../../components';
import { Colors, Spacing, Strings } from '../../constants';
import { useAuth } from '../../contexts/auth-context';
import { AppScreenProps } from '../../navigation/types';
import { Feedback, GuessInput, ScoreDisplay } from './components';
import { useGame, useScore } from './hooks';

export function GameScreen({ navigation }: AppScreenProps<'Game'>) {
  const { user, logout } = useAuth();
  const { target, guessCount, feedback, isWon, makeGuess, resetGame } =
    useGame();
  const {
    lowestGuesses,
    isNewRecord,
    hasSaved,
    saveGameResult,
    resetForNewGame,
  } = useScore();

  useEffect(() => {
    if (isWon && !hasSaved) {
      saveGameResult(guessCount, target);
    }
  }, [isWon, hasSaved, guessCount, target, saveGameResult]);

  const handlePlayAgain = () => {
    resetGame();
    resetForNewGame();
  };

  const handleViewScores = () => {
    navigation.navigate('Scores');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Banner */}
          <View style={styles.welcomeBanner}>
            <Text style={styles.welcomeText}>
              {Strings.game.welcomeBack}
              <Text style={styles.usernameText}>{user?.username}</Text>
              {Strings.game.welcomeBackSuffix}
            </Text>
          </View>

          {/* Best Score Card */}
          <ScoreDisplay lowestGuesses={lowestGuesses} />
          <Spacer size="lg" />

          {/* Main Game Card */}
          <Card style={styles.gameCard}>
            <View style={styles.gameHeader}>
              <Text style={styles.title}>{Strings.game.title}</Text>
              <Text style={styles.subtitle}>{Strings.game.subtitle}</Text>
            </View>

            <View style={styles.divider} />

            <Feedback feedback={feedback} guessCount={guessCount} />

            {isWon ? (
              <View style={styles.winContainer}>
                {isNewRecord && (
                  <View style={styles.newRecordBadge}>
                    <Text style={styles.newRecordText}>
                      🏆 {Strings.game.newRecord}
                    </Text>
                  </View>
                )}
                <Spacer size="md" />
                <Button
                  title={Strings.game.playAgain}
                  onPress={handlePlayAgain}
                />
              </View>
            ) : (
              <GuessInput onGuess={makeGuess} />
            )}
          </Card>

          <Spacer size="lg" />

          {/* History Link */}
          <Pressable style={styles.historyButton} onPress={handleViewScores}>
            <Text style={styles.historyButtonText}>
              {Strings.game.viewHistory}
            </Text>
          </Pressable>

          <Spacer size="xl" />

          {/* Logout Button */}
          <Pressable style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutButtonText}>{Strings.game.logout}</Text>
          </Pressable>

          <Spacer size="xl" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  welcomeBanner: {
    marginBottom: Spacing.md,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  usernameText: {
    fontWeight: '700',
  },
  gameCard: {
    paddingVertical: Spacing.xl,
  },
  gameHeader: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.lg,
    marginHorizontal: -Spacing.lg,
  },
  winContainer: {
    alignItems: 'center',
  },
  newRecordBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
  },
  newRecordText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.success,
  },
  historyButton: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  historyButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  logoutButton: {
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.error,
  },
  logoutButtonText: {
    fontSize: 16,
    color: Colors.error,
    fontWeight: '600',
  },
});
