import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { Spacer } from '../../../components/spacer';
import { Strings } from '../../../constants';

interface AuthFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  submitLabel: string;
  isLoading: boolean;
  error?: string;
}

export function AuthForm({
  onSubmit,
  submitLabel,
  isLoading,
  error,
}: AuthFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const validate = () => {
    const errors: { username?: string; password?: string } = {};
    if (!username.trim()) errors.username = Strings.auth.usernameRequired;
    if (password.length < 4) errors.password = Strings.auth.passwordMinLength;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      await onSubmit(username.trim(), password);
    }
  };

  return (
    <View>
      <Input
        label={Strings.auth.username}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        error={fieldErrors.username}
      />
      <Input
        label={Strings.auth.password}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={fieldErrors.password || error}
      />
      <Spacer size="sm" />
      <Button title={submitLabel} onPress={handleSubmit} loading={isLoading} />
    </View>
  );
}
