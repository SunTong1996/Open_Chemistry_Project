import { IChemicalConcept } from '../models/ChemicalConcept';

export const initialConcepts: IChemicalConcept[] = [
  {
    name: '原子',
    description: '物质的基本单位，由质子、中子和电子组成。',
    category: '基础概念',
    level: 1,
    prerequisites: [],
    relatedConcepts: ['分子', '元素', '原子核'],
    examples: [
      '氢原子是最简单的原子，只包含一个质子和一个电子',
      '碳原子是生命的基本组成单位'
    ],
    formulas: [],
    properties: {
      '原子序数': '原子核中质子的数量',
      '原子质量': '原子的相对质量',
      '电子排布': '电子在原子中的分布'
    },
    references: [
      {
        type: 'textbook',
        title: '高中化学必修一',
        url: 'https://example.com/textbook1',
        page: 12
      }
    ]
  },
  {
    name: '分子',
    description: '由两个或更多原子通过化学键结合形成的稳定结构。',
    category: '基础概念',
    level: 1,
    prerequisites: ['原子'],
    relatedConcepts: ['原子', '化学键', '化合物'],
    examples: [
      '水分子(H₂O)由两个氢原子和一个氧原子组成',
      '氧气分子(O₂)由两个氧原子组成'
    ],
    formulas: ['H₂O', 'O₂', 'CO₂'],
    properties: {
      '分子式': '表示分子组成的化学式',
      '分子量': '分子的相对质量',
      '分子结构': '分子中原子之间的空间排列'
    },
    references: [
      {
        type: 'textbook',
        title: '高中化学必修一',
        url: 'https://example.com/textbook1',
        page: 25
      }
    ]
  },
  {
    name: '化学键',
    description: '原子之间通过电子相互作用形成的连接。',
    category: '物质结构',
    level: 2,
    prerequisites: ['原子', '分子'],
    relatedConcepts: ['分子', '离子', '共价键'],
    examples: [
      '水分子中的氢氧键',
      '氯化钠中的离子键'
    ],
    formulas: [],
    properties: {
      '键长': '两个原子核之间的距离',
      '键能': '形成化学键时释放的能量',
      '键角': '相邻化学键之间的角度'
    },
    references: [
      {
        type: 'textbook',
        title: '高中化学必修二',
        url: 'https://example.com/textbook2',
        page: 45
      }
    ]
  },
  {
    name: '化学反应',
    description: '物质之间发生化学变化，形成新物质的过程。',
    category: '化学反应',
    level: 2,
    prerequisites: ['分子', '化学键'],
    relatedConcepts: ['化学方程式', '反应速率', '化学平衡'],
    examples: [
      '铁生锈',
      '燃烧反应'
    ],
    formulas: [
      '2H₂ + O₂ → 2H₂O',
      'Fe + 2HCl → FeCl₂ + H₂'
    ],
    properties: {
      '反应热': '反应过程中吸收或释放的热量',
      '反应速率': '反应物浓度随时间的变化率',
      '反应平衡': '正逆反应速率相等时的状态'
    },
    references: [
      {
        type: 'textbook',
        title: '高中化学必修二',
        url: 'https://example.com/textbook2',
        page: 78
      }
    ]
  },
  {
    name: '化学方程式',
    description: '用化学符号表示化学反应的式子。',
    category: '化学反应',
    level: 2,
    prerequisites: ['化学反应'],
    relatedConcepts: ['化学反应', '摩尔', '质量守恒定律'],
    examples: [
      '2H₂ + O₂ → 2H₂O',
      'CaCO₃ → CaO + CO₂'
    ],
    formulas: [],
    properties: {
      '配平': '使反应前后原子数量相等',
      '反应类型': '根据反应特点分类',
      '反应条件': '反应发生的必要环境'
    },
    references: [
      {
        type: 'textbook',
        title: '高中化学必修二',
        url: 'https://example.com/textbook2',
        page: 92
      }
    ]
  },
  {
    name: '元素周期表',
    description: '按照原子序数排列的化学元素表格，反映了元素的周期性规律。',
    category: '基础概念',
    level: 2,
    prerequisites: ['原子'],
    relatedConcepts: ['原子', '元素', '周期律'],
    examples: [
      '第一周期包含氢和氦',
      '第二周期包含锂到氖'
    ],
    formulas: [],
    properties: {
      '周期': '元素所在的横行',
      '族': '元素所在的纵列',
      '原子半径': '原子大小的周期性变化'
    },
    references: [
      {
        type: 'textbook',
        title: '高中化学必修一',
        url: 'https://example.com/textbook1',
        page: 35
      }
    ]
  },
  {
    name: '离子',
    description: '带电的原子或原子团。',
    category: '基础概念',
    level: 2,
    prerequisites: ['原子'],
    relatedConcepts: ['原子', '化学键', '电解质'],
    examples: [
      '钠离子(Na⁺)',
      '氯离子(Cl⁻)'
    ],
    formulas: ['Na⁺', 'Cl⁻', 'SO₄²⁻'],
    properties: {
      '电荷数': '离子所带的电荷数量',
      '离子半径': '离子的大小',
      '离子键': '正负离子之间的静电作用'
    },
    references: [
      {
        type: 'textbook',
        title: '高中化学必修一',
        url: 'https://example.com/textbook1',
        page: 48
      }
    ]
  },
  {
    name: '电解质',
    description: '在水溶液中或熔融状态下能够导电的化合物。',
    category: '溶液',
    level: 3,
    prerequisites: ['离子'],
    relatedConcepts: ['离子', '溶液', '电离'],
    examples: [
      '氯化钠(NaCl)',
      '硫酸(H₂SO₄)'
    ],
    formulas: ['NaCl', 'H₂SO₄', 'NaOH'],
    properties: {
      '电离度': '已电离的分子比例',
      '导电性': '溶液的导电能力',
      'pH值': '溶液的酸碱性'
    },
    references: [
      {
        type: 'textbook',
        title: '高中化学必修二',
        url: 'https://example.com/textbook2',
        page: 112
      }
    ]
  },
  {
    name: '氧化还原反应',
    description: '涉及电子转移的化学反应。',
    category: '化学反应',
    level: 3,
    prerequisites: ['化学反应', '离子'],
    relatedConcepts: ['化学反应', '离子', '电极电势'],
    examples: [
      '金属与酸反应',
      '电池中的反应'
    ],
    formulas: [
      'Zn + 2H⁺ → Zn²⁺ + H₂',
      '2Fe³⁺ + Cu → 2Fe²⁺ + Cu²⁺'
    ],
    properties: {
      '氧化数': '元素在化合物中的表观电荷数',
      '还原剂': '提供电子的物质',
      '氧化剂': '接受电子的物质'
    },
    references: [
      {
        type: 'textbook',
        title: '高中化学必修二',
        url: 'https://example.com/textbook2',
        page: 145
      }
    ]
  },
  {
    name: '化学平衡',
    description: '可逆反应中正逆反应速率相等时的状态。',
    category: '化学反应',
    level: 3,
    prerequisites: ['化学反应'],
    relatedConcepts: ['化学反应', '反应速率', '勒夏特列原理'],
    examples: [
      '氨的合成反应',
      '醋酸的电离'
    ],
    formulas: [
      'N₂ + 3H₂ ⇌ 2NH₃',
      'CH₃COOH ⇌ CH₃COO⁻ + H⁺'
    ],
    properties: {
      '平衡常数': '反应物和生成物浓度的比值',
      '平衡移动': '平衡状态的改变',
      '反应商': '任意时刻反应物和生成物浓度的比值'
    },
    references: [
      {
        type: 'textbook',
        title: '高中化学必修二',
        url: 'https://example.com/textbook2',
        page: 168
      }
    ]
  }
]; 