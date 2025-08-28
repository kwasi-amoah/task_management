import { validationResult } from 'express-validator';
import Task from '../models/Task.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createTask = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { title, description, dueDate, category, priority } = req.body;
  const task = await Task.create({
    title,
    description,
    dueDate,
    category,
    priority,
    owner: req.user.id
  });
  res.status(201).json(task);
});

export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, owner: req.user.id }).populate('category');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

export const listTasks = asyncHandler(async (req, res) => {
  const { completed, category, search, sort } = req.query;
  const filter = { owner: req.user.id };
  if (typeof completed !== 'undefined') filter.completed = completed === 'true' || completed === true;
  if (category) filter.category = category;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const query = Task.find(filter).populate('category');
  if (sort === 'dueDate') query.sort({ dueDate: 1 });
  else query.sort({ createdAt: -1 });

  const tasks = await query.exec();
  res.json(tasks);
});

export const updateTask = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Task not found' });
  res.json(updated);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const del = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  if (!del) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
});

export const toggleComplete = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});
