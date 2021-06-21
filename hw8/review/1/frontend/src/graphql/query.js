import { gql } from "@apollo/client";

export const MSG_QUERY = gql`
  query chatbox($me: String!, $friend: String!){
    chatbox(me: $me, friend: $friend) {
      {
        id
        name
        messages
      }
    }
  }
`;
