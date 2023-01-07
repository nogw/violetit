import { connectDatabase } from './database';
import { createServer } from 'http';
import { config } from './config';

import app from './app';

(async () => {
  connectDatabase();

  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    console.log(`server running on port ${config.PORT}`);
  });
})();
