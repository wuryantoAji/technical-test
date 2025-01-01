# Recruitment Task - Dexa

Aji Wuryanto

## How to run

- run `docker compose up --build -d`

## Issue

There is a chance that the mysql-container is deployed but the service is not ready yet hence the backend service cannot connect normally, if this happens then please restart the backend container and it should fix the problem

## Account

admin account that can be used after all of the services are on:
email: admin@admin.com
password: 123456

## Functionality

Application functionality

1. HRD can add a new user (HRD and user)
2. HRD and user can add attendance
3. HRD can see all attendance
4. user can only see their own attendance
5. HRD can see all user (HRD and user) in the database

# Stopping the application

to stop the app, run `docker compose down`
