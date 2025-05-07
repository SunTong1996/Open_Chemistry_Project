import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Element } from '../data/elements';

type ElectrodePotentialData = {
  element: Element;
  potential: number;
  oxidationState: number;
};

const ElectrodePotentialPage: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<ElectrodePotentialData | null>(null);

  // 模拟电势数据
  const potentialData: ElectrodePotentialData[] = [
    // 这里需要填充实际元素电势数据
  ];

  const handleElementClick = (data: ElectrodePotentialData) => {
    setSelectedElement(data);
  };

  const handleCloseDetail = () => {
    setSelectedElement(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">元素电势图</h1>
            <p className="text-gray-600 mt-2">
              查看元素的标准电极电势数据，了解元素的氧化还原性质。
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4">
            {/* 这里将放置电势图可视化组件 */}
            <div className="text-center py-12 text-gray-500">
              电势图可视化区域（待实现）
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4">使用说明</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>图表展示元素的标准电极电势</li>
              <li>悬停查看具体数值</li>
              <li>点击元素查看详细信息</li>
              <li>支持缩放和平移查看细节</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* 元素详情弹窗 */}
      {selectedElement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{selectedElement.element.name} 电势数据</h3>
              <button 
                onClick={handleCloseDetail}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              <p><span className="font-medium">元素:</span> {selectedElement.element.symbol}</p>
              <p><span className="font-medium">氧化态:</span> {selectedElement.oxidationState}</p>
              <p><span className="font-medium">标准电极电势:</span> {selectedElement.potential} V</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectrodePotentialPage;