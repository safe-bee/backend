import { merge } from "lodash";
import { gql, makeExecutableSchema } from "apollo-server-lambda";

import userResolvers from "./resolvers/user";

import User from "./typeDefs/user";

const Query = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [Query, User],
  resolvers: merge(userResolvers),
});

export default schema;
