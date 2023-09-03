import gql from 'graphql-tag';

const colmenaDef = gql`
  type Colmena {
    id: Int!
    nombre: String!
    apiarioId: Int!
    tipo: TipoColmena!
    datos_numero_deeps: String
    datos_numero_supers: String
    datos_total_cuadros: String
    datos_color: String
    datos_origen: OrigenColmena
    datos_fecha_establecimiento: String
    reina_tipo: TipoReina
    reina_color: String
    reina_fecha_aceptacion: String
    reina_notas: String
    foto1: String
    foto2: String
    foto3: String
  }

  enum TipoColmena {
    HORIZONTAL
    LANGSTROTH
    NUCLEO
    TOPBAR
    TRADICIONAL
    TRANSICIONAL
    WARRE
  }

  enum OrigenColmena {
    ENJAMBRE
    NUCLEO
    SPLIT
    OBTENIDO
  }

  enum TipoReina {
    LOCAL
    ITALIANA
    RUSA
    CARNIOLA
    CAUCASICA
    BUCKFAST
    ARPATIANA
  }

  extend type Query {
    colmenas: [Colmena!]!
    colmena(id: Int!): Colmena
  }

  extend type Mutation {
    createColmena(
      nombre: String!
      apiarioId: Int!
      tipo: TipoColmena!
      datos_numero_deeps: String
      datos_numero_supers: String
      datos_total_cuadros: String
      datos_color: String
      datos_origen: OrigenColmena
      datos_fecha_establecimiento: String
      reina_tipo: TipoReina
      reina_color: String
      reina_fecha_aceptacion: String
      reina_notas: String
      foto1: String
      foto2: String
      foto3: String
    ): Colmena!

    updateColmena(
      id: Int!
      nombre: String!
      apiarioId: Int!
      tipo: TipoColmena!
      datos_numero_deeps: String
      datos_numero_supers: String
      datos_total_cuadros: String
      datos_color: String
      datos_origen: OrigenColmena
      datos_fecha_establecimiento: String
      reina_tipo: TipoReina
      reina_color: String
      reina_fecha_aceptacion: String
      reina_notas: String
      foto1: String
      foto2: String
      foto3: String
    ): Colmena!

    deleteColmena(id: Int!): Colmena!
  }
`;

export default colmenaDef;