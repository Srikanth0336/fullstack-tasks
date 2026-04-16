const mysql = require('mysql2/promise');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

async function setup() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    });

    console.log('Connected to MySQL.');

    try {
        const schema = fs.readFileSync('schema.sql', 'utf8');
        await connection.query(schema);
        console.log('Database, tables, triggers, and views created successfully.');
    } catch (err) {
        console.error('Error executing schema:', err.message);
    } finally {
        await connection.end();
    }
}

setup();
