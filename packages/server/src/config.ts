import dotenv from 'dotenv-safe';
import path from 'path';

const root = path.join.bind(process.cwd());

dotenv.config({
  path: root('.env'),
  sample: root('.env.example'),
});

const { PORT, MONGO_URI } = process.env;

export const config = {
  MONGO_URI: MONGO_URI || 'mongodb://localhost/violetit',
  PORT: PORT || 3000,
};
