require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// Route to handle order submission
app.post('/submit-order', (req, res) => {
  const { name, email, cart } = req.body;

  if (!name || !email || !cart || !Array.isArray(cart)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderItems = JSON.stringify(cart);

  const sql = `INSERT INTO orders (customer_name, customer_email, order_items, total_amount)
               VALUES (?, ?, ?, ?)`;

  db.query(sql, [name, email, orderItems, total], (err, result) => {
    if (err) {
      console.error('Error saving order:', err);
      return res.status(500).json({ error: 'Failed to save order' });
    }

    res.status(200).json({ success: true, orderId: result.insertId });
  });
});

app.listen(3001, () => console.log('✅ Server running on http://localhost:3007'));