# 🧠 KWIQ

**KWIQ** is a fast, social quiz platform designed for parties, classrooms, or community gatherings.  
Players join from their phones or computers and compete live on a shared screen — transforming trivia into a dynamic, interactive experience.

---

## 🎯 Overview

KWIQ combines the fun of in-person games with the power of the web.  
You can host a quiz, cast it to a TV or projector, and let everyone join instantly from their devices.  
It supports both **static** quizzes (predefined questions) and **dynamic** quizzes (adaptive questions that evolve based on player data).

Whether you're hosting a trivia night with friends or running an educational challenge, KWIQ keeps everyone connected, engaged, and laughing.

---

## 🧩 How It Works

1. The **host** creates a quiz and launches it on a shared screen (TV, projector, or computer).
2. **Players** join by scanning a QR code or entering a room code on their phones/computers.
3. The quiz progresses question by question, with real-time updates shown to all players.
4. Questions can be:
   - **Static**: predefined question/answer pairs (e.g. *“What is the capital of India?”* → *“New Delhi”*)
   - **Dynamic**: logic-driven (e.g. *“Who mains this champion?”* → randomly pulls from a player data list)
5. Scores are tracked, winners are displayed, and everyone celebrates (or argues over that one question 😄).

---

## 👥 Who It's For

- Party hosts and social groups  
- Classroom educators and trainers  
- Gaming communities (e.g. custom League of Legends quizzes)  
- Streamers or community event organizers  

If you've ever wished **Kahoot** and **Jackbox** had a baby — that's KWIQ.

---

## 🧠 Architecture Overview

KWIQ is a full-stack **SvelteKit** application running in a secure containerized environment.

| Layer | Technology | Purpose |
|-------|-------------|---------|
| **Frontend & Backend** | [SvelteKit](https://kit.svelte.dev/) | Unified app logic, routing, and SSR |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [Flowbite Svelte](https://flowbite-svelte.com/) | Modern, responsive UI |
| **Realtime** | WebSockets (via Node or Socket.IO) | Player/host synchronization |
| **Containerization** | [Docker](https://www.docker.com/) | Consistent deployment |
| **CI/CD** | GitHub Actions | Build → push → deploy |

---

## 🛠️ Tech Stack Summary

- **Framework:** SvelteKit (TypeScript mode)
- **Styling:** TailwindCSS, Tailwind Forms + Typography plugins, Flowbite Svelte
- **Package Manager:** npm
- **Build Tool:** Vite (bundled with SvelteKit)
- **Runtime:** Node.js 18+
- **Containerization:** Docker & Docker Compose
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions for automated deployments  

---

## ⚙️ Getting Started (Local Development)

### 1. Clone the repository

```
git clone https://github.com/poziel/kwiq.git
cd kwiq
```

### 2. Install dependencies

```
npm install
```

### 3. Run development server

```
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## 🐳 Docker Setup

### Build and run

```bash
docker build -t kwiq .
docker run -d -p 3000:3000 kwiq
```

Or using Docker Compose:

```bash
docker-compose up -d
```

The application will be available on port 3000. Configure your deployment environment with appropriate SSL/TLS and domain routing as needed.

---

## 🧩 Project Milestones

| # | Milestone | Status |
|---|------------|--------|
| 1 | Project Setup & Core Architecture | 🔄 In Progress |
| 2 | Room System & Device Synchronization | ⏳ Planned |
| 3 | Hosting & Casting Interface | ⏳ Planned |
| 4 | Static Quiz Engine | ⏳ Planned |
| 5 | Dynamic Quiz Logic | ⏳ Planned |
| 6 | Quiz Builder Interface | ⏳ Planned |
| 7 | Player Experience | ⏳ Planned |
| 8 | Scoring & Rounds | ⏳ Planned |
| 9 | Theming & Polish | ⏳ Planned |
| 10 | Deployment & Beta | ⏳ Planned |

---

## 📦 Repository Structure (initial)

```
kwiq/
├─ src/
│  ├─ routes/
│  │  ├─ +page.svelte
│  │  ├─ host/
│  │  ├─ play/
│  │  └─ screen/[code]/
│  ├─ app.css
│  └─ lib/
├─ static/
├─ docker-compose.yml
├─ Dockerfile
├─ tailwind.config.cjs
├─ tsconfig.json
├─ postcss.config.cjs
└─ README.md
```

---

## 💬 License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.

---

## 🧑‍💻 Author

**Poziel**  
Creator of KWIQ — made for friends, fun, and fast quizzes.  
🌐 [https://poziel.com](https://poziel.com)
