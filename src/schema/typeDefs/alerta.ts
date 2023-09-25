import gql from 'graphql-tag';

const alertaDef = gql`
  type Alerta {
    id: Int!
    descripcion: String!
    colmenaId: Int!
    terminada: Boolean
    tipo_tarea: TipoTarea!
  }

  enum TipoTarea {
    TRATAMIENTO
    COSECHA
    ALIMENTACION
    CAMBIO_DE_CUADROS
  }

  extend type Query {
    alertas: [Alerta!]!
    alerta(id: Int!): Alerta
  }

  extend type Mutation {
    createAlerta(
      descripcion: String!
      colmenaId: Int!
      tipo_tarea: TipoTarea!
      terminada: Boolean
    ): Alerta!

    updateAlerta(
      id: Int!
      descripcion: String!
      colmenaId: Int!
      tipo_tarea: TipoTarea!
      terminada: Boolean
    ): Alerta!

    deleteAlerta(id: Int!): Alerta!
  }
`;

export default alertaDef;