# Use a Node.js image as the base for the application
FROM node:18

# Install MySQL
RUN apt-get update && \
    apt-get install -y mysql-server && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy all the content from the current folder to the container
COPY . ./

# Install Node.js dependencies
RUN npm install

# Expose necessary ports for both MySQL and the applications
# MySQL default port
EXPOSE 3306
# Express.js backend default port
EXPOSE 5000
# React.js frontend default port
EXPOSE 5174

# Start MySQL service and the applications
CMD ["sh", "-c", "service mysql start && nodemon server.js & cd frontend && npm start"]
