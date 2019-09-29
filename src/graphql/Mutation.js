import { gql } from "apollo-boost";

export const LOGIN_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    authUser(email: $email, password: $password)
  }
`;

export const HOSPITAL_MUTATION = gql`
  mutation AddHospital($hospital: CreateHospital!) {
    addHospital(hospital: $hospital) {
      name
    }
  }
`;
