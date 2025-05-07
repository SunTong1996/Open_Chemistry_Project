export interface Element {
  number: number;       // 原子序数
  symbol: string;       // 元素符号
  name: string;         // 元素名称
  nameEn: string;       // 英文名称
  category: ElementCategory; // 元素类别
  group: number | null; // 族
  period: number;       // 周期
  block: string;        // 区块 (s, p, d, f)
  electronConfiguration: string; // 电子排布
  electronegativity: number | null; // 电负性
  atomicMass: number;   // 原子质量
  density: number | null; // 密度 (g/cm³)
  meltingPoint: number | null; // 熔点 (K)
  boilingPoint: number | null; // 沸点 (K)
  discoveryYear: number | null; // 发现年份
  color: string;        // 元素周期表上的显示颜色
}

export enum ElementCategory {
  AlkaliMetal = '碱金属',
  AlkalineEarthMetal = '碱土金属',
  TransitionMetal = '过渡金属',
  PostTransitionMetal = '后过渡金属',
  Metalloid = '准金属',
  Nonmetal = '非金属',
  Halogen = '卤素',
  NobleGas = '稀有气体',
  Lanthanide = '镧系元素',
  Actinide = '锕系元素'
}

// 元素颜色映射
export const categoryColors = {
  [ElementCategory.AlkaliMetal]: '#ff8a65',
  [ElementCategory.AlkalineEarthMetal]: '#ffb74d',
  [ElementCategory.TransitionMetal]: '#ffd54f',
  [ElementCategory.PostTransitionMetal]: '#dce775',
  [ElementCategory.Metalloid]: '#aed581',
  [ElementCategory.Nonmetal]: '#81c784',
  [ElementCategory.Halogen]: '#4db6ac',
  [ElementCategory.NobleGas]: '#4fc3f7',
  [ElementCategory.Lanthanide]: '#7986cb',
  [ElementCategory.Actinide]: '#9575cd'
};

// 元素位置映射 (处理周期表中的空白位置)
export const elementPositions: { [key: number]: { row: number; col: number } } = {
  // 第1周期
  1: { row: 1, col: 1 },   // H
  2: { row: 1, col: 18 },  // He
  
  // 第2周期
  3: { row: 2, col: 1 },   // Li
  4: { row: 2, col: 2 },   // Be
  5: { row: 2, col: 13 },  // B
  6: { row: 2, col: 14 },  // C
  7: { row: 2, col: 15 },  // N
  8: { row: 2, col: 16 },  // O
  9: { row: 2, col: 17 },  // F
  10: { row: 2, col: 18 }, // Ne
  
  // 第3周期
  11: { row: 3, col: 1 },  // Na
  12: { row: 3, col: 2 },  // Mg
  13: { row: 3, col: 13 }, // Al
  14: { row: 3, col: 14 }, // Si
  15: { row: 3, col: 15 }, // P
  16: { row: 3, col: 16 }, // S
  17: { row: 3, col: 17 }, // Cl
  18: { row: 3, col: 18 }, // Ar
  
  // 第4周期
  19: { row: 4, col: 1 },  // K
  20: { row: 4, col: 2 },  // Ca
  21: { row: 4, col: 3 },  // Sc
  22: { row: 4, col: 4 },  // Ti
  23: { row: 4, col: 5 },  // V
  24: { row: 4, col: 6 },  // Cr
  25: { row: 4, col: 7 },  // Mn
  26: { row: 4, col: 8 },  // Fe
  27: { row: 4, col: 9 },  // Co
  28: { row: 4, col: 10 }, // Ni
  29: { row: 4, col: 11 }, // Cu
  30: { row: 4, col: 12 }, // Zn
  31: { row: 4, col: 13 }, // Ga
  32: { row: 4, col: 14 }, // Ge
  33: { row: 4, col: 15 }, // As
  34: { row: 4, col: 16 }, // Se
  35: { row: 4, col: 17 }, // Br
  36: { row: 4, col: 18 }, // Kr
};

export const elements: Element[] = [
  {
    number: 1,
    symbol: 'H',
    name: '氢',
    nameEn: 'Hydrogen',
    category: ElementCategory.Nonmetal,
    group: 1,
    period: 1,
    block: 's',
    electronConfiguration: '1s¹',
    electronegativity: 2.2,
    atomicMass: 1.008,
    density: 0.0000899,
    meltingPoint: 14.01,
    boilingPoint: 20.28,
    discoveryYear: 1766,
    color: categoryColors[ElementCategory.Nonmetal],
  },
  {
    number: 2,
    symbol: 'He',
    name: '氦',
    nameEn: 'Helium',
    category: ElementCategory.NobleGas,
    group: 18,
    period: 1,
    block: 's',
    electronConfiguration: '1s²',
    electronegativity: null,
    atomicMass: 4.0026,
    density: 0.0001785,
    meltingPoint: 0.95,
    boilingPoint: 4.22,
    discoveryYear: 1868,
    color: categoryColors[ElementCategory.NobleGas],
  },
  {
    number: 3,
    symbol: 'Li',
    name: '锂',
    nameEn: 'Lithium',
    category: ElementCategory.AlkaliMetal,
    group: 1,
    period: 2,
    block: 's',
    electronConfiguration: '1s² 2s¹',
    electronegativity: 0.98,
    atomicMass: 6.94,
    density: 0.534,
    meltingPoint: 453.69,
    boilingPoint: 1615,
    discoveryYear: 1817,
    color: categoryColors[ElementCategory.AlkaliMetal],
  },
  {
    number: 4,
    symbol: 'Be',
    name: '铍',
    nameEn: 'Beryllium',
    category: ElementCategory.AlkalineEarthMetal,
    group: 2,
    period: 2,
    block: 's',
    electronConfiguration: '1s² 2s²',
    electronegativity: 1.57,
    atomicMass: 9.0122,
    density: 1.85,
    meltingPoint: 1560,
    boilingPoint: 2742,
    discoveryYear: 1797,
    color: categoryColors[ElementCategory.AlkalineEarthMetal],
  },
  {
    number: 5,
    symbol: 'B',
    name: '硼',
    nameEn: 'Boron',
    category: ElementCategory.Metalloid,
    group: 13,
    period: 2,
    block: 'p',
    electronConfiguration: '1s² 2s² 2p¹',
    electronegativity: 2.04,
    atomicMass: 10.81,
    density: 2.34,
    meltingPoint: 2349,
    boilingPoint: 4200,
    discoveryYear: 1808,
    color: categoryColors[ElementCategory.Metalloid],
  },
  {
    number: 6,
    symbol: 'C',
    name: '碳',
    nameEn: 'Carbon',
    category: ElementCategory.Nonmetal,
    group: 14,
    period: 2,
    block: 'p',
    electronConfiguration: '1s² 2s² 2p²',
    electronegativity: 2.55,
    atomicMass: 12.011,
    density: 2.267,
    meltingPoint: 3800,
    boilingPoint: 4300,
    discoveryYear: null,
    color: categoryColors[ElementCategory.Nonmetal],
  },
  {
    number: 7,
    symbol: 'N',
    name: '氮',
    nameEn: 'Nitrogen',
    category: ElementCategory.Nonmetal,
    group: 15,
    period: 2,
    block: 'p',
    electronConfiguration: '1s² 2s² 2p³',
    electronegativity: 3.04,
    atomicMass: 14.007,
    density: 0.0012506,
    meltingPoint: 63.15,
    boilingPoint: 77.36,
    discoveryYear: 1772,
    color: categoryColors[ElementCategory.Nonmetal],
  },
  {
    number: 8,
    symbol: 'O',
    name: '氧',
    nameEn: 'Oxygen',
    category: ElementCategory.Nonmetal,
    group: 16,
    period: 2,
    block: 'p',
    electronConfiguration: '1s² 2s² 2p⁴',
    electronegativity: 3.44,
    atomicMass: 15.999,
    density: 0.001429,
    meltingPoint: 54.36,
    boilingPoint: 90.2,
    discoveryYear: 1774,
    color: categoryColors[ElementCategory.Nonmetal],
  },
  {
    number: 9,
    symbol: 'F',
    name: '氟',
    nameEn: 'Fluorine',
    category: ElementCategory.Halogen,
    group: 17,
    period: 2,
    block: 'p',
    electronConfiguration: '1s² 2s² 2p⁵',
    electronegativity: 3.98,
    atomicMass: 18.998,
    density: 0.001696,
    meltingPoint: 53.53,
    boilingPoint: 85.03,
    discoveryYear: 1886,
    color: categoryColors[ElementCategory.Halogen],
  },
  {
    number: 10,
    symbol: 'Ne',
    name: '氖',
    nameEn: 'Neon',
    category: ElementCategory.NobleGas,
    group: 18,
    period: 2,
    block: 'p',
    electronConfiguration: '1s² 2s² 2p⁶',
    electronegativity: null,
    atomicMass: 20.18,
    density: 0.0008999,
    meltingPoint: 24.56,
    boilingPoint: 27.07,
    discoveryYear: 1898,
    color: categoryColors[ElementCategory.NobleGas],
  },
  // 这里只是示例，完整版需要添加剩余元素
  // ...其他元素
];

// 获取元素属性选项列表
export const elementProperties = [
  { id: 'symbol', name: '元素符号', default: true },
  { id: 'name', name: '元素名称', default: true },
  { id: 'number', name: '原子序数', default: true },
  { id: 'electronConfiguration', name: '电子排布', default: false },
  { id: 'atomicMass', name: '原子质量', default: false },
  { id: 'electronegativity', name: '电负性', default: false },
  { id: 'density', name: '密度', default: false },
  { id: 'meltingPoint', name: '熔点', default: false },
  { id: 'boilingPoint', name: '沸点', default: false },
  { id: 'discoveryYear', name: '发现年份', default: false },
]; 