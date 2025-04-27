import Task from '../models/Task.js';

// Create a Task
export const createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;

  try {
    const task = await Task.create({ title, description, assignedTo });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task (move or edit)
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedTo, status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(id, { title, description, assignedTo, status }, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
