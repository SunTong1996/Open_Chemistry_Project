---
date created: 星期日, 三月 23日 2025, 9:30:01 晚上
date modified: 星期日, 五月 4日 2025, 7:18:30 早上
---

# Open Chemistry Project (开放化学项目)

这是一个开放的化学主题资源知识库，旨在为化学教育、研究和科普提供全面的资源支持。



## 开源地址

[SunTong1996/Open_Chemistry_Projet: Chem is try](https://github.com/SunTong1996/Open_Chemistry_Projet)


## 项目目标

- 提供高质量的化学教育资源
- 建立完整的化学物质数据库
- 分享化学科普内容
- 提供化学竞赛资料
- 促进化学知识的开放共享

## 项目结构

```
Open_Chemistry_Project/
├── docs/                    # 文档目录
│   ├── chemistry/          # 化学知识文档
│   ├── education/          # 教育资料
│   ├── database/          # 数据库文档
│   └── competition/       # 竞赛资料
├── data/                   # 数据文件
│   ├── substances/        # 化学物质数据
│   └── exercises/         # 练习题数据
├── resources/             # 资源文件
│   ├── textbooks/        # 教材资源
│   ├── videos/          # 视频资源
│   └── images/          # 图片资源
├── tools/                # 工具脚本
└── website/             # 网站相关文件
```

## 内容分类

1. 化学科普
   - 基础化学概念
   - 化学史
   - 化学应用
   - 化学新闻

2. 化学知识
   - 无机化学
   - 有机化学
   - 物理化学
   - 分析化学
   - 生物化学

3. 化学物质数据库
   - 元素周期表
   - 化合物信息
   - 反应机理
   - 物理性质

4. 化学教材
   - 基础教材
   - 进阶教材
   - 实验教材
   - 习题集

5. 化学试题
   - 基础练习
   - 考试真题
   - 模拟试题
   - 解析答案

6. 化学竞赛
   - 竞赛资料
   - 历年真题
   - 解题技巧
   - 经验分享

## 贡献指南

1. 内容贡献
   - 确保内容的准确性和科学性
   - 遵循统一的格式规范
   - 提供适当的参考文献
   - 使用清晰的分类标签

2. 技术贡献
   - 遵循代码规范
   - 提供必要的文档
   - 确保代码可维护性

3. 提交规范
   - 使用清晰的提交信息
   - 遵循分支管理规范
   - 提交前进行必要的测试

## 许可证

本项目采用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 许可证。

## 联系方式

- 项目维护者：[suntong]
- 邮箱：[suntong@outlook.com]
- 项目讨论：[讨论区链接]

## 致谢

感谢所有为这个项目做出贡献的志愿者们！

## 安装与运行

### 安装

1. 克隆仓库后，在项目根目录安装依赖：

```bash
npm install
```

2. 安装前端依赖：

```bash
npm run install:frontend
```

3. 安装后端依赖：

```bash
npm run install:backend
```

### 运行

1. 启动前端开发服务器：

```bash
npm run start:frontend
```

2. 前端将在以下地址运行：

```
http://localhost:3000/
```

3. 访问元素周期表页面：

```
http://localhost:3000/periodic-table
```

## 功能特性

### 元素周期表

- 动态交互式周期表
- 可定制显示元素属性（符号、名称、原子序数、电子排布等）
- 按元素分类筛选
- 搜索功能
- 元素详情展示
- 电子轨道动画可视化

### 化学概念知识图谱

- 化学概念数据模型
- 概念之间的关系可视化
- 搜索和过滤功能
- 学习路径推荐

## 技术栈

### 前端
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router

### 后端
- Node.js
- Express
- TypeScript
- MongoDB
- JWT 认证 

