# Open Chemistry Project 网站设置指南

## 环境要求

1. Node.js (v18.0.0 或更高版本)
2. PostgreSQL (v14.0 或更高版本)
3. npm 或 yarn 包管理器

## 技术栈

### 前端
- Next.js 14 (React 框架)
- TypeScript (类型安全)
- Tailwind CSS (样式框架)
- React Flow (关系图可视化)
- TipTap (富文本编辑器，支持双链笔记)
- React Query (数据获取和缓存)
- Zustand (状态管理)

### 后端
- Next.js API Routes
- Prisma (ORM)
- PostgreSQL (数据库)
- NextAuth.js (认证)
- Redis (缓存)

## 主要功能模块

### 1. 用户系统
- 用户注册/登录
- 个人资料管理
- 学习进度追踪
- 成就系统
- 权限管理

### 2. 笔记系统
- Markdown 编辑器
- 双向链接支持
- 知识图谱可视化
- 标签系统
- 版本历史

### 3. 学习系统
- 科技树
- 进度追踪
- 经验值系统
- 成就解锁
- 学习路径推荐

### 4. 内容管理
- 化学知识库
- 练习题系统
- 实验模拟
- 资源库
- 搜索功能

### 5. 社区功能
- 讨论区
- 协作笔记
- 问答系统
- 贡献排行

## 数据库架构

### 用户相关
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  avatar        String?
  level         Int       @default(1)
  experience    Int       @default(0)
  notes         Note[]
  achievements  Achievement[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Achievement {
  id          String    @id @default(cuid())
  name        String
  description String
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  unlockedAt  DateTime  @default(now())
}
```

### 笔记相关
```prisma
model Note {
  id          String    @id @default(cuid())
  title       String
  content     String
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  tags        Tag[]
  links       Link[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Tag {
  id          String    @id @default(cuid())
  name        String
  notes       Note[]
}

model Link {
  id          String    @id @default(cuid())
  sourceId    String
  targetId    String
  source      Note      @relation("SourceLinks", fields: [sourceId], references: [id])
  target      Note      @relation("TargetLinks", fields: [targetId], references: [id])
}
```

### 学习系统
```prisma
model TechTree {
  id          String    @id @default(cuid())
  name        String
  description String
  nodes       TechNode[]
}

model TechNode {
  id          String    @id @default(cuid())
  name        String
  description String
  treeId      String
  tree        TechTree  @relation(fields: [treeId], references: [id])
  requirements TechNode[] @relation("NodeRequirements")
  requiredBy   TechNode[] @relation("NodeRequirements")
  experience   Int
}
```

## 项目结构
```
website/
├── src/
│   ├── app/                 # Next.js 14 App Router
│   ├── components/         # React 组件
│   ├── lib/               # 工具函数和配置
│   ├── styles/           # 全局样式
│   └── types/            # TypeScript 类型定义
├── prisma/               # Prisma 配置和迁移
├── public/              # 静态资源
└── tests/              # 测试文件
```

## 安装步骤

1. 安装 Node.js
2. 安装 PostgreSQL
3. 克隆项目
4. 安装依赖：
   ```bash
   npm install
   ```
5. 设置环境变量：
   ```bash
   cp .env.example .env
   ```
6. 初始化数据库：
   ```bash
   npx prisma migrate dev
   ```
7. 运行开发服务器：
   ```bash
   npm run dev
   ```

## 开发规范

1. 代码规范
   - 使用 ESLint
   - 使用 Prettier
   - 遵循 TypeScript 严格模式

2. 提交规范
   - 使用 Conventional Commits
   - 提交前运行测试
   - 保持提交信息清晰

3. 文档规范
   - 组件文档
   - API 文档
   - 使用说明

4. 测试规范
   - 单元测试
   - 集成测试
   - E2E 测试 