import { gql } from 'apollo-boost';

export const HOSPITAL_MUTATION = gql`
  mutation AddHospital($hospital: CreateHospital!) {
    addHospital(hospital: $hospital) {
      name
    }
  }
`;

export const HOSPITAL_UPDATE_MUTATION = gql`
  mutation UpdateHospital($id: ID!, $update: UpdateHospital!) {
    updateHospital(id: $id, update: $update) {
      name
      coverphoto
      logo
      location
      specialties
      doctors {
        firstName,
        lastName
      }
      description
    }
  }
`;
