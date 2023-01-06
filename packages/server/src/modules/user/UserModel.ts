import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  communities: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser {
  authenticate(password: string): Promise<boolean>;
  hashPassword(plainPassword: string): Promise<string>;
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 4,
      max: 24,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: 32,
      minLength: 8,
    },
    communities: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: 'Community',
    },
  },
  {
    collection: 'User',
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);

UserSchema.pre<IUserDocument>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hashedPassowrd = await this.hashPassword(this.password);
    this.password = hashedPassowrd;
  }

  return next();
});

UserSchema.methods = {
  authenticate: async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
  },
  hashPassword: async function (password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassowrd = await bcrypt.hash(password, salt);

    return hashedPassowrd;
  },
};

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
