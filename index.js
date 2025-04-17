const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'simmi@2002',
  database: 'testdb1'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.post('/users', (req, res) => {
  const { name, fatherName, dob, phone, email, profession } = req.body;
  const sql = 'INSERT INTO users (name, fatherName, dob, phone, email, profession) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, fatherName, dob, phone, email, profession], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get('/users/:id', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

app.put('/users/:id', (req, res) => {
  const { name, fatherName, dob, phone, email, profession } = req.body;
  const sql = 'UPDATE users SET name = ?, fatherName = ?, dob = ?, phone = ?, email = ?, profession = ? WHERE id = ?';
  db.query(sql, [name, fatherName, dob, phone, email, profession, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.delete('/users/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
