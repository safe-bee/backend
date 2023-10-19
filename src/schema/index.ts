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
import zonaSugeridaResolvers from "./resolvers/zonaSugerida";
import alertaResolvers from "./resolvers/alerta";
import tareaResolvers from "./resolvers/tarea";
import tareaEspecificaResolvers from "./resolvers/tareaEspecifica";

// import User from "./typeDefs/user";
import Auth from "./typeDefs/auth";
import Common from "./typeDefs/common";
import Apiario from "./typeDefs/apiario";
import Colmena from "./typeDefs/colmena";
import ZonaSugerida from "./typeDefs/zonaSugerida";
import Alerta from "./typeDefs/alerta";
import Tarea from "./typeDefs/tarea";

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


const types = [
  Query,
  Auth,
  Common,
  ...scalarTypeDefs,
  Apiario,
  Colmena,
  ZonaSugerida,
  Alerta,
  Tarea
];

const typeDefs = mergeTypeDefs(types);

const resolvers = lodash.merge(
  scalarResolvers,
  authResolvers,
  apiariosResolvers,
  colmenaResolvers,
  zonaSugeridaResolvers,
  alertaResolvers,
  tareaResolvers,
  tareaEspecificaResolvers
);

const schema = {
  typeDefs,
  resolvers
}

export default schema

