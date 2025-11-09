# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build application
COPY . .
RUN npm run build
RUN npm prune --production

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built app and dependencies
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy server-side files
COPY --from=builder /app/src/lib/server ./src/lib/server
COPY --from=builder /app/vite-plugin-socket-io.ts ./vite-plugin-socket-io.ts

ENV NODE_ENV=production

EXPOSE 3000

# Start the application
CMD ["node", "build"]
