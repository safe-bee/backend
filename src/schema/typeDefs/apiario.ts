import gql from 'graphql-tag';

const apiarioDef = gql`
  type Apiario {
    id: Int!
    nombre: String!
    fecha_creacion: DateTime!
    latitud: Float!
    longitud: Float!
    direccion: String!
    tipo_ambiente: TipoAmbiente!
    colmenas: [Colmena!]!
    _count: ApiarioCount
  }

  enum TipoAmbiente {
    RURAL
    SUBURBANO
    URBANO
  }

  type ApiarioCount {
    id: Int!
  }

  extend type Query {
    apiarios(usuarioId: Int!): [Apiario!]!
    apiario(id: Int!): Apiario
  }

  extend type Mutation {
    createApiario(
      nombre: String!
      latitud: Float!
      longitud: Float!
      direccion: String!
      tipo_ambiente: TipoAmbiente!
      fecha_creacion: DateTime
      usuarioId: Int!
    ): Apiario!

    updateApiario(
      id: Int!
      nombre: String
      latitud: Float
      longitud: Float
      direccion: String
      tipo_ambiente: TipoAmbiente
      fecha_creacion: DateTime
    ): Apiario!

    deleteApiario(id: Int!): Apiario!
  }
`;

export default apiarioDef;
