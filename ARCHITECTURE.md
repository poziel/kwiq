# ARCHITECTURE

## Overview

**KWIQ** is a fast, social quiz application designed for parties, classrooms, and community gatherings. Built with modern web technologies, KWIQ enables real-time multiplayer quiz experiences where a host controls the game on a shared screen while players participate from their personal devices.

The application follows a client-server architecture with real-time synchronization, allowing seamless coordination between the host interface, player devices, and public display screens.

**Core Goals:**

- Enable engaging, in-person social quiz experiences
- Support multiple simultaneous game rooms
- Provide instant feedback and live scoring
- Scale efficiently for classroom and party sizes (5-50+ players)
- Deploy easily via containerization

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         KWIQ Application                         │
└──────────────────────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────┐         ┌────────────────┐
│   Host UI    │         │  Player UI   │         │  Screen UI     │
│  /host       │         │   /play      │         │ /screen/[code] │
│              │         │              │         │                │
│ • Create Quiz│         │ • Join Room  │         │ • Display Q    │
│ • Start Game │         │ • Submit Ans │         │ • Show Score   │
│ • Control    │         │ • View Score │         │ • Live Stats   │
└──────┬───────┘         └──────┬───────┘         └──────┬─────────┘
       │                        │                        │
       └────────────────────────┼────────────────────────┘
                                │
                    ┌───────────▼────────────┐
                    │   WebSocket Layer      │
                    │  (Real-time Sync)      │
                    │                        │
                    │ • Room Management      │
                    │ • Event Distribution   │
                    │ • State Synchronization│
                    └───────────┬────────────┘
                                │
                    ┌───────────▼────────────┐
                    │   SvelteKit Server     │
                    │   (SSR + API)          │
                    │                        │
                    │ • Server-Side Render   │
                    │ • API Endpoints        │
                    │ • Session Management   │
                    └───────────┬────────────┘
                                │
                    ┌───────────▼────────────┐
                    │   Data Layer           │
                    │   (Future: Database)   │
                    │                        │
                    │ • Quiz Storage         │
                    │ • Player Data          │
                    │ • Game History         │
                    └────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                    Deployment Architecture                       │
└──────────────────────────────────────────────────────────────────┘

┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  GitHub      │──── │  GitHub Actions  │──── │  Docker Build   │
│  Repository  │     │  (CI/CD)         │     │  & Push         │
└──────────────┘     └──────────────────┘     └────────┬────────┘
                                                       │
                                                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                   Secure Deployment Environment                  │
│                                                                  │
│  ┌────────────────┐         ┌──────────────────────┐             │
│  │  SSL/TLS       │──────── │  KWIQ Docker         │             │
│  │  Reverse Proxy │         │  Container           │             │
│  │                │         │                      │             │
│  │ • HTTPS        │         │  • Node.js Runtime   │             │
│  │ • Domain Route │         │  • SvelteKit App     │             │
│  │ • Port Forward │         │  • Port 3000         │             │
│  └────────────────┘         └──────────────────────┘             │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Route Map

KWIQ uses **SvelteKit's file-based routing** system. Routes are defined in the `src/routes/` directory.

### Current Routes

| Route    | File             | Purpose                               | Status         |
| -------- | ---------------- | ------------------------------------- | -------------- |
| `/`      | `+page.svelte`   | Landing page with "Create a game" CTA | ✅ Implemented |
| `(root)` | `+layout.svelte` | Global layout wrapper                 | ✅ Implemented |

### Planned Routes

| Route            | Purpose              | Key Features                                                    |
| ---------------- | -------------------- | --------------------------------------------------------------- |
| `/host`          | **Host Interface**   | Quiz creation, game control, room management, player monitoring |
| `/play`          | **Player Interface** | Join room via code, answer questions, view personal score       |
| `/screen/[code]` | **Public Display**   | Full-screen question display, live leaderboard, visual effects  |

### Route Flow

```
User Journey:

┌─────────┐
│   /     │  Landing Page
│ (Home)  │  → Click "Create a game"
└────┬────┘
     │
     ▼
┌─────────┐
│  /host  │  Host creates quiz + generates room code
└────┬────┘
     │
     ├──────────────────────────────────────┐
     │                                      │
     ▼                                      ▼
┌──────────────┐                    ┌──────────────┐
│    /play     │                    │/screen/[code]│
│              │                    │              │
│ Players join │                    │ Cast to TV   │
│ using code   │                    │ or projector │
└──────────────┘                    └──────────────┘
```

---

## Frontend Stack

### Core Technologies

#### **SvelteKit** (v2.47.1)

- **Purpose:** Full-stack web framework with SSR, routing, and API endpoints
- **Benefits:**
  - Server-side rendering for fast initial loads
  - File-based routing system
  - Built-in API route handlers
  - Optimized production builds via Vite
- **Usage in KWIQ:**
  - Page routing (`/`, `/host`, `/play`, `/screen/[code]`)
  - Server-side data fetching
  - API endpoints for quiz management
  - Form handling and validation

#### **Svelte** (v5.41.0)

- **Purpose:** Reactive UI component framework
- **Benefits:**
  - Compile-time optimization (no virtual DOM)
  - Built-in reactivity with Svelte 5 runes (`$state`, `$derived`, `$effect`)
  - Small bundle sizes
  - Intuitive component syntax
- **Usage in KWIQ:**
  - Quiz host components
  - Player answer interfaces
  - Real-time score displays
  - Smooth transitions and animations

#### **TypeScript** (v5.9.3)

- **Purpose:** Type-safe JavaScript development
- **Configuration:** Strict mode enabled (`tsconfig.json`)
- **Benefits:**
  - Catch errors at compile-time
  - Better IDE autocomplete and refactoring
  - Self-documenting code via type definitions
- **Usage in KWIQ:**
  - Quiz type definitions (`Question`, `Answer`, `Player`, `Room`)
  - API response typing
  - Component prop validation
  - Store type safety

#### **TailwindCSS** (v4.1.14)

- **Purpose:** Utility-first CSS framework
- **Plugins:**
  - `@tailwindcss/forms` - Form styling
  - `@tailwindcss/typography` - Rich text content
  - `@tailwindcss/vite` - Vite integration
- **Custom Theme:**
  ```css
  --color-primary-500: #fe795d /* Coral/Orange */ --color-primary-600: #ef562f
  	--color-secondary-500: #0ea5e9 /* Sky Blue */;
  ```
- **Benefits:**
  - Rapid UI development
  - Consistent design system
  - Dark mode support
  - JIT compilation for small bundle sizes

#### **Flowbite Svelte** (v1.24.1)

- **Purpose:** Pre-built Tailwind component library for Svelte
- **Includes:**
  - Buttons, forms, modals, dropdowns
  - Cards, badges, alerts
  - Navigation components
  - Flowbite Svelte Icons (v3.0.0) for SVG icons
- **Usage in KWIQ:**
  - Consistent UI components across host/player interfaces
  - Rapid prototyping of quiz interfaces
  - Accessible, ARIA-compliant components

### Build Tooling

#### **Vite** (v7.1.10)

- **Purpose:** Fast build tool and dev server
- **Features:**
  - Hot Module Replacement (HMR) for instant feedback
  - Optimized production builds with code splitting
  - Native ES modules support
  - Plugin ecosystem (Svelte, Tailwind)

#### **ESLint** (v9.38.0) + **Prettier** (v3.6.2)

- **Purpose:** Code quality and formatting
- **Configuration:**
  - Flat ESLint config (modern format)
  - TypeScript and Svelte linting rules
  - Prettier integration to avoid conflicts
  - Auto-format on save (developer workflow)

---

## Real-time Layer

### Overview

KWIQ requires **real-time bidirectional communication** to synchronize state between the host, players, and display screen. This is achieved via **WebSocket** technology.

### Implementation

**Technology:** Socket.IO for bidirectional real-time communication

**Architecture:**

```
┌─────────────────────────────────────────────────────────────┐
│                    Socket.IO Server                         │
│                   (Node.js + SvelteKit)                     │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Host Socket │    │ Player Socket│    │ Screen Socket│
└──────────────┘    └──────────────┘    └──────────────┘
```

### Socket.IO Event Definitions

| Event Name      | Direction        | Purpose                        | Payload Example                       |
| --------------- | ---------------- | ------------------------------ | ------------------------------------- |
| `connection`    | Client ↔ Server | Socket connection established  | -                                     |
| `disconnect`    | Client ↔ Server | Socket connection closed       | -                                     |
| `room:create`   | Client → Server  | Host creates a new room        | `{ hostId: string }`                  |
| `room:created`  | Server → Client  | Room created successfully      | `{ code: string }`                    |
| `room:join`     | Client → Server  | Player joins existing room     | `{ code: string, name: string }`      |
| `room:joined`   | Server → Client  | Player joined successfully     | `{ playerId: string, state: object }` |
| `quiz:start`    | Client → Server  | Host starts the quiz           | `{ code: string }`                    |
| `quiz:next`     | Client → Server  | Host advances to next question | `{ code: string }`                    |
| `answer:submit` | Client → Server  | Player submits answer          | `{ questionId: string, answer: any }` |
| `state:update`  | Server → Clients | Broadcast updated quiz state   | `{ state: QuizState }`                |

### Event Flow Examples

#### **Room Creation:**

```typescript
// Host creates a room
Host → Server: emit('room:create', { hostId: 'abc123' })
Server → Host: emit('room:created', { code: 'XYZ123' })
```

#### **Player Join:**

```typescript
// Player joins via code
Player → Server: emit('room:join', { code: 'XYZ123', name: 'Alice' })
Server → All in Room: emit('state:update', { players: [...] })
Server → Player: emit('room:joined', { playerId: 'uuid', state: {...} })
```

#### **Quiz Flow:**

```typescript
// Host starts quiz
Host → Server: emit('quiz:start', { code: 'XYZ123' })
Server → All in Room: emit('state:update', { status: 'active', question: {...} })

// Player submits answer
Player → Server: emit('answer:submit', { questionId: 5, answer: 2 })
Server → All in Room: emit('state:update', { scores: [...] })
```

### State Synchronization

**Room State Structure:**

```typescript
interface RoomState {
	roomCode: string;
	roomId: string;
	hostId: string;
	players: Player[];
	currentQuestion: number | null;
	questionStartTime: number | null;
	scores: Record<string, number>;
	status: 'waiting' | 'active' | 'paused' | 'ended';
}
```

**Synchronization Strategy:**

- **Authoritative Server:** All game state managed server-side
- **Client Prediction:** UI updates immediately, confirmed by server
- **Reconciliation:** Server broadcasts canonical state on conflicts
- **Heartbeat:** Periodic ping/pong to detect disconnects

### Connection Management

**Reconnection Handling:**

- Store room code + player ID in localStorage
- Auto-reconnect on disconnect with exponential backoff
- Re-sync state from server on reconnection

**Presence Tracking:**

- Track active connections per room
- Notify host when players disconnect
- Display "reconnecting..." UI for players

---

## Containerization & Deployment

### Docker Setup

**Dockerfile** (Planned):

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Build SvelteKit app
RUN npm run build

# Expose port
EXPOSE 3000

# Start Node server
CMD ["node", "build"]
```

**Docker Compose** (Planned):

```yaml
version: '3.8'

services:
  kwiq:
    build: .
    container_name: kwiq-app
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Deployment Requirements

**Infrastructure:**

- Container orchestration platform (Docker, Kubernetes, etc.)
- SSL/TLS termination for HTTPS
- WebSocket support (upgrade headers required for Socket.IO)
- Environment variable configuration via `.env` files

### GitHub Actions CI/CD

**Pipeline Overview:**
Automated build, test, and deployment pipeline triggered on code changes.

**Stages:**

1. **Build & Test:**
   - Install dependencies (`npm ci`)
   - Type-check TypeScript (`npm run check`)
   - Lint code (`npm run lint`)
   - Build production bundle (`npm run build`)

2. **Containerization:**
   - Build Docker image with versioned tag
   - Push image to container registry

3. **Deployment:**
   - Pull latest image to target environment
   - Start/restart containerized application
   - Environment configuration via `.env` files

**Triggers:**

- Push to `main` branch → Full pipeline (deploy to production)
- Pull requests → Build and test only (no deployment)

### Deployment Architecture

```
GitHub Repository (main branch)
    │
    ├─ Code push/merge
    │
    ▼
GitHub Actions CI/CD Pipeline
    │
    ├─ Build & test
    ├─ Create Docker image
    ├─ Push to registry
    │
    ▼
Container Orchestration Platform
    │
    ├─ Pull image
    ├─ Deploy container
    │
    ▼
SSL/TLS Termination Layer
    │
    ├─ HTTPS enforcement
    ├─ WebSocket upgrade support
    │
    ▼
KWIQ Application Container
    │
    ├─ Node.js runtime
    ├─ SvelteKit server
    ├─ Socket.IO server
    │
    ▼
Client Browsers (Host/Player/Screen)
```

---

## Future Considerations

### Scalability

**Current Limitations:**

- Single-server architecture
- In-memory state storage (lost on restart)
- Limited to single deployment instance capacity

**Scaling Strategies:**

1. **Horizontal Scaling:**
   - Deploy multiple KWIQ instances behind load balancer
   - Use Redis for shared WebSocket state
   - Sticky sessions or Redis pub/sub for cross-instance communication

2. **Database Integration:**
   - PostgreSQL or MongoDB for persistent quiz storage
   - Store game history, player stats, custom quizzes
   - Enable user accounts and authentication

3. **CDN Integration:**
   - Serve static assets (images, fonts) via CDN
   - Reduce origin server load
   - Improve global latency

4. **Caching Layer:**
   - Redis cache for frequently accessed quizzes
   - Server-side caching for API responses
   - Browser caching for static assets

### Theming & Customization

**Planned Features:**

- **Custom Themes:** Allow hosts to select color schemes
- **Branding:** Upload logos/backgrounds for organization use
- **Sound Effects:** Toggle audio feedback for answers
- **Accessibility:** High contrast mode, screen reader support, keyboard navigation

**Implementation:**

- Extend Tailwind theme with CSS variables
- Store theme preferences in localStorage
- Add theme switcher component

### Backend & Database Integration

**Future Architecture:**

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
│  (SvelteKit + WebSocket Server)                             │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ PostgreSQL   │  │ Redis Cache  │  │ File Storage │
│              │  │              │  │ (S3 / Local) │
│ • Users      │  │ • Sessions   │  │              │
│ • Quizzes    │  │ • Room State │  │ • Images     │
│ • Games      │  │ • Leaderboard│  │ • Media      │
└──────────────┘  └──────────────┘  └──────────────┘
```

**Database Schema (Proposed):**

```sql
-- Users (future authentication)
users (id, username, email, created_at)

-- Quizzes
quizzes (id, title, description, created_by, visibility, created_at)

-- Questions
questions (id, quiz_id, type, text, media_url, time_limit, points)

-- Answers
answers (id, question_id, text, is_correct, order)

-- Games (play sessions)
games (id, quiz_id, room_code, started_at, ended_at, status)

-- Game Participants
game_players (id, game_id, player_name, score, joined_at)

-- Game Responses
game_responses (id, game_id, player_id, question_id, answer_id, time_taken)
```

### Monitoring & Analytics

**Observability:**

- Application logs (Winston or Pino)
- Error tracking (Sentry)
- Performance monitoring (New Relic or self-hosted)
- WebSocket connection metrics

**Analytics:**

- Quiz completion rates
- Average scores per quiz
- Player engagement metrics
- Popular question types

---

## Technology Summary

| Category             | Technology         | Version | Purpose                   |
| -------------------- | ------------------ | ------- | ------------------------- |
| **Framework**        | SvelteKit          | 2.47.1  | Full-stack web framework  |
| **UI Library**       | Svelte             | 5.41.0  | Reactive components       |
| **Language**         | TypeScript         | 5.9.3   | Type-safe development     |
| **Styling**          | TailwindCSS        | 4.1.14  | Utility CSS framework     |
| **Components**       | Flowbite Svelte    | 1.24.1  | UI component library      |
| **Build Tool**       | Vite               | 7.1.10  | Fast bundler & dev server |
| **Linting**          | ESLint             | 9.38.0  | Code quality              |
| **Formatting**       | Prettier           | 3.6.2   | Code formatting           |
| **Runtime**          | Node.js            | 18+     | Server environment        |
| **Containerization** | Docker             | Latest  | Deployment containers     |
| **CI/CD**            | GitHub Actions     | N/A     | Automated deployment      |
| **Real-time**        | WebSockets         | Planned | Live synchronization      |
| **Database**         | PostgreSQL/MongoDB | Planned | Data persistence          |
| **Cache**            | Redis              | Planned | State & session storage   |

---

## File Structure Reference

```
kwiq/
├── src/
│   ├── routes/                 # SvelteKit routes
│   │   ├── +layout.svelte      # Global layout
│   │   ├── +page.svelte        # Home page
│   │   ├── host/               # Host interface (planned)
│   │   ├── play/               # Player interface (planned)
│   │   └── screen/             # Display screen (planned)
│   ├── lib/                    # Shared code
│   │   ├── components/         # Reusable components (planned)
│   │   ├── stores/             # Svelte stores (planned)
│   │   ├── services/           # Business logic (planned)
│   │   ├── types/              # TypeScript types (planned)
│   │   ├── utils/              # Helper functions (planned)
│   │   └── assets/             # Images, fonts, etc.
│   ├── app.css                 # Global styles + Tailwind
│   ├── app.d.ts                # TypeScript definitions
│   └── app.html                # HTML template
├── static/                     # Static assets (served as-is)
├── .svelte-kit/                # Generated files (ignored)
├── build/                      # Production build output (ignored)
├── node_modules/               # Dependencies (ignored)
├── package.json                # Dependencies & scripts
├── svelte.config.js            # SvelteKit configuration
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint rules
├── .prettierrc                 # Prettier configuration
├── Dockerfile                  # Docker build instructions (planned)
├── docker-compose.yml          # Multi-container setup (planned)
├── .github/workflows/          # CI/CD pipelines (planned)
├── README.md                   # Project documentation
├── ARCHITECTURE.md             # This file
└── AGENTS.md                   # AI agent guidelines
```

---

## Conclusion

KWIQ's architecture is designed for **rapid development**, **real-time interaction**, and **scalable deployment**. The combination of SvelteKit's full-stack capabilities, Svelte's reactive UI, and WebSocket-based synchronization creates a solid foundation for engaging multiplayer quiz experiences.

The containerized deployment strategy with GitHub Actions CI/CD ensures consistent, automated releases, while the modular codebase structure supports future enhancements like user authentication, persistent storage, and advanced analytics.

**Key Architectural Principles:**

1. **Simplicity First:** Start with in-memory state, add database when needed
2. **Real-time by Default:** WebSocket synchronization for all game events
3. **Type Safety:** TypeScript throughout for reliability
4. **Component Reusability:** Shared components across host/player/screen
5. **Developer Experience:** Fast builds, hot reload, linting, formatting
6. **Production Ready:** Docker, CI/CD, monitoring, error tracking

For implementation details and AI agent guidelines, see **AGENTS.md**.
