# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set build arguments for environment variables
ARG NEXT_PUBLIC_CMS_GRAPHQL_URL
ARG NEXT_PUBLIC_UPLOAD_URL
ARG NEXT_PUBLIC_MAINTENANCE_MODE
ARG NEXT_PUBLIC_YANDEX_MAPS_API_KEY

# Set environment variables for build time
ENV NEXT_PUBLIC_CMS_GRAPHQL_URL=$NEXT_PUBLIC_CMS_GRAPHQL_URL
ENV NEXT_PUBLIC_UPLOAD_URL=$NEXT_PUBLIC_UPLOAD_URL
ENV NEXT_PUBLIC_MAINTENANCE_MODE=$NEXT_PUBLIC_MAINTENANCE_MODE
ENV NEXT_PUBLIC_YANDEX_MAPS_API_KEY=$NEXT_PUBLIC_YANDEX_MAPS_API_KEY

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"] 