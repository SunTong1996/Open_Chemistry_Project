export const knowledgeNodes = [
  {
    id: "element",
    name: "元素化学",
    link: "/basics/element",
    group: 1,
    related: ["structure", "reaction"]
  },
  // ...其他节点数据...
];

export const knowledgeLinks = [
  { source: "element", target: "structure", value: 5 },
  // ...其他关系数据...
];