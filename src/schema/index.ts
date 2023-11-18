/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import lodash from "lodash";
import gql from 'graphql-tag';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import { resolvers as scalarResolvers } from 'graphql-scalars';

import { mergeTypeDefs } from '@graphql-tools/merge';
import authResolvers from "./resolvers/auth.js";
import apiariosResolvers from "./resolvers/apiario.js";
import colmenaResolvers from "./resolvers/colmena.js";
import zonaSugeridaResolvers from "./resolvers/zonaSugerida.js";
import tareaResolvers from "./resolvers/tarea.js";
import registroResolvers from "./resolvers/registro.js";
import registroEspecificoResolvers from "./resolvers/registroEspecifico.js";

import Auth from "./typeDefs/auth.js";
import Common from "./typeDefs/common.js";
import Apiario from "./typeDefs/apiario.js";
import Colmena from "./typeDefs/colmena.js";
import ZonaSugerida from "./typeDefs/zonaSugerida.js";
import Tarea from "./typeDefs/tarea.js";
import Registro from "./typeDefs/registro.js";

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
  ...scalarTypeDefs,
  Query,
  Auth,
  Common,
  Apiario,
  Colmena,
  ZonaSugerida,
  Tarea,
  Registro
];

const typeDefs = mergeTypeDefs(types);

const resolvers = lodash.merge(
  scalarResolvers,
  authResolvers,
  apiariosResolvers,
  colmenaResolvers,
  zonaSugeridaResolvers,
  tareaResolvers,
  registroResolvers,
  registroEspecificoResolvers
);

const schema = {
  typeDefs,
  resolvers
}

export default schema

