
import gql from 'graphql-tag';

const authDef = gql`
  input SignUpInput {
    username: String!
    password: String!
    phoneNumber: String!
    company: String
    clients: String!
    firstName: String!
    lastName: String!
  }

  input SignInInput {
    username: String!
    password: String!
  }

  input ForgotPasswordInput {
    username: String!
  }

  input ConfirmNewPasswordInput {
    username: String!
    code: String!
    password: String!
  }

  type UserDTO {
    username: String
    userId: String
  }

  type SignUpPayload {
    user: UserDTO
    error: Error
  }

  type SignInPayload {
    user: UserDTO
    error: Error
  }

  type ForgotPasswordPayload {
    emailSent: Boolean!
    error: Error
  }

  type ConfirmNewPasswordPayload {
    operation: String!
    error: Error
  }

  extend type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    forgotPassword(input: ForgotPasswordInput!): ForgotPasswordPayload!
    confirmNewPassword(input: ConfirmNewPasswordInput!): ConfirmNewPasswordPayload!
  }
`;

export default authDef;
