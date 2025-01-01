# Use a Node.js image as the base for the application
FROM node:latest

# Install MySQL
RUN apt-get update && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy all the content from the current folder to the container
COPY . ./

RUN mkdir uploads

# Install Node.js dependencies
RUN npm install
RUN npm install -g nodemon

# Expose necessary ports for both MySQL and the applications
# Express.js backend default port
EXPOSE 5000

# Start MySQL service and the applications
CMD ["sh", "-c", "nodemon"]
