import mongoose from 'mongoose';

import { restartCounters } from './counters';

const clearDatabase = async () => {
  await mongoose.connection.dropDatabase();
};

export const clearDbAndRestartCounters = async (): Promise<void> => {
  await clearDatabase();
  restartCounters();
};
