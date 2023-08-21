import gql from 'graphql-tag';

// Falta: colmenas: [Colmena!]!
const apiarioDef = gql`
  type Apiario {
    id: Int!
    nombre: String!
    fecha_creacion: String!
    latitud: Float!
    longitud: Float!
    direccion: String!
    tipo_terreno: TipoTerreno!
    tipo_ambiente: TipoAmbiente!    
  }

  enum TipoTerreno {
    BOSQUE
    MONTANA
    CAMPO
    COSTA
    DESIERTO
    LLANURA
    OTRO
  }

  enum TipoAmbiente {
    RURAL
    SUBURBANO
    URBANO
  }

  extend type Query {
    apiarios: [Apiario!]!
    apiario(id: Int!): Apiario
  }

  extend type Mutation {
    createApiario(data: CreateApiarioInput!): Apiario!
    updateApiario(id: Int!, data: UpdateApiarioInput!): Apiario!
    deleteApiario(id: Int!): Apiario!
  }

  input CreateApiarioInput {
    nombre: String!
    latitud: Float!
    longitud: Float!
    direccion: String!
    tipo_terreno: TipoTerreno!
    tipo_ambiente: TipoAmbiente!
  }

  input UpdateApiarioInput {
    nombre: String
    latitud: Float
    longitud: Float
    direccion: String
    tipo_terreno: TipoTerreno
    tipo_ambiente: TipoAmbiente
  }
`;

export default apiarioDef;
