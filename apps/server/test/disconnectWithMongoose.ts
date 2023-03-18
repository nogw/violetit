import mongoose from 'mongoose';

export const disconnectWithMongoose = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};
