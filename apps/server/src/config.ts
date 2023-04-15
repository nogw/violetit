import dotenv from 'dotenv-safe';
import path from 'path';

const root = path.join.bind(process.cwd());

dotenv.config({
  path: root('.env'),
  sample: root('.env.example'),
});

const { PORT, MONGO_URI, JWT_KEY, NODE_ENV } = process.env;

export const isProd = NODE_ENV === 'production';

export const config = {
  PORT: PORT || 3000,
  JWT_KEY: JWT_KEY,
  MONGO_URI: MONGO_URI || 'mongodb://localhost/violetit',
  NODE_ENV: NODE_ENV || 'development',
};
