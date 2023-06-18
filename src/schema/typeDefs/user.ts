import { gql } from "apollo-server-lambda";

const userDef = gql`
  type User {
    user_id: ID!
    username: String!
    password: String!
    email: String!
  }

  extend type Query {
    users: [User]!
  }
`;

export default userDef;
