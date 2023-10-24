import { ApolloServer } from "@apollo/server";
import { PrismaClient } from '@prisma/client'
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';

import schema from "./schema/index.js";


interface MyContext {
  prisma: PrismaClient
}

const server = new ApolloServer<MyContext>(schema);

const primsaClient = new PrismaClient();

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server, 
  handlers.createAPIGatewayProxyEventV2RequestHandler(), 
  {
  context: async ({ event, context }) => ({
    prisma: primsaClient
  }),
});