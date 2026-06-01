# Ticket Management App

## Overview
Ticket Management App is a React Native application built using Expo, Redux Toolkit, React Navigation, and AsyncStorage.

The application allows users to:
- Authenticate (Login / Logout)
- Create, update, and manage tickets
- View ticket details
- Search tickets
- Use API + local state together
- Persist user sessions and tickets using AsyncStorage
- Handle pagination, pull-to-refresh, and performance optimizations

---

# Project Setup Steps
## Prerequisites

- Node.js
- npm
- Expo Go (Android)

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npx expo start
```

## Run Application

1. Install Expo Go on your Android device.
2. Start the Expo development server.
3. Scan the generated QR code using Expo Go.
4. The application will launch on your device.

## Build APK

```bash
eas build --platform android
```

# Architecture Explanation

The application follows a feature-based architecture to keep code organized and scalable.

## Folder Structure

```text
src/
│
├── navigation/
│   ├── AuthNavigator.tsx
│   ├── BottomTabNavigator.tsx
│   ├── MainTabs.tsx
│   └── RootNavigator.tsx
│
├── screens/
│   ├── auth/
│   │   └── LoginScreen.tsx
│   ├── dashboard/
│   │   └── DashboardScreen.tsx
│   ├── profile/
│   │   └── ProfileScreen.tsx
│   └── ticket/
│       ├── CreateTicketScreen.tsx
│       └── TicketDetailsScreen.tsx
│
├── components/
│   └── TicketCard.tsx
│
├── store/
│   ├── index.ts
│   └── slices/
│       ├── authSlice.ts
│       └── ticketSlice.ts
│
└── App.tsx
```

## Navigation Flow

```text
Login
   ↓
Bottom Tab Navigation

├── Dashboard
├── Create Ticket
└── Profile

Dashboard
   ↓
Ticket Details
```

### Navigation Components

- **RootNavigator** – Controls application startup flow and session restoration.
- **AuthNavigator** – Handles authentication screens.
- **BottomTabNavigator** – Provides access to main application sections.
- **Ticket Details Navigation** – Allows users to view and manage individual tickets.

---

# State Management Approach

Redux Toolkit is used for global state management.

## authSlice

Manages authentication-related data:

- User login
- User logout
- Authentication state
- Logged-in user email

Example state:

```javascript
{
  isLoggedIn: true,
  email: "user@example.com"
}
```

## ticketSlice

Manages ticket-related data:

- Ticket creation
- Ticket listing
- Ticket status updates
- Ticket restoration from storage

Example state:

```javascript
{
  tickets: []
}
```

## Why Redux Toolkit?

Redux Toolkit was chosen because authentication and ticket data are required across multiple screens such as Dashboard, Create Ticket, Ticket Details, and Profile.

It provides:

- Centralized state management
- Predictable state updates
- Reduced boilerplate code
- Better scalability

## Persistence Strategy

AsyncStorage is used alongside Redux to persist:

- User session
- Ticket data

Application startup flow:

```text
App Starts
    ↓
Load AsyncStorage Data
    ↓
Restore Redux State
    ↓
Navigate User
```

This ensures users remain logged in and previously created tickets remain available after restarting the application.

---

# Assumptions Made

1. No backend authentication service was provided, therefore authentication is simulated locally.

2. User identity is represented using an email address.

3. Ticket IDs are generated using `Date.now()` to ensure uniqueness.

4. API data displayed on the dashboard is treated as sample ticket data.

5. Ticket status follows a simplified workflow:

```text
Open
 ↓
In Progress
 ↓
Closed
```

6. All persistence requirements are handled locally using AsyncStorage.

---

# Challenges Faced

## 1. Session Persistence

Redux state resets whenever the application reloads.

### Solution

Stored user information in AsyncStorage and restored authentication state during application startup.

---

## 2. Ticket Persistence

Initially, created tickets were lost after application reload.

### Solution

Implemented ticket persistence using AsyncStorage and restored tickets into Redux using a dedicated reducer.

---

## 3. Navigation Architecture

Managing authentication flow together with bottom tab navigation required multiple navigators and conditional routing.

### Solution

Implemented nested navigation using:

- Root Navigator
- Stack Navigator
- Bottom Tab Navigator

---

## 4. Combining Multiple Data Sources

The dashboard needed to display:

- User-created tickets
- API-fetched tickets

### Solution

Combined both data sources into a single FlatList for a unified user experience.

---

## 5. Dashboard Performance

Rendering large ticket lists efficiently while supporting refresh and pagination.

### Solution

Used:

- FlatList
- Pull-to-Refresh
- Infinite Scrolling
- Conditional Rendering

to improve performance and user experience.

---

# Future Improvements

- Edit Ticket Feature
- Delete Ticket Feature
- Backend Integration
- Push Notifications
- Dark Mode
- Role-Based Access Control
- Cloud Synchronization

---

# Author

Sayali Patil

React Native Ticket Management Application
