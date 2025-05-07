import React, { useCallback, useState, useEffect, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  NodeTypes,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  EdgeTypes,
  MarkerType,
  Panel,
  NodeMouseHandler
} from 'reactflow';
import 'reactflow/dist/style.css';

// 节点类型定义和分类
enum NodeCategory {
  Basic = '基础概念',
  Structure = '物质结构',
  Reaction = '化学反应',
  Solution = '溶液化学',
  Organic = '有机化学',
}

// 自定义节点组件
const CustomNode = ({ data }: { data: any }) => {
  const categoryColors: Record<NodeCategory, string> = {
    [NodeCategory.Basic]: '#4f86f7', // 基础概念 - 蓝色
    [NodeCategory.Structure]: '#50c878', // 物质结构 - 绿色
    [NodeCategory.Reaction]: '#f47a55', // 化学反应 - 橙色
    [NodeCategory.Solution]: '#9370db', // 溶液化学 - 紫色
    [NodeCategory.Organic]: '#ffd700', // 有机化学 - 金色
  };

  const backgroundColor = (data.category && categoryColors[data.category as NodeCategory]) || '#718096';

  return (
    <div 
      className="px-4 py-2 rounded-lg shadow-md border border-gray-200 min-w-[100px] text-center"
      style={{ 
        backgroundColor,
        color: '#fff',
        fontSize: data.level ? `${Math.max(12, 16 - data.level)}px` : '14px',
      }}
    >
      <div className="font-bold">{data.label}</div>
      {data.description && <div className="text-xs mt-1">{data.description}</div>}
    </div>
  );
};

// 扩展节点数据
const initialNodes: Node[] = [
  // 基础概念
  {
    id: '1',
    data: { 
      label: '原子', 
      category: NodeCategory.Basic,
      description: '物质的基本单位',
      level: 1,
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: { 
      label: '分子', 
      category: NodeCategory.Basic,
      description: '由原子组成的稳定结构',
      level: 1,
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { 
      label: '化学键', 
      category: NodeCategory.Structure,
      description: '原子间的连接',
      level: 2,
    },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    data: { 
      label: '化学反应', 
      category: NodeCategory.Reaction,
      description: '物质转化过程',
      level: 2,
    },
    position: { x: 250, y: 200 },
  },
  {
    id: '5',
    data: { 
      label: '元素周期表', 
      category: NodeCategory.Basic,
      description: '元素分类系统',
      level: 1,
    },
    position: { x: 0, y: 200 },
  },
  {
    id: '6',
    data: { 
      label: '离子', 
      category: NodeCategory.Basic,
      description: '带电的原子或原子团',
      level: 2,
    },
    position: { x: 500, y: 200 },
  },
  // 物质结构
  {
    id: '7',
    data: { 
      label: '共价键', 
      category: NodeCategory.Structure,
      description: '电子共享',
      level: 3,
    },
    position: { x: 350, y: 170 },
  },
  {
    id: '8',
    data: { 
      label: '离子键', 
      category: NodeCategory.Structure,
      description: '静电吸引',
      level: 3,
    },
    position: { x: 450, y: 170 },
  },
  // 化学反应
  {
    id: '9',
    data: { 
      label: '氧化还原', 
      category: NodeCategory.Reaction,
      description: '电子转移过程',
      level: 3,
    },
    position: { x: 150, y: 300 },
  },
  {
    id: '10',
    data: { 
      label: '酸碱反应', 
      category: NodeCategory.Reaction,
      description: '质子转移过程',
      level: 3,
    },
    position: { x: 300, y: 300 },
  },
  // 溶液化学
  {
    id: '11',
    data: { 
      label: '电解质', 
      category: NodeCategory.Solution,
      description: '导电溶液',
      level: 3,
    },
    position: { x: 450, y: 300 },
  },
  {
    id: '12',
    data: { 
      label: '溶液', 
      category: NodeCategory.Solution,
      description: '均一混合物',
      level: 2,
    },
    position: { x: 550, y: 250 },
  },
  // 有机化学
  {
    id: '13',
    data: { 
      label: '有机化合物', 
      category: NodeCategory.Organic,
      description: '含碳化合物',
      level: 2,
    },
    position: { x: 100, y: 400 },
  },
  {
    id: '14',
    data: { 
      label: '烃类', 
      category: NodeCategory.Organic,
      description: '碳氢化合物',
      level: 3,
    },
    position: { x: 0, y: 450 },
  },
  {
    id: '15',
    data: { 
      label: '官能团', 
      category: NodeCategory.Organic,
      description: '分子活性部分',
      level: 3,
    },
    position: { x: 200, y: 450 },
  },
];

// 扩展边数据
const initialEdges: Edge[] = [
  // 基础概念关系
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    label: '形成',
    type: 'smoothstep',
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  { 
    id: 'e1-3', 
    source: '1', 
    target: '3', 
    label: '通过',
    type: 'smoothstep',
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  { 
    id: 'e2-4', 
    source: '2', 
    target: '4', 
    label: '参与',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  { 
    id: 'e3-4', 
    source: '3', 
    target: '4', 
    label: '断裂或形成',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  { 
    id: 'e1-5', 
    source: '1', 
    target: '5', 
    label: '排列于',
    type: 'smoothstep',
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  { 
    id: 'e1-6', 
    source: '1', 
    target: '6', 
    label: '失/得电子形成',
    type: 'smoothstep',
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // 物质结构关系
  { 
    id: 'e3-7', 
    source: '3', 
    target: '7', 
    label: '包含',
    type: 'smoothstep',
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  { 
    id: 'e3-8', 
    source: '3', 
    target: '8', 
    label: '包含',
    type: 'smoothstep',
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // 化学反应关系
  { 
    id: 'e4-9', 
    source: '4', 
    target: '9', 
    label: '包含',
    type: 'smoothstep',
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  { 
    id: 'e4-10', 
    source: '4', 
    target: '10', 
    label: '包含',
    type: 'smoothstep',
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // 溶液化学关系
  { 
    id: 'e6-11', 
    source: '6', 
    target: '11', 
    label: '形成',
    type: 'smoothstep',
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  { 
    id: 'e11-12', 
    source: '11', 
    target: '12', 
    label: '溶于',
    type: 'smoothstep',
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // 有机化学关系
  { 
    id: 'e2-13', 
    source: '2', 
    target: '13', 
    label: '包括',
    type: 'smoothstep',
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  { 
    id: 'e13-14', 
    source: '13', 
    target: '14', 
    label: '基本类型',
    type: 'smoothstep',
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  { 
    id: 'e13-15', 
    source: '13', 
    target: '15', 
    label: '特征结构',
    type: 'smoothstep',
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

// 定义节点类型映射
const nodeTypes: NodeTypes = {
  default: CustomNode,
};

// 更新组件接口定义
interface KnowledgeGraphProps {
  searchTerm?: string;
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ searchTerm = '' }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedCategory, setSelectedCategory] = useState<NodeCategory | null>(null);
  const [nodeInfo, setNodeInfo] = useState<any>(null);

  // 处理连接事件
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds: Edge[]) => addEdge(params, eds)),
    [setEdges]
  );

  // 处理节点点击
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setNodeInfo(node.data);
  }, []);

  // 过滤节点
  const filterNodes = (category: NodeCategory | null) => {
    setSelectedCategory(category);
    applyFilters(category, searchTerm);
  };

  // 综合应用所有过滤条件
  const applyFilters = useCallback((category: NodeCategory | null, search: string) => {
    setNodes(
      initialNodes.map(node => {
        // 类别过滤
        const matchesCategory = category === null || node.data.category === category;
        
        // 搜索词过滤
        const matchesSearch = search === '' || 
          node.data.label.toLowerCase().includes(search.toLowerCase()) ||
          (node.data.description && 
           node.data.description.toLowerCase().includes(search.toLowerCase()));
        
        // 合并过滤结果
        const visible = matchesCategory && matchesSearch;
        
        return {
          ...node,
          style: {
            opacity: visible ? 1 : 0.2,
          },
        };
      })
    );
  }, [setNodes]);

  // 监听搜索词变化
  useEffect(() => {
    applyFilters(selectedCategory, searchTerm);
  }, [searchTerm, selectedCategory, applyFilters]);

  // 确保 ReactFlow 组件样式被正确应用
  const graphStyles = {
    width: '100%',
    height: 600,
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-3 py-1 rounded ${
            selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => filterNodes(null)}
        >
          全部
        </button>
        {Object.values(NodeCategory).map(category => (
          <button
            key={category}
            className={`px-3 py-1 rounded ${
              selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => filterNodes(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 知识图谱显示，确保容器有足够高度 */}
      <div className="w-full h-[600px] border border-gray-200 rounded-lg" style={{ minHeight: '600px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.5}
          maxZoom={2}
          style={graphStyles}
          className="react-flow-graph"
        >
          <Controls />
          <MiniMap 
            nodeStrokeColor={(n) => {
              if (n.style?.opacity === 0.2) return '#aaa';
              return '#000';
            }}
            nodeColor={(n) => {
              const category = n.data?.category || NodeCategory.Basic;
              switch (category) {
                case NodeCategory.Basic:
                  return '#4f86f7';
                case NodeCategory.Structure:
                  return '#50c878';
                case NodeCategory.Reaction:
                  return '#f47a55';
                case NodeCategory.Solution:
                  return '#9370db';
                case NodeCategory.Organic:
                  return '#ffd700';
                default:
                  return '#718096';
              }
            }}
          />
          <Background gap={12} size={1} />
          
          {/* 信息面板 */}
          {nodeInfo && (
            <Panel position="top-right" className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{nodeInfo.label}</h3>
                <button onClick={() => setNodeInfo(null)} className="text-gray-500">✕</button>
              </div>
              <p className="text-sm text-gray-600 my-2">{nodeInfo.description}</p>
              <div className="text-xs text-gray-500">分类: {nodeInfo.category}</div>
            </Panel>
          )}
        </ReactFlow>
      </div>
    </div>
  );
};

export default KnowledgeGraph; 