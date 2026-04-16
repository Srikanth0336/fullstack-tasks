require('dotenv').config();
const mysql = require('mysql2/promise');

async function setup() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });

    console.log('--- Database Setup Started ---');

    try {
        // Create Database
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        console.log(`✓ Database "${process.env.DB_NAME}" ensured.`);

        await connection.query(`USE ${process.env.DB_NAME}`);

        // Create Users Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                balance DECIMAL(10, 2) DEFAULT 0.00
            )
        `);
        console.log('✓ Users table ready.');

        // Create Merchants Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS merchants (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                balance DECIMAL(10, 2) DEFAULT 0.00
            )
        `);
        console.log('✓ Merchants table ready.');

        // Create Transactions Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS transactions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                merchant_id INT,
                amount DECIMAL(10, 2),
                status ENUM('SUCCESS', 'FAILED') NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (merchant_id) REFERENCES merchants(id)
            )
        `);
        console.log('✓ Transactions table ready.');

        // Add some initial seed data if tables are empty
        const [rows] = await connection.query('SELECT COUNT(*) as count FROM users');
        if (rows[0].count === 0) {
            await connection.query(`
                INSERT INTO users (name, balance) VALUES 
                ('Alice Martin', 500.00), 
                ('Bob Wilson', 50.00)
            `);
            await connection.query(`
                INSERT INTO merchants (name, balance) VALUES 
                ('Premium Store', 1000.00), 
                ('Tech Gadgets', 500.00)
            `);
            console.log('✓ Initial seed data inserted.');
        }

        console.log('\n✨ Database setup complete! You can now run "npm start".');
    } catch (err) {
        console.error('❌ Setup failed:', err.message);
    } finally {
        await connection.end();
    }
}

setup();
