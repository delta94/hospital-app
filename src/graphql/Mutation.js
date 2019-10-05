import { gql } from "apollo-boost";

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

export const HOSPITAL_MUTATION = gql`
  mutation AddHospital($hospital: CreateHospital!) {
    addHospital(hospital: $hospital) {
      name
    }
  }
`;


export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;
