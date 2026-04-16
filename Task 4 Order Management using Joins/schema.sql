-- Order Management System Schema

-- Create Customers Table
CREATE TABLE IF NOT EXISTS Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    stock_quantity INT DEFAULT 0
);

-- Create Orders Table
CREATE TABLE IF NOT EXISTS Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    product_id INT,
    order_date DATE NOT NULL,
    quantity INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Seed Data
INSERT INTO Customers (name, email, city) VALUES
('John Doe', 'john@example.com', 'New York'),
('Jane Smith', 'jane@example.com', 'Los Angeles'),
('Michael Brown', 'michael@example.com', 'Chicago'),
('Emily Davis', 'emily@example.com', 'Houston'),
('Sarah Wilson', 'sarah@example.com', 'Phoenix');

INSERT INTO Products (name, price, category) VALUES
('Laptop Pro', 1200.00, 'Electronics'),
('Wireless Mouse', 25.00, 'Accessories'),
('Mechanical Keyboard', 150.00, 'Accessories'),
('Monitor 4K', 450.00, 'Electronics'),
('USB-C Hub', 40.00, 'Electronics');

INSERT INTO Orders (customer_id, product_id, order_date, quantity, total_amount) VALUES
(1, 1, '2023-10-01', 1, 1200.00),
(2, 2, '2023-10-02', 2, 50.00),
(1, 3, '2023-10-03', 1, 150.00),
(3, 4, '2023-10-04', 1, 450.00),
(4, 5, '2023-10-05', 3, 1200.00), -- High value order
(1, 2, '2023-10-06', 1, 25.00),  -- John is active
(5, 1, '2023-10-07', 1, 1200.00);

-- Query: Display customer order history using JOIN
-- SELECT 
--     c.name AS CustomerName, 
--     o.order_id, 
--     p.name AS ProductName, 
--     o.order_date, 
--     o.total_amount
-- FROM Orders o
-- JOIN Customers c ON o.customer_id = c.customer_id
-- JOIN Products p ON o.product_id = p.product_id
-- ORDER BY o.order_date DESC;

-- Query: Highest value order using a subquery
-- SELECT * FROM Orders 
-- WHERE total_amount = (SELECT MAX(total_amount) FROM Orders);

-- Query: Most active customer using a subquery (in the WHERE clause or as part of a join)
-- SELECT * FROM Customers 
-- WHERE customer_id = (
--     SELECT customer_id 
--     FROM Orders 
--     GROUP BY customer_id 
--     ORDER BY COUNT(*) DESC 
--     LIMIT 1
-- );
