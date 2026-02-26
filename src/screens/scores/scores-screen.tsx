import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components';
import { Colors, Spacing, Strings } from '../../constants';
import { GameHistoryEntry } from '../../lib';
import { useGameHistory } from './hooks';

function ScoresSeparator() {
  return <View style={separatorStyle} />;
}

const separatorStyle = { height: 8 };

function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function ScoreItem({ item }: { item: GameHistoryEntry }) {
  return (
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
}

function EmptyList() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📊</Text>
      <Text style={styles.emptyTitle}>No Games Yet</Text>
      <Text style={styles.emptyText}>{Strings.scores.noScores}</Text>
    </View>
  );
}

const keyExtractor = (item: GameHistoryEntry) => item.id.toString();

export function ScoresScreen() {
  const { history, error } = useGameHistory();

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Something went wrong</Text>
        <Text style={styles.emptyText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={keyExtractor}
        renderItem={ScoreItem}
        contentContainerStyle={[
          styles.listContent,
          history.length === 0 && styles.emptyListContent,
        ]}
        ItemSeparatorComponent={ScoresSeparator}
        ListEmptyComponent={EmptyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  listContent: {
    padding: Spacing.lg,
  },
  emptyListContent: {
    flex: 1,
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
