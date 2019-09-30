import { gql } from 'apollo-boost';

export const HOSPITAL_QUERY = gql`
  {
    hospitals {
      id
      name
      location
    }
  }
`;
