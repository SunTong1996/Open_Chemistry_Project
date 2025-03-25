import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: '未提供认证令牌' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: '无效的认证令牌' });
  }
};

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await auth(req, res, () => {
      // 这里可以添加管理员权限检查逻辑
      // 例如：检查用户角色是否为管理员
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: '需要管理员权限' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: '认证失败' });
  }
}; 