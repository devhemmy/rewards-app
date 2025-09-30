# Rewards App

A React Native application for fetching and collecting loyalty rewards. Built with TypeScript and Redux.

## Core Features

- Fetches a list of rewards from a live API.
- Infinite scroll with pagination (`onEndReached`).
- State management using Redux Toolkit for collected rewards.
- Tab navigation between "Available" and "Collected" reward lists.
- Handles loading, error, and empty states.
- UI updates to reflect collected items (disabled button, reduced opacity).
- Built with React Native CLI (no Expo).

## Prerequisites

Your development environment **must** be set up correctly for React Native CLI. Follow the [official documentation](https://reactnative.dev/docs/environment-setup) for your OS and target platform (iOS/Android).

- **Node.js** (LTS version)
- **Watchman** (recommended)
- **Xcode** (for iOS)
- **Android Studio** (for Android)
- **Ruby** (A modern version installed via `rbenv` or `asdf` is strongly recommended to avoid system conflicts).
- **CocoaPods**

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/devhemmy/rewards-app
    cd RewardsApp
    ```

2.  **Install NPM dependencies:**

    ```bash
    npm install
    ```

3.  **Install iOS dependencies (CocoaPods):**
    ```bash
    cd ios && pod install && cd ..
    ```

## Running the Application

### For iOS

```bash
npx react-native run-ios
```

### For Android

First, ensure you have an emulator running or a device connected.

````bash
npx react-native run-android```
````
