import gql from 'graphql-tag';

const apiarioDef = gql`
  type Apiario {
    id: ID!
    name: String!
  }

  extend type Query {
    apiarios: [Apiario!]!
    apiario(id: Int!): Apiario
  }

  type Mutation {
    createApiario(name: String!): Apiario!
    updateApiario(id: Int!, name: String): Apiario!
    deleteApiario(id: Int!): Apiario!
  }
`;

export default apiarioDef;
