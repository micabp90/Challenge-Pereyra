const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];

app.get("/", (req, res) => {
  res.send("Bienvenido al Challenge de Ingreso 2025");
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  try {
    const { id, title, description, complete, createdat } = req.body;

    if (
      typeof id !== 'string' ||
      typeof title !== 'string' ||
      typeof description !== 'string' ||
      typeof complete !== 'boolean' ||
      typeof createdat !== 'string'
    ) {
      return res.status(400).json({ error: 'Faltan completar datos o tipos inválidos!' });
    }

    const newTask = { id, title, description, complete, createdat };
    tasks.push(newTask);

    res.status(201).json({ message: 'Tarea creada', task: newTask });
  } catch (error) {
    res.status(500).json({ error: 'Hay un error al crear la tarea!' });
  }
});

app.put('/api/tasks/:id', (req, res) => {
  try {
    const taskId = req.params.id;
    const updateData = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'No se encontró la tarea!' });
    }

    const task = tasks[taskIndex];
    if (updateData.title !== undefined) task.title = updateData.title;
    if (updateData.description !== undefined) task.description = updateData.description;
    if (updateData.complete !== undefined) task.complete = updateData.complete;
    if (updateData.createdat !== undefined) task.createdat = updateData.createdat;

    res.json({ message: 'Tarea actualizada', task: tasks[taskIndex] });
  } catch (error) {
    res.status(500).json({ error: 'Hay un error al actualizar la tarea!' });
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  try {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'No se encontró la tarea!' });
    }

    tasks = tasks.filter(task => task.id !== taskId);

    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Hay un error al eliminar la tarea!' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
