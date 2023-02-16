import { MongoMemoryServer } from 'mongodb-memory-server';
import NodeEnvironment from 'jest-environment-node';
import { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment';

class MongoDbEnvironment extends NodeEnvironment {
  private mongod: MongoMemoryServer;

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);

    this.mongod = new MongoMemoryServer({
      binary: {
        version: '6.0.4',
      },
    });
  }

  async setup() {
    await super.setup();
    await this.mongod.start();

    this.global.__MONGO_URI__ = this.mongod.getUri();
    this.global.__COUNTERS__ = {};
  }

  async teardown() {
    await super.teardown();
    await this.mongod.stop();
  }
}

export default MongoDbEnvironment;
