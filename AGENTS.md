# AGENTS

## Project Summary

**KWIQ** is a fast, social quiz application designed for parties, classrooms, and community gatherings. The platform enables real-time multiplayer quiz experiences where a host controls the game on a shared screen while players participate from their personal devices.

**Project Type:** Full-stack web application
**Primary Language:** TypeScript
**Framework:** SvelteKit (Svelte 5)
**Development Stage:** Early MVP (Milestone 1 in progress)

**Key Features:**

- Real-time synchronization between host, players, and display screen
- Room-based multiplayer with unique join codes
- Support for static (predefined) and dynamic (adaptive) quizzes
- Live scoring and leaderboards
- Containerized deployment via Docker

**Target Deployment:** Secure deployment environment with Docker Compose

---

## Core Technologies

### Frontend Stack

| Technology          | Version | Purpose                                 | Documentation                        |
| ------------------- | ------- | --------------------------------------- | ------------------------------------ |
| **SvelteKit**       | 2.47.1  | Full-stack framework with SSR & routing | https://kit.svelte.dev/docs          |
| **Svelte**          | 5.41.0  | Reactive UI component library           | https://svelte.dev/docs              |
| **TypeScript**      | 5.9.3   | Type-safe JavaScript                    | https://www.typescriptlang.org/docs/ |
| **TailwindCSS**     | 4.1.14  | Utility-first CSS framework             | https://tailwindcss.com/docs         |
| **Flowbite Svelte** | 1.24.1  | Pre-built Tailwind components           | https://flowbite-svelte.com/         |
| **Flowbite Icons**  | 3.0.0   | SVG icon library                        | https://flowbite.com/icons/          |

### Build & Tooling

| Technology            | Version | Purpose                  |
| --------------------- | ------- | ------------------------ |
| **Vite**              | 7.1.10  | Build tool & dev server  |
| **ESLint**            | 9.38.0  | Code linting & quality   |
| **Prettier**          | 3.6.2   | Code formatting          |
| **TypeScript ESLint** | 8.28.0  | TypeScript linting rules |
| **Svelte Check**      | 4.3.3   | Svelte type checking     |

### Runtime & Deployment

| Technology         | Purpose                       |
| ------------------ | ----------------------------- |
| **Node.js**        | Server runtime (18+)          |
| **Docker**         | Containerization              |
| **Docker Compose** | Multi-container orchestration |
| **GitHub Actions** | CI/CD pipeline                |

### Planned Technologies

| Technology               | Purpose                       | Status        |
| ------------------------ | ----------------------------- | ------------- |
| **WebSockets**           | Real-time synchronization     | Milestone 2   |
| **PostgreSQL / MongoDB** | Data persistence              | Future        |
| **Redis**                | Session & cache storage       | Future        |
| **Socket.IO**            | Alternative WebSocket library | Consideration |

---

## Development Workflow

### Initial Setup

```bash
# 1. Clone the repository
git clone https://github.com/[username]/kwiq.git
cd kwiq

# 2. Install dependencies
npm install

# 3. Configure environment (optional)
# Copy .env.example to .env and customize if needed
cp .env.example .env

# 4. Start development server
npm run dev
# Server runs on http://localhost:5173

# 5. Open in browser
# Navigate to http://localhost:5173
```

### Development Commands

| Command               | Purpose              | Description                                   |
| --------------------- | -------------------- | --------------------------------------------- |
| `npm run dev`         | **Start dev server** | Runs Vite dev server with HMR on port 5173    |
| `npm run build`       | **Build production** | Creates optimized build in `build/` directory |
| `npm run preview`     | **Preview build**    | Preview production build locally              |
| `npm run check`       | **Type check**       | Run TypeScript + Svelte type checking         |
| `npm run check:watch` | **Watch mode check** | Type checking in watch mode                   |
| `npm run lint`        | **Lint code**        | Run Prettier + ESLint validation              |
| `npm run format`      | **Format code**      | Auto-format all files with Prettier           |

### Docker Workflow

```bash
# Build Docker image
docker build -t kwiq:latest .

# Run container locally
docker run -p 3000:3000 kwiq:latest

# Using Docker Compose (planned)
docker-compose up -d          # Start in background
docker-compose logs -f kwiq   # View logs
docker-compose down           # Stop containers
```

### Git Workflow

```bash
# Standard development flow
git checkout -b feature/your-feature-name
# Make changes...
npm run lint              # Check code quality
npm run check             # Type check
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
# Create pull request on GitHub
```

### Code Quality Pipeline

Before committing code, ensure it passes all checks:

```bash
# 1. Format code
npm run format

# 2. Lint code
npm run lint

# 3. Type check
npm run check

# 4. Build (ensure no build errors)
npm run build
```

---

## File Overview

### Project Root

```
kwiq/
├── src/                    # Source code (application logic)
├── static/                 # Static assets (robots.txt, favicon, etc.)
├── .svelte-kit/            # Generated files (DO NOT EDIT)
├── build/                  # Production build output (DO NOT EDIT)
├── node_modules/           # Dependencies (DO NOT EDIT)
├── package.json            # Project metadata & dependencies
├── package-lock.json       # Locked dependency versions
├── svelte.config.js        # SvelteKit configuration
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLint rules
├── .prettierrc             # Prettier formatting rules
├── .env.example            # Environment variable template
├── .gitignore              # Git ignore patterns
├── Dockerfile              # Docker build instructions
├── docker-compose.yml      # Container orchestration
├── README.md               # Project documentation
├── ARCHITECTURE.md         # Architecture overview
└── AGENTS.md               # This file (AI agent guidelines)
```

### Source Directory (`src/`)

#### Current Structure

```
src/
├── routes/                 # SvelteKit routes (file-based routing)
│   ├── +layout.svelte      # Global layout wrapper (12 lines)
│   └── +page.svelte        # Home/landing page (11 lines)
├── lib/                    # Shared library code
│   ├── index.ts            # Library exports
│   └── assets/             # Images, fonts, SVGs
│       └── favicon.svg     # Site favicon
├── app.css                 # Global styles + Tailwind directives
├── app.d.ts                # TypeScript app definitions
└── app.html                # HTML template (root document)
```

#### Planned Structure (Future Milestones)

```
src/
├── routes/
│   ├── +layout.svelte
│   ├── +page.svelte
│   ├── host/
│   │   ├── +page.svelte            # Host dashboard
│   │   └── [roomId]/
│   │       └── +page.svelte        # Host game control
│   ├── play/
│   │   └── +page.svelte            # Player join & participate
│   └── screen/
│       └── [code]/
│           └── +page.svelte        # Public display screen
├── lib/
│   ├── components/
│   │   ├── quiz/
│   │   │   ├── QuestionDisplay.svelte
│   │   │   ├── AnswerOptions.svelte
│   │   │   ├── ScoreBoard.svelte
│   │   │   └── Timer.svelte
│   │   ├── host/
│   │   │   ├── QuizBuilder.svelte
│   │   │   ├── RoomControl.svelte
│   │   │   └── PlayerList.svelte
│   │   ├── player/
│   │   │   ├── JoinRoom.svelte
│   │   │   ├── AnswerButton.svelte
│   │   │   └── PlayerScore.svelte
│   │   └── common/
│   │       ├── Header.svelte
│   │       ├── Button.svelte
│   │       └── Modal.svelte
│   ├── stores/
│   │   ├── quiz.ts                 # Quiz state management
│   │   ├── room.ts                 # Room/session management
│   │   ├── players.ts              # Player data
│   │   └── websocket.ts            # WebSocket connection state
│   ├── services/
│   │   ├── websocket.ts            # WebSocket client/server logic
│   │   ├── api.ts                  # HTTP API calls
│   │   ├── quiz-engine.ts          # Quiz logic & scoring
│   │   └── room-manager.ts         # Room creation & management
│   ├── types/
│   │   ├── quiz.ts                 # Quiz, Question, Answer types
│   │   ├── player.ts               # Player, Session types
│   │   ├── room.ts                 # Room, RoomState types
│   │   └── websocket.ts            # WebSocket event types
│   └── utils/
│       ├── validation.ts           # Input validation helpers
│       ├── formatting.ts           # Date, time, score formatting
│       ├── room-code.ts            # Room code generation
│       └── scoring.ts              # Scoring calculations
```

### Configuration Files

#### `package.json`

- **Purpose:** Project metadata, dependencies, npm scripts
- **AI Agent Rules:**
  - Only modify dependencies when explicitly required
  - Keep version ranges consistent (use `^` for flexibility)
  - Always run `npm install` after modifying dependencies

#### `svelte.config.js`

- **Purpose:** SvelteKit framework configuration
- **AI Agent Rules:**
  - Do not modify adapter unless deployment target changes
  - Preprocessor settings are stable, avoid changes

#### `vite.config.ts`

- **Purpose:** Build tool configuration (Vite)
- **AI Agent Rules:**
  - Only add plugins when necessary
  - Do not modify port/host without user request

#### `tsconfig.json`

- **Purpose:** TypeScript compiler configuration
- **AI Agent Rules:**
  - Strict mode is enabled - maintain type safety
  - Do not weaken type checking rules
  - Use `$lib` alias for library imports

#### `eslint.config.js`

- **Purpose:** Code linting rules
- **AI Agent Rules:**
  - Flat config format (ESLint 9+) - do not convert to legacy format
  - Maintain consistency with Prettier rules

#### `.prettierrc`

- **Purpose:** Code formatting rules
- **AI Agent Rules:**
  - Tabs (not spaces) for indentation
  - Single quotes for strings
  - 100 character line width
  - Do not modify unless explicitly requested

#### `.env.example`

- **Purpose:** Environment variable template and configuration reference
- **Contains:**
  - Port settings and environment mode
  - **Public branding variables** (self-hosting friendly):
    - `PUBLIC_KWIQ_APP_NAME`: App name displayed throughout the UI
    - `PUBLIC_KWIQ_LOGO_URL`: Path to logo image (optional)
    - `PUBLIC_KWIQ_LOGO_ALT`: Logo alt text
    - `PUBLIC_KWIQ_PRIMARY_COLOR`: Primary theme color
    - `PUBLIC_KWIQ_GRADIENT_FROM`: Background gradient start color
    - `PUBLIC_KWIQ_GRADIENT_TO`: Background gradient end color
  - Future database/Redis URLs (not yet implemented)
- **Self-Hosting:**
  - Self-hosters can override branding by editing `.env` or passing env vars via Docker Compose
  - Public variables (prefixed with `PUBLIC_`) are exposed to the client via SvelteKit's env system
  - Changes to public vars require a rebuild to take effect
- **AI Agent Rules:**
  - Use this as the source of truth for configuration options
  - Never commit actual `.env` files (already in `.gitignore`)
  - Update `.env.example` when adding new environment variables
  - Do not include secrets, production URLs, or infrastructure-specific details

---

## AI Usage Policy

### General Principles

1. **Respect Existing Conventions:**
   - Follow established file structure and naming patterns
   - Match existing code style (tabs, single quotes, TypeScript types)
   - Use `$lib` alias for library imports (e.g., `import { foo } from '$lib/utils/bar'`)

2. **Type Safety First:**
   - All new code must be TypeScript
   - Define types in `src/lib/types/` for reusability
   - Use strict type checking - avoid `any` unless absolutely necessary
   - Prefer interfaces over types for object definitions

3. **Component Guidelines:**
   - Use Svelte 5 syntax (runes: `$state`, `$derived`, `$effect`)
   - Keep components focused and single-responsibility
   - Use Flowbite Svelte components when available
   - Apply Tailwind classes directly (avoid custom CSS unless necessary)

4. **Do Not Overwrite:**
   - **Never modify:** `.svelte-kit/`, `build/`, `node_modules/`
   - **Avoid modifying:** Configuration files unless explicitly requested
   - **Always read first:** Use Read tool before editing existing files

5. **Follow Milestone Tasks:**
   - Check `README.md` for current milestone priorities
   - Implement features in planned order
   - Do not skip ahead to future milestones without user approval

6. **Testing & Validation:**
   - Run `npm run check` after TypeScript changes
   - Run `npm run lint` after code changes
   - Test in dev server (`npm run dev`) before committing
   - Verify builds succeed (`npm run build`)

7. **Git Commit Messages:**
   - Use conventional commit format:
     - `feat:` for new features
     - `fix:` for bug fixes
     - `docs:` for documentation
     - `refactor:` for code refactoring
     - `style:` for formatting changes
     - `chore:` for maintenance tasks

### Code Generation Best Practices

#### Component Creation

When creating a new Svelte component:

```svelte
<script lang="ts">
	// 1. Import types from $lib/types/
	import type { Question } from '$lib/types/quiz';

	// 2. Define props with types
	interface Props {
		question: Question;
		onAnswer: (answerId: number) => void;
	}

	let { question, onAnswer }: Props = $props();

	// 3. Use Svelte 5 runes for reactivity
	let selectedAnswer = $state<number | null>(null);

	// 4. Derived state
	let hasAnswered = $derived(selectedAnswer !== null);

	// 5. Event handlers
	function handleAnswer(id: number) {
		selectedAnswer = id;
		onAnswer(id);
	}
</script>

<!-- 6. Use Tailwind + Flowbite components -->
<div class="rounded-lg bg-white p-4 dark:bg-slate-800">
	<h2 class="mb-4 text-xl font-bold">{question.text}</h2>
	<!-- Component content -->
</div>
```

#### Type Definition

When creating new types:

```typescript
// src/lib/types/quiz.ts

export interface Quiz {
	id: string;
	title: string;
	description?: string;
	questions: Question[];
	createdAt: Date;
}

export interface Question {
	id: number;
	type: QuestionType;
	text: string;
	mediaUrl?: string;
	timeLimit: number;
	points: number;
	answers: Answer[];
}

export interface Answer {
	id: number;
	text: string;
	isCorrect: boolean;
	order: number;
}

export type QuestionType = 'multiple-choice' | 'true-false' | 'text-input';
```

#### Service Implementation

When creating services:

```typescript
// src/lib/services/room-manager.ts

import type { Room, RoomState } from '$lib/types/room';

export class RoomManager {
	private rooms: Map<string, RoomState> = new Map();

	createRoom(hostId: string): Room {
		const roomCode = this.generateRoomCode();
		const room: RoomState = {
			roomCode,
			roomId: crypto.randomUUID(),
			hostId,
			players: [],
			currentQuestion: null,
			questionStartTime: null,
			scores: {},
			status: 'waiting'
		};

		this.rooms.set(roomCode, room);
		return room;
	}

	private generateRoomCode(): string {
		// Implementation
	}
}
```

#### Store Creation

When creating Svelte stores:

```typescript
// src/lib/stores/quiz.ts

import { writable, derived } from 'svelte/store';
import type { Quiz, Question } from '$lib/types/quiz';

interface QuizState {
	currentQuiz: Quiz | null;
	currentQuestionIndex: number;
	isActive: boolean;
}

const initialState: QuizState = {
	currentQuiz: null,
	currentQuestionIndex: 0,
	isActive: false
};

export const quizStore = writable<QuizState>(initialState);

// Derived store
export const currentQuestion = derived(
	quizStore,
	($quiz) => $quiz.currentQuiz?.questions[$quiz.currentQuestionIndex] ?? null
);
```

---

## Agent Tools & Context

### Primary Operations

AI agents working on KWIQ should be capable of:

1. **Code Generation:**
   - Create new Svelte components following project conventions
   - Generate TypeScript types and interfaces
   - Implement services and utility functions
   - Write WebSocket event handlers

2. **Code Refactoring:**
   - Extract reusable components
   - Improve type safety
   - Optimize performance
   - Reduce code duplication

3. **Documentation:**
   - Update README.md with new features
   - Add JSDoc comments to functions
   - Create inline code comments for complex logic
   - Update ARCHITECTURE.md when major changes occur

4. **Testing:**
   - Validate TypeScript compilation (`npm run check`)
   - Verify ESLint rules (`npm run lint`)
   - Test in dev environment (`npm run dev`)
   - Ensure production builds (`npm run build`)

5. **Bug Fixes:**
   - Diagnose type errors
   - Fix linting issues
   - Resolve build errors
   - Debug runtime issues

6. **Feature Implementation:**
   - Follow milestone task lists in README.md
   - Implement features incrementally
   - Maintain backward compatibility
   - Update documentation alongside code

### Context Requirements

Before implementing features, agents should:

1. **Read README.md** - Understand current milestone and goals
2. **Read ARCHITECTURE.md** - Understand system design
3. **Scan `src/routes/`** - Understand existing routes
4. **Check `src/lib/types/`** - Review existing type definitions
5. **Review `package.json`** - Know available dependencies

### Constraints & Limitations

**Do NOT:**

- Modify configuration files without explicit user request
- Add new dependencies without user approval
- Change TypeScript strict mode settings
- Disable ESLint or Prettier rules
- Create files outside `src/` unless necessary
- Use deprecated Svelte 4 syntax (use Svelte 5 runes)
- Mix tabs and spaces (use tabs)
- Use double quotes for strings (use single quotes)

**DO:**

- Use `$lib` alias for imports
- Follow Tailwind utility-first approach
- Leverage Flowbite components
- Write type-safe code
- Add JSDoc comments for public APIs
- Format code with Prettier before committing
- Test changes in dev server

---

## Command Reference

### Development

```bash
# Start development server (localhost:5173)
npm run dev

# Type check (no build)
npm run check

# Type check in watch mode
npm run check:watch

# Lint code (Prettier + ESLint)
npm run lint

# Auto-format code
npm run format
```

### Build & Deploy

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview

# Build Docker image
docker build -t kwiq:latest .

# Run Docker container
docker run -p 3000:3000 kwiq:latest
```

### Package Management

```bash
# Install dependencies
npm install

# Add new dependency
npm install <package-name>

# Add dev dependency
npm install --save-dev <package-name>

# Update dependencies
npm update

# Audit security vulnerabilities
npm audit
```

### Git

```bash
# Create feature branch
git checkout -b feature/your-feature

# Stage changes
git add .

# Commit with message
git commit -m "feat: your feature description"

# Push to remote
git push origin feature/your-feature
```

---

## Milestone Reference

Agents should prioritize tasks based on the current milestone in `README.md`:

### Milestone 1: Project Setup & Core Architecture (Current)

- [x] Initialize SvelteKit project
- [x] Configure TailwindCSS + Flowbite
- [x] Set up TypeScript strict mode
- [x] Configure ESLint + Prettier
- [ ] Create basic routing structure (`/host`, `/play`, `/screen/[code]`)
- [ ] Define core TypeScript types

### Milestone 2: Room System & Device Synchronization

- [ ] Implement WebSocket server
- [ ] Create room creation/join logic
- [ ] Build host room management interface
- [ ] Build player join interface
- [ ] Implement basic real-time synchronization

### Milestone 3-10: See README.md

**Current Priority:** Complete Milestone 1 tasks before proceeding to Milestone 2.

---

## WebSocket Event Reference (Planned)

When implementing WebSocket features (Milestone 2), use this event schema:

### Host → Server

```typescript
{ type: 'room:create', quizId: string }
{ type: 'room:start' }
{ type: 'question:start', questionId: number }
{ type: 'question:end' }
{ type: 'game:end' }
```

### Player → Server

```typescript
{ type: 'room:join', roomCode: string, playerName: string }
{ type: 'answer:submit', questionId: number, answerId: number, timestamp: number }
```

### Server → Clients

```typescript
{ type: 'room:created', roomCode: string, roomId: string }
{ type: 'room:joined', roomId: string, currentState: RoomState }
{ type: 'player:joined', player: Player }
{ type: 'player:left', playerId: string }
{ type: 'question:display', question: Question, timeLimit: number }
{ type: 'question:ended', correctAnswerId: number }
{ type: 'scores:update', scores: Array<{ playerId: string, score: number }> }
{ type: 'game:ended', finalScores: Array<{ playerId: string, score: number }> }
```

---

## Style Guide

### Naming Conventions

| Type                 | Convention       | Example               |
| -------------------- | ---------------- | --------------------- |
| **Files**            | kebab-case       | `quiz-builder.svelte` |
| **Components**       | PascalCase       | `QuizBuilder.svelte`  |
| **Variables**        | camelCase        | `playerScore`         |
| **Constants**        | UPPER_SNAKE_CASE | `MAX_PLAYERS`         |
| **Types/Interfaces** | PascalCase       | `QuizState`           |
| **Functions**        | camelCase        | `calculateScore()`    |

### File Organization

```typescript
// 1. Imports - external libraries first
import { writable } from 'svelte/store';
import { Button } from 'flowbite-svelte';

// 2. Imports - local modules
import type { Quiz } from '$lib/types/quiz';
import { quizStore } from '$lib/stores/quiz';

// 3. Type definitions
interface Props {
	quizId: string;
}

// 4. Component logic
let { quizId }: Props = $props();
let quiz = $state<Quiz | null>(null);

// 5. Functions
function loadQuiz() {
	// Implementation
}
```

### Tailwind Class Order

```svelte
<!-- Layout → Spacing → Sizing → Colors → Typography → Effects -->
<div class="flex w-full flex-col gap-4 rounded-lg bg-primary-500 p-4 text-white shadow-md">
	<!-- Content -->
</div>
```

---

## Troubleshooting

### Common Issues

**TypeScript Errors:**

```bash
# Run type check to see all errors
npm run check

# Common fix: Restart TypeScript server in your IDE
# VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

**Linting Errors:**

```bash
# Auto-fix most issues
npm run format

# Check remaining issues
npm run lint
```

**Build Errors:**

```bash
# Clear cache and rebuild
rm -rf .svelte-kit build
npm run build
```

**Dev Server Issues:**

```bash
# Kill process on port 5173 (if stuck)
# Windows: netstat -ano | findstr :5173
# macOS/Linux: lsof -ti:5173 | xargs kill

# Restart dev server
npm run dev
```

---

## API Documentation (Future)

When API endpoints are implemented, document them here:

### REST Endpoints

```
GET  /api/quiz/:id           # Get quiz by ID
POST /api/quiz               # Create new quiz
PUT  /api/quiz/:id           # Update quiz
DELETE /api/quiz/:id         # Delete quiz

GET  /api/room/:code         # Get room state
POST /api/room               # Create new room
```

### WebSocket Events

See "WebSocket Event Reference" section above.

---

## Resource Links

### Official Documentation

- **SvelteKit:** https://kit.svelte.dev/docs
- **Svelte 5:** https://svelte.dev/docs/svelte/overview
- **TypeScript:** https://www.typescriptlang.org/docs/
- **TailwindCSS:** https://tailwindcss.com/docs
- **Flowbite Svelte:** https://flowbite-svelte.com/

### Community Resources

- **SvelteKit Discord:** https://discord.gg/svelte
- **Svelte Reddit:** https://www.reddit.com/r/sveltejs/
- **Stack Overflow:** Tag `svelte` or `sveltekit`

### Tools

- **Svelte DevTools:** Browser extension for debugging
- **Prettier Plugin:** VS Code extension
- **ESLint Plugin:** VS Code extension

---

## Conclusion

AI agents working on KWIQ should prioritize:

1. **Code Quality:** Type-safe, well-formatted, lint-passing code
2. **Consistency:** Follow existing patterns and conventions
3. **Documentation:** Keep README, ARCHITECTURE, and inline docs updated
4. **Testing:** Validate changes before committing
5. **Milestone Alignment:** Follow planned task order

**Questions or Issues?**

- Review README.md for project overview
- Check ARCHITECTURE.md for design decisions
- Run `npm run check` and `npm run lint` before asking for help
- Test in `npm run dev` to reproduce issues

**Happy Coding!**
