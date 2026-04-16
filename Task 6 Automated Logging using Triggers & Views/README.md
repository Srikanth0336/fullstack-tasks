# Automated MySQL Logging System (Triggers & Views)

This project demonstrates a robust audit logging system for enterprise databases using **MySQL Triggers** and **Views**. It automatically tracks every `INSERT` and `UPDATE` operation on an `employees` table and provides a pre-aggregated daily activity report.

## 🚀 Features
- **Real-Time Triggers**: Automatically capture changes without modifying application logic.
- **Detailed Audit Logs**: Stores old and new values, action types, and timestamps.
- **Aggregated Views**: A daily activity report view that simplifies complex log data.
- **Premium Dashboard**: A modern, dark-themed UI to visualize operations and logs.

## 🛠️ Tech Stack
- **Database**: MySQL
- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla HTML/CSS/JS (Google Fonts: Outfit)

## 📁 Project Structure
- `schema.sql`: Database initialization script containing tables, triggers, and views.
- `server.js`: Express server providing API endpoints for database operations.
- `public/`: Frontend assets (Dashboard).
- `.env`: Database configuration.

## ⚙️ Setup Instructions

1. **MySQL Setup**:
   - Open your MySQL terminal or Workbench.
   - Execute the contents of `schema.sql` to create the database and triggers.
   
2. **Environment Config**:
   - Update `.env` with your MySQL credentials (`DB_USER`, `DB_PASSWORD`).

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Application**:
   ```bash
   npm start
   ```
   Access the dashboard at `http://localhost:3001`.

## 🔍 SQL Highlights

### The Trigger (Auto-Logging)
```sql
CREATE TRIGGER after_employee_update
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (employee_id, action_type, details)
    VALUES (NEW.id, 'UPDATE', CONCAT('Updated ', OLD.name, '...'));
END;
```

### The View (Daily Reporting)
```sql
CREATE VIEW daily_activity_report AS
SELECT DATE(changed_at) AS report_date, action_type, COUNT(*) AS total_actions
FROM audit_log
GROUP BY DATE(changed_at), action_type;
```

## 🔒 Security Note
Audit logs are essential for compliance (SOX, GDPR) in enterprise environments. This implementation ensures that even if an application bug deletes data, the audit trail remains intact.
