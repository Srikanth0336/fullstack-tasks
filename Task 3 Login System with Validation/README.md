# Task 3: Premium Login System with MySQL & Validation

A modern, full-stack authentication system featuring a premium Glassmorphism UI, real-time client-side validation, and a robust Node.js/MySQL backend.

## ✨ Features

- **Modern UI**: Dark-themed glassmorphism design with animated background blobs.
- **Dynamic Validation**: Real-time JavaScript validation for usernames, emails, and passwords.
- **Full-Stack Auth**: Secure login and registration flows connected to a MySQL database.
- **Responsive Design**: Elegant layout that works on all screen sizes.
- **Auto-Initialization**: Database and tables are automatically created on server start.

## 🚀 Tech Stack

- **Frontend**: HTML5, Vanilla CSS3, JavaScript (Fetch API)
- **Backend**: Node.js, Express.js
- **Database**: MySQL (using `mysql2` pool)
- **Configuration**: `dotenv` for environment variables

## 🛠️ Setup Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MySQL Server](https://dev.mysql.com/downloads/mysql/) installed and running

### 2. Configuration
Open the `.env` file in the root directory and update your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=login_system
```

### 3. Installation
Install the necessary dependencies:
```bash
npm install
```

### 4. Running the Project
Start the backend server:
```bash
node server.js
```
The application will be available at: **http://localhost:3000**

## 🔑 Test Credentials
The system automatically seeds the following users upon the first run:
- **User 1**: `srikanth` / `password123`
- **User 2**: `admin` / `password123`

## 📁 Project Structure
- `server.js`: Express server and API routing.
- `database.js`: MySQL connection pooling and schema initialization.
- `public/`: Frontend assets (HTML, CSS, JS).
- `.env`: Environment variables for database security.
- `setup.sql`: Manual SQL script for database creation if needed.

## 📝 License
This project is for educational purposes. Feel free to use and modify it!
