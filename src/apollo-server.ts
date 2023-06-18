import { ApolloServer } from "apollo-server-lambda";
import models from "./model/index";
import schema from "./schema/index";

const apolloServer = new ApolloServer({
  schema,
  playground: {
    endpoint: "/dev/graphql",
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    models,
  }),
  formatResponse: (response) => {
    return response;
  },
});

export default apolloServer;
