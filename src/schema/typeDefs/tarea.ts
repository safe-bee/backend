import gql from 'graphql-tag';

const tareaDef = gql`
  type Tarea {
    id: Int!
    fecha: DateTime!
    colmenaId: Int!
    alertaId: Int!
    colmena: Colmena
    alerta: Alerta
  }

  extend type Query {
    tareas: [Tarea!]!
    tarea(id: Int!): Tarea
  }

  extend type Mutation {
    createTarea(
      fecha: DateTime!
      colmenaId: Int!
      alertaId: Int!
    ): Tarea!

    updateTarea(
      id: Int!, 
      fecha: DateTime
      alertaId: Int
      colmenaId: Int
    ): Tarea!

    deleteTarea(id: Int!): Tarea!
  }
`;

export default tareaDef;