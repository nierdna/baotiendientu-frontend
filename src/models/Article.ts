import mongoose, { Document, Schema } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt: Date;
  views: number;
  likes: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  content: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  metaTitle: {
    type: String,
    trim: true,
    maxlength: 60
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: 160
  },
  metaKeywords: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Indexes for better performance
ArticleSchema.index({ slug: 1 });
ArticleSchema.index({ status: 1, publishedAt: -1 });
ArticleSchema.index({ category: 1, status: 1 });
ArticleSchema.index({ tags: 1 });
ArticleSchema.index({ author: 1 });

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema); 