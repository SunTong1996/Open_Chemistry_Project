import React, { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: '化学基础' },
    position: { x: 250, y: 25 },
    className: 'light:bg-white dark:bg-gray-800',
  },
  {
    id: '2',
    data: { label: '原子结构' },
    position: { x: 100, y: 125 },
    className: 'light:bg-white dark:bg-gray-800',
  },
  {
    id: '3',
    data: { label: '化学键' },
    position: { x: 250, y: 125 },
    className: 'light:bg-white dark:bg-gray-800',
  },
  {
    id: '4',
    data: { label: '化学反应' },
    position: { x: 400, y: 125 },
    className: 'light:bg-white dark:bg-gray-800',
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
];

const nodeTypes = {
  custom: CustomNode,
};

export default function KnowledgeGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

function CustomNode({ data }: { data: { label: string } }) {
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg border-2 border-gray-200">
      <div className="font-bold">{data.label}</div>
    </div>
  );
} 