-- Create the database
CREATE DATABASE IF NOT EXISTS login_system;
USE login_system;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Insert seed user
INSERT IGNORE INTO users (username, email, password) 
VALUES ('admin', 'admin@example.com', 'password123');
