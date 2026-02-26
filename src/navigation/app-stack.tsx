import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Colors, Strings } from '../constants';
import { GameScreen, ScoresScreen } from '../screens';
import { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.text,
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{
          title: Strings.game.title,
        }}
      />
      <Stack.Screen
        name="Scores"
        component={ScoresScreen}
        options={{
          title: Strings.scores.gameHistory,
        }}
      />
    </Stack.Navigator>
  );
}
