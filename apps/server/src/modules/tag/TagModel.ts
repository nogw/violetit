import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITag {
  _id: Types.ObjectId;
  label: string;
  color: string;
  community: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type ITagDocument = ITag & Document;

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
    community: {
      type: Schema.Types.ObjectId,
      ref: 'Community',
      require: true,
    },
  },
  {
    collection: 'Tag',
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);

export const TagModel = mongoose.model<ITagDocument>('Tag', TagSchema);
export { TagSchema };
