/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import lodash from "lodash";
import gql from 'graphql-tag';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import { resolvers as scalarResolvers } from 'graphql-scalars';

// import userResolvers from "./resolvers/user";
import { mergeTypeDefs } from '@graphql-tools/merge'
import authResolvers from "./resolvers/auth";
import apiariosResolvers from "./resolvers/apiario";
import colmenaResolvers from "./resolvers/colmena";

// import User from "./typeDefs/user";
import Auth from "./typeDefs/auth";
import Common from "./typeDefs/common";
import Apiario from "./typeDefs/apiario";
import Colmena from "./typeDefs/colmena";

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


const types =  [Query, Auth, Common, ...scalarTypeDefs, Apiario, Colmena];

const typeDefs = mergeTypeDefs(types);

const resolvers = lodash.merge(scalarResolvers, authResolvers, apiariosResolvers, colmenaResolvers);

const schema = {
  typeDefs,
  resolvers
}

export default schema

