# Open Chemistry Project Backend

这是 Open Chemistry Project 的后端服务，提供化学概念知识图谱的 API 服务。

## 功能特点

- 用户认证和授权
- 化学概念管理
- 知识图谱可视化
- 概念搜索和过滤
- 学习进度跟踪

## 技术栈

- Node.js
- TypeScript
- Express.js
- MongoDB
- JWT 认证

## 环境要求

- Node.js >= 14
- MongoDB >= 4.4
- npm >= 6

## 安装

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/open-chemistry-project.git
cd open-chemistry-project/website/backend
```

2. 安装依赖：
```bash
npm install
```

3. 配置环境变量：
```bash
cp .env.example .env
```
然后编辑 `.env` 文件，设置必要的环境变量。

## 开发

启动开发服务器：
```bash
npm run dev
```

## 构建

构建生产版本：
```bash
npm run build
```

## 运行

启动生产服务器：
```bash
npm start
```

## 初始化数据库

导入初始化学概念数据：
```bash
npm run init-db
```

## API 文档

### 认证接口

- POST /api/auth/register - 用户注册
- POST /api/auth/login - 用户登录
- GET /api/auth/profile - 获取用户信息
- PUT /api/auth/profile - 更新用户信息
- PUT /api/auth/password - 更新密码

### 化学概念接口

- GET /api/concepts - 获取概念列表
- GET /api/concepts/:name - 获取特定概念
- POST /api/concepts - 创建新概念（需要管理员权限）
- PUT /api/concepts/:name - 更新概念（需要管理员权限）
- DELETE /api/concepts/:name - 删除概念（需要管理员权限）
- GET /api/concepts/graph - 获取概念图谱
- GET /api/concepts/search - 搜索概念

## 测试

运行测试：
```bash
npm test
```

## 贡献

1. Fork 仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。 