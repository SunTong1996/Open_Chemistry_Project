import mongoose, { Schema, Document } from 'mongoose';

export interface IChemicalConcept extends Document {
  name: string;
  description: string;
  category: string;
  level: number;
  prerequisites: string[];
  relatedConcepts: string[];
  examples: string[];
  formulas?: string[];
  properties?: {
    [key: string]: string;
  };
  references: {
    title: string;
    url: string;
    type: 'textbook' | 'article' | 'video' | 'website';
    page?: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const chemicalConceptSchema = new Schema<IChemicalConcept>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        '基础概念',
        '原子结构',
        '化学键',
        '化学反应',
        '溶液',
        '热力学',
        '动力学',
        '电化学',
        '有机化学',
        '分析化学',
      ],
    },
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    prerequisites: [{
      type: String,
      ref: 'ChemicalConcept',
    }],
    relatedConcepts: [{
      type: String,
      ref: 'ChemicalConcept',
    }],
    examples: [{
      type: String,
    }],
    formulas: [{
      type: String,
    }],
    properties: {
      type: Map,
      of: String,
    },
    references: [{
      title: String,
      url: String,
      type: {
        type: String,
        enum: ['textbook', 'article', 'video', 'website'],
      },
      page: {
        type: Number,
      },
    }],
  },
  {
    timestamps: true,
  }
);

// 创建索引
chemicalConceptSchema.index({ name: 1 });
chemicalConceptSchema.index({ category: 1 });
chemicalConceptSchema.index({ level: 1 });

export const ChemicalConcept = mongoose.model<IChemicalConcept>('ChemicalConcept', chemicalConceptSchema); 