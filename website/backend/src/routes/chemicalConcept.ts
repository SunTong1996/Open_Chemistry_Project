import express from 'express';
import { body, query, param } from 'express-validator';
import {
  createConcept,
  getConcept,
  updateConcept,
  deleteConcept,
  getConceptGraph,
  searchConcepts,
} from '../controllers/chemicalConceptController';
import { auth, adminAuth } from '../middleware/auth';

const router = express.Router();

// 验证规则
const conceptValidation = [
  body('name').trim().notEmpty().withMessage('概念名称不能为空'),
  body('description').trim().notEmpty().withMessage('描述不能为空'),
  body('category').isIn(['基础概念', '化学反应', '物质结构', '实验操作', '仪器使用', '安全知识']).withMessage('无效的分类'),
  body('level').isInt({ min: 1, max: 5 }).withMessage('难度等级必须在1-5之间'),
  body('prerequisites').isArray().withMessage('前置知识必须是数组'),
  body('relatedConcepts').isArray().withMessage('相关概念必须是数组'),
  body('examples').isArray().withMessage('示例必须是数组'),
  body('formulas').isArray().withMessage('公式必须是数组'),
  body('properties').isArray().withMessage('性质必须是数组'),
  body('references').isArray().withMessage('参考资料必须是数组'),
];

// 路由定义
router.post('/', auth, adminAuth, conceptValidation, createConcept);
router.get('/:name', getConcept);
router.put('/:name', auth, adminAuth, conceptValidation, updateConcept);
router.delete('/:name', auth, adminAuth, deleteConcept);
router.get('/graph', getConceptGraph);
router.get('/search', [
  query('query').optional().trim(),
  query('category').optional().isIn(['基础概念', '化学反应', '物质结构', '实验操作', '仪器使用', '安全知识']),
  query('level').optional().isInt({ min: 1, max: 5 }),
], searchConcepts);

export default router; 