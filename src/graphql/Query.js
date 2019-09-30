import { gql } from 'apollo-boost';

export const HOSPITAL_QUERY = gql`
  {
    hospitals {
      name
      location
    }
  }
`;
