import { gql } from "apollo-boost";

import { doctorFragment } from "../query/doctorQuery";

export const DOCTOR_LOGIN_MUTATION = gql`
  mutation LoginDoctor($email: String!, $password: String!) {
    authDoctor(email: $email, password: $password)
  }
`;

export const DOCTOR_REGISTER_MUTATION = gql`
  mutation AddDoctor($userInput: CreateDoctor!) {
    addDoctor(userInput: $userInput)
  }
`;

export const UPDATE_DOCTOR_MUTATION = gql`
  mutation updateDoctor($userInput: UpdateDoctor!) {
    updateDoctor(userInput: $userInput) {
      ...doctor
    }
  }
  ${doctorFragment}
`;
