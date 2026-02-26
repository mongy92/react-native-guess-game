import CryptoJS from 'crypto-js';
import * as Keychain from 'react-native-keychain';

const SERVICE_NAME = 'guess-game-session';

export interface StoredSession {
  username: string;
}

export function generateSalt(): string {
  return CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
}

export function hashPassword(password: string, salt: string): string {
  return CryptoJS.SHA256(salt + password).toString(CryptoJS.enc.Hex);
}

export async function saveSession(username: string): Promise<void> {
  const session: StoredSession = { username };
  await Keychain.setGenericPassword('session', JSON.stringify(session), {
    service: SERVICE_NAME,
  });
}

export async function getSession(): Promise<StoredSession | null> {
  const credentials = await Keychain.getGenericPassword({
    service: SERVICE_NAME,
  });
  if (!credentials) return null;
  return JSON.parse(credentials.password) as StoredSession;
}

export async function clearSession(): Promise<void> {
  await Keychain.resetGenericPassword({ service: SERVICE_NAME });
}
