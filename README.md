# Ticket Management App

## Overview
Ticket Management App is a React Native application built using Expo, Redux Toolkit, React Navigation, and AsyncStorage.

The application allows users to authenticate, create and manage tickets, update ticket status, search tickets, and persist both user sessions and ticket data locally. It also includes API integration, pull-to-refresh, infinite scrolling, and dashboard-based ticket management.

---

# Project Setup Steps

## Prerequisites
- Node.js
- npm
- Expo Go (Android)

---

## Install Dependencies
```bash
npm install


Start Development Server
npx expo start
Run Application
Install Expo Go on your Android device
Start the Expo development server
Scan the QR code using Expo Go
The application will launch on your device
Build APK
eas build --platform android
Architecture Explanation

The application follows a feature-based architecture to keep code organized and scalable.

Folder Structure
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
Navigation Flow
Login
   ↓
Main App (Bottom Tabs)

├── Dashboard
├── Create Ticket
└── Profile

Dashboard
   ↓
Ticket Details
Navigation Components
RootNavigator – Handles authentication flow
AuthNavigator – Handles login screen
BottomTabNavigator – Handles main app screens
Ticket Stack – Handles ticket details navigation
State Management

Redux Toolkit is used for global state management.

authSlice

Manages:

User login
User logout
Authentication state
Email storage

Example:

{
  "isLoggedIn": true,
  "email": "user@example.com"
}
ticketSlice

Manages:

Ticket list
Create ticket
Update ticket
Delete ticket
Status updates

Example:

{
  "tickets": [],
  "loading": false,
  "error": null
}
Why Redux Toolkit?
Centralized state management
Predictable updates
Less boilerplate code
Easy scalability
Persistence Strategy

AsyncStorage is used to persist:

User session
Ticket data

Flow:

App Start
→ Load AsyncStorage
→ Restore Redux State
→ Navigate User
Features
Authentication
Login with email
Validation
Persistent session
Auto login
Dashboard
FlatList rendering
Search functionality
Pull-to-refresh
Infinite scrolling
Loading & error handling
Empty states
Performance optimizations
Ticket Management
Create tickets
Update tickets
View ticket details
Status flow: Open → In Progress → Closed
Profile
User email display
Ticket count
Logout functionality

Logout:

Clears AsyncStorage
Resets Redux state
Redirects to Login
API Integration

https://jsonplaceholder.typicode.com/posts

Used for:

Mock ticket data
Dashboard listing
Performance Optimizations
FlatList optimization
React.memo usage
useMemo for filtering
useCallback for functions
Assumptions
No backend authentication
Email used as identity
Ticket ID generated using Date.now()
API used as mock data source
Challenges Solved
Session persistence using AsyncStorage
Ticket persistence across reloads
Complex navigation handling
Combining API + local data
FlatList performance optimization
Future Improvements
Backend integration
Push notifications
Dark mode
Role-based access control
Real-time updates
Cloud sync
Author

Sayali Patil
