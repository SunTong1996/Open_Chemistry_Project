import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PeriodicTablePage from './pages/PeriodicTablePage';
import KnowledgeGraphPage from './pages/knowledge-graph';

const HomePage = () => (
  <div className="container mx-auto py-8 px-4 text-center">
    <h1 className="text-3xl font-bold mb-6">开放化学项目</h1>
    <p className="mb-8 max-w-2xl mx-auto">探索化学世界的互动平台，提供元素周期表、知识图谱等多种工具。</p>
    <div className="flex justify-center space-x-4">
      <Link to="/periodic-table" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        元素周期表
      </Link>
      <Link to="/knowledge-graph" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
        知识图谱
      </Link>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/periodic-table" element={<PeriodicTablePage />} />
        <Route path="/knowledge-graph" element={<KnowledgeGraphPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;