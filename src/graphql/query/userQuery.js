import { gql } from 'apollo-boost';

export const userFragment = gql`
  fragment user on User {
    id
    firstName
    lastName
    email
    role
    password
    hospital
    pending
    avatar,
    phone,
    availableDays,
    specialties,
    bio
  }
`;

export const USER_QUERY = gql`
  query getSingleUser($id: ID!) {
    user(id: $id) {
      ...user
    }
  }
  ${userFragment}
`;
