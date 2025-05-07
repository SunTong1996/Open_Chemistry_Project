// a:\ST-Chemistry\Open_Chemistry_Projet\website\frontend\src\components\ElementEnergyDetail.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Element } from '../data/elements';
import { ElementEnergyData, getElementEnergyDataByAtomicNumber, EnergyLevel } from '../data/energyData';

interface ElementEnergyDetailProps {
  element: Element;
  onClose: () => void;
}

const ElementEnergyDetail: React.FC<ElementEnergyDetailProps> = ({ element, onClose }) => {
  const energyData: ElementEnergyData | undefined = getElementEnergyDataByAtomicNumber(element.number);

  const renderEnergyTable = (title: string, energies: EnergyLevel[]) => {
    if (!energies || energies.length === 0) {
      return <p>无可用数据。</p>;
    }
    return (
      <div>
        <h4 className="text-lg font-semibold mt-4 mb-2">{title}</h4>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                级别
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                能量值
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                单位
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {energies.map((energy, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{energy.level}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {energy.value !== null ? energy.value.toFixed(2) : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{energy.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={onClose} // Close on backdrop click
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="关闭"
        >
          &times;
        </button>
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-800">{element.name} ({element.symbol}) - 能量数据</h3>
          <p className="text-sm text-gray-600">原子序数: {element.number}</p>
        </div>

        {!energyData ? (
          <p className="text-red-500">未找到 {element.name} 的能量数据。</p>
        ) : (
          <>
            {renderEnergyTable('逐级电离能', energyData.ionizationEnergies)}
            {renderEnergyTable('逐级电子亲和能', energyData.electronAffinities)}
          </>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150"
          >
            关闭
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ElementEnergyDetail;