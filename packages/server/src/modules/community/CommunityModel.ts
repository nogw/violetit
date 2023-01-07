import mongoose, { Schema, Types, Document } from 'mongoose';

export interface ICommunity {
  name: string;
  admin: Types.ObjectId;
  members: Types.ObjectId[];
  mods: Types.ObjectId;
}

export interface ICommunityDocument extends ICommunity, Document {}

const CommunitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 21, // todo: use reddit small pattern?
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    mods: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      require: true, // todo: add admin as a member?
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);

export const CommunityModel = mongoose.model<ICommunityDocument>(
  'Community',
  CommunitySchema,
);