import mongoose, { Document, Model, Types } from 'mongoose';

import ObjectId = mongoose.Schema.Types.ObjectId;

export interface IVote extends Document {
  type: 'UPVOTE' | 'DOWNVOTE';
  user: Types.ObjectId;
  post?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface IVoteModel extends Model<IVote> {
  countVotes: (target: { post: Types.ObjectId } | { comment: Types.ObjectId }) => Promise<{
    up: number;
    down: number;
    total: number;
  }>;
}

const VoteSchema = new mongoose.Schema<IVote>(
  {
    type: {
      type: String,
      enum: ['UPVOTE', 'DOWNVOTE'],
      required: true,
      index: true,
    },
    post: {
      type: ObjectId,
      ref: 'Post',
      index: true,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    collection: 'Vote',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

VoteSchema.static('countVotes', async function countVotes(target: { post: Types.ObjectId }) {
  const up: number = await this.countDocuments({
    ...target,
    type: 'UPVOTE',
  });

  const down: number = await this.countDocuments({
    ...target,
    type: 'DOWNVOTE',
  });

  return { up, down, total: up - down };
});

export const VoteModel = mongoose.model<IVote, IVoteModel>('Vote', VoteSchema);
