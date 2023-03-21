/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const cluster = require('cluster');
const path = require('path');

const defaultOptions = {
  script: 'server.js',
};

class ReloadServerPlugin {
  constructor({ script } = defaultOptions) {
    this.done = null;
    this.workers = [];

    cluster.setupMaster({
      exec: path.resolve(process.cwd(), script),
    });

    cluster.on('online', worker => {
      this.workers.push(worker);

      if (this.done) {
        this.done();
      }
    });
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap(
      {
        name: 'reload-server',
      },
      (_, callback) => {
        this.done = callback;
        this.workers.forEach(worker => {
          try {
            process.kill(worker.process.pid, 'SIGTERM');
          } catch (e) {
            console.warn(`Unable to kill process #${worker.process.pid}`);
          }
        });

        this.workers = [];

        cluster.fork();
      },
    );
  }
}

module.exports = ReloadServerPlugin;
