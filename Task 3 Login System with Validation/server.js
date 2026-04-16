require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Login Route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required." });
    }

    db.getUserByUsername(username, (err, user) => {
        if (err) {
            console.error("Login DB Error:", err.message);
            const msg = err.message.includes('Access denied') 
                ? "Database access denied. Check your .env password!" 
                : "Database error.";
            return res.status(500).json({ success: false, message: msg });
        }

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        // In a real app, use bcrypt to compare hashed passwords
        if (user.password === password) {
            return res.json({ success: true, message: "Login successful!", user: { username: user.username, email: user.email } });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }
    });
});

// Registration Route
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // In a real app, hash the password
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.pool.query(query, [username, email, password], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ success: false, message: "Username or Email already exists." });
            }
            return res.status(500).json({ success: false, message: "Registration failed." });
        }
        res.json({ success: true, message: "Account created! You can now login." });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
