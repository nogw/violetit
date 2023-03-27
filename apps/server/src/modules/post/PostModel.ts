import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPost {
  tags: Types.ObjectId;
  title: string;
  content?: string;
  author: Types.ObjectId;
  community: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostDocument extends IPost, Document {}

const PostSchema = new Schema(
  {
    tags: {
      type: Types.ObjectId,
      ref: 'Tags',
      require: true,
    },
    title: {
      type: String,
      require: true,
      maxlength: 300,
    },
    content: {
      require: true,
      type: String,
    },
    author: {
      type: Types.ObjectId,
      ref: 'User',
      require: true,
    },
    community: {
      type: Types.ObjectId,
      ref: 'Community',
      require: true,
    },
  },
  {
    collection: 'Post',
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);

export const PostModel = mongoose.model<IPostDocument>('Post', PostSchema);
