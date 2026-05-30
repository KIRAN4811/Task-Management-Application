const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      userId: req.userId
    });
    
    await task.save();
    
    // Emit real-time event
    const io = req.app.get('io');
    io.to(req.userId).emit('task-created', task);
    
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tasks for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single task
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;
    task.updatedAt = Date.now();
    
    await task.save();
    
    // Emit real-time event
    const io = req.app.get('io');
    io.to(req.userId).emit('task-updated', task);
    
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Emit real-time event
    const io = req.app.get('io');
    io.to(req.userId).emit('task-deleted', req.params.id);
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
