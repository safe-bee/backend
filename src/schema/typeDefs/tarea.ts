import gql from 'graphql-tag';

const tareaDef = gql`
  type Tarea {
    id: Int!
    descripcion: String!
    fecha: DateTime
    colmenaId: Int!
    terminada: Boolean
    tipoRegistro: TipoRegistro!
    registro: Registro
  }

  extend type Query {
    tareas: [Tarea!]!
    tarea(id: Int!): Tarea
    tareasPendientes: [Tarea!]!
    tareasPendientesPorColmenaYTipo(colmenaId: Int!, tipoRegistro: TipoRegistro!): [Tarea!]!
  }

  extend type Mutation {
    createTarea(
      descripcion: String!
      colmenaId: Int!
      fecha: DateTime
      terminada: Boolean
      tipoRegistro: TipoRegistro!
    ): Tarea!

    updateTarea(
      id: Int!
      descripcion: String
      colmenaId: Int
      fecha: DateTime
      terminada: Boolean
      tipoRegistro: TipoRegistro!
    ): Tarea!

    deleteTarea(id: Int!): Tarea!
  }
`;

export default tareaDef;