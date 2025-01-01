CREATE DATABASE IF NOT EXISTS `attendance_db`; 

USE `attendance_db`;

-- attendance_db.users definition

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `gender` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- attendance_db.attendance definition

CREATE TABLE `attendance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `clockIn` datetime NOT NULL,
  `clockOut` datetime NOT NULL,
  `photoFile` text NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `photoUrl` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO attendance_db.users
(uuid, name, email, password, gender, `role`, createdAt, updatedAt)
VALUES('605a03bc-f52b-4a8a-8ff8-49cc697cc4cd', 'admin', 'admin@admin.com', '$argon2id$v=19$m=65536,t=3,p=4$Lon3DazIsaYkB+cTHIUcHw$sYuxM21X5mDN3DD7RLaXPrwmhq3c7Ahhxl0VO0Suaus', 'Male', 'HRD', '2025-01-01 04:02:05', '2025-01-01 04:02:05');