import gql from 'graphql-tag';

const apiarioDef = gql`
  type Apiario {
    id: ID!
    name: String!
  }

  extend type Query {
    apiarios: [Apiario]!
  }

  type Mutation {
    addApiario (
      name: String!
    ): Apiario
    
  }
`;

export default apiarioDef;
