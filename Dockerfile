# ---------------------
# Build stage
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the NestJS app
RUN npm run build

# ---------------------
# Production stage
FROM node:22-alpine AS production

WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy built app from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Azure App Service sets PORT=8080
ENV PORT=8080

# Expose port for Azure
EXPOSE 8080

# Run the app, binding to Azure’s expected port
CMD ["node", "dist/main"]