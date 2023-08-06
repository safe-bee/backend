import gql from 'graphql-tag';

const apiarioDef = gql`
  type Apiario {
    id: ID!
    name: String!
  }

  extend type Query {
    apiarios: [Apiarios]!
  }

  type Mutation {
    addApiario (
      name: String!
    ): Apiarios
    
  }
`;

export default apiarioDef;
