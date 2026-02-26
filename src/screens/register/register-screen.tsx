import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthForm, Card, Spacer } from '../../components';
import { Strings } from '../../constants';
import { useAuth } from '../../contexts/auth-context';
import { AuthScreenProps } from '../../navigation/types';
import { authStyles } from '../auth/styles';

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
    <SafeAreaView style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={authStyles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={authStyles.content}>
            <Text style={authStyles.title}>{Strings.auth.createAccount}</Text>
            <Text style={authStyles.subtitle}>{Strings.auth.signUpToStart}</Text>
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
              <Text style={authStyles.link}>
                {Strings.auth.alreadyHaveAccount}{' '}
                <Text style={authStyles.linkBold}>{Strings.auth.login}</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

