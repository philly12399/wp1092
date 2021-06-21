import { gql } from "@apollo/client";

export const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox($me: String!, $friend: String!) {
    createChatBox(data: { me: $me, friend: $friend }) {
      id
      name
      messages {
        sender {
          name
        }
        body
      }
    }
  }
`;
