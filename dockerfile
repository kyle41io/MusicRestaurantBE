# Use the official Node.js 18 base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Run the build command if necessary (uncomment if needed)
RUN npm run build

# Expose the desired port (if your Node.js app listens on a specific port)
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]
