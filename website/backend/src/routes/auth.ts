import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getProfile,
  updateProfile,
  updatePassword,
} from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = express.Router();

// 注册验证规则
const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('用户名至少需要3个字符'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('请输入有效的邮箱地址'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('密码至少需要6个字符'),
];

// 登录验证规则
const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('请输入有效的邮箱地址'),
  body('password')
    .exists()
    .withMessage('请输入密码'),
];

// 路由定义
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put('/password', auth, updatePassword);

export default router; 