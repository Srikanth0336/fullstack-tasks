const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database Connection (Initially without database name)
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL.');

  // Create database
  connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log(`Database "${process.env.DB_NAME}" ready.`);

    // Switch to the database
    connection.query(`USE ${process.env.DB_NAME}`, (err) => {
      if (err) {
        console.error('Error switching database:', err);
        return;
      }

      // Create table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS feedbacks (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          rating INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      connection.query(createTableQuery, (err) => {
        if (err) console.error('Error creating table:', err);
        else console.log('Feedbacks table ready.');
      });
    });
  });
});

// Use connection in routes
const db = connection;

// Routes
app.post('/api/feedback', (req, { name, email, message, rating } = req.body, res) => {
  const query = 'INSERT INTO feedbacks (name, email, message, rating) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, message, rating], (err, result) => {
    if (err) {
      console.error('Error inserting feedback:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json({ success: true, message: 'Feedback submitted successfully!' });
  });
});

app.get('/api/feedbacks', (req, res) => {
  const query = 'SELECT * FROM feedbacks ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching feedbacks:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
