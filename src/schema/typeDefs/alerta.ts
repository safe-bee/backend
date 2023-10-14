import gql from 'graphql-tag';

const alertaDef = gql`
  type Alerta {
    id: Int!
    descripcion: String!
    fecha: DateTime
    colmenaId: Int!
    terminada: Boolean
  }

  extend type Query {
    alertas: [Alerta!]!
    alerta(id: Int!): Alerta
  }

  extend type Mutation {
    createAlerta(
      descripcion: String!
      colmenaId: Int!
      fecha: DateTime
      terminada: Boolean
    ): Alerta!

    updateAlerta(
      id: Int!
      descripcion: String
      colmenaId: Int
      fecha: DateTime
      terminada: Boolean
    ): Alerta!

    deleteAlerta(id: Int!): Alerta!
  }
`;

export default alertaDef;