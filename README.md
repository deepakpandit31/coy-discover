# Coy Discover

A swipe-based profile discovery and mutual matching application built as part of the Coy SDE Intern Assignment.

## Features

- Discover profiles through a swipe-based interface.
- Like or pass on profiles using buttons or drag gestures.
- Smooth card animations and swipe feedback.
- Mutual matching when both users like each other.
- Matches page displaying all mutual matches.
- Full profile popup with bio, location, and interests.
- Previously swiped profiles are not shown again.
- Persistent swipe and match data using SQLite.
- Privacy-focused matching logic that never reveals one-sided likes.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** SQLite with better-sqlite3
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/deepakpandit31/coy-discover.git
cd coy-discover
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The SQLite database is created and seeded automatically when the application initializes.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/feed` | Fetch profiles not yet swiped on |
| POST | `/api/swipe` | Record a like or pass and check for a mutual match |
| GET | `/api/matches` | Fetch mutual matches |

## Demo

The application uses a single demo user and 30 seeded mock profiles. Some profiles have already liked the demo user to demonstrate mutual matching.

## Assignment

Built independently as a standalone implementation of the Discover tab for the Coy SDE Intern Assignment.