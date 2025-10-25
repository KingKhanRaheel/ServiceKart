# ServiceKart - Service Marketplace Platform

## Overview
ServiceKart is a full-stack web application that connects buyers with trusted local service providers. Built with React, Express, PostgreSQL, and Firebase Authentication.

## Recent Changes (October 25, 2025)
- **Firebase Authentication Integration**: Added Firebase as the primary authentication method
  - Email/password authentication
  - Google Sign-In integration  
  - Authentication modal with modern UI
  - Session management integrated with existing backend auth system
  - Firebase Admin SDK for token verification on backend

## Project Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **UI Components**: Shadcn UI with Radix primitives
- **Styling**: Tailwind CSS with custom theme
- **Authentication**: Firebase Auth SDK + custom context provider

### Backend (Express + Node.js)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: 
  - Firebase Admin SDK for token verification
  - Passport.js for session management
  - Supports both Firebase and Replit Auth
- **Session Store**: PostgreSQL-backed sessions

### Database Schema
- **users**: User accounts with role-based access (buyer/seller)
- **seller_profiles**: Detailed business information for service providers
- **sessions**: Session storage for authentication

## User Preferences
- **Budget**: Only free plans and services (Firebase Spark plan, free PostgreSQL)
- **Platform**: Web application (not mobile)
- **Authentication**: Firebase for unlimited free users

## Key Features
1. **Dual User Roles**:
   - Buyers: Search and find service providers
   - Sellers: Register business profiles, manage services

2. **Service Categories**:
   - Plumbing, Electrical, Tutoring, Housekeeping
   - Carpentry, Cleaning, Gardening, Appliance Repair
   - AC Repair, Pest Control, Home Renovation, Painting

3. **Authentication Options**:
   - Email/Password via Firebase
   - Google Sign-In via Firebase
   - Replit Auth (legacy support)

4. **Seller Profile Management**:
   - Business name and description
   - Contact information and address
   - Service category and area
   - Experience years and pricing
   - Verification status and ratings

## Development Setup

### Environment Variables (Configured in Replit Secrets)
- `VITE_FIREBASE_PROJECT_ID`: servicekart-b09c7
- `VITE_FIREBASE_API_KEY`: Firebase Web API Key
- `VITE_FIREBASE_APP_ID`: Firebase App ID
- `DATABASE_URL`: PostgreSQL connection string (auto-configured)
- `SESSION_SECRET`: Session encryption key (auto-configured)
- `REPL_ID`, `REPLIT_DOMAINS`: Replit environment variables

### Running the Application
The workflow "Start application" runs:
```bash
npm run dev
```
This starts both the Express backend and Vite development server on port 5000.

## File Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── contexts/     # React contexts (Firebase Auth)
│   │   ├── hooks/        # Custom React hooks (useAuth)
│   │   ├── lib/          # Utilities (Firebase config, query client)
│   │   ├── pages/        # Page components (Landing, Dashboards)
│   │   └── App.tsx       # Root component with routing
├── server/               # Backend Express application
│   ├── firebaseAdmin.ts  # Firebase Admin SDK initialization
│   ├── replitAuth.ts     # Replit Auth + Passport setup
│   ├── routes.ts         # API route handlers
│   ├── storage.ts        # Database interface
│   └── index.ts          # Express server entry point
├── shared/               # Shared types and schemas
│   └── schema.ts         # Drizzle ORM schema + Zod validation
└── attached_assets/      # Static assets (images, etc.)
```

## Authentication Flow

### Firebase Authentication
1. User clicks login button on landing page
2. AuthDialog opens with email/password or Google sign-in options
3. Firebase SDK authenticates user and provides ID token
4. Frontend sends token to `/api/auth/firebase` endpoint
5. Backend verifies token with Firebase Admin SDK
6. Backend creates/updates user in database
7. Backend establishes Passport session (7-day expiry)
8. User is redirected to appropriate dashboard (buyer/seller)

### Session Management
- Firebase Auth automatically refreshes tokens on frontend
- Backend session lasts 7 days (matching session store TTL)
- Protected API routes check session validity via `isAuthenticated` middleware
- Firebase users identified by `authProvider: 'firebase'` flag

## Deployment Notes
- Application runs on port 5000 (only non-firewalled port in Replit)
- Uses Replit's built-in PostgreSQL database
- Firebase credentials stored securely in Replit Secrets
- Sessions persisted in PostgreSQL for reliability

## Future Enhancements
- Seller profile search and filtering for buyers
- Service request/booking system
- Reviews and ratings system
- In-app messaging between buyers and sellers
- Payment integration (when budget allows)
- Admin dashboard for seller verification
