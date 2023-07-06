const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

// Enable CORS for all routes

const app = express();
app.use(cors());
const port = 3010;

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks ORDER BY created_at DESC', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching tasks');
    } else {
      console.log(results)
      res.json(results);
    }
  });
});

app.post('/tasks', (req, res) => {
  const taskName = req.body.taskName;
  if (!taskName) {
    res.status(400).send('Task name cannot be empty');
  } else {
    db.query('INSERT INTO tasks (task_name) VALUES (?)', [taskName], (err) => {
      if (err) {
        res.status(500).send('Error creating task');
      } else {
        res.sendStatus(201);
      }
    });
  }
});

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const taskName = req.body.taskName;
  if (!taskName) {
    res.status(400).send('Task name cannot be empty');
  } else {
    db.query(
      'UPDATE tasks SET task_name = ? WHERE id = ?',
      [taskName, taskId],
      (err) => {
        if (err) {
          res.status(500).send('Error updating task');
        } else {
          res.sendStatus(200);
        }
      }
    );
  }
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  db.query('DELETE FROM tasks WHERE id = ?', [taskId], (err) => {
    if (err) {
      res.status(500).send('Error deleting task');
    } else {
      res.sendStatus(200);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
