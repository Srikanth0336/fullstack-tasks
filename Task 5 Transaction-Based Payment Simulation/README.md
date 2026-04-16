# Transaction-Based Payment Simulation

A high-fidelity simulation of an online payment process using Node.js, Express, and MySQL. This project demonstrates the usage of SQL transactions (`COMMIT` and `ROLLBACK`) to ensure data integrity during financial transfers.

## 🚀 Features
- **ACID Compliant Transactions**: Uses MySQL transactions to ensure that balance deduction and addition happen atomically.
- **Real-Time Balance Updates**: Frontend automatically refreshes to show updated user and merchant balances.
- **Premium UI**: Designed with glassmorphism, dynamic animations, and a modern color palette.
- **Fail-Safe Mechanism**: Automatically rolls back changes if any part of the transaction fails (e.g., insufficient funds or database error).

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MySQL (using `mysql2/promise`)
- **Frontend**: HTML5, Vanilla CSS, JavaScript (ES6+)
- **Environment**: Dotenv for secure configuration

## 📋 Prerequisites
- Node.js installed
- MySQL Server running

## ⚙️ Setup Instructions

1. **Configure Environment**:
   - Open the `.env` file.
   - Update `DB_USER` and `DB_PASSWORD` (currently set to `Srikanth74`).

2. **Run Auto-Setup**:
   - This script will automatically create the database and tables for you.
   ```bash
   node db_setup.js
   ```

3. **Install Dependencies & Run**:
   ```bash
   npm install
   npm start
   ```

4. **Run the Application**:
   ```bash
   npm start
   ```
   *Note: You may need to add `"start": "node server.js"` to your `package.json` scripts.*

5. **Access the App**:
   - Open your browser and navigate to `http://localhost:3000`.

## 🧪 Transaction Logic Flow
1. **Start Transaction**: `BEGIN TRANSACTION`
2. **Check Balance**: Verify if the user has enough funds.
3. **Deduct Funds**: Update user balance (`balance = balance - amount`).
4. **Credit Merchant**: Update merchant balance (`balance = balance + amount`).
5. **Log Success**: Insert a record into the `transactions` table.
6. **Commit**: If all steps succeed, `COMMIT` changes.
7. **Rollback**: If any step fails, `ROLLBACK` to restore previous state.

## 📄 License
MIT License
