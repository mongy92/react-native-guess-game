import React from 'react';
import { View } from 'react-native';
import { Spacing } from '../constants';

type SpacingKey = keyof typeof Spacing;

interface SpacerProps {
  size?: SpacingKey;
  horizontal?: boolean;
}

export function Spacer({ size = 'md', horizontal }: SpacerProps) {
  const value = Spacing[size];
  return <View style={horizontal ? { width: value } : { height: value }} />;
}
