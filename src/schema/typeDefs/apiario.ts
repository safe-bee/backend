import gql from 'graphql-tag';

// Falta: colmenas: [Colmena!]!
const apiarioDef = gql`
  type Apiario {
    id: Int!
    nombre: String!
    fecha_creacion: DateTime!
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
    createApiario(
      nombre: String!
      latitud: Float!
      longitud: Float!
      direccion: String!
      tipo_terreno: TipoTerreno!
      tipo_ambiente: TipoAmbiente!
      fecha_creacion: DateTime
    ): Apiario!

    updateApiario(
      id: Int!
      nombre: String!
      latitud: Float!
      longitud: Float!
      direccion: String!
      tipo_terreno: TipoTerreno!
      tipo_ambiente: TipoAmbiente!
      fecha_creacion: DateTime
    ): Apiario!

    deleteApiario(id: Int!): Apiario!
  }
`;

export default apiarioDef;
