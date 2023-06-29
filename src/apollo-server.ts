import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
// import models from "./model/index";
import schema from "./schema/index.js";


interface MyContext {
  token?: String;
}

const server = new ApolloServer<MyContext>(schema);

const { url } = await startStandaloneServer(
  server, 
  {
    context: async ({ res, req }) => ({
      token: req.headers.token,
    }),
    listen: { port: 4000 },
  }
);


console.log(`🚀  Server ready at ${url}`);

// export default apolloServer;
