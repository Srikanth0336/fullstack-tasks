const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Create connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('MySQL Connection Error:', err);
        return;
    }
    console.log('Connected to MySQL Database.');
});

// Endpoint to add employee (Trigger will fire)
app.post('/api/employees', (req, res) => {
    const { name, position, salary } = req.body;
    const query = 'INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)';
    db.query(query, [name, position, salary], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Employee added!', id: result.insertId });
    });
});

// Endpoint to update employee (Trigger will fire)
app.put('/api/employees/:id', (req, res) => {
    const { id } = req.params;
    const { position, salary } = req.body;
    const query = 'UPDATE employees SET position = ?, salary = ? WHERE id = ?';
    db.query(query, [position, salary, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Employee updated!' });
    });
});

// Endpoint to fetch audit logs
app.get('/api/logs', (req, res) => {
    db.query('SELECT * FROM audit_log ORDER BY changed_at DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Endpoint to fetch daily activity report (From VIEW)
app.get('/api/report', (req, res) => {
    db.query('SELECT * FROM daily_activity_report', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
