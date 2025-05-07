import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import KnowledgeGraph from '../components/KnowledgeGraph';
import '../styles/knowledge-graph.css'; // 如果有样式文件

const KnowledgeGraphPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Helmet>
        <title>知识图谱 | 开放化学项目</title>
        <meta name="description" content="化学概念知识图谱，可视化展示不同化学概念之间的关系。" />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">化学知识图谱</h1>
        <nav className="flex justify-center space-x-4 mb-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">首页</Link>
          <Link to="/periodic-table" className="text-blue-600 hover:text-blue-800">元素周期表</Link>
        </nav>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          探索化学概念之间的关系。您可以缩放、拖动和点击节点以获取更多信息。
        </p>
      </header>

      <main>
        <div className="mb-6">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索化学概念..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <KnowledgeGraph searchTerm={searchTerm} />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4">图例和使用指南</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">颜色分类</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                  <span>基础概念</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                  <span>有机化学</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                  <span>无机化学</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                  <span>物理化学</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
                  <span>分析化学</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">交互提示</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>点击节点查看详细信息</li>
                <li>使用鼠标滚轮缩放图谱</li>
                <li>拖动画布移动图谱位置</li>
                <li>使用搜索框查找特定概念</li>
                <li>使用顶部分类筛选器筛选概念类型</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KnowledgeGraphPage; 