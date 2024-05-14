# Use Node.js LTS image as base
# FROM node:lts

# # Install pnpm globally
# RUN npm install -g pnpm

# # Set working directory
# WORKDIR /usr/src/app

# # Copy package.json and pnpm-lock.yaml
# COPY package.json ./

# # Install dependencies using pnpm
# RUN pnpm install

# # Copy the rest of the project files
# COPY . .

# # Generate Prisma client
# RUN npx prisma generate

# # Build the Next.js project
# RUN pnpm run build

# # Expose the port Next.js is running on
# EXPOSE 3000

# # Start the Next.js app
# CMD ["pnpm", "start"]

# ----------------------- Multi-stage build ----------------------- #

# Stage 1: Build the Next.js project
FROM node:lts AS builder

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json ./

# Install dependencies using pnpm
RUN pnpm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js project
RUN pnpm run build

# Stage 2: Create a lightweight image to run the app
FROM node:lts

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public

# Expose the port Next.js is running on
EXPOSE 3000

# Start the Next.js app
CMD ["pnpm", "start"]