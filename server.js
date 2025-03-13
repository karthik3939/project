const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'leave_management'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('MySQL Connected...');
});

// API to get available leave days
app.get('/api/users/:id/leave-days', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT casual_leave_days, medical_leave_days FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            console.error('Error fetching leave days:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(result[0]);
    });
});

// API to apply for leave
app.post('/api/leave-requests', (req, res) => {
    const { user_id, leave_type, leave_days, start_date, end_date } = req.body;

    db.query('INSERT INTO leave_requests (user_id, leave_type, leave_days, start_date, end_date) VALUES (?, ?, ?, ?, ?)', [user_id, leave_type, leave_days, start_date, end_date], (err, result) => {
        if (err) {
            console.error('Error inserting leave request:', err);
            return res.status(500).json({ error: 'Database insert failed' });
        }
        res.json({ id: result.insertId, status: 'pending' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
