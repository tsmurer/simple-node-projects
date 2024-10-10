# Use the official Node.js 20 image as the base
FROM node:20-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port your application will listen on (replace 3000 with your desired port)
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start:dev"]