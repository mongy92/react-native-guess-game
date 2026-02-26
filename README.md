# 🎯 React Native Guess Game

A number guessing game built with React Native CLI, featuring user authentication, score tracking, and game history.

## 📱 Demo

| Android | iOS |
|:---:|:---:|
| <video src="./demo/demo-android.mov" width="300" /> | <video src="./demo/demo-ios.mov" width="300" /> |

> *If videos don't play in browser, download from [demo/](./demo/) folder*

## ✨ Features

- **User Authentication** - Register and login with secure password hashing
- **Number Guessing Game** - Guess a random number between 1-43 with feedback
- **Score Tracking** - Personal best score tracking with new record detection
- **Game History** - View past games with date timestamps
- **Session Persistence** - Stay logged in using secure device storage

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React Native 0.84 (New Architecture) |
| **Language** | TypeScript |
| **Navigation** | React Navigation v7 (Native Stack) |
| **Database** | SQLite (react-native-sqlite-storage) |
| **Secure Storage** | react-native-keychain |
| **Crypto** | crypto-js (SHA256) |
| **Animation** | react-native-reanimated 4.x |

## 📋 Prerequisites

- Node.js >= 22.11.0
- Ruby (for iOS CocoaPods)
- Xcode 15+ (iOS)
- Android Studio with SDK 34+ (Android)
- CocoaPods

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/mongy92/react-native-guess-game.git
cd react-native-guess-game

# Install dependencies
npm install

# Install iOS pods
cd ios && pod install && cd ..
```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 📁 Project Structure

```
src/
├── App.tsx                 # App entry point
├── components/             # Shared UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── spacer.tsx
├── constants/              # Design tokens & strings
│   ├── colors.ts
│   ├── spacing.ts
│   └── strings.ts
├── contexts/               # React Context providers
│   └── auth-context.tsx
├── lib/                    # Core utilities
│   ├── database.ts         # SQLite operations
│   └── storage.ts          # Secure session storage
├── navigation/             # Navigation configuration
│   ├── app-stack.tsx
│   ├── auth-stack.tsx
│   └── types.ts
└── screens/                # Screen components
    ├── game/
    │   ├── components/
    │   ├── hooks/
    │   └── game-screen.tsx
    ├── login/
    ├── register/
    └── scores/
```

## 🏗 Architecture

### Design Patterns

- **Feature-based folder structure** - Each screen has its own components and hooks
- **Custom hooks** - Business logic extracted into reusable hooks
- **Barrel exports** - Clean imports via index.ts files
- **Context API** - Global auth state without external state management

### Database Schema

```sql
-- Users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  passwordHash TEXT NOT NULL,
  lowestGuesses INTEGER
);

-- Game history table
CREATE TABLE game_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  guessCount INTEGER NOT NULL,
  targetNumber INTEGER NOT NULL,
  playedAt TEXT NOT NULL
);
```

### Security

- Passwords are hashed with SHA256 before storage
- Sessions stored securely in iOS Keychain / Android Keystore
- No plaintext credentials stored

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Metro bundler |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |

## 📄 License

This project is licensed under the MIT License.
