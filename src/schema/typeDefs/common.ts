import gql from 'graphql-tag';

const commonDef = gql`
  type Error {
    reason: String
    field: String
  }
`;

export default commonDef;
