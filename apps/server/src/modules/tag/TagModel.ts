import mongoose, { Document, Schema, Types } from 'mongoose';
import ObjectId = mongoose.Schema.Types.ObjectId;

export interface ITag {
  label: string;
  color: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITagDocument extends ITag, Document {}

const TagSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    createdBy: {
      type: ObjectId,
      required: true,
    },
  },
  {
    collection: 'Tag',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export const TagModel = mongoose.model<ITagDocument>('Tag', TagSchema);
