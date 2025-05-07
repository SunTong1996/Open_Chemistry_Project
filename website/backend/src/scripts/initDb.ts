import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ChemicalConcept } from '../models/ChemicalConcept';
import { initialConcepts } from '../data/initialConcepts';

// 加载环境变量
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/open_chemistry';

async function initializeDatabase() {
  try {
    // 连接数据库
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB连接成功');

    // 清空现有概念数据
    await ChemicalConcept.deleteMany({});
    console.log('已清空现有概念数据');

    // 插入初始概念数据
    await ChemicalConcept.insertMany(initialConcepts);
    console.log('已导入初始概念数据');

    // 关闭数据库连接
    await mongoose.connection.close();
    console.log('数据库连接已关闭');

    process.exit(0);
  } catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
  }
}

initializeDatabase(); 