# Use a Node.js image as the base for the application
FROM node:latest

# Install MySQL
RUN apt-get update && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy all the content from the current folder to the container
COPY . ./

# Install Node.js dependencies
RUN npm install

# Expose necessary ports for both MySQL and the applications
# React.js frontend default port
EXPOSE 5173

# Start MySQL service and the applications
CMD ["sh", "-c", "npm start -- --host"]
