import { ApolloServer } from "@apollo/server";
import { PrismaClient } from '@prisma/client'
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from "./schema/index.js";


interface MyContext {
  prisma: PrismaClient
}

const server = new ApolloServer<MyContext>(schema);


const { url } = await startStandaloneServer(
  server, 
  {
    context: async ({ res, req }) => ({
      prisma: new PrismaClient()
    }),
    listen: { port: 4000 },
  }
);


console.log(`🚀  Server ready at ${url}`);

