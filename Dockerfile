# Use Node.js 20 as the base image for building
FROM node:20 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run initialize
RUN npm run build

# Start a new stage to create a lightweight production image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only the built files and dependencies from the previous stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/logs ./logs
COPY --from=builder /app/.env.node-app ./.env

# Expose the port your app runs on
EXPOSE ${SERVER_PORT}

CMD [ "node", "dist/index.js" ]
