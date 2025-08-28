import { body } from 'express-validator';

export const createCategoryValidation = [
  body('name').notEmpty().withMessage('Name is required')
];
