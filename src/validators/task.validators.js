import { body, query } from 'express-validator';

export const createTaskValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('dueDate').optional().isISO8601().toDate().withMessage('dueDate must be ISO8601'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
];

export const updateTaskValidation = [
  body('title').optional().notEmpty(),
  body('completed').optional().isBoolean(),
  body('dueDate').optional().isISO8601().toDate(),
  body('priority').optional().isIn(['low', 'medium', 'high'])
];

export const listQueryValidation = [
  query('completed').optional().isBoolean().toBoolean(),
  query('category').optional().isMongoId(),
  query('search').optional().isString(),
  query('sort').optional().isIn(['createdAt', 'dueDate'])
];
