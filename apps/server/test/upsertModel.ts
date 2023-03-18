import { Model, Document } from 'mongoose';

export const upsertModel = async <T extends Document, F extends (...args: any[]) => any>(
  model: Model<T>,
  createFn: F,
): Promise<T> => {
  const data = await model.findOne();

  if (data) {
    return data;
  }

  return createFn();
};
