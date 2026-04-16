# NexusOrder | Advanced Order Management System

A premium Order Management Dashboard demonstration focusing on complex SQL queries including **JOINs**, **Subqueries**, and **Data Aggregation**.

## 🚀 Overview

This project demonstrates a real-world e-commerce ordermanagement flow. It features a modern, responsive dashboard UI that brings database query concepts to life through visual data analysis.

### Core SQL Concepts Demonstrated:
- **Inner Joins**: Combining `Customers`, `Products`, and `Orders` tables to create a comprehensive order history view.
- **Subqueries**:
  - Finding the **Highest Value Order** using `SELECT MAX(total_amount)`.
  - Identifying the **Most Active Customer** using grouping and aggregation.
- **ORDER BY**: Sorting records by date for chronological history.
- **Data Integrity**: Foreign key relationships established in the schema.

---

## 📂 Project Structure

- `index.html`: The main dashboard interface using HTML5 semantic elements.
- `style.css`: Premium styling with CSS Grid, Flexbox, and modern typography (Outfit & Plus Jakarta Sans).
- `script.js`: JavaScript logic that simulates SQL operations on memory-based datasets for immediate preview.
- `schema.sql`: Full database schema and seed data for MySQL/PostgreSQL environments.

---

## 🛠️ Performance Features

- **Rich Aesthetics**: Utilizes custom Google Fonts and Lucide Icons for a professional look.
- **Responsiveness**: Grid-based layout that adapts to different screen sizes.
- **Micro-animations**: Smooth transitions for an enhanced user experience.

---

## 🖥️ How to Use

1. **Dashboard View**: View key metrics derived from database subqueries (Top Customer, Highest Order).
2. **Order History**: See how `JOIN` queries merge data from multiple tables into a single readable list.
3. **Database Setup**: Use the `schema.sql` file to set up the corresponding tables in your preferred SQL environment.

---

## 📊 Sample Queries Included

### Customer Order History (JOIN)
```sql
SELECT c.name, o.order_id, p.name AS product, o.order_date, o.total_amount
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
JOIN Products p ON o.product_id = p.product_id
ORDER BY o.order_date DESC;
```

### Highest Value Order (Subquery)
```sql
SELECT * FROM Orders 
WHERE total_amount = (SELECT MAX(total_amount) FROM Orders);
```

### Most Active Customer (Subquery)
```sql
SELECT * FROM Customers 
WHERE customer_id = (
    SELECT customer_id 
    FROM Orders 
    GROUP BY customer_id 
    ORDER BY COUNT(*) DESC 
    LIMIT 1
);
```
