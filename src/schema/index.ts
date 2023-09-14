/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import lodash from "lodash";
import gql from 'graphql-tag';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import { resolvers as scalarResolvers } from 'graphql-scalars';

// import userResolvers from "./resolvers/user";
import { mergeTypeDefs } from '@graphql-tools/merge'
//import authResolvers from "./resolvers/auth";
import apiariosResolvers from "./resolvers/apiario.js";
import colmenaResolvers from "./resolvers/colmena.js";
import zonaSugeridaResolvers from "./resolvers/zonaSugerida.js";

// import User from "./typeDefs/user";
import Auth from "./typeDefs/auth.js";
import Common from "./typeDefs/common.js";
import Apiario from "./typeDefs/apiario.js";
import Colmena from "./typeDefs/colmena.js";
import ZonaSugerida from "./typeDefs/zonaSugerida.js";

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


const types =  [Query, Auth, Common, ...scalarTypeDefs, Apiario, Colmena, ZonaSugerida];

const typeDefs = mergeTypeDefs(types);

const resolvers = lodash.merge(scalarResolvers, apiariosResolvers, colmenaResolvers, zonaSugeridaResolvers);

const schema = {
  typeDefs,
  resolvers
}

export default schema

