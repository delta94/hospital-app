import { gql } from "apollo-boost";

export const  doctorFragment = gql`
  fragment doctor on Doctor {
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
  }
`;

export const DOCTORS_QUERY = gql`
   {
    doctors {
      ...doctor
    }
  }
  ${doctorFragment}
`;

export const SINGLE_DOCTOR_QUERY = gql`
  query getSingleDoctor($id: ID!) {
    doctor(id: $id) {
      ...doctor
    }
  }
  ${doctorFragment}
`;
