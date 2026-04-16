const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve current directory files

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        console.log('NOTE: Please ensure you have created the database "order_management_db" and run the schema.sql script.');
        return;
    }
    console.log('Connected to MySQL Database.');
});

// 1. GET Order History with JOINs
app.get('/api/orders', (req, res) => {
    const query = `
        SELECT 
            o.order_id, 
            c.name AS customerName, 
            p.name AS productName, 
            p.category,
            o.order_date, 
            o.total_amount,
            'Completed' as status
        FROM Orders o
        JOIN Customers c ON o.customer_id = c.customer_id
        JOIN Products p ON o.product_id = p.product_id
        ORDER BY o.order_date DESC
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. GET Stats with Subqueries
app.get('/api/stats', (req, res) => {
    const highestOrderQuery = `
        SELECT o.total_amount, c.name as customerName
        FROM Orders o
        JOIN Customers c ON o.customer_id = c.customer_id
        WHERE o.total_amount = (SELECT MAX(total_amount) FROM Orders)
        LIMIT 1
    `;

    const activeCustomerQuery = `
        SELECT c.name, COUNT(o.order_id) as orderCount
        FROM Customers c
        JOIN Orders o ON c.customer_id = o.customer_id
        GROUP BY c.customer_id
        ORDER BY orderCount DESC
        LIMIT 1
    `;

    db.query(highestOrderQuery, (err, highest) => {
        if (err) return res.status(500).json({ error: err.message });
        
        db.query(activeCustomerQuery, (err, active) => {
            if (err) return res.status(500).json({ error: err.message });
            
            res.json({
                highestOrder: highest[0],
                activeCustomer: active[0]
            });
        });
    });
});

// 3. GET Customers (for dropdown)
app.get('/api/customers', (req, res) => {
    db.query('SELECT customer_id, name FROM Customers', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 4. GET Products (for dropdown)
app.get('/api/products', (req, res) => {
    db.query('SELECT product_id, name, price FROM Products', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 5. POST Create New Order
app.post('/api/orders', (req, res) => {
    const { customer_id, product_id, quantity, order_date } = req.body;
    
    // First, get the product price to calculate total_amount
    db.query('SELECT price FROM Products WHERE product_id = ?', [product_id], (err, product) => {
        if (err || product.length === 0) return res.status(500).json({ error: 'Product not found' });
        
        const total_amount = product[0].price * quantity;
        const query = 'INSERT INTO Orders (customer_id, product_id, quantity, order_date, total_amount) VALUES (?, ?, ?, ?, ?)';
        
        db.query(query, [customer_id, product_id, quantity, order_date, total_amount], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Order created successfully', orderId: result.insertId });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
