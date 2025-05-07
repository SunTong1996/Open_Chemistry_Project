import { Request, Response } from 'express';
import { ChemicalConcept, IChemicalConcept } from '../models/ChemicalConcept';
import { validationResult } from 'express-validator';

export const createConcept = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const concept = new ChemicalConcept(req.body);
    await concept.save();
    res.status(201).json(concept);
  } catch (error) {
    console.error('创建概念错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

export const getConcept = async (req: Request, res: Response) => {
  try {
    const concept = await ChemicalConcept.findOne({ name: req.params.name });
    if (!concept) {
      return res.status(404).json({ message: '概念不存在' });
    }
    res.json(concept);
  } catch (error) {
    console.error('获取概念错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

export const updateConcept = async (req: Request, res: Response) => {
  try {
    const concept = await ChemicalConcept.findOneAndUpdate(
      { name: req.params.name },
      { $set: req.body },
      { new: true }
    );
    if (!concept) {
      return res.status(404).json({ message: '概念不存在' });
    }
    res.json(concept);
  } catch (error) {
    console.error('更新概念错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

export const deleteConcept = async (req: Request, res: Response) => {
  try {
    const concept = await ChemicalConcept.findOneAndDelete({ name: req.params.name });
    if (!concept) {
      return res.status(404).json({ message: '概念不存在' });
    }
    res.json({ message: '概念已删除' });
  } catch (error) {
    console.error('删除概念错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

export const getConceptGraph = async (req: Request, res: Response) => {
  try {
    const concepts = await ChemicalConcept.find({}, 'name prerequisites relatedConcepts category level');
    
    // 构建节点和边的数据结构
    const nodes = concepts.map(concept => ({
      id: concept.name,
      data: {
        label: concept.name,
        category: concept.category,
        level: concept.level,
      },
      type: 'concept',
    }));

    const edges = concepts.flatMap(concept => [
      // 前置知识关系
      ...concept.prerequisites.map(prereq => ({
        id: `${prereq}-${concept.name}`,
        source: prereq,
        target: concept.name,
        type: 'prerequisite',
      })),
      // 相关概念关系
      ...concept.relatedConcepts.map(related => ({
        id: `${concept.name}-${related}`,
        source: concept.name,
        target: related,
        type: 'related',
      })),
    ]);

    res.json({ nodes, edges });
  } catch (error) {
    console.error('获取概念图谱错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

export const searchConcepts = async (req: Request, res: Response) => {
  try {
    const { query, category, level } = req.query;
    const searchQuery: any = {};

    if (query) {
      searchQuery.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ];
    }

    if (category) {
      searchQuery.category = category;
    }

    if (level) {
      searchQuery.level = parseInt(level as string);
    }

    const concepts = await ChemicalConcept.find(searchQuery)
      .select('name description category level')
      .limit(20);

    res.json(concepts);
  } catch (error) {
    console.error('搜索概念错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
}; 