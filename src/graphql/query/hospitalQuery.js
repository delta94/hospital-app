import gql from 'graphql-tag';
import { userFragment } from './userQuery';

export const hospitalFragment = gql`
  fragment hospital on Hospital {
    id
    name
    location
    coverphoto
    logo
    specialties
    description
  }
`;

export const HOSPITAL_QUERY = gql`
  {
    hospitals {
      id
      name
      location
      coverphoto
      logo,
      specialties
      description
    }
  }
`;

export const NAME_HOSPITAL_QUERY = gql`
  {
    hospitals {
      id,
      name
    }
  }
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

export const HOSPITAL_ADMIN = gql`
  query getHospitalAdmin($id: ID!) {
    getHospitalAdmin(id: $id) {
      ...user
    }
  }
  ${userFragment}
`;

