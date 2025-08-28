import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createTask, getTask, listTasks, updateTask, deleteTask, toggleComplete } from '../controllers/task.controller.js';
import { createTaskValidation, updateTaskValidation, listQueryValidation } from '../validators/task.validators.js';

const router = Router();

router.use(protect);
router.get('/', listQueryValidation, listTasks);
router.post('/', createTaskValidation, createTask);
router.get('/:id', getTask);
router.patch('/:id', updateTaskValidation, updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/complete', toggleComplete);

export default router;
