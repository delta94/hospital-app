import { gql } from "apollo-boost";

import { userFragment } from "./Query";

export const LOGIN_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    authUser(email: $email, password: $password)
  }
`;

export const REGISTER_MUTATION = gql`
  mutation AddUser($userInput: CreateUser!) {
    addUser(userInput: $userInput)
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($userInput: UpdateUser!) {
    updateUser(userInput: $userInput) {
      ...user
    }
  }
  ${userFragment}
`;

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
      doctors
      description
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!, $id: ID!, $type: String!) {
    singleUpload(file: $file, id: $id, type: $type) {
      filename
    }
  }
`;
