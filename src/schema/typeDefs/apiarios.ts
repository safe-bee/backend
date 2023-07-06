import gql from 'graphql-tag';

const apiariosDef = gql`
  type Apiarios {
    id: ID!
    name: String!
  }

  extend type Query {
    apiarios: [Apiarios]!
  }
`;

export default apiariosDef;
