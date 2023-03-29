import mongoose from 'mongoose';

import { config, isProd } from './config';

export const connectDatabase = async (): Promise<void> => {
  mongoose.set('strictQuery', true);
  mongoose.set('debug', !isProd);

  /* eslint-disable no-console */
  mongoose.connection
    .once('open', () => console.log('database connected'))
    .on('error', err => console.log(err))
    .on('close', () => console.log('database closed'));
  /* eslint-enable no-console */

  await mongoose.connect(config.MONGO_URI);
};
