# Stage 1: Build the frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock/pnpm-lock.yaml)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built frontend using a lightweight server (e.g., nginx)
FROM nginx:stable-alpine

# Copy the built frontend files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port nginx serves on
EXPOSE 80

# Default command to start nginx
CMD ["nginx", "-g", "daemon off;"]