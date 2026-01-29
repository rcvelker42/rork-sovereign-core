# Sovereign Core

A self-development mobile app focused on building social confidence, presence, and charisma through a structured 15-principle system with real-world missions.

## Overview

**Platform**: Native iOS & Android app
**Framework**: Expo Router + React Native

## Features

- **15 Principles** organized into 3 progressive tiers (Foundation, Bridge, Mastery)
- **60+ Real-world missions** with XP rewards and progression tracking
- **Presence Score** system with daily decay mechanics
- **Daily Focus** challenges to maintain consistency
- **Journal/Ledger** for reflection and progress tracking
- **Gym Mode** for additional training missions per principle
- **Premium tiers** with RevenueCat integration

## Getting Started

### Prerequisites

- Node.js (install via [nvm](https://github.com/nvm-sh/nvm))
- Bun ([installation guide](https://bun.sh/docs/installation))

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd sovereign-core

# Install dependencies
bun install

# Start the development server
bun run start
```

### Running the App

```bash
# Start development server
bun run start

# iOS (press 'i' in terminal or use flag)
bun run ios

# Android (press 'a' in terminal or use flag)
bun run android

# Web
bun run web
```

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - React Native platform and tooling
- **Expo Router** - File-based routing
- **TypeScript** - Type-safe JavaScript
- **React Query** - Server state management
- **Zustand** - Client state management
- **RevenueCat** - In-app purchases and subscriptions
- **AsyncStorage** - Local data persistence

## Project Structure

```
├── app/                    # App screens (Expo Router)
│   ├── (tabs)/            # Tab navigation
│   │   ├── (archive)/     # Principles archive
│   │   ├── (dashboard)/   # Main dashboard
│   │   ├── (gym)/         # Training gym
│   │   └── (ledger)/      # Journal/ledger
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
├── constants/             # App constants (principles, missions, colors)
├── contexts/              # React contexts (state, purchases)
├── assets/                # Static assets (icons, images)
└── app.json              # Expo configuration
```

## Deployment

### iOS (App Store)

```bash
# Install EAS CLI
bun i -g @expo/eas-cli

# Configure project
eas build:configure

# Build for iOS
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

### Android (Google Play)

```bash
# Build for Android
eas build --platform android

# Submit to Google Play
eas submit --platform android
```

## Troubleshooting

### Build Issues

1. Clear cache: `npx expo start --clear`
2. Reinstall dependencies: `rm -rf node_modules && bun install`
3. Check [Expo troubleshooting guide](https://docs.expo.dev/troubleshooting/build-errors/)

### Development Issues

- Ensure phone and computer are on the same WiFi network
- Try tunnel mode: `npx expo start --tunnel`

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [RevenueCat Expo Integration](https://www.revenuecat.com/docs/expo)
