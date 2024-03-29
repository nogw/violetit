import mongoose, { Document, Types, Schema } from 'mongoose';
import ObjectId = Schema.Types.ObjectId;

export interface ICommunity {
  _id: Types.ObjectId;
  name: string;
  title: string;
  admin: Types.ObjectId;
  members: Types.ObjectId[];
  mods: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export type ICommunityDocument = ICommunity & Document;

const CommunitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 21,
    },
    title: {
      type: String,
      required: true,
    },
    admin: {
      type: ObjectId,
      ref: 'User',
      require: true,
    },
    mods: {
      type: [ObjectId],
      ref: 'User',
      default: [],
    },
    members: {
      type: [ObjectId],
      ref: 'User',
      require: true,
    },
  },
  {
    collection: 'Community',
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);

export const CommunityModel = mongoose.model<ICommunityDocument>('Community', CommunitySchema);
