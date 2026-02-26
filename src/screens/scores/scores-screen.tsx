import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Card } from '../../components';
import { Colors, Spacing, Strings } from '../../constants';
import { GameHistoryEntry } from '../../lib';
import { AppScreenProps } from '../../navigation/types';
import { useGameHistory } from './hooks';

function ScoresSeparator() {
  return <View style={separatorStyle} />;
}

const separatorStyle = { height: 8 };

export function ScoresScreen(_props: AppScreenProps<'Scores'>) {
  const { history, isLoading } = useGameHistory();

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item }: { item: GameHistoryEntry }) => (
    <Card style={styles.scoreCard}>
      <View style={styles.scoreRow}>
        <View>
          <Text style={styles.targetText}>Target: {item.targetNumber}</Text>
          <Text style={styles.dateText}>{formatDate(item.playedAt)}</Text>
        </View>
        <View style={styles.attemptsContainer}>
          <Text style={styles.attemptsNumber}>{item.guessCount}</Text>
          <Text style={styles.attemptsLabel}>{Strings.scores.attempts}</Text>
        </View>
      </View>
    </Card>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📊</Text>
      <Text style={styles.emptyTitle}>No Games Yet</Text>
      <Text style={styles.emptyText}>{Strings.scores.noScores}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          history.length === 0 && styles.emptyListContent,
        ]}
        ItemSeparatorComponent={ScoresSeparator}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  listContent: {
    padding: Spacing.lg,
  },
  emptyListContent: {
    flex: 1,
  },
  separator: {
    height: Spacing.sm,
  },
  scoreCard: {
    padding: Spacing.md,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  targetText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  dateText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  attemptsContainer: {
    alignItems: 'center',
  },
  attemptsNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
  },
  attemptsLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
