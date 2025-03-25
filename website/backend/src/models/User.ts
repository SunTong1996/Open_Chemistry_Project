import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  level: number;
  experience: number;
  achievements: string[];
  learningProgress: {
    [key: string]: {
      progress: number;
      lastAccessed: Date;
    };
  };
  notes: {
    [key: string]: {
      content: string;
      createdAt: Date;
      updatedAt: Date;
      tags: string[];
      links: string[];
    };
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    level: {
      type: Number,
      default: 1,
    },
    experience: {
      type: Number,
      default: 0,
    },
    achievements: [{
      type: String,
    }],
    learningProgress: {
      type: Map,
      of: {
        progress: Number,
        lastAccessed: Date,
      },
      default: {},
    },
    notes: {
      type: Map,
      of: {
        content: String,
        createdAt: Date,
        updatedAt: Date,
        tags: [String],
        links: [String],
      },
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// 密码加密中间件
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// 密码比较方法
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// 经验值计算方法
userSchema.methods.addExperience = async function (amount: number) {
  this.experience += amount;
  
  // 检查是否升级
  const experienceNeeded = this.level * 100;
  if (this.experience >= experienceNeeded) {
    this.level += 1;
    this.experience -= experienceNeeded;
  }
  
  await this.save();
};

export const User = mongoose.model<IUser>('User', userSchema); 