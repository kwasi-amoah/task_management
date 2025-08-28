import { validationResult } from 'express-validator';
import Category from '../models/Category.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createCategory = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, color } = req.body;
  const category = await Category.create({ name, color, owner: req.user.id });
  res.status(201).json(category);
});

export const listCategories = asyncHandler(async (req, res) => {
  const items = await Category.find({ owner: req.user.id }).sort('name');
  res.json(items);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cat = await Category.findOneAndDelete({ _id: id, owner: req.user.id });
  if (!cat) return res.status(404).json({ message: 'Category not found' });
  res.json({ message: 'Category deleted' });
});
