import gql from "graphql-tag";

export const doctorFragment = gql`
  fragment doctorf on Doctor {
    id
    firstName
    lastName
    email
    role
    password
    hospital
    avatar
    phone
    specialties
    availableDay
  }
`;

export const DOCTORS_QUERY = gql`
  {
    doctors {
      doctor {
        ...doctorf
      }
    }
  }
  ${doctorFragment}
`;

export const SINGLE_DOCTOR_QUERY = gql`
  query getSingleDoctor($id: ID!) {
    doctor(id: $id) {
      ...doctorf
    }
  }
  ${doctorFragment}
`;
