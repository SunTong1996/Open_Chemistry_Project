import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Element, elements, elementProperties, ElementCategory, categoryColors, elementPositions } from '../data/elements';

interface PeriodicTableProps {
  onElementClick: (element: Element) => void;
}

interface ElementBoxProps {
  element: Element;
  selectedProperties: string[];
  onClick: () => void;
}

const ElementBox: React.FC<ElementBoxProps> = ({ element, selectedProperties, onClick }) => {
  return (
    <motion.div
      className="relative border border-gray-300 rounded p-1 cursor-pointer transition-all"
      style={{ backgroundColor: element.color }}
      onClick={onClick}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-1 left-1 text-xs">{element.number}</div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-2xl font-bold">{element.symbol}</div>
        {selectedProperties.includes('name') && (
          <div className="text-xs mt-1">{element.name}</div>
        )}
        {selectedProperties.includes('atomicMass') && (
          <div className="text-xs mt-1">{element.atomicMass.toFixed(2)}</div>
        )}
        {selectedProperties.includes('electronConfiguration') && (
          <div className="text-xs mt-1 overflow-hidden text-ellipsis" style={{ maxWidth: '100%' }}>
            {element.electronConfiguration}
          </div>
        )}
        {selectedProperties.includes('electronegativity') && element.electronegativity && (
          <div className="text-xs mt-1">{element.electronegativity.toFixed(2)}</div>
        )}
      </div>
    </motion.div>
  );
};

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onElementClick }) => {
  const [selectedProperties, setSelectedProperties] = useState<string[]>(
    elementProperties.filter(prop => prop.default).map(prop => prop.id)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredElements, setFilteredElements] = useState(elements);
  const [selectedCategory, setSelectedCategory] = useState<ElementCategory | null>(null);

  // 处理属性选择变化
  const handlePropertyChange = (propertyId: string) => {
    if (selectedProperties.includes(propertyId)) {
      setSelectedProperties(selectedProperties.filter(id => id !== propertyId));
    } else {
      setSelectedProperties([...selectedProperties, propertyId]);
    }
  };

  // 处理分类筛选
  const handleCategoryFilter = (category: ElementCategory | null) => {
    setSelectedCategory(category);
  };

  // 搜索和筛选元素
  useEffect(() => {
    let filtered = elements;

    // 按类别筛选
    if (selectedCategory) {
      filtered = filtered.filter(element => element.category === selectedCategory);
    }

    // 按搜索词筛选
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        element =>
          element.name.toLowerCase().includes(term) ||
          element.nameEn.toLowerCase().includes(term) ||
          element.symbol.toLowerCase().includes(term) ||
          element.number.toString().includes(term)
      );
    }

    setFilteredElements(filtered);
  }, [searchTerm, selectedCategory]);

  // 构建周期表网格
  const renderPeriodicTable = () => {
    // 创建10x18的网格 (7个周期 + 2个镧系锕系行 + 1行空白)
    const grid = Array(10).fill(null).map(() => Array(18).fill(null));

    // 将元素放入网格
    elements.forEach(element => {
      const position = elementPositions[element.number];
      if (position) {
        const { row, col } = position;
        if (row < grid.length && col-1 < grid[0].length) {
          grid[row-1][col-1] = element;
        }
      }
    });

    // 渲染网格
    return (
      <div className="flex flex-col gap-1">
        {grid.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex gap-1">
            {row.map((element, colIndex) => {
              if (!element) return <div key={`empty-${rowIndex}-${colIndex}`} className="w-16 h-16" />;
              
              const highlighted = !selectedCategory || element.category === selectedCategory;
              
              return (
                <div
                  key={element.number}
                  className={`w-16 h-16 ${highlighted ? 'opacity-100' : 'opacity-30'}`}
                >
                  <ElementBox
                    element={element}
                    selectedProperties={selectedProperties}
                    onClick={() => onElementClick(element)}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">元素周期表</h1>
      
      {/* 搜索和筛选工具栏 */}
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <input
          type="text"
          placeholder="搜索元素..."
          className="p-2 border rounded"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 rounded ${selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryFilter(null)}
          >
            全部
          </button>
          {Object.values(ElementCategory).map(category => (
            <button
              key={category}
              className={`px-3 py-1 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              style={{ borderLeft: `4px solid ${categoryColors[category]}` }}
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* 元素属性选择器 */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">显示属性:</h3>
        <div className="flex flex-wrap gap-2">
          {elementProperties.map(property => (
            <label key={property.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedProperties.includes(property.id)}
                onChange={() => handlePropertyChange(property.id)}
              />
              <span>{property.name}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* 周期表显示 */}
      <div className="overflow-auto pb-4">
        {renderPeriodicTable()}
      </div>
      
      {/* 图例 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">图例:</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center">
              <div className="w-4 h-4 mr-1" style={{ backgroundColor: color }}></div>
              <span>{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeriodicTable; 