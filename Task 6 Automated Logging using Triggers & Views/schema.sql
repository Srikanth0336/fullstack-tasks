-- Create the database
CREATE DATABASE IF NOT EXISTS enterprise_db;
USE enterprise_db;

-- Main employees table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Audit log table to store changes
CREATE TABLE IF NOT EXISTS audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    action_type ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    details TEXT,
    changed_by VARCHAR(50) DEFAULT 'SYSTEM',
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drop triggers if they exist to allow re-running script
DROP TRIGGER IF EXISTS after_employee_insert;
DROP TRIGGER IF EXISTS after_employee_update;

-- Trigger for INSERT operations
CREATE TRIGGER after_employee_insert
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (employee_id, action_type, details)
    VALUES (NEW.id, 'INSERT', CONCAT('New employee added: ', NEW.name, ' as ', NEW.position));
END;

-- Trigger for UPDATE operations
CREATE TRIGGER after_employee_update
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (employee_id, action_type, details)
    VALUES (NEW.id, 'UPDATE', CONCAT('Updated ', OLD.name, '. Position: ', OLD.position, ' -> ', NEW.position, ', Salary: ', OLD.salary, ' -> ', NEW.salary));
END;

-- View for Daily Activity Report
CREATE OR REPLACE VIEW daily_activity_report AS
SELECT 
    DATE(changed_at) AS report_date,
    action_type,
    COUNT(*) AS total_actions,
    GROUP_CONCAT(details SEPARATOR ' | ') AS summary_details
FROM 
    audit_log
GROUP BY 
    DATE(changed_at), action_type
ORDER BY 
    report_date DESC;
