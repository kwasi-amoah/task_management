import { Router } from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers/auth.controller.js';
import { registerValidation, loginValidation, forgotPasswordValidation, resetPasswordValidation } from '../validators/auth.validators.js';

const router = Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
router.post('/reset-password', resetPasswordValidation, resetPassword);

export default router;
