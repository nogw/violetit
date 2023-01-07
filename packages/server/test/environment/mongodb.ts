import { MongoMemoryServer } from 'mongodb-memory-server';
import NodeEnvironment from 'jest-environment-node';
import { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment';

class MongoDbEnvironment extends NodeEnvironment {
  private mongod: MongoMemoryServer | null;

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);

    this.mongod = null;
  }

  async setup() {
    this.mongod = await MongoMemoryServer.create();
    this.global.__MONGO_URI__ = this.mongod.getUri();

    return super.setup();
  }

  async teardown() {
    await this.mongod?.stop();
    this.mongod = null;
  }
}

export default MongoDbEnvironment;
