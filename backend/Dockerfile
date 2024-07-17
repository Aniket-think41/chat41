# Use Node.js version 14 as base image
FROM node:14

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 5000 (or whichever port your Express app listens on)
EXPOSE 5000

# Command to run the backend server
CMD ["npm", "start"]
