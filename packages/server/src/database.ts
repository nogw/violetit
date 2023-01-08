import mongoose from 'mongoose';

import { config } from './config';

export const connectDatabase = async (): Promise<void> => {
  /* eslint-disable no-console */
  mongoose.connection
    .once('open', () => console.log('database connected'))
    .on('error', err => console.log(err))
    .on('close', () => console.log('database closed'));
  /* eslint-enable no-console */

  await mongoose.connect(config.MONGO_URI);
};
