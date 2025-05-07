// a:\ST-Chemistry\Open_Chemistry_Projet\website\frontend\src\data\energyData.ts

/**
 * 定义单项电离能或电子亲和能的数据结构
 */
export interface EnergyLevel {
  level: number; // 能级，例如第一电离能为1，第二电离能为2
  value: number | null; // 能量值，单位通常为 kJ/mol 或 eV。null表示数据不可用
  unit: 'kJ/mol' | 'eV'; // 能量单位
}

/**
 * 定义单个元素的电离能和电子亲和能数据结构
 */
export interface ElementEnergyData {
  atomicNumber: number; // 原子序数，用于关联元素
  symbol: string; // 元素符号
  ionizationEnergies: EnergyLevel[]; // 逐级电离能列表
  electronAffinities: EnergyLevel[]; // 逐级电子亲和能列表
}

// 示例数据：为了演示，这里只包含少量元素的部分数据
// 实际应用中，这里应该填充所有元素的完整数据
export const elementsEnergyData: ElementEnergyData[] = [
  {
    atomicNumber: 1,
    symbol: 'H',
    ionizationEnergies: [
      { level: 1, value: 1312.0, unit: 'kJ/mol' },
    ],
    electronAffinities: [
      { level: 1, value: 72.8, unit: 'kJ/mol' }, // 实际上电子亲和能通常表示为 EA 或 -ΔH_EA
    ],
  },
  {
    atomicNumber: 2,
    symbol: 'He',
    ionizationEnergies: [
      { level: 1, value: 2372.3, unit: 'kJ/mol' },
      { level: 2, value: 5250.5, unit: 'kJ/mol' },
    ],
    electronAffinities: [
      { level: 1, value: -48, unit: 'kJ/mol' }, // 氦的电子亲和能为负值，表示不稳定
    ],
  },
  {
    atomicNumber: 3,
    symbol: 'Li',
    ionizationEnergies: [
      { level: 1, value: 520.2, unit: 'kJ/mol' },
      { level: 2, value: 7298.1, unit: 'kJ/mol' },
      { level: 3, value: 11815.0, unit: 'kJ/mol' },
    ],
    electronAffinities: [
      { level: 1, value: 59.6, unit: 'kJ/mol' },
    ],
  },
  // ... 此处应添加更多元素的能量数据
];

/**
 * 根据原子序数获取元素的能量数据
 * @param atomicNumber 原子序数
 * @returns 对应元素的能量数据，如果未找到则返回 undefined
 */
export const getElementEnergyDataByAtomicNumber = (atomicNumber: number): ElementEnergyData | undefined => {
  return elementsEnergyData.find(data => data.atomicNumber === atomicNumber);
};

/**
 * 根据元素符号获取元素的能量数据
 * @param symbol 元素符号
 * @returns 对应元素的能量数据，如果未找到则返回 undefined
 */
export const getElementEnergyDataBySymbol = (symbol: string): ElementEnergyData | undefined => {
  return elementsEnergyData.find(data => data.symbol.toLowerCase() === symbol.toLowerCase());
};