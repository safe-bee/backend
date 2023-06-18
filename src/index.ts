import apolloServer from "./apollo-server";

// eslint-disable-next-line import/prefer-default-export
export const graphqlHandler = (event, context, callback) => {
  const config = {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Origin", "Accept"],
      // credentials: true,
    },
  };

  const handler = apolloServer.createHandler(config);

  return handler(event, context, callback);
};
