require('dotenv').config();
const mysql = require('mysql2');

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
};

const dbName = process.env.DB_NAME || 'login_system';

// Initial connection to create database
const connection = mysql.createConnection(dbConfig);

connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err) => {
    if (err) {
        console.error("Error creating database:", err.message);
    } else {
        console.log(`Database '${dbName}' verified/created.`);
    }
    connection.end();
    
    // Now create the pool with the database specified
    setupPool();
});

let pool;

function setupPool() {
    pool = mysql.createPool({
        ...dbConfig,
        database: dbName,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    initTable();
}

function initTable() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    )`;

    pool.query(createTableQuery, (err) => {
        if (err) {
            console.error("Error creating users table:", err.message);
            return;
        }
        
        // Seed users
        const seedUsers = [
            { username: "admin", email: "admin@example.com", password: "password123" },
            { username: "srikanth", email: "srikanth@example.com", password: "password123" }
        ];

        seedUsers.forEach(user => {
            pool.query("SELECT * FROM users WHERE username = ?", [user.username], (err, results) => {
                if (results && results.length === 0) {
                    pool.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
                        [user.username, user.email, user.password], (err) => {
                        if (!err) console.log(`Seed user '${user.username}' ready.`);
                    });
                }
            });
        });
    });
}

module.exports = {
    pool,
    getUserByUsername: (username, callback) => {
        if (!pool) return callback(new Error("Database not initialized"));
        pool.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
            callback(err, results ? results[0] : null);
        });
    },
    getUserByEmail: (email, callback) => {
        if (!pool) return callback(new Error("Database not initialized"));
        pool.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
            callback(err, results ? results[0] : null);
        });
    }
};
