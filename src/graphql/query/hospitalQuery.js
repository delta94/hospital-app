import { gql } from 'apollo-boost';
import { userFragment } from './userQuery';

export const hospitalFragment = gql`
  fragment hospital on Hospital {
    id
    name
    location
    coverphoto
    logo
    doctors
    specialties
    description
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

export const HOSPITAL_USERS = gql`
  query getHospitalUsers($id: ID!) {
    getHospitalUsers(id: $id) {
      ...user
    }
  }
  ${userFragment}
`;
