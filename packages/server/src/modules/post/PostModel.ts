import mongoose, { Schema, Types, Document } from 'mongoose';

export interface IPost {
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
    title: {
      type: String,
      require: true,
      maxlength: 300,
    },
    content: {
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
