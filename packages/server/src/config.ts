import dotenv from 'dotenv-safe';
import path from 'path';

const root = path.join.bind(process.cwd());

dotenv.config({
  path: root('.env'),
  sample: root('.env.example'),
});

const { PORT, MONGO_URI, JWT_SECRET } = process.env;

export const config = {
  PORT: PORT || 3000,
  MONGO_URI: MONGO_URI || 'mongodb://localhost/violetit',
  JWT_SECRET: JWT_SECRET || 'secret_key',
};
