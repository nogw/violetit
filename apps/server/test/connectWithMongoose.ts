import mongoose, { ConnectOptions } from 'mongoose';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: string;
      __MONGO_DB_NAME__: string;
    }
  }

  var __MONGO_DB_NAME__: string;
  var __MONGO_URI__: string;
}

const mongooseOptions: ConnectOptions = {
  autoIndex: false,
  connectTimeoutMS: 10000,
  dbName: global.__MONGO_DB_NAME__,
};

export const connectWithMongoose = async (): Promise<typeof mongoose> => {
  jest.setTimeout(20000);
  mongoose.set('strictQuery', true);

  return mongoose.connect(global.__MONGO_URI__, mongooseOptions);
};
