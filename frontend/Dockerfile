
FROM node:20-slim

# Set working directory
WORKDIR /app

# Only copy dependency files first (allows docker cache to work)
COPY package*.json ./

# Clean install dependencies for container's Linux arch
RUN npm ci

# Now copy the rest of your source code
COPY . .

# Expose dev server port (Vite)
EXPOSE 5173

# Run dev server
CMD ["npm", "run", "dev"]