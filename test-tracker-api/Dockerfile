# Use official Node.js 22 image
FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose API port
EXPOSE 3000

# Start the API
CMD ["npm", "run", "start"]
