import { gql } from "@apollo/client";

export const ADD_MSG_MUTATION = gql`
  mutation addMessage($me: String!, $friend: String!) {
    addMessage(data: { me: $me, friend: $friend }) {
      sender {
        name
      }
      body
    }
  }
`;
