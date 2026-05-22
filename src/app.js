const express = require('express');
const cors = require('cors');
const client = require('prom-client');

const app = express();

app.use(cors());
app.use(express.json());

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

let tasks = [];

app.get('/', (req, res) => {
  res.json({ message: 'Student Task Manager API is running' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.completed = req.body.completed;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== Number(req.params.id));
  res.json({ message: 'Task deleted' });
});

module.exports = app;