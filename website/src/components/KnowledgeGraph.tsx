import { knowledgeNodes, knowledgeLinks } from '@/lib/knowledgeGraph';
import ForceGraph from 'react-force-graph-2d';

export default function KnowledgeGraph() {
  return (
    <ForceGraph
      graphData={{ nodes: knowledgeNodes, links: knowledgeLinks }}
      nodeLabel="name"
      onNodeClick={node => window.location.href = node.link}
    />
  );
}