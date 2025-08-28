import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createCategory, listCategories, deleteCategory } from '../controllers/category.controller.js';
import { createCategoryValidation } from '../validators/category.validators.js';

const router = Router();

router.use(protect);
router.get('/', listCategories);
router.post('/', createCategoryValidation, createCategory);
router.delete('/:id', deleteCategory);

export default router;
