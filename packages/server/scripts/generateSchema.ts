import { printSchema } from 'graphql';

import fs from 'fs/promises';
import path from 'path';

import { schema } from '../src/schema/schema';

const schemaFilename = 'schema.graphql';
const pwd = process.cwd();

// todo: improve
(async () => {
  const config = {
    path: path.join(pwd, './graphql', schemaFilename),
    schema,
  };

  await fs.writeFile(config.path, printSchema(config.schema));
})();
