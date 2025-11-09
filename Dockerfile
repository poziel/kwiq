# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the SvelteKit application
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy necessary source files for Socket.IO server
COPY --from=builder /app/src/lib/server ./src/lib/server
COPY --from=builder /app/vite-plugin-socket-io.ts ./vite-plugin-socket-io.ts

# Set environment to production
ENV NODE_ENV=production

# Expose port (configurable via environment variable)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the application
CMD ["node", "build"]
