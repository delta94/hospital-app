import { gql } from "apollo-boost";

import { userFragment } from '../query/userQuery';

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

export const REMOVE_USER_MUTATION = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id)
  }
`
