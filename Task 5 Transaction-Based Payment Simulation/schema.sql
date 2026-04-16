CREATE DATABASE IF NOT EXISTS payment_sim;
USE payment_sim;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS merchants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    merchant_id INT,
    amount DECIMAL(10, 2),
    status ENUM('SUCCESS', 'FAILED') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

-- Seed data
INSERT INTO users (name, balance) VALUES ('Alice Martin', 500.00);
INSERT INTO users (name, balance) VALUES ('Bob Wilson', 50.00);
INSERT INTO merchants (name, balance) VALUES ('Premium Store', 1000.00);
INSERT INTO merchants (name, balance) VALUES ('Tech Gadgets', 500.00);
