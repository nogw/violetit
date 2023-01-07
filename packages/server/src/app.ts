import Koa, { Request } from 'koa';
import { graphqlHTTP, OptionsData } from 'koa-graphql';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import cors from '@koa/cors';

import { getContext } from './getContext';
import { getUser } from './auth';
import { schema } from './schema/schema';

const app = new Koa();
const router = new Router();

const graphQLSettingsPerReq = async (req: Request): Promise<OptionsData> => {
  const user = await getUser(req.header.authorization);

  return {
    graphiql: true,
    schema,
    pretty: true,
    context: getContext({ user }),
    customFormatErrorFn: ({ message, locations, stack }) => {
      console.log(message);
      console.log(locations);
      console.log(stack);

      return {
        message,
        locations,
        stack,
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
