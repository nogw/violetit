import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPost {
  _id: Types.ObjectId;
  title: string;
  content?: string;
  tags: Types.ObjectId[];
  author: Types.ObjectId;
  community: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type IPostDocument = IPost & Document;

const PostSchema = new Schema(
  {
    tags: {
      type: [Schema.Types.ObjectId],
      ref: 'Tags',
      default: [],
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
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    community: {
      type: Schema.Types.ObjectId,
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
export { PostSchema };
