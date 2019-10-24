import { gql } from 'apollo-boost';

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!, $id: ID!, $type: String!) {
    singleUpload(file: $file, id: $id, type: $type) {
      filename
    }
  }
`;
