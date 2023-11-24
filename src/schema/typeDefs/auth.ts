import gql from 'graphql-tag';

const authDef = gql`
  type Usuario {
    usuarioId: Int!
    nombreUsuario: String!
    correoElectronico: String!
    token: String
    conteoApiarios: Int
  }

  type UsuarioPayload {
    usuario: Usuario
  }

  type Query {
    obtenerDatosUsuario(usuarioId: Int!): Usuario
  }

  type Mutation {
    signUp(nombreUsuario: String!, correoElectronico: String!, contrasena: String!): UsuarioPayload
    signIn(nombreUsuario: String!, contrasena: String!): UsuarioPayload
    suscribeToPushNotification(usuarioId: Int!, token: String!): UsuarioPayload
  }

`;

export default authDef;