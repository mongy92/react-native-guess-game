import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Spacer } from '../../components';
import { Colors, Spacing, Strings } from '../../constants';
import { useAuth } from '../../contexts/auth-context';
import { AuthScreenProps } from '../../navigation/types';
import { AuthForm } from '../login/components';

export function RegisterScreen({ navigation }: AuthScreenProps<'Register'>) {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleRegister = async (username: string, password: string) => {
    setIsLoading(true);
    setError(undefined);
    const result = await register(username, password);
    if (!result.success) {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.title}>{Strings.auth.createAccount}</Text>
            <Text style={styles.subtitle}>{Strings.auth.signUpToStart}</Text>
            <Spacer size="xl" />
            <Card>
              <AuthForm
                onSubmit={handleRegister}
                submitLabel={Strings.auth.register}
                isLoading={isLoading}
                error={error}
              />
            </Card>
            <Spacer size="lg" />
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>
                {Strings.auth.alreadyHaveAccount}{' '}
                <Text style={styles.linkBold}>{Strings.auth.login}</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  link: {
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: 14,
  },
  linkBold: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
