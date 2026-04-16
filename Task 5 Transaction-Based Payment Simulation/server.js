require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./'));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Get users and merchants for the dropdowns
app.get('/api/data', async (req, res) => {
    try {
        const [users] = await pool.query('SELECT * FROM users');
        const [merchants] = await pool.query('SELECT * FROM merchants');
        res.json({ users, merchants });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new user
app.post('/api/users', async (req, res) => {
    const { name, balance } = req.body;
    try {
        await pool.query('INSERT INTO users (name, balance) VALUES (?, ?)', [name, balance]);
        res.json({ message: 'User created successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new merchant
app.post('/api/merchants', async (req, res) => {
    const { name, balance } = req.body;
    try {
        await pool.query('INSERT INTO merchants (name, balance) VALUES (?, ?)', [name, balance]);
        res.json({ message: 'Merchant created successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Process Payment Transaction
app.post('/api/pay', async (req, res) => {
    const { userId, merchantId, amount } = req.body;
    const paymentAmount = parseFloat(amount);

    if (!userId || !merchantId || isNaN(paymentAmount) || paymentAmount <= 0) {
        return res.status(400).json({ message: 'Invalid payment details' });
    }

    const connection = await pool.getConnection();

    try {
        // Start Transaction
        await connection.beginTransaction();

        // 1. Check user balance
        const [userRows] = await connection.query('SELECT balance FROM users WHERE id = ? FOR UPDATE', [userId]);
        if (userRows.length === 0) throw new Error('User not found');
        
        const currentBalance = parseFloat(userRows[0].balance);
        if (currentBalance < paymentAmount) {
            throw new Error('Insufficient balance');
        }

        // 2. Deduct from user
        await connection.query('UPDATE users SET balance = balance - ? WHERE id = ?', [paymentAmount, userId]);

        // 3. Add to merchant
        await connection.query('UPDATE merchants SET balance = balance + ? WHERE id = ?', [paymentAmount, merchantId]);

        // 4. Log transaction
        await connection.query(
            'INSERT INTO transactions (user_id, merchant_id, amount, status) VALUES (?, ?, ?, ?)',
            [userId, merchantId, paymentAmount, 'SUCCESS']
        );

        // Commit transaction
        await connection.commit();
        res.json({ message: 'Payment successful!' });

    } catch (err) {
        // Rollback transaction on failure
        await connection.rollback();
        
        // Log failed transaction if possible (outside the aborted transaction logic if needed, but here we just error out)
        // Optionally insert into transaction log as FAILED (requires a new connection or handling)
        
        res.status(400).json({ message: err.message });
    } finally {
        connection.release();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
