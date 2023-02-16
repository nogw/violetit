import { Model, Document } from 'mongoose';

export const upsertModel = async <T extends Document, K extends Function>(model: Model<T>, createFn: K): Promise<T> => {
  const data = await model.findOne();

  if (data) return data;

  return createFn();
};
