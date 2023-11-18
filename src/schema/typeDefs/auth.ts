import gql from 'graphql-tag';

const authDef = gql`
  type Usuario {
    usuarioId: Int!
    nombreUsuario: String!
    correoElectronico: String!
  }

  type UsuarioPayload {
    usuario: Usuario
  }

  type Query {
    obtenerDatosUsuario(nombreUsuario: String!): Usuario
  }

  type Mutation {
    signUp(nombreUsuario: String!, correoElectronico: String!, contrasena: String!): UsuarioPayload
    signIn(nombreUsuario: String!, contrasena: String!): UsuarioPayload
  }

`;

export default authDef;