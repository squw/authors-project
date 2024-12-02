# Use the official Node.js image as the base image
FROM node:20.18.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 4200
EXPOSE 4200

# Start the Angular application
CMD ["npm", "start"]