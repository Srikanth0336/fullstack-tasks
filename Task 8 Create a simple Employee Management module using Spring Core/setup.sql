-- SQL Script to set up the MySQL database
CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

CREATE TABLE IF NOT EXISTS employees (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    salary DOUBLE
);

-- Optional: Sample data
-- INSERT INTO employees (id, name, department, salary) VALUES (1, 'John Doe', 'IT', 80000);
