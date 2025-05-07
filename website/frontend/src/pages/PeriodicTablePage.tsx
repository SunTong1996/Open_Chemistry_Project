import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PeriodicTable from '../components/PeriodicTable';
import ElementDetail from '../components/ElementDetail';
import ElementEnergyDetail from '../components/ElementEnergyDetail'; // 新增导入
import { Element } from '../data/elements';

const PeriodicTablePage: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [elementForEnergyView, setElementForEnergyView] = useState<Element | null>(null); // 新增状态

  // 处理元素点击
  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
  };

  // 关闭元素详情
  const handleCloseDetail = () => {
    setSelectedElement(null);
  };

  // 处理打开能量数据视图
  const handleOpenEnergyView = (element: Element) => {
    setSelectedElement(null); // 关闭常规详情视图
    setElementForEnergyView(element);
  };

  // 处理关闭能量数据视图
  const handleCloseEnergyView = () => {
    setElementForEnergyView(null);
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
            <h1 className="text-3xl font-bold text-gray-800">化学元素周期表</h1>
            <p className="text-gray-600 mt-2">
              探索化学元素的属性和规律。点击元素查看详细信息，包括电子排布可视化。
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4">
            <PeriodicTable onElementClick={handleElementClick} />
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4">使用说明</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>点击任意元素查看详细信息</li>
              <li>使用搜索框搜索元素名称、符号或原子序数</li>
              <li>使用分类按钮筛选显示特定类别的元素</li>
              <li>使用属性选择器更改元素卡片上显示的信息</li>
              <li>元素详情页面包含动态的电子排布可视化</li>
            </ul>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedElement && (
          <ElementDetail
            element={selectedElement}
            onClose={handleCloseDetail}
            onViewEnergyData={handleOpenEnergyView} // 新增 prop
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {elementForEnergyView && (
          <ElementEnergyDetail
            element={elementForEnergyView}
            onClose={handleCloseEnergyView}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PeriodicTablePage;