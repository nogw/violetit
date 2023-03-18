import Koa, { Request } from 'koa';
import { graphqlHTTP, OptionsData } from 'koa-graphql';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';
import cors from '@koa/cors';

import { getContext } from './context';
import { getUser } from './auth';
import { schema } from './schema/schema';
import { GraphQLError } from 'graphql';

const app = new Koa();
const router = new Router();

const graphQLSettingsPerReq = async (req: Request): Promise<OptionsData> => {
  const user = await getUser(req.header.authorization);

  return {
    graphiql: true,
    schema,
    pretty: true,
    context: getContext({ user }),
    customFormatErrorFn: (error: GraphQLError) => {
      /* eslint-disable no-console */
      console.log(error.message);
      console.log(error.locations);
      console.log(error.stack);
      /* eslint-enable no-console */

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  };
};

const graphQlServer = graphqlHTTP(graphQLSettingsPerReq);

router.all('/graphql', graphQlServer);

app.use(cors({ credentials: true }));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
