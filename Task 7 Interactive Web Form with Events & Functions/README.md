# Interactive Feedback Form with MySQL Backend

A premium, highly interactive feedback submission system featuring real-time validation, dynamic UI effects, and a Node.js/MySQL backend.

## 🚀 Features
- **Real-time Validation**: Inputs are validated as you type using `keyup` events and modular JS functions.
- **Dynamic Highlighting**: Form fields highlight elegantly on `mouseenter` and `mouseleave`.
- **Safe Submission**: Critical actions are guarded by a `dblclick` (double-click) event handler on the submit button.
- **Feedback Dashboard**: A dedicated view to monitor and review all submitted feedback entries.
- **Glassmorphism UI**: A stunning, modern design using vanilla CSS with blur effects and gradients.
- **MySQL Integration**: Persistent storage for all feedback submissions.
- **Responsive Design**: Optimized for all screen sizes.

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Environment**: Dotenv for secure configuration

## 📋 Prerequisites
- Node.js installed
- MySQL Server running
- A database named `feedback_db`

## ⚙️ Setup Instructions

1. **Database Setup**:
   ```sql
   CREATE DATABASE feedback_db;
   ```
   (The table will be automatically created by the server on first run!)

2. **Configuration**:
   Update the `.env` file with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=feedback_db
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the Server**:
   ```bash
   npm start
   ```

5. **Access the App**:
   - Feedback Form: `http://localhost:5000`
   - View Results: `http://localhost:5000/view-feedback.html`

## 📂 Project Structure
- `server.js`: Express server and MySQL connection logic.
- `public/`: Frontend assets (HTML, CSS, JS).
- `.env`: Environment variables.
- `package.json`: Project dependencies and scripts.

## 📝 License
This project is open-source and free to use.
