/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import lodash from "lodash";
import gql from 'graphql-tag';

// import userResolvers from "./resolvers/user";
import { mergeTypeDefs } from '@graphql-tools/merge'
import authResolvers from "./resolvers/auth";

// import User from "./typeDefs/user";
import Auth from "./typeDefs/auth";
import Common from "./typeDefs/common";

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


const types =  [Query, Auth, Common];

const typeDefs = mergeTypeDefs(types);

const resolvers = lodash.merge(authResolvers);

const schema = {
  typeDefs,
  resolvers
}

export default schema

