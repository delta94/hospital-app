import { gql } from 'apollo-boost';

export const hospitalFragment = gql`
  fragment hospital on Hospital {
    name
    location
    id
  }
`;

export const HOSPITAL_QUERY = gql`
  {
    hospitals {
      ...hospital
    }
  }
  ${hospitalFragment}
`;


export const SINGLE_HOSPITAL = gql`
  query getHospital($id: ID!) {
    hospital(id: $id) {
      ...hospital
    }
  }
  ${hospitalFragment}
`;


