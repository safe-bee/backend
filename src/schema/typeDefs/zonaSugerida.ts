import gql from 'graphql-tag';

const zonaSugeridaDef = gql`

  type Coordenada {
    coord1: Float!
    coord2: Float!
  }
  
  type ZonaSugerida {
    nombre: String!
    coordenadas: [Coordenada!]!
  }
  
  type Query {
    zonasSugeridas: [ZonaSugerida!]!
  }
`;

export default zonaSugeridaDef;
  