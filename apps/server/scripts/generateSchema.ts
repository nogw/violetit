import { printSchema } from 'graphql';
import { promises as fs } from 'fs';
import path from 'path';

import { schema } from '../src/schema/schema';

const schemaFile = 'schema.graphql';
const pwd = process.cwd();

const writeSchemaToFile = async (schemaPath: string, schemaContent: string) => {
  const dirPath = path.dirname(schemaPath);
  try {
    await fs.access(dirPath);
  } catch (e) {
    await fs.mkdir(dirPath, { recursive: true });
  }
  await fs.writeFile(schemaPath, schemaContent);
};

(async () => {
  try {
    const schemaContent = printSchema(schema);
    const schemaPath = path.join(pwd, 'graphql', schemaFile);
    await writeSchemaToFile(schemaPath, schemaContent);
  } catch (error) {
    throw new Error('Failed to generate schema file');
  }
})();
