# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the client app
RUN cd client && npm install && npm run build

# Expose the desired port
EXPOSE 8000

# Start the server
CMD ["npm", "run", "server"]
