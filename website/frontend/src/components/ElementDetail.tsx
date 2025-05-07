import React from 'react';
import { motion } from 'framer-motion';
import { Element } from '../data/elements';

interface ElementDetailProps {
  element: Element;
  onClose: () => void;
  onViewEnergyData: (element: Element) => void; // 新增 prop，用于触发展示能量数据
}

const formatValue = (value: any, unit?: string): string => {
  if (value === null || value === undefined) return '未知';
  if (typeof value === 'number') {
    const formatted = value.toString().includes('.') ? value.toFixed(4) : value.toString();
    return unit ? `${formatted} ${unit}` : formatted;
  }
  return value.toString();
};

const ElementDetail: React.FC<ElementDetailProps> = ({ element, onClose }) => {
  if (!element) return null;

  // 动态电子轨道图
  const renderElectronConfiguration = () => {
    // 简单解析电子排布
    const orbitalGroups = element.electronConfiguration.split(' ');
    
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">电子排布可视化</h3>
        <div className="relative h-64 w-full bg-gray-100 rounded-lg overflow-hidden">
          {/* 原子核 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-600 z-10 flex items-center justify-center text-white">
            {element.symbol}
          </div>
          
          {/* 电子轨道 */}
          {orbitalGroups.map((group, groupIndex) => {
            // 简单解析轨道和电子数
            const match = group.match(/(\d+)([spdf])(\S+)/);
            if (!match) return null;
            
            const [_, shell, orbitalType, electrons] = match;
            const electronCount = electrons ? electrons.length : 1;
            const radius = 30 + groupIndex * 25; // 轨道半径
            
            return (
              <React.Fragment key={groupIndex}>
                {/* 轨道 */}
                <div
                  className="absolute top-1/2 left-1/2 border border-gray-300 rounded-full"
                  style={{
                    width: `${radius * 2}px`,
                    height: `${radius * 2}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
                
                {/* 电子 */}
                {Array.from({ length: electronCount }).map((_, i) => {
                  const angle = (360 / electronCount) * i;
                  const delay = i * 0.1;
                  
                  return (
                    <motion.div
                      key={`${groupIndex}-${i}`}
                      className="absolute w-3 h-3 bg-blue-500 rounded-full"
                      style={{
                        top: `calc(50% - 1.5px)`,
                        left: `calc(50% - 1.5px)`,
                      }}
                      animate={{
                        x: Math.cos((angle * Math.PI) / 180) * radius,
                        y: Math.sin((angle * Math.PI) / 180) * radius,
                      }}
                      transition={{
                        duration: 2,
                        delay,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'linear',
                      }}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
        <div className="mt-2 text-center">
          <div className="font-semibold">{element.electronConfiguration}</div>
          <div className="text-sm text-gray-600">电子排布</div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 overflow-auto max-h-[90vh]"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl font-bold">{element.name}</h2>
              <div className="text-lg text-gray-600">{element.nameEn}</div>
            </div>
            <div className="flex items-center mt-1">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: element.color }}
              ></div>
              <div className="text-gray-600">{element.category}</div>
            </div>
          </div>
          
          <div className="text-7xl font-bold">{element.symbol}</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">基本信息</h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">原子序数:</span>
                <span className="font-medium">{element.number}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">原子质量:</span>
                <span className="font-medium">{formatValue(element.atomicMass, 'u')}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">电子排布:</span>
                <span className="font-medium">{element.electronConfiguration}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">周期:</span>
                <span className="font-medium">{element.period}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">族:</span>
                <span className="font-medium">{formatValue(element.group)}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">区块:</span>
                <span className="font-medium">{element.block}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">物理性质</h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">电负性:</span>
                <span className="font-medium">{formatValue(element.electronegativity)}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">密度:</span>
                <span className="font-medium">{formatValue(element.density, 'g/cm³')}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">熔点:</span>
                <span className="font-medium">{formatValue(element.meltingPoint, 'K')}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">沸点:</span>
                <span className="font-medium">{formatValue(element.boilingPoint, 'K')}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">发现年份:</span>
                <span className="font-medium">{formatValue(element.discoveryYear)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {renderElectronConfiguration()}
        
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => onViewEnergyData(element)} // 调用新的 prop
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-150"
            >
              查看能量数据
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150"
            >
              关闭
            </button>
          </div>
      </motion.div>
    </motion.div>
  );
};

export default ElementDetail;